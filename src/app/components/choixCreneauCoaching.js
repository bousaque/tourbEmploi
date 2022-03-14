import { getDatabase , ref , get , orderByChild , query , equalTo } from 'firebase/database';

import { ReservationCoaching } from "../features/reservationCoaching";

export class ChoixCreneauxCoaching {
    
    constructor(userId, fName) {
        
        this.userId = userId;
        this.fName = fName;
        
        this.initUI();
        
        
    };
    
    async initUI() {
        
        /**
         * NaN. (Existence virtuelle d'un répertoire créneauxCoaching dans RTDB)
         * 
         * 0. Vérifier la quantité d'userID dans le créneau, si <35 ok
         * 1. Récupérer un tableau des disponibilités coaching (+35/créneau -> quasi jamais plein)
         * 2. Récupérer un tableau des créneaux user pris
         * 2'. Fusionner coaching et creneaux en un seul objet
         * 3. Comparer les deux, là oû un creneaux a déjà un ID -> pas dispo
         * 4. Afficher le résultat chronologiquement -> soit rien, soit entretien, soit coaching
         * 5. Sur les plages dispo seulement, ajouter un eventListener relié à la prise de créneaux
         * 6. Faire s'enregistrer la prise du créneau coaching dans RTDB
         * 7. Afficher le nouveau créneau dans la liste principale d'EspaceCandidat
         */
        
        //0.//

        const snapshotCoachingMax = await get( query( ref( getDatabase() , "coaching") ) );
        const coachingMax = snapshotCoachingMax.val(); //= Tous les créneaux coaching


        //0.a// Tous les time dans un []
        let coachingTableau = [];
        for (const key in coachingMax) {
            
            if (Object.hasOwnProperty.call(coachingMax, key)) {
                
                const creneau = coachingMax[key];
                coachingTableau.push(creneau.time); // coachingTableau = (3) ['16h45-17h00', '16h45-17h00', '14h45-15h00']
                
            };
        };
        
        //0.b// Comptage de chaque time par créneau
        const counts = {};
        coachingTableau.forEach( (time) => {

          counts[time] = (counts[time] || 0) + 1; // counts = [16h45-17h00: 2, 14h45-15h00: 1]

        });
        
        //0.c// Détection des créneaux qui atteignent ou dépassent 35 réservations et stockage dans un tableau
        let tableauMax = [];
        let timeOut = [];
        for (const [time , count] of Object.entries(counts) ) {

            const count = counts[time]
            // console.log(time); //= 16h45-17h00 14h45-15h00
            // console.log(count); //= 3 1
            
            //console.log('count>=35 = '+(count>=35));

            if (count>=35) {

                tableauMax.push([time , count])
                timeOut.push(time);
                
            }
            
        };

        // console.log(tableauMax)
        // console.log(timeOut)

        

        //1.//
        const snapshotCoaching = await get( query( ref( getDatabase() , "coaching" ) , orderByChild('userID') , equalTo(this.userId) ) );
        const coaching = snapshotCoaching.val(); //={-MuQ776x2MWJy12v9NFb: {…}} ou ''

        //console.log(coaching)

        //2.//
        const snapshotCreneaux = await get( query( ref( getDatabase() , "creneaux" ) , orderByChild('userID') , equalTo(this.userId) ) );
        const creneaux = snapshotCreneaux.val(); //={-MuQ776x2MWJy12v9NFb: {…}, -MuUutQYe4yl2lqagIRy: {…}}
        
        //2'.//
        
        const creneauxPleins = []; 
        for (const key in creneaux) {
            
            if (Object.hasOwnProperty.call(creneaux, key)) {
                
                const creneau = creneaux[key];
                creneauxPleins.push(creneau); //= [0: {offreID: '003', positionName:...} 1: {offreID:...}]
                
            };
        };
        
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
        

        //3.//
        let tableauUnavailable = [];
        for (let index = 0; index < repertoire.length; index++) {
            
            const element = repertoire[index]; // Récupération des créneaux pris par le userID
            
            const pris = creneauxPleins.find( c => c.time === element.time); // Récupération des offres déjà prises pour ce créneau
            
            //console.log(element); //= {time: '15h45-16h00', userID: 'hOOsv8GD97R2yjCjcZz5cpbmKKH3'} x nbCréneaux
            //console.log(pris); //= {offreID: '001', positionName: 'Coursier', recruteurLogo: …} x nbCréneaux
            
            if( pris ) {
                
                /**
                 * Comparaison des deux objets, si une offre existe déjà sur ce créneau pour ce userID alors
                 * on assigne à ce créneau le userID du user courant dans son tableau de créneaux.
                 * */ 

                let prisUserID = pris.userID;
                let elementUserID = element.userID;

                elementUserID += prisUserID

                tableauUnavailable.push(element.time);

                //console.log(element.time); //= 14h45-15h00 , 15h45-16h00 , 16h15-16h30 -> les créneaux déjà pris du userID
                //console.log(tableauUnavailable); //= 3 x ['14h45-15h00', '15h45-16h00', '16h15-16h30'] -> le tableau de ces element.time
            };
        };
        


        //4.//
        for (let index = 0; index < repertoire.length; index++) {

            const element = repertoire[index];

            //console.log(element.time) //= Tous les créneaux du répertoire
            //console.log(timeOut.includes(element.time)) //= 15 x false , 1 x true -> OK
            //console.log(tableauUnavailable.includes(element.time)) //= 13 x false , 3 x true -> OK
                //console.log(tableauUnavailable.includes(element.time) != null) //= 16 x true -> pas OK
            //console.log(tableauUnavailable.includes(element.time) != '') //= 13 x false , 3 x true -> OK

            document.querySelector('#listeCreneaux').innerHTML += `
                <li class="${tableauUnavailable.includes(element.time) != '' && coaching != '' || timeOut.includes(element.time) ?  'occupay' : 'libre'}" id="coaching_${element.time}">

                    ${element.time} : ${tableauUnavailable.includes(element.time) != '' && coaching != '' || timeOut.includes(element.time) ? '(Entretien)' : "Réserver"}

                </li>
            `;
        };

        
        //5.//
        const ul = document.querySelector('ul');
        ul.addEventListener('click', ($event) => {

            const liCoaching = $event.target.closest('li'); //...et on vise un type 'li'
            //console.log(liCoaching); //= <li id="offre-003">offre003</li>           
                    
            const id = liCoaching.id; //On target l'id de chaque offre
            //console.log(id); //= offre-003
                    
            this.coachingChoisi = id.split('_')[1]; //On coupe le string id au niveau du '-' et la deuxième partie[1] on l'appelle key
            // console.log( this.creneauChoisi)

            if (liCoaching.classList.contains('libre') ) {
                    
                console.log(`Cliqué sur ${this.coachingChoisi}`)
                new ReservationCoaching(this.userId , this.fName , this.coachingChoisi , this.offreID);

            };
                
                        
        });


    };



};