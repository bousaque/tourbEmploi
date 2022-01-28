import { child, get, getDatabase, ref } from 'firebase/database';

import { Button } from '../components/button';
import { EspaceCandidat } from './espaceCandidat';
import { OffreDisplayCandidat } from './offreDisplayCandidat';


export class EspaceCandidatOffres {


    constructor(userId , fName ) {

        this.userId = userId;
        this.fName = fName;
        

        // console.log('Espace Candidat Offres fName = '+this.fName);
        // console.log('Offre Display userId = '+this.userId);

        
        this.initUI();
        this.displayOffres();
        this.addButtons();
        this.addEventsListeners();
        
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
                            
                //Là c'est une boucle for qui va sortir chaque item sous "offres" dans le noeud
                const object = snapshot.val();
                    //retourne objet JSON sans les méthodes
                

                for (const key in object) {
                    //Au sein du snapshot, pour chaque offre(object) on va récupérer la clé (ici le titre)
                    if (Object.hasOwnProperty.call(object, key)) {
                        const offre = object[key];
                        //console.log(offre);
                        //Ainsi l'offre sera la ou les clés de l'object snapshot 
                        //et de là on va faire s'afficher les valeurs extraites.
                        
                        document.querySelector('#offresList').innerHTML +=`
                            <li id="offre-${key}">
                                <div>
                                    ${offre.offreID}
                                </div>
                                <br> 
                                <div>
                                    ${offre.positionName}
                                </div>
                                <br>
                                <div>
                                    ${offre.recruteurName}
                                </div>
                                <br>
                                <img src="${offre.recruteurLogo}" alt="logo-recruteur">
                            </li>
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
            new EspaceCandidat(this.userId , this.fName);
    
        });
    
    };

    addEventsListeners() {
        
        const ul = document.querySelector('ul');
        ul.addEventListener('click', ($event) => {
        
            const liOffre = $event.target.closest('li'); //...et on vise un type 'li'
                //console.log(liOffre); //= <li id="offre-003">offre003</li>

            if (liOffre) {

                const id = liOffre.id; //On target l'id de chaque offre
                //console.log(id); //= offre-003

                const offreID = id.split('-')[1]; //On coupe le string id au niveau du '-' et la deuxième partie[1] on l'appelle key
                //console.log(key); //= 003
                

                new OffreDisplayCandidat(offreID , this.userId , this.fName );
            };
                
        });
    };
};