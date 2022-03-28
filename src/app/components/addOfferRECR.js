import { getDatabase, ref, set , push , onValue , update } from "firebase/database";
import { getStorage, uploadBytes , ref as refS , getDownloadURL } from "firebase/storage";

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

        // console.log(this.recrID)
        // console.log(this.recruteurName)
        // console.log(this.logoRecruteur)

        
        this.initUI();
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
                <div id="pdfOfferBOX">
                    <label for="pdfOffer">
                    <input type="file" id="pdfOffer" accept=".pdf"/>
                </div>
                <div id="submitPDF"></div>
            </form>
        </div>
        <div id="showPDF"></div>
        `;

        
        
    };  
    
    
    addButtons() {
        
        // PDF Control
        document.getElementById("pdfOffer").addEventListener("change", (e) => {
    
            this.pdf = e.target.files;
            this.pdfName = e.target.files[0].name;
            
        });
        
        new Button( document.querySelector('#submitPDF') , 'Envoyer' , async () => {
            
            this.newPositionTitle = document.querySelector('#positionTitle').value;
            
            console.log(this.pdfName);



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
                    
                    //offreID: writePDF.key,
                    offrePDF: this.pdfURL,
                    positionName: this.newPositionTitle,
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
    
                        const changedPDF = document.querySelector('#showPDF').innerHTML = this.pdfSHOW;

                        // this.initUI();        
                        // this.addButtons();
                        
                    };
        
                });
            };


        });
        
    };       
        

};