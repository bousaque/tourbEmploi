import { get , child , ref , getDatabase, update , onValue , query , orderByChild } from "firebase/database";
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
        this.OffresRecr = '';
        this.numberInputVALUE = '';
        this.eraseOffreID = '';
        this.actualIDs = [];
        
        this.dbRef = ref( getDatabase() );
        this.initUI();        
        this.addRecruteurHeaders().then( ()=> {
            this.addButtons()
            this.addRecruteurOffres();
            this.addSquareListener();
            this.addFlip();
            this.addCalendarRECR();
        });

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML = `
        <div id="recruteurBOX">
            <div id="recruteurNameINPUT"></div>
            <div id="recruteurWeb"></div>
        </div> 
        <div id="nbRecrSimul">
            <div id="nbSimulDisplay"></div>
            <div id="nbRecrModify"></div>
        </div>
        <div id="addOfferRECR"></div>
        <div class="wrapper">
            <div class="buttonWrapper">
                <button class="tab-button active button-front" data-id="home">Vos offres</button>
                <button class="tab-button button-front" data-id="about">Calendrier</button>
            </div>
            <div class="contentWrapper">
                <div class="content active" id="home">
                    <ul id="recruteurOffres"></ul>
                </div>
                <div class="content" id="about">
                    <ul id="calendarRecr"></ul>
                </div>
            </div>
        </div>
        `;

    };
    
    async addRecruteurHeaders() {
        
        const snapshotRecruteur = await get( child( this.dbRef , `recruteurs/${this.recrID}`) );
        const recruteur = snapshotRecruteur.val();

        
        //LOGO + WEBSITE
        const logoRecruteur = recruteur.recruteurLogo;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteur.recruteurName;
        this.parallelITW = recruteur.parallelITW;
        
    
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
            <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise" />
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

        //ITW SIMULTANÉS
        if(this.parallelITW) {

            document.querySelector('#nbSimulDisplay').innerHTML =`
            <div id="recrNumberText">Nombre actuel d'entretiens à la fois : <b id="itwP">${this.parallelITW}</b></div>
            <div id="recruteurNumberRECR">
                <img id="modifyNumberRecr" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FIcon%20awesome-pencil-alt.png?alt=media&token=abac222a-f7cf-454d-88ee-d2355a06f576" alt="ModifyPen" />
            </div>
            `;

        } else {

            document.querySelector('#nbSimulDisplay').innerHTML =`
            <div id="recrNumberText">Nombre actuel d'entretiens à la fois : <b id="itwP">(À compléter)</b></div>
            <div id="recruteurNumberRECR">
                <img id="modifyNumberRecr" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FIcon%20awesome-pencil-alt.png?alt=media&token=abac222a-f7cf-454d-88ee-d2355a06f576" alt="ModifyPen" />
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
                        });
                    };
        
                });
    
            });
                
            
        });
        
        new ModifyPen( document.querySelector('#modifyNumberRecr') , '' , () => {

            document.querySelector('#recruteurNumberRECR').innerHTML =`
            <label for="recrSimul">Nombre d'entretiens en simultané que vous souhaitez conduire : <br/><span class="mentions">(par exemple : si vous mettez "2", vous pourrez avoir jusqu'à 2 entretiens en parallèle)</span></label>
            <input type="number" id="recrSimul" max="3" min="1" required>
            <div id="modifyNumberSubmit"></div>
            `;

            const numberInput = document.querySelector('#recrSimul');
            console.log(numberInput);

            numberInput.addEventListener('change', () => {
                
                const numberInputVALUE = document.querySelector('#recrSimul').valueAsNumber; //contient l'objet FILe
                
                console.log(numberInputVALUE);
                this.numberInputVALUE = numberInputVALUE;

            });

            new Button( document.querySelector('#modifyNumberSubmit') , 'Envoyer' , async () => {

                // //2. Write in rtdb
                const refDB = ref( getDatabase() , `recruteurs/${this.recrID}/` );
                const newDataRecrDB = {
                    
                    'parallelITW': `${this.numberInputVALUE}`, 
                    
                };
              
                await update( refDB, newDataRecrDB );

                //3. Render HTML
                
                onValue( refDB , (snapshot) => {
                    
                    console.log(snapshot.val()); //= Objet recruteur concerné...
    
                    if( snapshot.exists() ) {
    
                        const changeNumber = document.querySelector('#itwP').innerHTML = this.recruteurName;
                        this.initUI();        
                        this.addRecruteurHeaders().then( ()=> {
                            this.addButtons()
                            
                            this.addRecruteurOffres();
                        });
                    };
        
                });

            });

        });


    };

    async addRecruteurOffres() {


        const refDbOffres = ref( getDatabase(), `offres/${this.recrID}` );
        const snapshotOffres = await get(refDbOffres);
        const offres = snapshotOffres.val();

        if( offres ) {
            
            for ( const offre in offres ) {
                
                if ( Object.hasOwnProperty.call( offres , offre ) ) {
                    
                    const offreIND = offres[offre];
                    //console.log(offreIND); //= toutes les offres en objet individuel
                    
                    document.querySelector('#recruteurOffres').innerHTML +=`
                    <div id="">
                        <div id="${offre}" class="close">&#10006;</div>
                        <li id="offre_${offre}">
                            <h4 class="offre-liste">${offreIND.positionName}</h4> 
                        </li>
                    </div>
                    `;
                    
                    this.actualIDs.push(`${offre}`);
                    this.eraseOffreID = offre;
                    this.offrePDF = offreIND.offrePDF;
    
                };
            };

        } else {

            document.querySelector('#recruteurOffres').innerHTML =`
            <span id="noItwText">(Aucune offre n'a encore été postée, patience !)</span>
            `;

        };

    };   

    addSquareListener() {
        
        const offreBOX = document.querySelector('#recruteurOffres');
        offreBOX.addEventListener('click', ($event) => {
            
            const offreLI = $event.target.closest('li'); //...et on vise un type 'li'
            //console.log(offreLI); //=  <img src="..." id="logo_XXX" alt="Logo ..."/>         
            
            if( !offreLI ) {
                return;
            };

            const id = offreLI.id; //On target l'id recruteur de chaque logo
            //console.log(id); //= logo_XXX
            
            const splittedLI = id.split('_')[1]; //On coupe le string id au niveau du '_' et la deuxième partie[1] on l'appelle splittedID
            //console.log(splittedLI) //= XXX

            //console.log(splittedLI)

            
            new OffreRecruteurRECR(splittedLI, this.recrID , this.recruteurName , this.logoRecruteur );
        
        });

        
        const x = this.actualIDs;
        console.log(x);

        
        for ( const id of x ) {
            
            const toErase = document.querySelector(`#${id}`);
            toErase.addEventListener('click', ($event) => {
                
                const offre = $event.target.closest('div');
                console.log(offre);
                const id = offre.id;
                console.log(id);
                const splittedID = id.split('_')[1];
                console.log(splittedID);
                
                this.eraseOffreID = splittedID;
                this.offrePDF = this.offres[splittedID].offrePDF;
                console.log(this.offrePDF);
                
                this.eraseOffre();
                
            });
        }
        
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

            };
        };
    };

    async addCalendarRECR() {

        const refDbCreneaux = ref( getDatabase(), "creneaux" );
        const snapshotCreneauxRecr = await get( query( refDbCreneaux , orderByChild('recruteurName')  ) ); //1.//
        const creneauxRecr = snapshotCreneauxRecr.val(); 

        let calendar = [];
        for (const crenDetails in creneauxRecr) {

            if (Object.hasOwnProperty.call(creneauxRecr, crenDetails)) {

                const crenDetail = creneauxRecr[crenDetails];
                const recrName = crenDetail['recruteurName'];

                // console.log(recrName)
                // console.log(this.recruteurName)                
                
                if(recrName==this.recruteurName) {

                    calendar.push(crenDetail)

                };
            };
        };

        //console.log(calendar)

        calendar.forEach(element => {
            
            document.querySelector('#calendarRecr').innerHTML +=`
                <li id="creneau_${this.recrID}" class="creneauRecruteur"><b>${element.time}</b> - Entretien pour le poste : <b>${element.positionName}</b></li>
            `;

        });

    };



};