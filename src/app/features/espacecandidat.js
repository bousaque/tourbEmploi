import { getDatabase, ref , get , orderByChild , query , equalTo } from "firebase/database";

import { EspaceCandidatOffres } from "./espaceCandidatOffres";
import { EspaceCoaching } from "./espaceCoaching";
import { MessageCandidat } from "./messageCandidat";
import { Button } from "../components/button";

export class EspaceCandidat {

    constructor(userId , fName ) {

        this.userId = userId;
        this.fName = fName;

        // console.log('Espace Candidat fName = '+this.fName);
        // console.log('Offre Display userId = '+this.userId);


        this.initUI();
        this.addButtons();
        this.addFname();
        this.addListeCreneaux();

        
    };
    
    initUI() {
        
        
        //On va créer le nouveau HTML
        document.querySelector('#bodyApp').innerHTML =`
        <div id="espaceCandidatHTML">
            <div id="buttonOffresHTML"></div>
            <div id="buttonCoachingHTML"></div>
            <div id="buttonContactHTML"></div>
            <h1>Espace Candidat</h1>
            <h2>Vous êtes connecté à votre Espace Candidat en tant que <span id="userName"></span>!</h2>
            <div id="candidatCalendrierHTML">
                <h3>Votre calendrier de rendez-vous :</h3>
                <ul id="ListeCreneauxHTML"></ul>
            </div>
        </div>
        `;
    };

    addButtons() {

        const buttonOffres = new Button(document.querySelector('#buttonOffresHTML') , 'Vers les Offres' , () => {

            //console.log('Bouton Offres pressé');
            //new ListOffres{} -> new PageRecruteur{} -> new Offre{}
            document.querySelector('#bodyApp').innerHTML = '';
            new EspaceCandidatOffres(this.userId , this.fName);

        });

        const buttonCoaching = new Button(document.querySelector('#buttonCoachingHTML') , 'Demande de Coaching' , () => {

            console.log('Bouton Coaching pressé');
            //new ExplicationsCoaching{} -> new Coaching{}
            new EspaceCoaching(this.userId , this.fName);

        });

        const buttonContactHTML = new Button(document.querySelector('#buttonContactHTML') , 'Contact' , () => {

            console.log('Bouton Contact pressé');
            //new CandidatMessage{}
            new MessageCandidat(this.userId);

        });

        

    };

    addFname() {

        document.querySelector('#userName').innerHTML = this.fName || 'Anonymous';

    };

    async addListeCreneaux() {


        /*
        Requête tendant à choper les créneaux, ordrés par userID et dans lesquels il y a bien un userID
        */
        const refDbCreneaux = ref( getDatabase() , "creneaux" );
        const snapshotUser = await get( query( refDbCreneaux , orderByChild('userID') , equalTo(this.userId) ) );
        const idCandidatOBJ = snapshotUser.val();
        
        //console.log(idCandidatOBJ)

        
        /*
        Collecte des créneaux choisis par l'utilisateur et transformation en tableau
        */
       let offreList = [];        
       for (const offreID in idCandidatOBJ) {
           
           
           if (Object.hasOwnProperty.call(idCandidatOBJ, offreID)) {
               
               const keyReservationOBJ = idCandidatOBJ[offreID];
               offreList.push(keyReservationOBJ);
               
            };
        };

        //console.log(offreList)


        
        /*
        Rendu <li> des créneaux
        */
       offreList.forEach( creneauPris => {
           
           document.querySelector('#ListeCreneauxHTML').innerHTML +=`
           <li>
            Référence offre : ${creneauPris.offreID} - 
            Horaire créneau : ${creneauPris.time} - 
            Entreprise :  ${creneauPris.recruteurName} - 
            Position :  ${creneauPris.positionName} - 
            <img src="${creneauPris.recruteurLogo}" alt="Logo Recruteur" />
           </li>
           `;
           
        });
    
    };
};