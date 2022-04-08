import { getDatabase, ref , get , orderByChild , query , equalTo } from "firebase/database";

import { EspaceCandidatOffres } from "./espaceCandidatOffres";
import { EspaceCoaching } from "./espaceCoaching";
import { Button } from "../components/button";

export class EspaceCandidat {

    constructor( userId , fName ) {

        this.userId = userId;
        this.fName = fName;

        // console.log(this.userId)
        // console.log(this.fName)

        this.initUI();
        this.addFname();
        this.addButtons();
        this.addListeCreneaux();
        
        
    };
    
    initUI() {
        
        document.querySelector('#bodyApp').innerHTML =`
        <div id="espaceCandidatHTML">
            <div>
                <div id="buttonOffresHTML""></div>
                <div id="buttonCoachingHTML"></div>
            </div>
            <div id="candidatAccueil">
                <h2>Vous êtes connecté à votre Espace Candidat en tant que <span id="userName"></span>!</h2>
            </div>
            <div id="candidatCalendrierHTML">
                <h3 id="calTxt">Votre calendrier de rendez-vous :</h3>
                <ul id="ListeCreneauxHTML"></ul>
            </div>
        </div>
        `;
    };

    addFname() {

        //console.log(this.fName)
        document.querySelector('#userName').innerHTML = this.fName;

    };

    async addButtons() {

        
        // const snapshotCoaching = await get( query( ref( getDatabase() , "coaching" ) , orderByChild('userID') , equalTo(this.userId) ) );
        // const coaching = snapshotCoaching.val(); //={-MuQ776x2MWJy12v9NFb: {…}} ou ''

        const dbRefCoaching = ref( getDatabase() , `coaching/${this.userId}/` );
        const snapCoach = await get( dbRefCoaching );
        const coaching = snapCoach.val();

        const dbRefCren = ref( getDatabase() , `creneaux/${this.userId}/` )
        const snapshotCreneaux = await get( dbRefCren );
        const creneaux = snapshotCreneaux.val();
        
        // console.log(creneaux)
        // console.log(coaching)
        

        let creneauEach = [];
        for (const creneau in creneaux) {
            if (Object.hasOwnProperty.call(creneaux, creneau)) {
                const creneauDetails = creneaux[creneau];

                for (const key in creneauDetails) {
                    if (Object.hasOwnProperty.call(creneauDetails, key)) {
                        const element = creneauDetails[key];
                        
                        if(key === 'recruteurName') {
                            creneauEach.push(key);
                        };
                    };
                };   
            };
        };

        //console.log(creneauEach.length<=4);

        switch (true) {

            case (creneauEach.length<=4):

                const buttonOffres = new Button(document.querySelector('#buttonOffresHTML') , 'Vers les Offres' , () => {
                
                    //console.log('Bouton Offres pressé');
                    //new ListOffres{} -> new PageRecruteur{} -> new Offre{}
                    document.querySelector('#bodyApp').innerHTML = '';
                    new EspaceCandidatOffres(this.userId , this.fName);
                
                });
                break;
            
            default:

                document.querySelector('#buttonOffresHTML').innerHTML = `
                <div id="messageCreneauxTooMuch">
                    Vous ne pouvez pas réserver plus de 4 entretiens
                </div>
                `;
        };
        

        
        //console.log('!coaching = '+!coaching)
        //console.log(!(!creneaux))
        
        //console.log('!coaching && creneaux = '(!coaching && creneaux == true))
        // console.log('!creneaux && !coaching = '+(!creneaux && !coaching))
        // console.log('coaching ='+(coaching==true))

        
        switch (true) {

            case (!coaching && !(!creneaux)):
                
                //console.log('!coaching && !(!creneaux)');
                const buttonCoaching = new Button(document.querySelector('#buttonCoachingHTML') , 'Demande de Coaching' , () => {
        
                    //new ExplicationsCoaching{} -> new Coaching{}
                    document.querySelector('#bodyApp').innerHTML = '';
                    new EspaceCoaching(this.userId , this.fName);
        
                });
                break;
                
            case ( !coaching && !creneaux):
                    
                //console.log('!creneaux && !coaching');
                document.querySelector('#buttonCoachingHTML').innerHTML =`
                <div id="messageNoCreneaux">
                (Vous ne pouvez réserver votre séance de coaching<br/>qu'après avoir réservé au moins un entretien)
                </div>
                `;
                break;
                    
            case (!(!coaching) && !(!creneaux)):
                        
                //console.log('!(!coaching) && !(!creneaux)');
                document.querySelector('#buttonCoachingHTML').innerHTML =`
                <div id="messageCoachingAlready">
                (Vous avez déjà réservé une séance de coaching)
                </div>
                `;
                break;
                        
        };
                

            


    };

    async addListeCreneaux() {


        /*
        Requête tendant à choper les créneaux, ordrés par userID et dans lesquels il y a bien un userID
        */
        const refDbCreneaux = ref( getDatabase() , `creneaux/${this.userId}/` );
        const snapshotUser = await get( refDbCreneaux );
        const idCandidatOBJ = snapshotUser.val();
        
        //console.log(idCandidatOBJ)

        
        /*
        Collecte des créneaux choisis par l'utilisateur et transformation en tableau
        */
       let offreList = [];        
       for (const offreID in idCandidatOBJ) {
           
           
           if (Object.hasOwnProperty.call(idCandidatOBJ, offreID)) {
               
               const keyReservationOBJ = idCandidatOBJ[offreID];
               offreList.push(keyReservationOBJ);
               
               console.log('offreID = '+offreID)
            //    console.log('idCandidatOBJ = '+idCandidatOBJ)
            //    console.log('keyReservationOBJ = '+keyReservationOBJ)
            };
        };
        console.log(offreList)

        /*
        Rendu <li> des créneaux
        */
       
       offreList.forEach( creneauPris => {
           

        if (creneauPris.offreID) {

            document.querySelector('#ListeCreneauxHTML').innerHTML +=`
            <li id="vignetteCreneauLI">
             <div id="vignetteCreneauDIV">
                <div>
                    <p id="entretien">Entretien</p><br/>
                    <span><span id="horaire">Horaire créneau</span> : ${creneauPris.time}</span><br/>
                    <span><span id="entreprise">Entreprise</span> :  ${creneauPris.recruteurName}</span><br/>
                    <span><span id="poste">Position</span> :  ${creneauPris.positionName}</span><br/>
                    <span><span id="reference">Référence offre</span> : ${creneauPris.offreID}</span><br/>
                </div>
                <img src="${creneauPris.recruteurLogo}" alt="Logo Recruteur" />
             </div>
            </li>
            `;

        } else {

            document.querySelector('#ListeCreneauxHTML').innerHTML +=`
            <li id="coaching">
                <div id="coachingTitle">
                    Coaching
                </div>
                <div id="coachingSlot">
                Horaire : ${creneauPris.time} 
                </div>
                
            </li>
            `;

        };
        
           
        });
    
    };
};