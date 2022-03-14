import { getDatabase, ref, set } from "firebase/database";
//import { getStorage, uploadBytes , ref } from "firebase/storage";


export class AddOfferRECR {

    constructor() {

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
        `;
    };

    async writeData() {

        //positionTitle
        const newPositionTitle = document.querySelector('#positionTitle').value;

        const db = getDatabase();
        const writePDF = await set(ref(db, 'offres/' /* + this.recruteurID*/), {
                    
            offreID: '',
            offrePDF: '',
            positionName: newPositionTitle,
            recruteurId: '',
            recruteurLogo: '',
            recruteurName: '',

        });

        
        
        //PDF
        
        
        let pdf = [];
        document.getElementById("pdfOffer").addEventListener("change", (e) => {
            pdf = e.target.files;
        });
        
        document.getElementById("send").addEventListener("click", async () => {
            
            if (pdf.length != 0 && pdf.length !=2) {
                
                //Write into Storage
                const storage = getStorage();
                const storageRef = ref(storage, 'recruteurs_offres');

                const upload = await uploadBytes(storageRef, pdf[0]);
                
                //Write into RTDB as well

                const db = getDatabase();
                const writePDF = await set(ref(db, 'offres/' /* + this.recruteurID*/), {
                    
                    offrePDF: 'FILE', //Remplacer par upload.pdf (genre...)

                  });
                       
            }
        });



    };

};