import { getDatabase, ref , get } from "firebase/database";

//PDFJS Import
import * as pdfjsLib from 'pdfjs-dist/webpack';

//Own
import { Button } from '../components/button';
import { EspaceRecruteur } from './espaceRecruteur';



export class OffreRecruteurRECR {

    constructor( splittedLI , recrID , recruteurName , logoRecruteur ) {

        this.offreID = splittedLI;
        this.recrID = recrID;
        this.recruteurName = recruteurName;
        this.logoRecruteur = logoRecruteur;
        this.offrePDF = '';

        this.dbRef = ref( getDatabase() , `offres/${this.recrID}/${this.offreID}`);

        this.initUI().then( () => {

            this.addButtons(),
            this.addOffreCanvas()
            
        });
        
        
    };

    async initUI() {

        const snapshotOffre = await get( this.dbRef );
        const offreDetails = snapshotOffre.val();

        console.log(offreDetails.offrePDF)
        this.offrePDF = offreDetails.offrePDF;


        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="offreTitle">Offre : "${offreDetails.positionName}"</div>
        <div id="offreCategory">Catégorie : "${offreDetails.branchOffer}"</div>
        <canvas id="pdfCanvas"></canvas>
        `;

    };

    addButtons() {

        new Button( document.querySelector('#buttonBack') , 'Retour' , () => {            

            new EspaceRecruteur(this.recrID);

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
            ctx = document.querySelector('#pdfCanvas').getContext('2d');

            // console.log(document.querySelector('#pdfCanvas'))
            // console.log(canvas)
            // console.log(ctx)

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

};