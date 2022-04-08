//FireBase Import
import { getDatabase , get, ref , query , orderByChild , equalTo } from "firebase/database";

//PDFJS Import
import * as pdfjsLib from 'pdfjs-dist/webpack';

//Own
import { Button } from '../components/button';
import { OffreDisplayCandidat } from './offresDisplayCandidat';
import { VitrineRecruteur } from "./vitrineRecruteur";
import { ChoixCreneaux } from '../components/choixCreneau';



export class OffreRecruteur {

    constructor(splittedLI , recruteurID , offrePDF , userId , fName , logoRecruteur , recruteurName , positionName ) {

        this.offreID = splittedLI; //= LI de l'offre, donc son ID
        this.recruteurID = recruteurID; //= ID du recruteur
        this.offrePDF = offrePDF;
        this.userId = userId;
        this.fName = fName;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteurName;
        this.positionName = positionName;

        // console.log(this.splittedID)
        // console.log(this.userId)
        // console.log(this.fName)
        // console.log(this.logoRecruteur)
        // console.log(this.recruteurName)

        // console.log(this.positionName)

        this.initUI();
        this.addButtons();
        this.addOffreCanvas();
        
        if(this.userId) {
            
            this.allCreneauxAgendaire();

        } else {
                
            document.querySelector('#offreCreneauxAgendaBOX').style.display = 'none';
    
        };

        

    };

    initUI() {
    
        //document.querySelector('#webTV').innerHTML ='';
        document.querySelector('#recruteurOffres').innerHTML =`
        <div id="namePosition"></div>
        <canvas id="pdfCanvas"></canvas>
        <div id="offreCreneauxAgendaBOX"></div>
        `;

    };

    addButtons() {

        const backVitrineRecruteur = new Button( document.querySelector('#buttonBack') , 'Retour' , () => {

            // console.log(this.fName)
            // console.log(this.splittedID)
            if(this.userId) {
                
                console.log('this.userId = '+this.userId)

                new OffreDisplayCandidat(this.recruteurID , this.fName , this.userId);
            
            } else if(!this.userId) {

                console.log('this.userId = false')

                new VitrineRecruteur(this.recruteurID)

            };


        });

    };

    addOffreCanvas() {
           
        const url = this.offrePDF;

        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = false;

        const scale = 1.5,
            canvas = document.querySelector('#pdfCanvas'),
            ctx = canvas.getContext('2d');

        //Render the page
        const renderPage = num => {
            pageIsRendering = true;
            pdfDoc.getPage(num).then( page => {

                const viewport = page.getViewport({ scale : scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport: viewport,
                }
                page.render(renderCtx).promise.then( () => {
                    pageIsRendering = false;

                    
                });
                //console.log(page);
            });
        };
        
        //Get document
        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            renderPage(pageNum);
            //console.log(pdfDoc)
        });
        
    };

    async allCreneauxAgendaire() {

        /**
         * 1. Récupération de l'objet creneauxUserID
         * 2. Comparaison des ID 
         * 3. Extraction de chaque sous-objet offre dans un tableau
         * 4. Vérification dudit tableau, si vide alors ça passe et sinon pas de réservation possible
         */

        const refDbCreneaux = ref( getDatabase(), "creneaux" );
        const snapshotCreneauxUserID = await get( query( refDbCreneaux , orderByChild('userID') , equalTo(this.userId) ) ); //1.//
        const creneauxUserID = snapshotCreneauxUserID.val(); 
        
        const refDbOffres = ref( getDatabase(), "offres" );
        const snapshotOffres = await get( query( refDbOffres , orderByChild('recruteurId') , equalTo(`${this.recruteurID}`) ) );
        const offres2 = snapshotOffres.val();

        for (const recrID in offres2) {

            if (Object.hasOwnProperty.call(offres2, recrID)) {

                const recrIDIN = offres2[recrID];
                
                if (recrIDIN.offreID===this.splittedLI) { //2.//
                    
                    this.positionName = recrIDIN.positionName;
                };
            };
        };
        
        
        let offresIndividuellesOut = []; 
        
        for (const offre in creneauxUserID) {
            
            if (Object.hasOwnProperty.call(creneauxUserID, offre)) {
                
                const offresIndividuelles = creneauxUserID[offre];
                
                if (offresIndividuelles.offreID===this.offreID) { //2.//
                    
                    offresIndividuellesOut.push(offresIndividuelles); //3.//
                    
                    // this.positionName = offresIndividuelles.positionName;
                    
                };
            };
        };
        
        
        if ( offresIndividuellesOut.length <= 0 ) { //4.//
            
            
            
            // console.log(this.recruteurName)
            // console.log(this.recruteurLogo)
            // console.log(this.positionName)
            // console.log('Entrée dans newChoixCreneaux{}')
            
            new ChoixCreneaux(this.userId , this.fName , this.recruteurID , this.offreID , this.logoRecruteur , this.recruteurName , this.positionName);
            
        } else {
            
            document.querySelector('#offreCreneauxAgendaBOX').innerHTML += "(Vous avez déjà réservé un créneau pour cette offre)";
            
        };
        
    };

};