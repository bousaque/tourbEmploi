import { ReservationCreneau } from "../features/reservationCreneau";

import { getDatabase , get, ref } from "firebase/database";


export class ChoixCreneaux {

    constructor(userId, fName, recruteurID , offreID , logoRecruteur , recruteurName, positionName) {


        this.userId = userId;
        this.fName = fName;        
        this.recruteurID = recruteurID; //= offre ID
        this.offreID = offreID; //= recruteur ID
        this.logoRecruteur = logoRecruteur;
        this.recruteurName = recruteurName;
        this.positionName = positionName;
        this.creneauChoisi = '';


        // console.log(this.userId)
        // console.log(this.fName)
        // console.log(`this.recruteurID = ${this.recruteurID}`)
        // console.log(this.offreID)
        // console.log(this.logoRecruteur)
        // console.log(this.recruteurName)
        // console.log(this.positionName)
        // console.log(this.creneauChoisi)

        this.initUI();

        
    };

    async initUI() {

        //1.a Récupérer le nombre d'entretiens que le recruteur veut en même temps -> number
        const dbRefRecr = ref( getDatabase() , `recruteurs/${this.recruteurID}/` );
        const recrSnap = await get( dbRefRecr );
        const recruteur = recrSnap.val();

        console.log(recruteur)
        //console.log(recruteur.parallelITW)

        //1.b Vérifier le nombre d'entretiens que le recruteur a déjà sur ce créneau -> [N x number]

        //1.c Comparer et mettre les créneaux déjà pleins dans un tableau

        //1.d Fusionner le tableau des créneaux du recruteurs déjà pleins avec le tableau 2. des créneaux candidats déjà pleins




        //2. Récupérer les créneaux pleins et les mettre dans un tableau
        const refCren = ref( getDatabase() , `creneaux/${this.userId}` );
        const snapshot = await get( refCren );
        const creneaux = snapshot.val();
        console.log(creneaux);
        
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
            <li class="${element.userID ? 'occupay' : 'libre'}" id="creneau-${element.time}">${element.time} : ${element.userID ? 'Pas disponible' : 'Disponible'}</li>
            `;

        };


        
        //attraper l'id du créneau sélectionné
        const ul = document.querySelector('#offreCreneauxAgendaBOX');
        ul.addEventListener('click', ($event) => {
            $event.stopPropagation();

            console.log('in Square listner')

            const liOffre = $event.target.closest('li'); 
            //console.log(liOffre); //= <li id="offre-003">offre003</li>           
            if(!liOffre)   {
                return;
            }    
            const id = liOffre.id; //On target l'id de chaque offre
            //console.log(id); //= offre-003
                    
            this.creneauChoisi = id.split('-')[1]; 
            // console.log( this.creneauChoisi)

            console.log(this.logoRecruteur)

            if (liOffre.classList.contains('libre') ) {

                new ReservationCreneau(this.userId , this.creneauChoisi, this.recruteurID , this.fName , this.offreID , this.logoRecruteur , this.recruteurName , this.positionName);

            };
                
                        
        });

    };

};