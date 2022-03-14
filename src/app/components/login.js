//AUTH
import { getAuth, onAuthStateChanged } from "firebase/auth";

//DATABASE
import { getDatabase, ref , get , child } from 'firebase/database';

//OWN
import { LoginHTML } from "../features/loginHTML";
import { EspaceCandidat } from "../features/espaceCandidat";


export class Login {

    constructor() {

        let uidUser; 
        let userId;
        let name;
        let email;
        let imageUrl;
        let username;

        this.loginMecanic();
    };

    loginMecanic() {

        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
        
            /*
            Ici on va tester si le user qui actionne le Auth existe. 
            S'il n'existe pas, on va lancer LoginHTML.
            Si user existe, on teste encore si on a déjà les infos complémentaires, et
            si oui, on laisse passer. S'il n'y a pas ces infos, on lance juste le formulaire.
            */
          
           if (user) {
               
               /*
               Etape 1.5 du connecté
               */
              
              const dbRef = ref( getDatabase() );
              const snapshot = await get( child ( dbRef , `users/${user.uid}` ) );
              const userId = user.uid;
              const snapshotDyn = snapshot.val();
              
                //console.log(snapshotDyn);
                //console.log(activity);
                //console.log(snapshot._node.children_.root_.left.left.value.value_);
        
        
                if ( !userId || !snapshotDyn || !snapshotDyn.activity ) { 
                    /*
                    Etape 2 du connecté - enregistré
                    Ici on balance le formulaire seulement si : user = true && !exists || !activity
        
                        Si exists() c'est que user est connecté et si activity, c'est que form est completé.
                        Ça implique que :
                        - le mec connecté mais pas complété va avoir le formulaire
                        - le mec pas connecté mais complété va pas passer là
                        - le mec connecté et complété passe au else et passera
                    */
        
                    new LoginHTML(user.uid , user.displayName , user.email , user.photoURL);
                }
                    
                else { 
                    /*
                    Etape 3 du connecté + enregistré
                    Si on est déjà connecté et que infos complémentaire = true
                    */
        
                    document.querySelector('#bodyApp').innerHTML = '';        
                    new EspaceCandidat(userId , snapshotDyn.fName);
                };
        
        
            } else {
                /*
                Etape 1 du non-connecté/jamais venu
        
                Si !user, alors on fait LoginHTML et c'est lui ensuite qui teste si la DB est renseignée.
                */

                new LoginHTML();
            };
        
        });

    };

};





