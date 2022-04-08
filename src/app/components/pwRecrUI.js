<<<<<<< HEAD
import { getAuth, createUserWithEmailAndPassword , sendEmailVerification } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

=======
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { set , child , ref , getDatabase, get } from "firebase/database";
>>>>>>> cb7e91f9084f2263e55d60ea8977bcd0bfe9d6b2

import { Button } from '../components/button';

export class PwRecrUI {

    constructor() {

        this.initUI();
        this.addButtons();


    };

    initUI() {

<<<<<<< HEAD
        document.querySelector('#bodyApp').innerHTML = `  
                <div id="pwExplainations">
                <h3 id="pwExplTitle">Chères Recruteuses, Chers Recruteurs,</h3>
                <p>
                    Merci de vous choisir un email qui vous servira d'identifiant, ainsi qu'un mot de passe. Ce dernier doit contenir au moins une majuscule, 
                    un chiffre et comporter au moins 8 caractères. Un message de confirmation vous sera envoyé à l'adresse email fournie, il vous faudra 
                    simplement <em class="emClick">cliquer dessus pour compléter l'inscription</em> et remplir votre profil Recruteur.
                </p>
                </div>         
                <div id="containerPW">
                    <form>
                        <div id="userNamePW">
                            <label for="usrname">Adresse E-mail</label>
                            <input type="email" id="usrname" name="usrname" autofocus required/>
                        </div>
                        <div id="passWordPW">
                            <label for="psw">Mot de Passe</label>
                            <input type="password" id="psw" name="psw" title="Doit contenir au moins :" required/>
                        </div>
                        <div id="submitRecrPW"></div>
                    </form>
                </div>
                <div id="message">
                    <h3>Le mot de passe doit contenir au moins :</h3>
                    <p id="letter" class="invalid">Une minuscule</p>
                    <p id="capital" class="invalid">Une MAJUSCULE</p>
                    <p id="number" class="invalid">Un nombre</p>
                    <p id="length" class="invalid">Minimum 8 charactères</p>
                </div>
                `;
=======
        document.querySelector('#loginButtonRecruteurMail').innerHTML = `            
            <div id="containerPW">
                <form>
                    <div id="userNamePW">
                        <label for="usrname">Adresse E-mail</label>
                        <input type="email" id="usrname" name="usrname" autofocus required/>
                    </div>
                    <div id="passWordPW">
                        <label for="psw">Mot de Passe</label>
                        <input type="password" id="psw" name="psw" title="Doit contenir au moins :" required/>
                    </div>
                    <div id="submitRecrPW"></div>
                </form>
            </div>
            `;
>>>>>>> cb7e91f9084f2263e55d60ea8977bcd0bfe9d6b2

    };

    addButtons() {

        new Button( document.querySelector('#submitRecrPW') , 'Envoyer' , async () => {
<<<<<<< HEAD
=======

>>>>>>> cb7e91f9084f2263e55d60ea8977bcd0bfe9d6b2

            const inputM = document.querySelector('input#usrname').value;
            const emailRecr = inputM.toString();
            
            const inputP = document.querySelector('input#psw').value;
            const pwRecr = inputP.toString();
            
            if (emailRecr.length < 4) {
                alert('Please enter a valid email address.');
                return;
            }

            if (pwRecr.length < 4) {
                alert('Please enter a valid password.');
                return;
            }
            
            localStorage.setItem("signinEmail", emailRecr);
                        
            this.emailRecr = emailRecr;
            this.pwRecr = pwRecr;

<<<<<<< HEAD
            if (this.emailRecr.length < 4) {
                alert('Please enter an email address.');
                return;
            }

            if (this.pwRecr.length < 4) {
                alert('Please enter a password.');
                return;
              }

            const userOBJ = await createUserWithEmailAndPassword(auth, this.emailRecr, this.pwRecr)
            const user = userOBJ.user;
            console.log(user);
            console.log(user.uid);
            
            //const refBreakNumber = ref( getDatabase() , `recruteurs/${user.uid}`)

            const emailOBJ = await sendEmailVerification(auth.currentUser , {url: "https://tourbillonemploi.ch",});

            setTimeout( () => {
                
                document.querySelector('#bodyApp').innerHTML =`
                <div id="successMessageRECR">
                    Votre profil a été crée ! Il ne vous reste plus qu'à <em class="emClick">cliquer sur le lien</em> que vous avez reçu par email 
                    à l'adresse : <div id="emailRECR">${this.emailRecr}</div>
                </div>
                `;
                
            } , 100); 
            
            
=======
            const auth = getAuth();
            //const userAuthOBJ = await signInWithEmailAndPassword(auth, emailRecr, pwRecr);

            let userOUT = '';
            const res = await signInWithEmailAndPassword(auth, emailRecr, pwRecr)
            .then( (userCredential) => { 
                const user = userCredential.user;
                userOUT = user;
                console.log('userOUT = '+userOUT)
                console.log(userOUT.uid);
                return {id: user.uid};
            }) 
            .catch( (err) => { 
                // console.log(err); 
                // alert(err)

                switch (true) {
                    case err.code === 'auth/wrong-password':
                        console.log('Mot de passe incorrect');
                        alert('Mot de passe incorrect')
                        break;
                    case err.code === 'auth/user-not-found':
                        console.log('Pas de profil qui corresponde à cet identifiant, merci de vérifier votre email de connexion');
                        alert('Pas de profil qui corresponde à cet identifiant, merci de vérifier votre email de connexion');
                        break;

                    case err.code === 'auth/invalid-email':
                        console.log('Merci de rentrer un email valide');
                        alert('Merci de rentrer un email valide');
                        break;

                    case err.code === 'auth/user-disabled':
                        console.log('Ce profil a été désactivé');
                        alert('Ce profil a été désactivé');
                        break;  

                    default:
                        console.log('Une erreur inconnue est survenue, merci de vérifier vos informations de connexion');
                        alert('Une erreur inconnue est survenue, merci de vérifier vos informations de connexion');
                };

            });
            // if (!res.id) {

            //     return;
            // }
            const userAuth = userOUT;
            this.recrID = userAuth.uid;

            const dbRef = ref( getDatabase() );
            const recrDB = await get ( child ( dbRef , `recruteurs/${this.recrID}` ) );
            
            // console.log( !recrDB.val() );
            const randomNumberBreak = Math.round(Math.random());
        
            if ( !recrDB.val() ) {
>>>>>>> cb7e91f9084f2263e55d60ea8977bcd0bfe9d6b2


                console.log('Dans le if(), donc -> !recrDB.val()')

                const db = getDatabase();

                //Vérif si déjà venu ? Pour ne pas écraser à chaque reconnection
                //Si non, écriture
                const writeDB = await set( ref (db, `recruteurs/${this.recrID}`) , {
    
                    emailRecr: this.emailRecr,
                    breakRandomAssign: randomNumberBreak,
              
                });
                
            };
            
            new EspaceRecruteur(this.recrID);

        });

    };

<<<<<<< HEAD

   


=======
>>>>>>> cb7e91f9084f2263e55d60ea8977bcd0bfe9d6b2
};