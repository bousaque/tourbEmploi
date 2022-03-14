import { getDatabase , ref , get , orderByChild , query , equalTo } from 'firebase/database';

import { ChoixCreneauxCoaching } from "../components/choixCreneauCoaching";
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
        <p id="listDispoCoaching">LISTE DISPONIBILITÉS COACHING :</p>
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

    async addCoachingCreneau() {

        new ChoixCreneauxCoaching(this.userId);

    };
};