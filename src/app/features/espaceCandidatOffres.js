import { Button } from '../components/button';
import { EspaceCandidat } from './espaceCandidat';

export class EspaceCandidatOffres {


    constructor(user) {

        user = this.user;
        
    };

    

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        `;

    };

    addButtons() {

        const buttonBackCandidat = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {

            console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new EspaceCandidat(this.user);

        });

    }
}