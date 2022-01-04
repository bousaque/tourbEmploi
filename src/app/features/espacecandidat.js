import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

import { EspaceCandidatOffres } from "./espaceCandidatOffres";
import { EspaceCoaching } from "./espaceCoaching";
import { MessageCandidat } from "./messageCandidat";
import { Button } from "../components/button";



export class EspaceCandidat {

    /*
    On va instancier : 
    - un bouton Offres
    - un bouton Contact
    - un bouton Coaching

    On va créer la classe VignetteOffre et la classe VignetteCoaching
    */

    constructor(user) {
        //user va passer dans le constructeur

        this.initUI();
        this.addButtons();
        this.user = user;

        const db = getDatabase();
        const auth = getAuth();
        this.userId = auth.currentUser.uid;

        return onValue(ref(db, '/users/' + this.userId), (snapshot) => {
            
            document.querySelector('#userName').innerHTML = (snapshot.val() && snapshot.val().fName) || 'Anonymous';

            console.log(snapshot.val());
        

        }, {
            onlyOnce: true
        });
        
        
        
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

            console.log('Bouton Offres pressé');
            //new ListOffres{} -> new PageRecruteur{} -> new Offre{}
            document.querySelector('#bodyApp').innerHTML = '';
            new EspaceCandidatOffres(this.user);

        });

        const buttonCoaching = new Button(document.querySelector('#buttonCoachingHTML') , 'Demande de Coaching' , () => {

            console.log('Bouton Coaching pressé');
            //new ExplicationsCoaching{} -> new Coaching{}
            new EspaceCoaching(this.user);

        });

        const buttonContactHTML = new Button(document.querySelector('#buttonContactHTML') , 'Contact' , () => {

            console.log('Bouton Contact pressé');
            //new CandidatMessage{}
            new MessageCandidat(this.user);

        });

        

    };

    

};