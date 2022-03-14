//FIREBASE
import { get, getDatabase, ref } from 'firebase/database';
import { initializeApp } from "firebase/app";

//OWN
import { Button } from '../components/button';
import { EspaceCandidat } from './espaceCandidat';
import { OffreDisplayCandidat } from './offresDisplayCandidat';

//CONFIG FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyCBVL9d_RQUd9bW-A8dLlpU4tC-CO2ftc8",
    authDomain: "projet-nomades-1.firebaseapp.com",
    databaseURL: "https://projet-nomades-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projet-nomades-1",
    storageBucket: "projet-nomades-1.appspot.com",
    messagingSenderId: "164954171217",
    appId: "1:164954171217:web:bdbee8166ab73c86959570"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export class EspaceCandidatOffres {


    constructor( userId , fName ) {

        this.userId = userId;
        this.fName = fName;
        
        // console.log(this.userId)
        // console.log(this.fName)

        this.initUI();
        this.addButtons();
        this.addVignettes();
        this.addSquareListener();
        
        
    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack""></div>
        <h2 id="offresRecrTitle">Cliquer sur un recruteur pour voir ses offres</h2>
        <ul id="recruteurList" "></ul>
        `;

    };    

    addButtons() {
    
        const buttonBackCandidat = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {

            // console.log(this.userId)
            // console.log(this.fName)

            new EspaceCandidat(this.userId , this.fName);
            
        });
    
    };

    async addVignettes() {

        const snapshot = await get( ref( database , 'recruteurs' ) );
        const recruteursSnapshot = snapshot.val();
    
        for (const recruteur in recruteursSnapshot) {
            
    
            if (Object.hasOwnProperty.call(recruteursSnapshot, recruteur)) {
                
                const recruteursIND = recruteursSnapshot[recruteur];
                const logoRecruteur = recruteursIND.recruteurLogo;
    
                document.getElementById('recruteurList').innerHTML +=`
                <li class="logoRecruteur">
                    <img src="${logoRecruteur}" id="logo_${recruteur}" class="logoOffres" alt="Logo ${recruteursIND.recruteurName}"/>
                </li>
                `;
    
            };
    
        };
    
       };

    addSquareListener() {

    const vignettes = document.querySelector('#recruteurList');
    vignettes.addEventListener('click', ($event) => {
    
        const vignetteIMG = $event.target.closest('img'); //...et on vise un type 'vignetteIMG'
        //console.log(vignetteIMG); //=  <img src="..." id="logo_XXX" alt="Logo ..."/>         
                        
        const id = vignetteIMG.id; //On target l'id recruteur de chaque logo
        //console.log(id); //= logo_XXX
                        
        const splittedID = id.split('_')[1]; //On coupe le string id au niveau du '_' et la deuxième partie[1] on l'appelle splittedID
        //console.log(splittedID) //= XXX
    
        new OffreDisplayCandidat(splittedID , this.userId , this.fName);
                    
        });
    };
};