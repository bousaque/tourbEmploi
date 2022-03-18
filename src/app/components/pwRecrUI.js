import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { set , ref , getDatabase, get, update } from "firebase/database";

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
                alert('Please enter an email address.');
                return;
            }

            if (pwRecr.length < 4) {
                alert('Please enter a password.');
                return;
            }
            
            localStorage.setItem("signinEmail", emailRecr);
                        
            this.emailRecr = emailRecr;
            this.pwRecr = pwRecr;

            const auth = getAuth();
            const userOBJ = await signInWithEmailAndPassword(auth, emailRecr, pwRecr);
            const user = userOBJ.user;
            this.recrID = user.uid;

            if (user) {

                const db = getDatabase();

                //Vérif si déjà venu ? Pour ne pas écraser à chaque reconnection

                //Oui -> update
                const data = await get(ref (db, `recruteurs/${this.recrID}`));
                
                await update( ref (db, `recruteurs/${this.recrID}`) , {
                    emailRecr: user.email,
                });     
                
                //Si non, update
                const writeDB = await set( ref (db, `recruteurs/${this.recrID}`) , {
    
                    emailRecr: user.email,
              
                });

                new EspaceRecruteur(this.recrID);

            }

        });

    };

};