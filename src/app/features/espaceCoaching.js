

import { ChoixCreneauxCoaching } from "../components/choixCreneauxCoaching";
import { Button } from "../components/button";

import { EspaceCandidat } from "./espaceCandidat";

export class EspaceCoaching {
    
    constructor(userId , fName) {

        this.userId = userId;
        this.fName = fName;

        this.initUI();
        this.addButtons();
        this.addCoachingCreneau();

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="backButton"></div>
        LISTE COACHINGS EN TRAVAUX
        <ul id="listeCreneaux"></ul>
       `;

    };

    addButtons() {

        const buttonBackEspaceCandidat = new Button(document.querySelector('#backButton') , 'Retour' , () => {
    
            //console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new EspaceCandidat(this.userId , this.fName);
    
        });
    };

    addCoachingCreneau() {

        new ChoixCreneauxCoaching(this.userId);

    };
};