//FireBase Import
import { getDatabase , get, ref , child } from "firebase/database"

//PDFJSWorker Import
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { pdfjsLib } from "pdfjs-dist";
import { PDFJSWorker } from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = PDFJSWorker;

//Inner Import
import { Button } from "../components/button";
import { EspaceCandidatOffres } from "./espaceCandidatOffres";
import { CreneauxRecruteur } from "./creneauxRecruteur";




export class OffreDisplayCandidat {

    constructor(key) {

        this.key = key;
            //Idéalement l'id de l'offre...
        this.initUI();
        this.addButtons();
        this.addRecruteurHeaders();
        this.addOffreCanvas();
        this.allCreneauxAgendaire();

    };

    initUI() {

        console.log(this.key);
        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="offreHeader">
            <span id="recruteurName"></span>
            <div id="recruteurLinks"></div>
            <div id="videoFront"></div>
        </div>
        <div id="offreBody">
            <div id="canvasVisuel"></div>
            <canvas id="pdfCanvas"></canvas>
        </div>
        <div id="offreCreneauxAgenda"></div>
        `;

    };

    addButtons() {
    
        const buttonBackOffres = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new EspaceCandidatOffres(this.user);
    
        });
    
    };

    addRecruteurHeaders() {

        const dbRef = ref( getDatabase() );

        get( child ( dbRef , `offres/` + this.key ) )
        //dbRef va chercher la DB dans FireBase et offres c'est le nom du noeud
        .then(
            (snapshot) => {

                //console.log(key)

                const offre = snapshot.val();
                
                document.querySelector('#recruteurName').innerHTML = `${offre.recruteurName}`;
                

                get( child( dbRef , `recruteurs/` + offre.recruteurId) )
                .then( (snapshot) => {
                    
                    const recruteur = snapshot.val();

                    //LOGO + WEBSITE
                    const logoRecruteur = recruteur.recruteurLogo;
                    const websiteURL = recruteur.adresseWeb;

                    //CHAINE YT + LOGO YT
                    const webtvAdresse = recruteur.adresseWebTV;
                    const webtvLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FyoutubeLogo.svg?alt=media&token=57fdaedb-4977-43ea-9d98-308a7d482e3f";
                    
                    //LINKEDIN + LOGO
                    const linkedinAdresse = recruteur.adresseLinkedIn;
                    const linkedinLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FlinkedinLogo.svg?alt=media&token=1122fa2d-100a-4fe6-95fd-2c0ab3e5408e";
                    
                    //FACEBOOK + LOGO
                    const facebookAdresse = recruteur.adresseFacebook;
                    const facebookLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FfacebookLogo.svg?alt=media&token=ab738520-5db8-4b92-9e36-633e5a96f5b8";
                    
                    //INSTAGRAM + LOGO
                    const instagramAdresse = recruteur.adresseInstagram;
                    const instagramLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FinstagramLogo.svg?alt=media&token=07bded61-68d5-4f0a-934f-9320e80a4f08";
                    
                    //IFRAME YOUTUBE
                    const urlVideoFront = recruteur.adresseVideoFront;
                    const stringIdFromURL = urlVideoFront.split("v=")[1];
                    



                    //LOGO + WEBSITE
                    document.querySelector('#recruteurLinks').innerHTML =`
                    <a href="${websiteURL}" target="_blank">
                        <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise""/>
                    </a>
                    `;

                    //CHAINE YT + LOGO YT
                    document.querySelector('#recruteurLinks').innerHTML +=`
                    <a href="${webtvAdresse}" target="_blank">
                        <img id="logoRecruteur" src="${webtvLogo}" alt="LogoEntreprise" style="width:5%;height:5%"/>
                    </a>
                    `;

                    //LINKEDIN + LOGO
                    document.querySelector('#recruteurLinks').innerHTML +=`
                    <a href="${linkedinAdresse}" target="_blank">
                        <img id="logoRecruteur" src="${linkedinLogo}" alt="LogoEntreprise" style="width:5%;height:5%"/>
                    </a>
                    `;

                    //FACEBOOK + LOGO
                    document.querySelector('#recruteurLinks').innerHTML +=`
                    <a href="${facebookAdresse}" target="_blank">
                        <img id="logoRecruteur" src="${facebookLogo}" alt="LogoEntreprise" style="width:5%;height:5%"/>
                    </a>
                    `;

                    //INSTAGRAM + LOGO
                    document.querySelector('#recruteurLinks').innerHTML +=`
                    <a href="${instagramAdresse}" target="_blank">
                        <img id="logoRecruteur" src="${instagramLogo}" alt="LogoEntreprise" style="width:5%;height:5%"/>
                    </a>
                    `;

                    //IFRAME YOUTUBE
                    document.querySelector('#videoFront').innerHTML = `
                    <iframe width="520" height="415" src="https://www.youtube.com/embed/${stringIdFromURL}?showinfo=0&controls=2&mute=1&autoplay=0&rel=0">
                    </iframe>
                    `;
    
                });
                
                //console.log(snapshot.child(`${this.key}`).child(`recruteur`).val()); //=Fondation Partage
                
            });

    };

    addOffreCanvas() {

        document.querySelector('#canvasVisuel').innerHTML =`CANVAS PDF OFFRE EN TRAVAUX`;

        //Choper le PDF
    //     const pdfPath = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/recruteurs_offres%2FJOB%20DESCRIPTION%20AGENT%20TECH.%20SPECIALISE%20CVC.pdf?alt=media&token=0bdb1f98-af14-41d4-b12e-d904785fe027";
    //     const loadingTask = pdfjsLib.getDocument(pdfPath);
    //     //pdfjsLib est UNDEFINED...

    //     loadingTask.promise
    //     .then( (pdfDocument) => {

    //             // Request a first page
    //         return pdfDocument.getPage(1)
    //         .then( (pdfPage) => {

    //                 // Display page on the existing canvas with 100% scale.
    //             const viewport = pdfPage.getViewport({ scale: 1.0 });
    //             const canvas = document.querySelector("#pdfCanvas");

    //             canvas.width = viewport.width;
    //             canvas.height = viewport.height;

    //             const ctx = canvas.getContext("2d");
    //             const renderTask = pdfPage.render({

    //                 canvasContext: ctx,
    //                     viewport,

    //                 });

    //             return renderTask.promise;

    //         });
    //     })
    //     .catch(function (reason) {
    //         console.error("Error: " + reason);
    //     });
    };

    allCreneauxAgendaire() {
        
        document.querySelector('#offreCreneauxAgenda').innerHTML = "LISTE AGENDAIRE CRENEAUX EN TRAVAUX";
        
        /*
        Lieu où l'on va faire s'afficher sous forme agendaire les créneaux libres d'un recruteur et
        les créneaux pris.
        */
    };
    

};