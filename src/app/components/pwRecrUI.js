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


import { Button } from '../components/button';

export class PwRecrUI {

    constructor() {

        this.initUI();
        this.addButtons();
        this.pwVerifUI();


    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML = `  
                <div id="pwExplainations">
                <h3 id="pwExplTitle">Chères Recruteuses, Chers Recruteurs,</h3>
                <p>
                    Merci de vous choisir un email qui vous servira d'identifiant. Un email de confirmation vous sera 
                    envoyé à l'adresse email fournie, il vous faudra simplement <em class="emClick">cliquer dessus pour compléter 
                    l'inscription</em> et remplir votre profil Recruteur.
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

    };

    addButtons() {

        new Button( document.querySelector('#submitRecrPW') , 'Envoyer' , async () => {

            const inputM = document.querySelector('input#usrname').value;
            const emailRecr = inputM.toString();
            
            const inputP = document.querySelector('input#psw').value;
            const pwRecr = inputP.toString();
            
            this.emailRecr = emailRecr;
            this.pwRecr = pwRecr;
            const auth = getAuth();

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
            console.log(auth.currentUser);
            

            const emailOBJ = await sendEmailVerification(auth.currentUser , {url: "https://tourbillonemploi.ch",});

            setTimeout( () => {
                
                document.querySelector('#bodyApp').innerHTML =`
                <div id="successMessageRECR">
                    Votre profil a été crée ! Il ne vous reste plus qu'à <em class="emClick">cliquer sur le lien</em> que vous avez reçu par email 
                    à l'adresse : <div id="emailRECR">${this.emailRecr}</div>
                </div>
                `;
                
            } , 100); 

            


            
            

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