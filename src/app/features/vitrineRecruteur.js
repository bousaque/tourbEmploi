import { Button } from '../components/button';
import { SiteVitrine } from './siteVitrine';
import { OffreRecruteur } from './offreRecruteur';

import { getDatabase , get, ref } from "firebase/database";


export class VitrineRecruteur {

    constructor(splittedID) {

        this.recruteurID = splittedID;
        this.offrePDF = '';
        this.initUI();
        this.addButtons();
        this.addRecruteurHeaders();
        this.addRecruteurOffres();
        this.addSquareListener();

    };

    initUI() {

        
        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="recruteurHeader">
            <div id="logoR"></div>
        </div>
        <ul id="recruteurOffres"></ul>
        `;


    };

    addButtons() {
    
        const buttonBackOffres = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new SiteVitrine();
    
        });
    
    };

    async addRecruteurHeaders() {

        console.log(this.recruteurID);  
        
        const dbRef = ref( getDatabase() ,`recruteurs/${this.recruteurID}/` );

        //Async/await sur le recruteur, l'objet-réponse est dans snapshotRecruteur
        const snapshotRecruteur = await get( dbRef );
        const recruteur = snapshotRecruteur.val();
 
        console.log(recruteur)
        
        //LOGO + WEBSITE
        const logoRecruteur = recruteur.recruteurLogo;        
        
        //LOGO + WEBSITE
        document.querySelector('#logoR').innerHTML +=`
        <div>
            <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise""/>
        </div>
        `;

    }; 

    async addRecruteurOffres() {


        const refDbOffres = ref( getDatabase(), `offres/${this.recruteurID}/` );
        const snapshotOffres = await get( refDbOffres );
        const offres = snapshotOffres.val();
        
        for (const offre in offres) {

            if (Object.hasOwnProperty.call(offres, offre)) {

                const offreIND = offres[offre];
                
                document.querySelector('#recruteurOffres').innerHTML +=`
                <li id="offre_${offre}">
                    <h4 class="offre-liste">${offreIND.positionName}</h4> 
                </li>
                `;
                
                this.offrePDF = offreIND.offrePDF;

            };
        };
        
        
        
    };
    
    addSquareListener() {
        
        const offreBOX = document.querySelector('#recruteurOffres');

        const f = ($event) => {

            offreBOX.addEventListener('click', ($event) => {
                
                const offreLI = $event.target.closest('li'); //...et on vise un type 'li'
                //console.log(offreLI); //=  <img src="..." id="logo_XXX" alt="Logo ..."/>         
                
                if(!offreLI) {
                    return;
                };
                
                const id = offreLI.id; //On target l'id recruteur de chaque logo
                //console.log(id); //= logo_XXX
                
                const splittedLI = id.split('_')[1]; //On coupe le string id au niveau du '_' et la deuxième partie[1] on l'appelle splittedID
                //console.log(splittedLI) //= XXX
                
                new OffreRecruteur(splittedLI, this.recruteurID , this.offrePDF);

                offreBOX.removeEventListener('click' , f);

            });
            
        };

        const listner = offreBOX.addEventListener('click', (e) => f(e));
    
    };

};