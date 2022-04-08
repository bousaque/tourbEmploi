import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref , get } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCBVL9d_RQUd9bW-A8dLlpU4tC-CO2ftc8",
    authDomain: "projet-nomades-1.firebaseapp.com",
    databaseURL: "https://projet-nomades-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projet-nomades-1",
    storageBucket: "projet-nomades-1.appspot.com",
    messagingSenderId: "164954171217",
    appId: "1:164954171217:web:bdbee8166ab73c86959570"
};

import { Button } from "../components/button";
import { DataBaseUser } from "../components/databaseUser";
import { EspaceCandidat } from "../features/espaceCandidat";

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



export class PopupCandUI {

    constructor() {

        this.userId = '';
        this.fName = '';

        this.googlePopup();

    };

    signupAction() {
        
        document.querySelector('#bodyApp').innerHTML = `
        <div id="signupCells">
            <div id="signupCells1">
                <input type="text" id="signupFname" placeholder="Prénom">
                <input type="text" id="signupLname" placeholder="Nom">
                <input type="email" id="signupMail" placeholder="E-mail">
            </div>
            <div id="signupCells2">
                <input type="tel" id="signupPhone" placeholder="N° de téléphone">
                <div id="checkboxFlex">
                    <label for="checkbox" id="checkLabelID">Êtes-vous à la recherche d'un emploi ?</label>
                    <form id="checkbox">
                        <label for="yesCheckbox" id="yesCheckID">Oui</label>
                        <input type="radio" id="yesCheckbox" value="À la recherche d'un emploi" name="emploi" checked>
                        <label for="noCheckbox" id="noCheckID">Non</label>
                        <input type="radio" id="noCheckbox" value="En emploi" name="emploi">
                    </form>
                </div>
            </div>
        </div>
        <span id="submitButton"></span>
        `
        ;
            
        
        const envoyer = new Button(document.querySelector('#submitButton') , 'Envoyer' , () => {


            let fName = document.querySelector('#signupFname').value;
            let lName = document.querySelector('#signupLname').value;
            let email = document.querySelector('#signupMail').value;
            let tel = document.querySelector('#signupPhone').value;
            
            let value = '';
            if (document.getElementById('yesCheckbox').checked) {

                value = document.getElementById('yesCheckbox').value;

            } else if (document.getElementById('noCheckbox').checked) {

                value = document.getElementById('noCheckbox').value;

            }
            
            let activity = value;
            
            this.fName = fName;
            


            this.db = new DataBaseUser(
                getAuth().currentUser.uid , 
                getAuth().currentUser.displayName , 
                getAuth().currentUser.email  
            );

            this.db.updateUserData(tel, activity, fName, lName, email);

            //Là on utilise les utilitaires firebase mais il faut quand même les configuer ! 
            //Donc non pas juste "user" mais getAuth().currentUser.XXX !!!


            

            document.innerHTML = `
                <div id="successBox">
                    <h2 id="successMessage">
                        Merci pour votre inscription ${this.fName} !
                    </h2>
                    <p id="successMessage2">
                        Vous avez à présent accès à votre compte Candidat.
                        L'Espace Candidat va se charger dans un bref instant. 
                    </p>
                </div>
                `;
        
            setTimeout( () => {

                document.querySelector('#bodyApp').innerHTML = '';

            
            new EspaceCandidat( this.userId , this.fName );

            } , 1500);    

        });
        
        
        
    };
  
    async googlePopup() {
        //Async parce qu'on attend le retour du fetch

        const auth = getAuth();

        const popUpGoogle = await signInWithPopup(auth, provider)
        this.userId = popUpGoogle.user.uid;
        const fullName = popUpGoogle.user.displayName;
        this.fName = fullName.split(' ')[0];
        
        //console.log(this.userId)

        const dbRefRTDB = ref( getDatabase() , 'users' );
        const snapshotCandidat = await get( dbRefRTDB , `${this.userId}` );
        const dbCandidat = snapshotCandidat.val();

        //console.log(dbCandidat)

        let candidatOUT = '';
        for (const userId in dbCandidat) {
            if (Object.hasOwnProperty.call(dbCandidat, userId)) {
                const candidat = dbCandidat[userId];

                // console.log(userId)
                // console.log(this.userId)
                // console.log(userId === this.userId)

                if(userId === this.userId) {
                    
                    //console.log('userId === this.userId')
                    candidatOUT = candidat.activity;
                };
                
            };
        };

        //console.log(candidatOUT) //= emploi ou non ?
        //console.log(this.userId) //= 7wsCR7hZodRIW8fgaxeYN32Hjo22
        // console.log('this.userId && candidatOUT = ' + this.userId && candidatOUT) //= candidatOUT donc true
        // console.log('candidatOUT && this.userId = ' + candidatOUT && this.userId) //=  userId donc true      

        // console.log( !(!(candidatOUT && this.userId) ) )

        // console.log('this.userId && !candidatOUT = ' + this.userId && !candidatOUT) //= false
        // console.log('!this.userId && !candidatOUT = ' + !this.userId && !candidatOUT) //= false



        switch (true) {

            case !(!(candidatOUT && this.userId) ):

                console.log('Enregistré et formulaire rempli');
                new EspaceCandidat( this.userId , this.fName );
                break;
            
            case this.userId && !candidatOUT:

                console.log('Enregistré mais formulaire non rempli');
                this.signupAction();
                break;
                
            case !this.userId && !candidatOUT:
                
                console.log('Non enregistré et formulaire non rempli');
                this.db = new DataBaseUser(
                    getAuth().currentUser.uid , 
                    getAuth().currentUser.displayName , 
                    getAuth().currentUser.email 
                            
                );
                this.db.writeUserData();
                this.signupAction();
                break;
            
            default: console.log('Default dans le switch')
        };

        
        

        

    };

   
};