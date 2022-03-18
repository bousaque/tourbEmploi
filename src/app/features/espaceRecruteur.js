import { get , child , ref , getDatabase } from "firebase/database";
import { getStorage, ref as refS , uploadBytes , uploadBytesResumable , getDownloadURL } from "firebase/storage";


import { Button } from "../components/button";
import { ModifyPen } from "../components/modifyPen";
import { AddOfferRECR } from "../components/addOfferRECR";
import { OffreRecruteurRECR } from "./offreRecruteurRECR";
import { ModifyHeadersRecr } from "../components/modifyHeadersRecr";



export class EspaceRecruteur {

    constructor(recrID) {

        this.recrID = recrID; 
        this.inputVALUE = '';   
        this.inputValueName = '';    
        
        this.dbRef = ref( getDatabase() );
        this.initUI();        
        this.addRecruteurHeaders().then( ()=> {
             this.addButtons()
            
            //this.addRecruteurOffres();
            //this.addSquareListener();
        });



    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML = `
        <div id="espaRecrBOX">
            <div id="offreHeader"></div>
            <div id="recruteurWeb"></div>
            <div id="addOfferRECR"></div>
            <ul id="recruteurOffres"></ul>
        </div>
        `;

    };
    
    async addRecruteurHeaders() {
        
        
        //console.log(this.splittedID);    
        //Async/await sur le recruteur, l'objet-réponse est dans snapshotRecruteur
        const snapshotRecruteur = await get( child( this.dbRef , `recruteurs/${this.recrID}`) );
        
        const recruteur = snapshotRecruteur.val();

        console.log(recruteur);
        
        //LOGO + WEBSITE
        const logoRecruteur = recruteur.recruteurLogo;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteur.recruteurName;
        
        
        const websiteURL = recruteur.adresseWeb;
        
        // //CHAINE YT + LOGO YT
        // const webtvAdresse = recruteur.adresseWebTV;
        // const webtvLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FyoutubeLogo.svg?alt=media&token=57fdaedb-4977-43ea-9d98-308a7d482e3f";
        
        // //LINKEDIN + LOGO
        // const linkedinAdresse = recruteur.adresseLinkedIn;
        // const linkedinLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FlinkedinLogo.svg?alt=media&token=1122fa2d-100a-4fe6-95fd-2c0ab3e5408e";
        
        // //FACEBOOK + LOGO
        // const facebookAdresse = recruteur.adresseFacebook;
        // const facebookLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FfacebookLogo.svg?alt=media&token=ab738520-5db8-4b92-9e36-633e5a96f5b8";
        
        // //INSTAGRAM + LOGO
        // const instagramAdresse = recruteur.adresseInstagram;
        // const instagramLogo = "https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FinstagramLogo.svg?alt=media&token=07bded61-68d5-4f0a-934f-9320e80a4f08";
        
        // //IFRAME YOUTUBE
        // const urlVideoFront = recruteur.adresseVideoFront;
        // //console.log(urlVideoFront==true)
        // if (urlVideoFront) {
            
        //     const stringIdFromURL = urlVideoFront.split("v=")[1];

        // };
        
        
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
        


        // //CHAINE YT + LOGO YT
        // if(webtvAdresse) { 

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="ytRecrBOX">
        //         <a href="${webtvAdresse}" target="_blank">
        //             <img class="resSoc" src="${webtvLogo}" alt="LogoYT"/>
        //         </a>
        //         <div id="modifyYtRecr"></div>
        //     </div>
        //     `;

        // } else {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="ytRecrBOX">
        //         <img class="resSoc" src="${webtvLogo}" alt="LogoYT"/>
        //         <div id="modifyYtRecr"></div>
        //     </div>
        //     `;

        // };
        
        // //LINKEDIN + LOGO
        // if(linkedinAdresse) {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="linkedInRecrBOX">
        //         <a href="${linkedinAdresse}" target="_blank">
        //             <img class="resSoc" src="${linkedinLogo}" alt="LogoLKND"/>
        //         </a>
        //         <div id="modifyLinkedInRecr"></div>
        //     </div>
        //     `;

        // } else {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="linkedInRecrBOX">
        //         <img class="resSoc" src="${linkedinLogo}" alt="LogoLKND"/>
        //         <div id="modifyLinkedInRecr"></div>
        //     </div>
        //     `;

        // };
        
        // //FACEBOOK + LOGO
        // if(facebookAdresse) {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="fbRecrBOX">
        //         <a href="${facebookAdresse}" target="_blank">
        //             <img class="resSoc" src="${facebookLogo}" alt="LogoFCBK"/>
        //         </a>
        //         <div id="modifyFbRecr"></div>
        //     </div>
        //     `;

        // } else {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="fbRecrBOX">
        //         <img class="resSoc" src="${facebookLogo}" alt="LogoFCBK"/>
        //         <div id="modifyFbRecr"></div>
        //     </div>
        //     `;

        // };
        
        // //INSTAGRAM + LOGO
        // if(instagramAdresse) {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="instaRecrBOX">
        //         <a href="${instagramAdresse}" target="_blank">
        //             <img class="resSoc" src="${instagramLogo}" alt="LogoINSTA"/>
        //         </a>
        //         <div id="modifyInstaRecr"></div>
        //     </div>
        //     `;

        // } else {

        //     document.querySelector('#recruteurLinks').innerHTML +=`
        //     <div id="instaRecrBOX">
        //         <img class="resSoc" src="${instagramLogo}" alt="LogoINSTA"/>
        //         <div id="modifyInstaRecr"></div>
        //     </div>
        //     `;

        // };
        
        // //IFRAME YOUTUBE
        // if(urlVideoFront) {

        //     document.querySelector('#videoFront').innerHTML = `
        //     <div id="YtVidFRecrBOX">
        //         <iframe width="520" height="415" src="https://www.youtube.com/embed/${stringIdFromURL}?showinfo=0&controls=2&mute=1&autoplay=0&rel=0">
        //         </iframe>
        //         <div id="modifyYtVidRecr"></div>
        //     </div>
        //     `;

        // } else {

        //     document.querySelector('#videoFront').innerHTML = `
        //     <div id="YtVidFRecrBOX">
        //         <img id="replacementYT" src="${instagramLogo}" alt="LogoINSTA"/>
        //         <div id="modifyYtVidRecr"></div>
        //     </div>
        //     `;

        // };
        
    };

    addButtons() {

        
        new Button( document.querySelector('#addOfferRECR') , 'Ajouter une offre' , () => {

            new AddOfferRECR();

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
                
                console.log(inputVALUE);

                fileChosen.innerHTML = inputVALUE.name;
                this.inputValueName = inputVALUE.name;
                this.inputVALUE = inputVALUE;
            });
                
            this.addButtonInButton();
            
        });


        // new Button( document.querySelector('#modifyYtRecr') , 'Modifier' , () => {

        //     new ModifyHeadersRecr();

        // });

        // new Button( document.querySelector('#modifyLinkedInRecr') , 'Modifier' , () => {

        //     new ModifyHeadersRecr();

        // });

        // new Button( document.querySelector('#modifyFbRecr') , 'Modifier' , () => {

        //     new ModifyHeadersRecr();

        // });

        // new Button( document.querySelector('#modifyInstaRecr') , 'Modifier' , () => {

        //     new ModifyHeadersRecr();
        

        // });

        // new Button( document.querySelector('#modifyYtVidRecr') , 'Modifier' , () => {

        //     new ModifyHeadersRecr();

        // });
    };

    addButtonInButton() {

        new Button( document.querySelector('#modifySUBMIT') , 'Envoyer' , async () => {

            
            //1. Upload in Storage
            
            const storage = getStorage();
            const createStorageRef = refS( storage , `recruteurs_media/logos_recruteurs/${this.recrID}` + this.inputValueName );
                        
            const uploadIMG = await uploadBytes( createStorageRef , this.inputVALUE );

            console.log(this.inputValueName);

            //2. Write in rtdb

            //3. Render HTML

        });

    };

    async addRecruteurOffres() {


        const recruteurID = this.splittedID;
        //console.log(recruteurID)

        const refDbOffres = ref( getDatabase(), "offres" );
        const snapshotOffres = await get( query( refDbOffres , orderByChild('recruteurId') , equalTo(`${recruteurID}`) ) );
        const offres = snapshotOffres.val();

        
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