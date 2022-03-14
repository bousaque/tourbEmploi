import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
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
import { EspaceCandidat } from "./espaceCandidat";

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



export class LoginHTML {

    constructor(userId , name , email , imageUrl ) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
            //On récupère les variables définies en haut qui collectent le fetch async
        
        this.bodyApp = document.querySelector('#bodyApp');
            //On assigne à bodyApp la balise qui contient l'id #bodyApp

        this.initUI();
            //On lance la création du HTML du feature/page/classe LoginHTML{}

        this.addButtons();
            //On instancie Button{}, on le lie à cette classe et surtout on définira
            //sa logique métier dans la classe LoginHTML{}.

            
        // console.log(this.userId);

    };

    initUI() {
        
        
        this.bodyApp.innerHTML =`
        <div id="divSign">
            <h2 id="loginTitle">
                Merci de vous inscrire ou de vous connecter pour 
                agender des entretiens.
            </h2>
            <section id="signupFormHTML"></section>
            <section id="signupHTML"></section>
            <section id="signinHTML"></section>
        </div>
        `
        
    };

    async googlePopup() {
        //Async parce qu'on attend le retour du fetch

        const auth = getAuth();

        await signInWithPopup(auth, provider)
            //C'est le retour de cette méthode qu'on aimerait attendre pour que les
            //éléments du dessous puissent être correctement définis

        .then((result) => {

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // console.log(token);

            // The signed-in user info.
            const user = result.user;
            const userUID = user.uid;
            // console.log('User vérifié, UID =', user.uid);

            
            //localStorage.setItem(user.displayName, userUID);
            // console.log('localStorage OK');

            this.db = new DataBaseUser(
                getAuth().currentUser.uid , 
                getAuth().currentUser.displayName , 
                getAuth().currentUser.email , 
                getAuth().currentUser.photoURL
            );

            this.db.writeUserData();
            
        })

        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error);
        });

    }

    addButtons() {

        /*
        Est-ce qu'il y a un user.uid ?
        si oui = formulaire parce que la connexion est déjà vérifiée et si le form était complet, on l'aurait su à onAuthStateChange.
        si non = popup parce que la connexion n'est pas encore vérifiée
        */

        if (this.userId) {
            //Si userId existe, on lance le formulaire complémentaire

            //form
            this.signupAction();
            

        } else {
            //Si userId n'existe pas, on met le bouton Connexion, et ensuite this.userId existe donc formulaire complémentaire

            //popup
            new Button(this.bodyApp.querySelector('#signupHTML') , 'Connexion' , async () => {
                /*
                Lors de l'instanciation qui conduira à la création de l'objet signUp{}, on lui passe bien les trois 
                paramètres : la balise HTML à aller remplir, le texte et la fonction métier déclenchée par l'eventListener.
  
                D'ailleurs, le querySelector va viser uniquement bodyApp et ce seulement dans le scope de la classe LoginHTML{} grâce
                au this.
                */
        
                await this.googlePopup();
                //Attente du retour de fetch de ladite méthode

                this.bodyApp.querySelector('#signupHTML').innerHTML = '';
                //Effacement du HTML
        
                
            });

        }
        
        
    };

    signupAction() {
        
        this.bodyApp.querySelector('#signupFormHTML').innerHTML = `
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
        //Ne pas mettre un bouton dans submitButton puisqu'on le définit juste après...
            
        
        const envoyer = new Button(this.bodyApp.querySelector('#submitButton') , 'Envoyer' , () => {


            let fName = this.bodyApp.querySelector('#signupFname').value;
            let lName = this.bodyApp.querySelector('#signupLname').value;
            let email = this.bodyApp.querySelector('#signupMail').value;
            let tel = this.bodyApp.querySelector('#signupPhone').value;
            
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
                getAuth().currentUser.email , 
                getAuth().currentUser.photoURL
            );

            this.db.updateUserData(tel, activity, fName, lName, email);

            //Là on utilise les utilitaires firebase mais il faut quand même les configuer ! 
            //Donc non pas juste "user" mais getAuth().currentUser.XXX !!!


            

            this.bodyApp.innerHTML = `
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

                this.bodyApp.innerHTML = '';

            
            new EspaceCandidat( this.userId , this.fName );

            } , 3500);    

        });
        
        
        
    };
   
};