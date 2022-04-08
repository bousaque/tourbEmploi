import { getDatabase , ref , child , update , push , get } from 'firebase/database';

import { Button } from '../components/button';
import { EspaceCoaching } from './espaceCoaching';
import { EspaceCandidat } from './espaceCandidat';

export class ReservationCoaching {

    constructor( userId , fName , coachingChoisi , forOffre ) {

        this.userId = userId;
        this.fName = fName;
        this.coachingChoisi = coachingChoisi;
        this.forOffre = forOffre;
        

        this.initUI();
        this.addButtons();

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="resaCoachingBOX">
            <div id="creneauReserver">Séance de coaching : ${this.coachingChoisi}</div>
            <label for="forOffre"><p id="coachingText">Si votre scéance de coaching va porter sur une offre<br/>en particulier, merci d'indiquer laquelle ici :</p></label>
            <input type="text" id="forOffre">
            <div id="boutonReserverCoaching"></div>
        </div>
        `;

    };

    addButtons() {
    
        const buttonBackCreneauxCoaching = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            new EspaceCoaching( this.userId , this.fName /*, this.offreID*/ );
    
        });

        const buttonReserverCreneau = new Button(document.querySelector('#boutonReserverCoaching') , 'Réserver ce coaching' , async () => {

            //On va prendre l'id de l'utilisateur et le push dans RTDB, de sorte qu'à la place de '' on aie l'id de l'utilisateur

            this.forOffre = document.querySelector('#forOffre').value;
            const refDB = ref(getDatabase());
            const newCoachingKey = push(child(refDB , 'coaching')).key;
            const newCoachingDB = {
                
                'time':this.coachingChoisi , 
                'userID':this.userId ,
                'forOffreInput':this.forOffre,
                
            };
            console.log(this.forOffre)

            //console.log(refDB); //= ReferenceImpl {_repo: Repo, _path: Path, _queryParams: QueryParams, _orderByCalled: false}
            //console.log(newCoachingKey); //= -Muf_zAjkoVmhjUD817S (par ex.)
            //console.log(newCoachingDB); //= {offreID: undefined, time: undefined, userID: 'hOOsv8GD97R2yjCjcZz5cpbmKKH3'}
            
            
            const updates = {};
            updates[`/coaching/${this.userId}/` + newCoachingKey ] = newCoachingDB;
            updates[`/creneaux/${this.userId}/` + newCoachingKey] = newCoachingDB;
            //!!! Passer offreID au lieu de userId parce qu'on veut offre & user, recruteur on le trouve via l'offre
          
            await update( refDB, updates );

            //console.log(this.userId )
            document.querySelector('#bodyApp').innerHTML = `
                <h2 id="successMessage">
                    Vous avez réservé la séance de coaching de ${this.coachingChoisi}. 
                <br>
                    Vous allez la retrouver dans le calendrier de votre Espace Candidat, qui va se charger dans un bref instant. 
                </h2>
                `;
                
            const snapshot = await get( child ( refDB , `users/${this.userId }` ) );
            const user = snapshot.val();

            setTimeout(() => {

                document.querySelector('#bodyApp').innerHTML = '';
            
            new EspaceCandidat( this.userId , user.fName );

            this.fName = user.fName;
            //console.log(this.fName);

            } , 3500); 

        });
    
    };



};