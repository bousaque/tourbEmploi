//PDFJS Import
import * as pdfjsLib from 'pdfjs-dist/webpack';

//Own
import { Button } from '../components/button';
import { EspaceRecruteur } from './espaceRecruteur';



export class OffreRecruteurRECR {

    constructor() {

        this.initUI();
        this.addButtons();
        this.addOffreCanvas();
        
    };

    initUI() {

        document.querySelector('#recruteurOffres').innerHTML =`
        <canvas id="pdfCanvas"></canvas>
        <div id="offreCreneauxAgendaBOX"></div>
        `;

    };

    addButtons() {

        const backVitrineRecruteur = new Button( document.querySelector('#buttonBack') , 'Retour' , () => {

            // console.log(this.userId)
            // console.log(this.fName)
            // console.log(this.splittedID)

            new EspaceRecruteur();
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

};