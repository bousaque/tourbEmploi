

import { child, get, getDatabase, ref } from 'firebase/database';
import { Button } from '../components/button';
import { EspaceCandidat } from './espaceCandidat';


export class EspaceCandidatOffres {


    constructor(user) {

        user = this.user;
        this.initUI();
        this.displayOffres();
        this.addButtons();
    
    };

    

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <ul id="offresList"></ul>
        `;

    };

    
    displayOffres() {
        //Récupérer les objets offres contenus dans la DB
        const dbRef = ref( getDatabase() );

        get( child ( dbRef , `offres` ) )
        //dbRef va chercher la DB dans FireBase et offres c'est le nom du noeud
        .then(
            (snapshot) => {
            
                console.log(snapshot.val());
                
                //Là c'est une boucle for qui va sortir chaque item sous "offres" dans le noeud
                const object = snapshot.val();
                for (const key in object) {
                    //Au sein du snapshot, pour chaque offre(object) on va récupérer la clé (ici le titre)
                    if (Object.hasOwnProperty.call(object, key)) {
                        const offre = object[key];
                        console.log(offre);
                        //Ainsi l'offre sera la ou les clés de l'object snapshot 
                        //et de là on va faire s'afficher les valeurs extraites.
                        
                        document.querySelector('#offresList').innerHTML +=`
                        <li id="offre-${key}">${offre.titre}</li>
                        `;
                    };
                };
    
            }
        );
                
    };

    addButtons() {
    
        const buttonBackCandidat = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new EspaceCandidat(this.user);
    
        });
    
    };

    addEventsListeners() {
        
        const ul = document.querySelector('ul');
        ul.addEventListener('click', ($event) => {

                //Place un listener click sur l'élément 'ul'...
            if ($event.target.nodeName === 'UL') {
        
                const liOffre = $event.target.closest('li'); //...et on vise un type 'li'

                const id = liOffre.id; //On target l'id de chaque offre

                const key = id.split('-')[1]; //On coupe le string id au niveau du '-' et la deuxième partie[1] on l'appelle key

                deleteByIndex(key); //Ne pas oublier d'appeler la fonction

            }
        });
    }

};