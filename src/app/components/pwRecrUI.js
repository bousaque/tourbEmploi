import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Button } from '../components/button';
import { EspaceRecruteur } from '../features/espaceRecruteur';

export class PwRecrUI {

    constructor() {

        this.initUI();
        this.addButtons();
        this.pwVerifUI();

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML = `  
                <div id="pwExplainations">
                    Chères Recruteuses, Chers Recruteurs,</br>
                    Merci de vous choisir un email qui vous servira d'identifiant ainsi qu'un mot de passe. Ce dernier doit contenit au moins une majuscule, 
                    un chiffre et comporter au moins 8 caractères. Un email de confirmation vous sera envoyé à l'adresse email fournie, il vous faudra simplement cliquer dessus
                    pour compléter l'inscription.
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

    };

    addButtons() {

        new Button( document.querySelector('#submitRecrPW') , 'Envoyer' , () => {


            const inputM = document.querySelector('input#usrname').value;
            const emailRecr = inputM.toString();
            
            const inputP = document.querySelector('input#psw').value;
            const pwRecr = inputP.toString();
            
            this.emailRecr = emailRecr;
            this.pwRecr = pwRecr;
            const auth = getAuth();

            console.log(this.emailRecr)

            createUserWithEmailAndPassword(auth, this.emailRecr, this.pwRecr)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                document.querySelector('#bodyApp').innerHTML =`
                <p id="successMessageRECR">
                    Votre inscription a bien été prise en compte, votre compte sera opérationnel
                    une fois que vous aurez cliqué sur le lien de confirmation contenu dans l'email
                    à l'adresse ${this.emailRecr}.
                </p>
                `;
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error(errorMessage);
                // ..
            });

        });

    };

    pwVerifUI() {

        const myInput = document.getElementById("psw");
        const letter = document.getElementById("letter");
        const capital = document.getElementById("capital");
        const number = document.getElementById("number");
        const length = document.getElementById("length");
    
        // When the user clicks on the password field, show the message box
        
        myInput.addEventListener('focusin' , () => {
            
            document.getElementById("message").style.display = "block";
    
        });
        
        myInput.addEventListener('focusout' , () => {
            
            document.getElementById("message").style.display = "none";
    
        });
    
        
    
        // When the user starts to type something inside the password field
        
        myInput.addEventListener('keyup' , () => {
            
            // Validate lowercase letters
            const lowerCaseLetters = /[a-z]/g;
            if (myInput.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }
    
            // Validate capital letters
            const upperCaseLetters = /[A-Z]/g;
            if (myInput.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }
    
            // Validate numbers
            const numbers = /[0-9]/g;
            if (myInput.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }
    
            // Validate length
            if (myInput.value.length >= 8) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }
    
        });

    };

   


};