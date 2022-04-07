//FIREBASE
import { getDatabase, ref , get } from 'firebase/database';
import { initializeApp } from "firebase/app";

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

//OWN
import { VitrineRecruteur } from './vitrineRecruteur';
import { PwRecrUI } from '../components/pwRecrUI';
import { RecoveryPwRecr } from '../components/recoveryPwRecr';
import { Button } from '../components/button';
import { PopupCandUI } from '../components/popupCandUI';



export class SiteVitrine {

   constructor() {

    this.emailRecr = '';
    this.pwRecr = '';

    this.initUI();
    this.addVignettes();
    this.addSquareListener();
    this.addFlip();
    this.addButton();


    /*
    1. Snapshot de tous les recruteurs
    2. Extraction des logos
    3. Loop sur les boutons pour chaque logo
    4. Instanciation d'un nouvel objet OffresRecruteur qui liste ses offres
    5. Au sein dudit, on instancie un nouvel objet OffreRecruteur qui détaille le pdf de l'offre
    */
   
   }; 

   initUI() {

       document.querySelector('#bodyApp').innerHTML =`
       <div id="textVitrine">
        <h2 id="welcomeTitle">Bienvenue sur la plateforme Tourbillon Emploi</h2>
        
        <div class="wrapper">
            <div class="buttonWrapper">
                <button class="tab-button active button-front" data-id="home">Recruteurs</button>
                <button class="tab-button button-front" data-id="about">Candidats</button>
            </div>
            <div class="contentWrapper">
                <div class="content active" id="home">
                    <p class="mainTxt text-center">
                        Votre entreprise aimerait engager des jeunes, avec ou sans diplôme, de 18 à 25 ans ? Inscrivez-vous à Tourbillon Emploi, un événement de <span class="bolder">recrutement direct</span> qui aura lieu le mercredi 4 mai 2022 dès 14h. Vous aurez l'occasion d'enchaîner des rencontres de 15 minutes avec des candidat.e.s intéressé.e.s par un poste à pourvoir dans votre entreprise. 
                    </p>
                    <p class="text-center">
                        La participation est gratuite ! 
                    </p>
                    <p class="text-center">
                        Seule condition : avoir entre <span class="bolder">un et quatre postes ouverts</span> au sein de votre entreprise
                    </p>
                    <p class="text-center">
                        Participez à cette demi-journée et offrez une <span class="bolder">opportunité unique</span> à ces jeunes de rencontrer des employeurs, d'élargir leur réseau, d'échanger sur leurs parcours et peut-être de décrocher un premier emploi.
                    </p>
                    <p class="italic text-center">
                        Laissez-vous surprendre par ces jeunes talents et ouvrez une porte sur leur avenir !
                    </p>
                    <div id="loginButtonRecruteurMail">
                        <div id="loginButtonRecruteurMailIN"></div>
                    </div>
                    <div id="lostPassword">
                        <div id="lostPasswordIN"></div>
                    </div>
                </div>
                <div class="content" id="about">
                    <p class="mainTxt text-center">
                        Tu as entre 18 et 25 ans et tu cherches ton premier emploi ? Tourbillon Emploi te permets de rencontrer des employeurs qui ont des postes à pourvoir dans le canton de Genève. 
                    </p>
                    <p class="text-center">
                        Lors de cette demi-journée, tu peux…
                    </p>
                    <ul class="text-center">
                    <li class="bolder mainTxt2">
                        rencontrer 1 à 3 entreprises qui recrutent 
                    </li>
                    <li class="bolder mainTxt2">
                        bénéficier d'un coaching individuel de 20 minutes pour te préparer aux entretiens</li>
                    </li>
                    </ul>
                    <p class="text-center">
                        Tourbillon Emploi aura lieu le mercredi 4 mai 2022 dès 14h à Genève.
                    </p>
                    <p class="italic text-center">
                        Tente ta chance !
                    </p>
                    <div id="loginButtonCandidat"></div>
                    <div id="loginButtonCandidatMail"></div>
                </div>
            </div>
        </div>
        <p id="offres2021">(Offres de 2021 à titre d'exemple)</p>
        <div id="vignettesRecruteurs"></div>
       </div>
       `;
   };

   async addVignettes() {

    const snapshot = await get( ref( database , 'recruteurs/' ) );
    const recruteursSnapshot = snapshot.val();

    
    for (const recruteurKey in recruteursSnapshot) {
        
        
        if (Object.hasOwnProperty.call(recruteursSnapshot, recruteurKey)) {
            
            const recruteursIND = recruteursSnapshot[recruteurKey];
            const logoRecruteur = recruteursIND.recruteurLogo;
            const recruteurName = recruteursIND.recruteurName;
            
            console.log(recruteurName);

            if(recruteurName && logoRecruteur) {

                document.getElementById('vignettesRecruteurs').innerHTML +=`
                <img src="${logoRecruteur}" id="logo-${recruteurKey}" class="logoVitrine" alt="Logo ${recruteurName}"/>
                `;

            };

        
        };

    };

   };

   addSquareListener() {

    const vignettes = document.querySelector('#vignettesRecruteurs');
    vignettes.addEventListener('click', ($event) => {

        const vignetteIMG = $event.target.closest('img'); //...et on vise un type 'vignetteIMG'
        //console.log(vignetteIMG); //=  <img src="..." id="logo_XXX" alt="Logo ..."/>         
                    
        const id = vignetteIMG.id; //On target l'id recruteur de chaque logo
        //console.log(id); //= logo_XXX
                    
        const splittedID = id.split('-')[1]; //On coupe le string id au niveau du '_' et la deuxième partie[1] on l'appelle splittedID
        //console.log(splittedID) //= XXX


        new VitrineRecruteur(splittedID);
                
                        
        });
    };

    addFlip() {
        const tabs = document.querySelector(".wrapper");
        const tabButton = document.querySelectorAll(".tab-button");
        const contents = document.querySelectorAll(".content");

        tabs.onclick = e => {
        const id = e.target.dataset.id;
        if (id) { tabButton.forEach(btn => {

            btn.classList.remove("active");
            });

            e.target.classList.add("active");

            contents.forEach(content => {
            content.classList.remove("active");
            });

            const element = document.getElementById(id);
            element.classList.add("active");

            }
        }
    }

    addButton() {

        new Button(document.querySelector('#loginButtonRecruteurMailIN') , 'Connexion Recruteurs' , () => {
            
            new PwRecrUI()

        });
        
        new Button(document.querySelector('#lostPasswordIN') , 'Demander un nouveau mot de passe' , () => {            
           
            new RecoveryPwRecr();
            
        });


        document.querySelector('#loginButtonCandidat').innerHTML =`
        <p style="text-align:center; font-style:italic; font-size: 80%;">(Les inscriptions Candidats seront ouvertes très prochainement)</p>
        `;



        new Button(document.querySelector('#loginButtonCandidat') , 'Inscription / Connexion (GOOGLE)' , async () => {

            new PopupCandUI();

        });
        
        // new Button(document.querySelector('#loginButtonCandidatMail') , 'Inscription / Connexion (MAIL_PW)' , () => {

        //     new PwCandUI();

        // });

    };    

};