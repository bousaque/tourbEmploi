import { getDatabase, ref, push , onValue , update } from "firebase/database";
import { getStorage, uploadBytes , ref as refS , getDownloadURL } from "firebase/storage";

//PDFJS Import
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { EspaceRecruteur } from "../features/espaceRecruteur";

import { Button } from "./button";

export class AddOfferRECR {

    constructor( recrID , recruteurName , logoRecruteur ) {

        this.recrID = recrID;
        this.recruteurName = recruteurName;
        this.logoRecruteur = logoRecruteur;
        this.newPositionTitle = '';
        this.pdfURL = '';
        this.pdf = [];
        this.offreID = '';
        this.pdfSHOW = '';
        this.offreOUT = '';
        this.branch = '';

        // console.log(this.recrID)
        // console.log(this.recruteurName)
        // console.log(this.logoRecruteur)

        
        this.initUI();
        
        console.log(this.pdfURL);
        if(this.pdfURL) {

            this.addOffreCanvas();

        } else if(!this.pdfURL) {

            document.getElementById('showPDF').innerHTML = "(Pas encore d'offre à afficher...)";

        };
        
        this.addButtons();
        

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML = `
        <div id="addOfferBOX">
            <form id="addOfferFORM">
                <div id="positionTitleBOX">
                    <label for="positionTitle">Dénomination du poste :</label>
                    <input type="text" id="positionTitle"/>
                </div>
                <div class="dropdown">
                    <label for="lang">Domaine</label>
                    <select name="branches" id="profBranches">
                        <option value="toChoose">Choisir une branche</option>
                        <option value="achats_logistique">Achat / Logistique</option>
                        <option value="admin_secr_accueil">Administration / Secrétariat / Accueil</option>
                        <option value="artisanat_manuel">Artisanat / Autres professions manuelles</option>
                        <option value="assurances">Assurances</option>
                        <option value="bat_constr_tp">Bâtiment / Construction / Travaux publics</option>
                        <option value="commercial_vente">Commercial / Vente</option>
                        <option value="entretien">Entretien Bâtiments / Nettoyage</option>
                        <option value="finances_compta_control">Finances / Comptabilité / Controlling</option>
                        <option value="immobilier">Immobilier</option>
                        <option value="industrie_prod_tech">Industrie / Production / Technique</option>
                        <option value="informatique">Informatique / Télécommunications</option>
                        <option value="marketing_medias_rp">Marketing / Médias / RP</option>
                        <option value="negoce">Négoce</option>
                        <option value="RH_GP">Ressources humaines / Gestion du personnel</option>
                        <option value="restauration_hot_tour">Restauration / Hôtellerie / Tourisme</option>
                        <option value="soins_sport">Soins & Beauté / Sport</option>
                        <option value="santé_médecine">Santé / Médecine</option>
                        <option value="banque">Secteur Bancaire</option>
                        <option value="sécurité_défense">Sécurité / Défense</option>
                        <option value="autres_prof">Autres Professions</option>
                    </select>
                </div>
                <div id="pdfOfferBOX">
                    <label for="pdfOffer">
                    <input type="file" id="pdfOffer" accept=".pdf"/>
                </div>
                <div id="submitPDF"></div>
                <div id="eraseBack"></div>
            </form>
        </div>
        <canvas id="showPDF"></canvas>
        `;

        
        
    };  

    addOffreCanvas() {
           
        const url = this.pdfURL;

        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = false;

        const scale = 1.5,
            canvas = document.querySelector('#showPDF'),
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
    
    addButtons() {
        
        // Category Control
        document.getElementById("profBranches").addEventListener("change", (e) => {
    
            console.log(e.target.value)
            this.branch = e.target.value;
            
        });

        // PDF Control
        document.getElementById("pdfOffer").addEventListener("change", (e) => {
    
            this.pdf = e.target.files;
            this.pdfName = e.target.files[0].name;
            
        });
        
        new Button( document.querySelector('#submitPDF') , 'Envoyer' , async () => {
            
            this.newPositionTitle = document.querySelector('#positionTitle').value;
            

            if ( this.pdf.length != 0 && this.pdf.length != 2 ) {
                    

                //Write into Storage
                const storage = getStorage();
                const storageRef = refS( storage , `recruteurs_offres/${this.recrID}/` + this.newPositionTitle + '_' + this.pdfName );
    
                const upload = await uploadBytes( storageRef , this.pdf[0] );

                const gsReference = refS( storage, `gs://projet-nomades-1.appspot.com/recruteurs_offres/${this.recrID}/` + this.newPositionTitle + '_' + this.pdfName );
                this.pdfURL = await getDownloadURL(gsReference);
                
                console.log(this.pdfURL)

                //Update RTDB with an Offer object
                const refDB = ref( getDatabase() , `/offres/${this.recrID}/` );
                const writePDF = await push( refDB , {
                    
                    offrePDF: this.pdfURL,
                    positionName: this.newPositionTitle,
                    branchOffer: this.branch,
                    recruteurId: this.recrID,
                    recruteurLogo: this.logoRecruteur,
                    recruteurName: this.recruteurName,

                });
                   
                const refOffreID = ref( getDatabase() , `/offres/${this.recrID}/${writePDF.key}` );
                const writeOffreID = await update( refOffreID , {
            
                    offreID: writePDF.key,

                });

                this.offreID = writePDF.key;
                

                onValue( refDB , async (snapshot) => {
                    
                    let snpsht = snapshot.val();

                    for (const offre in snpsht) {
                        if (Object.hasOwnProperty.call(snpsht, offre)) {
                            const element = snpsht[offre];
                            
                            // console.log(element.offrePDF)
                            // console.log(element.offreID)
                            // console.log(this.offreID)
                            
                            if (this.offreID===element.offreID) {
                            
                                console.log('this.offreID===element.offreID = true (mais seulement lors du tir !)');
                                this.pdfSHOW = element.offrePDF;
                            };

                        };
                    };
                    
                    console.log(this.pdfSHOW)

                    if( snapshot.exists() ) {
    
                        this.addOffreCanvas();
                        
                    };
        
                });
            };

            document.querySelector('#bodyApp').innerHTML = "Votre nouvelle offre a bien été enregistrée, vous allez la retrouvez dans votre Espace Recruteur qui va s'afficher automatiquement";
            
            setTimeout(() => {
        
                new EspaceRecruteur( this.recrID );

            } , 2500); 

        });

        new Button( document.querySelector('#eraseBack') , 'Annuler' , () => {

            new EspaceRecruteur( this.recrID );

        });
        
    };       
        

};