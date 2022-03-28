//AUTH
import { getAuth, onAuthStateChanged } from "firebase/auth";

//DATABASE
import { getDatabase, ref , get , child } from 'firebase/database';

//Own
import { PopupCandUI } from './components/popupCandUI';
import { EspaceRecruteur } from "./features/espaceRecruteur";
import { EspaceCandidat } from "./features/espaceCandidat";

import { HeaderApp } from "./components/header";
import { SiteVitrine } from "./features/siteVitrine";
import { FooterApp } from "./components/footer";

let uidUser; 
let userId;
let name;
let email;
let imageUrl;
let username;



new HeaderApp();

// Présent dans Auth ?

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {

    if (user) {

        const userId = user.uid;
        const email = user.email;
        
        // Présent dans RTDB/users ? Si oui, EspaceCandidatOffres
        
        const dbRefAuth = ref( getDatabase() );
        const snapshotAuthUser = await get( child ( dbRefAuth , `users/${userId}` ) );
        const candidatDB = snapshotAuthUser.val();
        
        // Présent dans RTDB/recruteurs ? Si oui, espaceRecruteur
        
        const dbRefRTDB = ref( getDatabase() );
        const snapshotAuthRecr = await get ( child ( dbRefRTDB , `recruteurs/${userId}` ) );
        const recrDB = snapshotAuthRecr.val();
        
        console.log(candidatDB)
        let fName;
        if( candidatDB ) {

            // const fName   user.displayName.split(' ')[0];
            fName = candidatDB.fName;
        
        } else if ( recrDB ) {

            fName = user.displayName;

        };

        
        // console.log(user)
        // console.log(user.email)
        //console.log(user.displayName.split(' ')[0]);
        //console.log(candidatDB); //= false pour un recruteur / true pour un candidat
        //console.log(recrDB); //= true pour un recruteur / false pour un candidat

        // console.log( !(candidatDB && !recrDB) ) //= true pour un candidat
        // console.log( !(candidatDB && candidatDB.activity) ) //= false pour un candidat qui a déjà rempli le formulaire
        // console.log( !(candidatDB && !candidatDB.activity) ) //= true pour un candidat qui n'a pas encore rempli le formulaire
        // console.log( !(recrDB && !candidatDB) ) //= true pour un candidat


        switch (true) {

            case candidatDB && !recrDB:
                console.log('new EspaceCandidat()');

                if( candidatDB && candidatDB.activity ) {

                    console.log(`candidatDB.activity = ${candidatDB.activity}`);
                    new EspaceCandidat( userId , recrDB ? this.fName : '');
                    
                } else if( candidatDB && !candidatDB.activity ) {

                    console.log('candidatDB.activity = RIEN');
                    new PopupCandUI( userId , fName , email );

                };

                break;

            case recrDB && !candidatDB:
                console.log('new EspaceRecruteur()');

                const recrID = user.uid;
                new EspaceRecruteur(recrID);
                break;

            default: console.log('Default du switch')
                new SiteVitrine();
                
            
          
                
        };
            
    } else {

        console.log('new SiteVitrine()')
        new SiteVitrine();

    };

});


new FooterApp();

