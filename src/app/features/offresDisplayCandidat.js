//FireBase Import
import { getDatabase , get, ref , child , query , orderByChild , equalTo } from "firebase/database";

//Own
import { Button } from "../components/button";
import { EspaceCandidatOffres } from "./espaceCandidatOffres";
import { OffreRecruteur } from "./offreRecruteur";


export class OffreDisplayCandidat {


    constructor( splittedID , userId , fName ) {

        this.splittedID = splittedID; //= ID du recruteur
        this.userId = userId;
        this.fName = fName;
        this.logoRecruteur = '';
        this.recruteurName = '';
        this.positionName = '';

        // console.log(this.splittedID)
        // console.log(this.userId)
        // console.log(this.fName)
        // console.log(this.logoRecruteur)
        // console.log(this.recruteurName)
        // console.log(this.positionName)

        this.initUI();
        this.addButtons();
        this.addRecruteurHeaders();
        this.addRecruteurOffres();
        this.addSquareListener();

    };

    initUI() {

        //console.log(this.key);
        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="offreHeader">
            <div id="recruteurHead">
                <div id="recruteurWeb"></div>
                <div id="recruteurLinks"></div>
            </div>
            <div id="videoFront"></div>
        </div>
        <ul id="recruteurOffres"></ul>
        `;

    };

    addButtons() {
    
        const buttonBackOffres = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            // console.log(this.userId)
            // console.log(this.fName)
            // console.log(this.splittedID)
            //Reprend l'objet précédent
            new EspaceCandidatOffres( this.userId, this.fName );
    
        });
    
    };
    
    async addRecruteurHeaders() {
        
        const dbRef = ref( getDatabase() );

        //console.log(this.splittedID);    
        //Async/await sur le recruteur, l'objet-réponse est dans snapshotRecruteur
        const snapshotRecruteur = await get( child( dbRef , `recruteurs/` + this.splittedID) );

        const recruteur = snapshotRecruteur.val();

        //LOGO + WEBSITE
        const logoRecruteur = recruteur.recruteurLogo;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteur.recruteurName;


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
        document.querySelector('#recruteurWeb').innerHTML =`
        <a href="${websiteURL}" target="_blank">
        <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise""/>
        </a>
        `;
        
        //CHAINE YT + LOGO YT
        document.querySelector('#recruteurLinks').innerHTML +=`
        <a href="${webtvAdresse}" target="_blank">
        <img class="resSoc" src="${webtvLogo}" alt="LogoEntreprise"/>
        </a>
        `;
        
        //LINKEDIN + LOGO
        document.querySelector('#recruteurLinks').innerHTML +=`
        <a href="${linkedinAdresse}" target="_blank">
        <img class="resSoc" src="${linkedinLogo}" alt="LogoEntreprise"/>
        </a>
        `;
        
        //FACEBOOK + LOGO
        document.querySelector('#recruteurLinks').innerHTML +=`
        <a href="${facebookAdresse}" target="_blank">
        <img class="resSoc" src="${facebookLogo}" alt="LogoEntreprise"/>
        </a>
        `;
        
        //INSTAGRAM + LOGO
        document.querySelector('#recruteurLinks').innerHTML +=`
        <a href="${instagramAdresse}" target="_blank">
        <img class="resSoc" src="${instagramLogo}" alt="LogoEntreprise"/>
        </a>
        `;
        
        //IFRAME YOUTUBE
        document.querySelector('#videoFront').innerHTML = `
        <iframe width="520" height="415" src="https://www.youtube.com/embed/${stringIdFromURL}?showinfo=0&controls=2&mute=1&autoplay=0&rel=0">
        </iframe>
        `;

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

            
            new OffreRecruteur(splittedLI, this.splittedID , this.offrePDF , this.userId , this.fName , this.logoRecruteur , this.recruteurName);
            document.querySelector('#videoFront').classList.add('displayNone');                          
        });
    
    };
};