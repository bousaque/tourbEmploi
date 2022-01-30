import { getDatabase , ref , child , update , push , get } from 'firebase/database';

import { Button } from '../components/button';
import { EspaceCoaching } from './espaceCoaching';
import { EspaceCandidat } from './espaceCandidat';

export class ReservationCoaching {

    constructor( userId , fName , coachingChoisi ) {

        this.userId = userId;
        this.fName = fName;
        this.coachingChoisi = coachingChoisi;
        

        this.initUI();
        this.addButtons();

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="buttonBack"></div>
        <div id="creneauReserver">Séance de coaching : ${this.coachingChoisi}</div>
        <label for="forOffre">Si votre coaching va porter sur une offre en particulier, merci d'indiquer laquelle ici :</label>
        <input type="text" id="forOffre">
        <div id="boutonReserverCoaching"></div>
        `;

    };

    addButtons() {
    
        const buttonBackCreneauxCoaching = new Button(document.querySelector('#buttonBack') , 'Retour' , () => {
    
            new EspaceCoaching( this.userId , this.fName /*, this.offreID*/ );
    
        });

        const buttonReserverCreneau = new Button(document.querySelector('#boutonReserverCoaching') , 'Réserver ce coaching' , async () => {

            //On va prendre l'id de l'utilisateur et le push dans RTDB, de sorte qu'à la place de '' on aie l'id de l'utilisateur

            const refDB = ref(getDatabase());
            const newCoachingKey = push(child(refDB , 'coaching')).key;
            const newCoachingDB = {

                'time':this.coachingChoisi , 
                'userID':this.userId ,

            };

            //console.log(refDB); //= ReferenceImpl {_repo: Repo, _path: Path, _queryParams: QueryParams, _orderByCalled: false}
            //console.log(newCoachingKey); //= -Muf_zAjkoVmhjUD817S (par ex.)
            //console.log(newCoachingDB); //= {offreID: undefined, time: undefined, userID: 'hOOsv8GD97R2yjCjcZz5cpbmKKH3'}
            
            
            const updates = {};
            updates['/coaching/' + newCoachingKey ] = newCoachingDB;
            updates['/creneaux/' + newCoachingKey] = newCoachingDB;
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