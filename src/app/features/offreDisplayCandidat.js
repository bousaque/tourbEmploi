
import { getDatabase , get, ref , child } from "firebase/database"

import { Button } from "../components/button";
import { EspaceCandidatOffres } from "./espaceCandidatOffres";

//PDFJSWorker
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = PDFJSWorker;


export class OffreDisplayCandidat {

    constructor(key) {

        this.key = key;
            //Idéalement l'id de l'offre...
        this.initUI();
        this.addButtons();

        const dbRef = ref( getDatabase() );

        get( child ( dbRef , `offres/` + this.key ) )
        //dbRef va chercher la DB dans FireBase et offres c'est le nom du noeud
        .then(
            (snapshot) => {

                console.log(key)

                const offre = snapshot.val();
                
                document.querySelector('#recruteurName').innerHTML = `${offre.recruteur}`;
                

                get( child( dbRef , `recruteurs/` + offre.recruteurId) )
                .then( (snapshot) => {
                    
                    const recruteur = snapshot.val();
                    const logoRecruteur = recruteur.recruteurLogo;
                    const urlVideoFront = recruteur.adresseVideoFront;
                    const websiteURL = recruteur.adresseWeb;
                    const stringIdFromURL = urlVideoFront.split("v=")[1];
                    console.log(stringIdFromURL);
                        
                    document.querySelector('#recruteurLinks').innerHTML =`<a href="${websiteURL}">
                    <img id="logoRecruteur" src="${logoRecruteur}" alt="LogoEntreprise"/>
                    </a>
                    `;
                    document.querySelector('#videoFront').innerHTML = `<iframe width="520" height="415" src="https://www.youtube.com/embed/${stringIdFromURL}?autoplay=1&mute=1"></iframe>`;
    
                });
                
                //console.log(snapshot.child(`${this.key}`).child(`recruteur`).val()); //=Fondation Partage
                
            });
            

    };

    initUI() {

        console.log(this.key);
        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="offreHeader">
            <span id="recruteurName"></span>
            <div id="recruteurLinks"></div>
            <div id="videoFront"></div>
        </div>
        `;

    };

    addButtons() {
    
        const buttonBackOffres = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new EspaceCandidatOffres(this.user);
    
        });
    
    };

    

};