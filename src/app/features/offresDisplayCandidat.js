//FireBase Import
import { getDatabase , get, ref , child } from "firebase/database";

//Own
import { Button } from "../components/button";
import { EspaceCandidatOffres } from "./espaceCandidatOffres";
import { OffreRecruteur } from "./offreRecruteur";


export class OffreDisplayCandidat {


    constructor( splittedID , userId , fName ) {

        this.recruteurID = splittedID; //= ID du recruteur
        this.userId = userId;
        this.fName = fName;
        this.logoRecruteur = '';
        this.recruteurName = '';
        this.positionName = '';

        // console.log(this.recruteurID)
        // console.log(this.userId)
        // console.log(this.fName)
        // console.log(this.logoRecruteur)
        // console.log(this.recruteurName)
        // console.log(this.positionName)

        this.initUI();
        this.addButtons();
        this.addRecruteurHeaders();
        this.addRecruteurOffres();
        this.addSquareListener();

    };

    initUI() {

        //console.log(this.key);
        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="offreHeader">
            <div id="recruteurHead">
                <div id="recruteurWeb"></div>
            </div>
        </div>
        <ul id="recruteurOffres"></ul>
        `;

    };

    addButtons() {
    
        const buttonBackOffres = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            // console.log(this.userId)
            // console.log(this.fName)
  
            new EspaceCandidatOffres( this.userId, this.fName );
    
        });
    
    };
    
    async addRecruteurHeaders() {
        
        const dbRef = ref( getDatabase() );

        //console.log(this.splittedID);    
        //Async/await sur le recruteur, l'objet-réponse est dans snapshotRecruteur
        const snapshotRecruteur = await get( child( dbRef , `recruteurs/` + this.recruteurID) );

        const recruteur = snapshotRecruteur.val();

        //LOGO + WEBSITE
        const logoRecruteur = recruteur.recruteurLogo;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteur.recruteurName;

        
        //LOGO + WEBSITE
        document.querySelector('#recruteurWeb').innerHTML =`
        <div id="recruteurName">${this.recruteurName}</div>
        <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise""/>
        `;      

    };       
                        
    async addRecruteurOffres() {

        const refDbOffres = ref( getDatabase(), `offres/${this.recruteurID}` );
        const snapshotOffres = await get( refDbOffres );
        const offres = snapshotOffres.val();

        // console.log(offres)
        // console.log(this.recruteurID)
        
        for (const offre in offres) {

            if (Object.hasOwnProperty.call(offres, offre)) {

                const offreIND = offres[offre];
                
                document.querySelector('#recruteurOffres').innerHTML +=`
                <li id="offre_${offre}">
                    <h4 class="offre-liste">${offreIND.positionName}</h4> 
                </li>
                `;
                
                this.offrePDF = offreIND.offrePDF;
                this.positionName = offreIND.positionName;

            };
        };
    }   

    addSquareListener() {
        
        const offreBOX = document.querySelector('#recruteurOffres');
        const f=  ($event) => {
            
            const offreLI = $event.target.closest('li'); //...et on vise un type 'li'
            //console.log(offreLI); //=  <img src="..." id="logo_XXX" alt="Logo ..."/>         
            
            if(!offreLI) {
                return;
            };

            const id = offreLI.id; //On target l'id recruteur de chaque logo
            //console.log(id); //= logo_XXX
            
            const splittedLI = id.split('_')[1]; //On coupe le string id au niveau du '_' et la deuxième partie[1] on l'appelle splittedID
            //console.log(splittedLI) //= XXX

            // console.log(this.logoRecruteur)
            // console.log(this.recruteurName)
            // console.log(this.positionName)

            offreBOX.removeEventListener('click' , f);
            
            new OffreRecruteur(splittedLI, this.recruteurID , this.offrePDF , this.userId , this.fName , this.logoRecruteur , this.recruteurName , this.positionName);
        };

        const listner = offreBOX.addEventListener('click', (e) => f(e));
    
    };
};