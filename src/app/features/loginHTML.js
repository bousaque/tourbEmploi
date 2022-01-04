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
import { EspaceCandidat } from "../features/espaceCandidat"

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

            
        
    };

    
    initUI() {
        
        
        this.bodyApp.innerHTML =`
        <div id="divSign">
            <div>Candidat</div>
            <div>Recruteur</div>
            <p>
                Bienvenue sur la plateforme Tourbillon Emploi !
            <br>
                Merci de vous inscrire ou de vous connecter pour 
                agender des entretiens.
            </p>
            <section id="signupFormHTML"></section>
            <section id="signupHTML"></section>
            <section id="signinHTML"></section>
            <p>D&eacute;velopp&eacute; par V. Magnenat</p>
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
            
            //const writeinDB = this.db;
            //console.log(this.db);

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

            //form
            this.signupAction();
            

        } else {

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
        <input type="text" id="signupFname" placeholder="Prénom">
        <br>
        <input type="text" id="signupLname" placeholder="Nom">
        <br>
        <input type="email" id="signupMail" placeholder="E-mail">
        <br>
        <input type="tel" id="signupPhone" placeholder="N° de téléphone">
        <br>
        <input type="text" id="signupStatus" placeholder="Activité prof. actuelle">
        <br>
        <span id="submitButton"></span>
        `
        ;
        //Ne pas mettre un bouton dans submitButton puisqu'on le définit juste après...
            

        const envoyer = new Button(this.bodyApp.querySelector('#submitButton') , 'Envoyer' , () => {

            //console.log('Bouton Envoyer READY', getAuth().currentUser);

            let fName = this.bodyApp.querySelector('#signupFname').value;
            let lName = this.bodyApp.querySelector('#signupLname').value;
            let email = this.bodyApp.querySelector('#signupMail').value;
            let tel = this.bodyApp.querySelector('#signupPhone').value;
            let activity = this.bodyApp.querySelector('#signupStatus').value;
            


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
                <h2 id="successMessage">
                    Merci pour votre inscription ${fName} !
                <br>
                    Vous avez à présent accès à votre compte Candidat.
                    L'Espace Candidat va se charger dans un bref instant. 
                </h2>
                `;
        
            setInterval( () => {

                this.bodyApp.innerHTML = '';

            
            new EspaceCandidat( userId , fName);

            } , 3500);    

        });
        
        
        
    };

   

};