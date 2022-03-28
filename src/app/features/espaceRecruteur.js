import { get , child , ref , getDatabase, update , onValue , query , equalTo , orderByChild } from "firebase/database";
import { getStorage, ref as refS , uploadBytes , getDownloadURL } from "firebase/storage";


import { Button } from "../components/button";
import { ModifyPen } from "../components/modifyPen";
import { AddOfferRECR } from "../components/addOfferRECR";
import { OffreRecruteurRECR } from "./offreRecruteurRECR";



export class EspaceRecruteur {

    constructor(recrID) {

        this.recrID = recrID; 
        this.inputVALUE = '';   
        this.inputValueName = ''; 
        this.recruteurName = ''; 
        this.logoRecruteur = '';   
        this.linkInputVALUE = '';
        
        this.dbRef = ref( getDatabase() );
        this.initUI();        
        this.addRecruteurHeaders().then( ()=> {
            this.addButtons()
            
            this.addRecruteurOffres();
            //this.addSquareListener();
        });

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML = `
        <div id="recruteurNameINPUT"></div>
        <div id="recruteurWeb"></div>
        <div id="addOfferRECR"></div>
        <ul id="recruteurOffres"></ul>
        `;

    };
    
    async addRecruteurHeaders() {
        
        const snapshotRecruteur = await get( child( this.dbRef , `recruteurs/${this.recrID}`) );
        const recruteur = snapshotRecruteur.val();

        
        //LOGO + WEBSITE
        const logoRecruteur = recruteur.recruteurLogo;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteur.recruteurName;
        
        //console.log(logoRecruteur);
        
        const websiteURL = recruteur.adresseWeb;

        //NAME
        if(!this.recruteurName) {

            document.querySelector('#recruteurNameINPUT').innerHTML =`
            <div id="recrNameTextStatic">(Le nom de votre entreprise)</div>
            <div id="recruteurNameRECR">
                <img id="modifyNameRecr" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FIcon%20awesome-pencil-alt.png?alt=media&token=abac222a-f7cf-454d-88ee-d2355a06f576" alt="ModifyPen" />
            </div>
            `;

        } else {

            document.querySelector('#recruteurNameINPUT').innerHTML =`
            <div id="recrNameTextDyn">${this.recruteurName}</div>
            <div id="recruteurNameRECR">
                <img id="modifyNameRecr" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FIcon%20awesome-pencil-alt.png?alt=media&token=abac222a-f7cf-454d-88ee-d2355a06f576" alt="ModifyPen" />
            </div>
            `;
        };
        
        
        //LOGO + WEBSITE
        if(logoRecruteur) {
            
            document.querySelector('#recruteurWeb').innerHTML =`
            <a href="${websiteURL}" target="_blank">
                <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise" />
            </a>
            <div id="modifyBOX">
                <img id="modifyLogoandWebRecr" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FIcon%20awesome-pencil-alt.png?alt=media&token=abac222a-f7cf-454d-88ee-d2355a06f576" alt="ModifyPen" />
            </div>
            `;

        } else {

            document.querySelector('#recruteurWeb').innerHTML =`
            <img id="logoRecruteur" alt="LogoEntreprise" />
            <div id="modifyBOX">
                <img id="modifyLogoandWebRecr" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FIcon%20awesome-pencil-alt.png?alt=media&token=abac222a-f7cf-454d-88ee-d2355a06f576" alt="ModifyPen" />
            </div>
            `;
            
        };
        
    };

    addButtons() {

        //console.log(this.recruteurName)
        
        new Button( document.querySelector('#addOfferRECR') , 'Ajouter une offre' , () => {

            new AddOfferRECR( this.recrID , this.recruteurName , this.logoRecruteur );

        });

        new ModifyPen( document.querySelector('#modifyLogoandWebRecr') , '' , () => {

            // console.log('Modifier Logo');
            document.querySelector('#modifyBOX').innerHTML =`
            <span id="modifyFORM">
                <label for="modifyINPUT">Choisir une image</label>
                <input id="modifyINPUT" type="file" required hidden/>
                <span id="file-chosen">(Pas d'image sélectionnée)</span>
            </span>
            <div id="modifySUBMIT"></div>
            `;
            
            const actualBtn = document.getElementById('modifyINPUT');
            const fileChosen = document.getElementById('file-chosen');
            
            actualBtn.addEventListener('change', () => {
                
                const inputVALUE = document.querySelector('#modifyINPUT').files[0]; //contient l'objet FILe
                
                //console.log(inputVALUE);

                fileChosen.innerHTML = inputVALUE.name;
                this.inputValueName = inputVALUE.name;
                this.inputVALUE = inputVALUE;
            });

            new Button( document.querySelector('#modifySUBMIT') , 'Envoyer' , async () => {

            
                //1. Upload in Storage
                
                const storage = getStorage();
                const createStorageRef = refS( storage , `recruteurs_media/logos_recruteurs/${this.recrID}/` + this.inputValueName );
                const uploadIMG = await uploadBytes( createStorageRef , this.inputVALUE );
    
                const gsReference = refS( storage, `gs://projet-nomades-1.appspot.com/recruteurs_media/logos_recruteurs/${this.recrID}/${this.inputValueName}` );
                const findURL = await getDownloadURL(gsReference);
                
                //console.log(findURL);
    
                // //2. Write in rtdb
    
    
                const refDB = ref( getDatabase() , `recruteurs/${this.recrID}/` );
                const newDataRecrDB = {
                    
                    'recruteurLogo': `${findURL}`, 
                    
                };
              
                await update( refDB, newDataRecrDB );
    
                //3. Render HTML
                
                onValue( refDB , (snapshot) => {
                    
                    //console.log(snapshot.val()); //= Objet recruteur concerné...
    
                    if( snapshot.exists() ) {
    
                        const changeURL = document.querySelector('#logoRecruteur').src = findURL;
                        this.initUI();        
                        this.addRecruteurHeaders().then( ()=> {
                            this.addButtons()
                            
                            this.addRecruteurOffres();
                            //this.addSquareListener();
                        });
                    };
        
                });
    
            });     
       
            
        });

        new ModifyPen( document.querySelector('#modifyNameRecr') , '' , () => {

            // console.log('Modifier Logo');
            document.querySelector('#recruteurNameRECR').innerHTML =`
            <span id="modifyLinkFORM">
                <label for="modifyLinkINPUT">Rentrer le site de votre entreprise</label>
                <input id="modifyLinkINPUT" type="text" required />
            </span>
            <div id="modifyNameSUBMIT"></div>
            `;
            
            const linkInput = document.getElementById('modifyLinkINPUT');
            
            linkInput.addEventListener('change', () => {
                
                const linkInputVALUE = document.querySelector('#modifyLinkINPUT').value; //contient l'objet FILe
                
                console.log(linkInputVALUE);
                
                this.linkInputVALUE = linkInputVALUE;
            });

            new Button( document.querySelector('#modifyNameSUBMIT') , 'Envoyer' , async () => {


                // //2. Write in rtdb
                const refDB = ref( getDatabase() , `recruteurs/${this.recrID}/` );
                const newDataRecrDB = {
                    
                    'recruteurName': `${this.linkInputVALUE}`, 
                    
                };
              
                await update( refDB, newDataRecrDB );
    
                //3. Render HTML
                
                onValue( refDB , (snapshot) => {
                    
                    console.log(snapshot.val()); //= Objet recruteur concerné...
    
                    if( snapshot.exists() ) {
    
                        const changeName = document.querySelector('#logoRecruteur').innerHTML = this.recruteurName;
                        this.initUI();        
                        this.addRecruteurHeaders().then( ()=> {
                            this.addButtons()
                            
                            this.addRecruteurOffres();
                            //this.addSquareListener();
                        });
                    };
        
                });
    
            });
            //console.log(this.linkInputVALUE)
                
            
        });
       
    };

    async addRecruteurOffres() {


        const refDbOffres = ref( getDatabase(), "offres" );
        const snapshotOffres = await get( query( refDbOffres , orderByChild('recruteurId') , equalTo(`${this.recrID}`) ) );
        const offres = snapshotOffres.val();

        if(offres) {

            for (const offre in offres) {
    
                if (Object.hasOwnProperty.call(offres, offre)) {
    
                    const offreIND = offres[offre];
                    
                    document.querySelector('#recruteurOffres').innerHTML +=`
                    <li id="offre_${offre}">
                        <h4 class="offre-liste">${offreIND.positionName}</h4> 
                    </li>
                    `;
                    
                    this.offrePDF = offreIND.offrePDF;
    
                };
            };

        } else {

            document.querySelector('#recruteurOffres').innerHTML =`
            <span id="noItwText">(Aucune offre n'a encore été postée, patience !)</span>
            `;

        };
        
    }   

    addSquareListener() {
        
        const offreBOX = document.querySelector('#recruteurOffres');
        offreBOX.addEventListener('click', ($event) => {
            
            const offreLI = $event.target.closest('li'); //...et on vise un type 'li'
            //console.log(offreLI); //=  <img src="..." id="logo_XXX" alt="Logo ..."/>         
            
            const id = offreLI.id; //On target l'id recruteur de chaque logo
            //console.log(id); //= logo_XXX
            
            const splittedLI = id.split('_')[1]; //On coupe le string id au niveau du '_' et la deuxième partie[1] on l'appelle splittedID
            //console.log(splittedLI) //= XXX

            // console.log(this.logoRecruteur)
            // console.log(this.recruteurName)

            
            new OffreRecruteurRECR(splittedLI, this.splittedID , this.offrePDF , this.userId , this.fName , this.logoRecruteur , this.recruteurName);
            document.querySelector('#videoFront').classList.add('displayNone');                          
        });
    
    };



};