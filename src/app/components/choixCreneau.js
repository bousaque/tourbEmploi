import { ReservationCreneau } from "../features/reservationCreneau";

import { getDatabase , get, ref , orderByChild, equalTo, query } from "firebase/database";


export class ChoixCreneaux {

    constructor(userId, fName, splittedID , splittedLI , logoRecruteur , recruteurName, positionName) {


        this.userId = userId;
        this.fName = fName;        
        this.splittedID = splittedID; //= offre ID
        this.splittedLI = splittedLI; //= recruteur ID
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteurName;
        this.positionName = positionName;
        this.creneauChoisi = '';


        // console.log(this.userId)
        // console.log(this.fName)
        // console.log(this.splittedID)
        // console.log(this.splittedLI)
        // console.log(this.logoRecruteur)
        // console.log(this.recruteurName)
        console.log(this.positionName)
        // console.log(this.creneauChoisi)

        this.initUI();

        
    };

    async initUI() {

        const snapshot = await get( query( ref( getDatabase() , "creneaux" ) , orderByChild('offreID') , equalTo(this.splittedID) ) );
        const creneaux = snapshot.val();
        
        //constitution du tableau des créneaux déjà pris, donc ceux qui ont un ID dans RTDB
        const creneauxPleins = [];
        for (const key in creneaux) {
            
            if (Object.hasOwnProperty.call(creneaux, key)) {

                const creneau = creneaux[key];
                creneauxPleins.push(creneau);
                
            };
        };
        
        //définition du total des créneaux
        const repertoire = [
                
            {time:'14h00-14h15'},
            {time:'14h15-14h30'},
            {time:'14h30-14h45'},
            {time:'14h45-15h00'},
            {time:'15h00-15h15'},
            {time:'15h15-15h30'},
            {time:'15h30-15h45'}, 
            {time:'15h45-16h00'},
            {time:'16h00-16h15'},
            {time:'16h15-16h30'},
            {time:'16h30-16h45'}, 
            {time:'16h45-17h00'},
            {time:'17h00-17h15'},
            {time:'17h15-17h30'},
            {time:'17h30-17h45'},
            {time:'17h45-18h00'},
        
        ];

        //comparaison entre tableau vide et celui plein, on met Disponible partout ou il n'y a pas d'ID dans RTDB
        for (let index = 0; index < repertoire.length; index++) {
            const element = repertoire[index];
            
            const pris = creneauxPleins.find( c => c.time === element.time);
            if(pris) {
                element.userID = pris.userID;
            };

        };

        //affichage
        for (let index = 0; index < repertoire.length; index++) {
            const element = repertoire[index];
            
            //console.log(document);
            
            document.getElementById('offreCreneauxAgendaBOX').innerHTML +=`
            <li class="${element.userID ? '' : 'libre'}" id="creneau_${element.time}">${element.time} : ${element.userID ? 'Pas disponible' : 'Disponible'}</li>
            `;

        };


        
        //attraper l'id du créneau sélectionné
        const ul = document.querySelector('ul');
        ul.addEventListener('click', ($event) => {

            const liOffre = $event.target.closest('li'); 
            //console.log(liOffre); //= <li id="offre-003">offre003</li>           
                    
            const id = liOffre.id; //On target l'id de chaque offre
            //console.log(id); //= offre-003
                    
            this.creneauChoisi = id.split('_')[1]; 
            // console.log( this.creneauChoisi)

            console.log(this.logoRecruteur)

            if (liOffre.classList.contains('libre') ) {

                new ReservationCreneau(this.userId , this.creneauChoisi, this.splittedID , this.fName , this.splittedLI , this.logoRecruteur , this.recruteurName , this.positionName);

            };
                
                        
        });

    };

};