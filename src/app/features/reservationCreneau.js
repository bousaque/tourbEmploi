import { getDatabase , ref , child , update , push , get } from 'firebase/database';

import { Button } from '../components/button';
import { OffreDisplayCandidat } from './offresDisplayCandidat';
import { EspaceCandidat } from './espaceCandidat';

export class ReservationCreneau {

    constructor(userId, creneauChoisi , splittedID , fName , splittedLI , logoRecruteur , recruteurName , positionName) {

        this.userId = userId;
        this.fName = fName;
        this.creneauChoisi = creneauChoisi;
        this.splittedID = splittedID;
        this.splittedLI = splittedLI;
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteurName;
        this.positionName = positionName;

        console.log(this.logoRecruteur)
        // console.log(this.userId)
        // console.log(this.fName)
        // console.log(this.creneauChoisi)
        // console.log(this.splittedID)
        // console.log(this.splittedLI)
        // console.log(this.logoRecruteur)
        // console.log(this.recruteurName)
        // console.log(this.positionName)


        this.initUI();
        this.addLogoRecruteur();
        this.addButtons();

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="priseCreneau">
            <div id="logoRecruteurConf"></div>
            <div id="nameRecruteur">${this.recruteurName} : ${this.positionName}</div>
            <div id="creneauReserver">Créneau : ${this.creneauChoisi}</div>
            <div id="boutonReserverCreneau"></div>
        </div>
        `;

    };

    addLogoRecruteur() {

        document.querySelector('#logoRecruteurConf').innerHTML =`
        <img id="logoRecrIN" src="${this.logoRecruteur}" alt="Logo Recruteur"/>
        `;

    };

    addButtons() {
    
        const buttonBackDisplayOffres = new Button( document.querySelector('#buttonBack') , 'Retour' , () => {

            new OffreDisplayCandidat(this.splittedID , this.userId , this.fName);
    
        });

        const buttonReserverCreneau = new Button( document.querySelector('#boutonReserverCreneau') , 'Réserver ce créneau' , async () => {

            //On va prendre l'id de l'utilisateur et le push dans RTDB, de sorte qu'à la place de '' on aie l'id de l'utilisateur

            const refDB = ref(getDatabase());
            const newCreneauKey = push(child(refDB , 'creneaux')).key;
            const newCreneauDB = {

                'offreID':this.splittedID ,
                'time':this.creneauChoisi , 
                'userID':this.userId ,
                'recruteurName':this.recruteurName ,
                'positionName':this.positionName ,
                'recruteurLogo': this.recruteurLogo ,


            };
            
            const updates = {};
            updates['/creneaux/' + newCreneauKey ] = newCreneauDB;
            //!!! Passer offreID au lieu de userId parce qu'on veut offre & user, recruteur on le trouve via l'offre
          
            await update( refDB, updates );

            //console.log(this.userId )
            document.querySelector('#bodyApp').innerHTML = `
                <h2 id="successMessage">
                    Vous avez réservé le créneau de ${this.creneauChoisi} pour l'offre ${this.splittedID} de ${this.positionName} chez ${this.recruteurName}. 
                <br>
                    Vous allez la retrouver dans le calendrier de votre Espace Candidat, qui va se charger dans un bref instant. 
                </h2>
                `;
                
                const snapshot = await get( child ( refDB , `users/${this.userId }` ) );
                const user = snapshot.val();
                //console.log(user)

            setTimeout(() => {

                document.querySelector('#bodyApp').innerHTML = '';
            
            new EspaceCandidat( this.userId , user.fName );

            this.fName = user.fName;
            //console.log(this.fName);

            } , 3500); 

        });
    
    };


};