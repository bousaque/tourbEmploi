import { SiteVitrine } from "../features/siteVitrine";
import { Button } from "./button";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export class RecoveryPwRecr {
    
    constructor() {

        this.emailRecr = '';

        this.initUI();
        this.addButtons();

    };

    initUI() {

        document.querySelector('#lostPassword').innerHTML =`
        <div id="containerPW">
            <form>
                <div id="userNamePW">
                    <label for="usrnameRecovery">Adresse E-mail</label>
                    <input type="email" id="usrnameRecovery" name="usrname" autofocus required/>
                </div>
                <div id="submitRecoveryEmailRecr"></div>
            </form>
        </div>
        `;

    };

    addButtons() {
            
        const inputRecovery = document.querySelector('input#usrnameRecovery');
        inputRecovery.addEventListener('change', () => {

            const emailRecovery = inputRecovery.value;
            this.emailRecr = emailRecovery.toString();
            
            console.log(this.emailRecr);
        });
        
        
        new Button( document.querySelector('#submitRecoveryEmailRecr') , 'Envoyer' , async () => {
    
            if (this.emailRecr.length < 4) {
                alert('Please enter an email address.');
                return;
            };
        
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.emailRecr)
            .then( () => {
                    
                document.querySelector('#lostPassword').innerHTML =`
                <div id="recoveryMessage">
                    Nous avons envoyé un email de réinitialisation de votre mot de passe sur ${this.emailRecr}. Merci de vérifier les boîtes spam
                    car les systèmes de sécurité de grandes structures ont tendance à bloquer les emails.
                </div>
                `;

                setTimeout( () => {

                    new SiteVitrine();
    
                } , 1000);
                        
            })
            .catch( (error) => {
                    
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log('errorCode = '+errorCode);
    
            });
        });

    };

};