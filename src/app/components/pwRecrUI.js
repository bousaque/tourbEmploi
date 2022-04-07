import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { set , child , ref , getDatabase, get } from "firebase/database";

import { Button } from '../components/button';
import { EspaceRecruteur } from '../features/espaceRecruteur';

export class PwRecrUI {

    constructor() {

        this.initUI();
        this.addButtons();

    };

    initUI() {

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

    };

    addButtons() {

        new Button( document.querySelector('#submitRecrPW') , 'Envoyer' , async () => {


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

};