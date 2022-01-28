import { getDatabase , ref , child , update , push , get } from 'firebase/database';

import { Button } from '../components/button';
import { OffreDisplayCandidat } from './offreDisplayCandidat';
import { EspaceCandidat } from './espaceCandidat';

export class ReservationCreneau {

    constructor(userId, creneauChoisi , offreID , recruteurId , recruteurLogo , recruteurName , positionName) {

        this.creneauChoisi = creneauChoisi;
        this.offreID = offreID;
        this.recruteurId = recruteurId;
        this.recruteurLogo = recruteurLogo;
        this.recruteurName = recruteurName;
        this.positionName = positionName;

        this.userId = userId;
        this.fName = this.fName;

        // console.log('Créneau choisi = '+this.creneauChoisi);
        // console.log('Recruteur ID = '+this.recruteurId);
        // console.log('Offre ID = '+this.offreID);
        // console.log('Recruteur Logo URL = '+this.recruteurLogo);

        this.initUI();
        this.addButtons();
        this.addLogoRecruteur();

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="logoRecruteurConf"></div>
        <div id="">${this.recruteurName} : ${this.positionName}</div>
        <div id="creneauReserver">Créneau : ${this.creneauChoisi}</div>
        <div id="boutonReserverCreneau"></div>
        `;

    };

    addButtons() {
    
        const buttonBackDisplayOffres = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            //console.log('Bouton Retour pressé');
            //Reprend l'objet précédent
            new OffreDisplayCandidat(this.offreID , this.userId , this.fName);
    
        });

        const buttonReserverCreneau = new Button(document.querySelector('#boutonReserverCreneau') , 'Réserver ce créneau' , async () => {

            //On va prendre l'id de l'utilisateur et le push dans RTDB, de sorte qu'à la place de '' on aie l'id de l'utilisateur

            const refDB = ref(getDatabase());
            const newCreneauKey = push(child(refDB , 'creneaux')).key;
            const newCreneauDB = {

                'offreID':this.offreID ,
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
                    Vous avez réservé le créneau de ${this.creneauChoisi} pour l'offre ${this.offreID} de ${this.positionName} chez ${this.recruteurName}. 
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

    addLogoRecruteur() {

        document.querySelector('#logoRecruteurConf').innerHTML =`
        <img src="${this.recruteurLogo}" alt="Logo Recruteur"/>
        `;

    };

};