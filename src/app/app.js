
import { getAuth, signInWithPopup, GoogleAuthProvider , onAuthStateChanged } from "firebase/auth";
import { getDatabase , get, ref , set , update , child } from "firebase/database";
import { initializeApp } from "firebase/app";
//Penser à importer les méthodes/objets qu'on veut utiliser, sinon ben pas là...


const firebaseConfig = {
    apiKey: "AIzaSyCBVL9d_RQUd9bW-A8dLlpU4tC-CO2ftc8",
    authDomain: "projet-nomades-1.firebaseapp.com",
    databaseURL: "https://projet-nomades-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projet-nomades-1",
    storageBucket: "projet-nomades-1.appspot.com",
    messagingSenderId: "164954171217",
    appId: "1:164954171217:web:bdbee8166ab73c86959570"
};

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let uidUser; 
let userId;
let name;
let email;
let imageUrl;

//Fameuse technique d'évitement du return, déclaration de variable vides 
//qui seront complétées à mesure que les fonctions opèrent et les renseigneront.


/* 
Button{}
On met la classe Button{} avant la classe Login{} puisque Login{}
va instancier un nouveau Button{}. Donc quand on découpera, le problème
se règlera de lui-même puisq2ue l'import fera qu'il sera déclaré au début 
du fichier.
*/

class Button {

    constructor(buttonHTML , buttonText, eventButton) {
        //On fait passer les trois paramètres utiles : la zone buttonHTML sur laquelle
        //on mettra l'eventListener, le buttonText qui définira le'affiche texte et
        // et enfin l'eventButton qui contiendra la logique métier du bouton

        this.buttonHTML = buttonHTML;
        this.buttonText = buttonText;
        this.eventButton = eventButton;
            //!!! Ici eventButton sera une fonction mais qu'on ne veut pas déclenchée avant le click,
            //du coup on ne lui met pas de parenthèses.

        this.initUI();
        this.initEvents();

    };



    initUI() {
        
        //console.log(this.buttonHTML);
        
        this.buttonHTML.innerHTML = `
            <button>
                <span id="buttonText">
                    ${this.buttonText}
                </span>    
            </button>
        `;

        //console.log('buttonHTML READY');

    };



    initEvents() {
        
        this.buttonHTML.addEventListener('click', ($event) => {
        
            //console.log('intiEvents READY');
            $event.preventDefault();

            this.eventButton();
                //!!!
                //Là on veut que la fonction contenue dans eventButton se déclenche,
                //du coup on lui met les parenthèses.
        
        });
    };
        
        

};


class DataBaseUser {

    constructor(userId , name , email , imageUrl) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        


    }

    writeUserData() {

        const dbRef = ref( getDatabase() );

        get( child ( dbRef , `users/${this.userId}` ) )
        .then( (snapshot) => {
    
            if (!snapshot.exists()) {

                set(ref(database, 'users/' + this.userId), {
    
                    username: this.name,
                    email: this.email,
                    profile_picture : this.imageUrl
              
                  });

            } else {

                update(ref(database, 'users/' + this.userId), {
    
                    username: this.name,
                    email: this.email,
                    profile_picture : this.imageUrl
              
                  });

            }


        

        })
        
    };

    updateUserData(tel, activity, fName, lName, email) {

        update(ref(database, 'users/' + this.userId), {

            tel,
            activity,
            fName,
            lName,
            email

        });
    }

};


class LoginHTML {

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

            //new Candidat{}

            } , 3500);    

        });
        
        
        
    };

   

};


/*
Pour faire en sorte que le user soit directement dirigé vers newCandidat, on va
mettre un écouteur sur tout changement d'état de auth,(user).

Dès qu'un getAuth() est activté sur un user, on vérifie si ce user qui actionne le getAuth()
existe déjà. Pour ce faire, on vérifie de manière asynchrone si le get() ramène un user qui est déjà dans 
la base de donnée.

Ensuite on vérifie le DataSnapshot du user ainsi que si user est connecté avec
une valeur de l'objet Datasnapshot.

Si le snapshot retourne un objet vide selon exists() ou que la valeur vérifiée n'existe pas,
on retourne l'instance objet LoginHTML et c'est lui qui décide s'il l'a déjà vu avant cette 
session ou s'il doit signUp.

Évidemment, si le snapshot revient existant 
*/

const auth = getAuth();
onAuthStateChanged(auth, (user) => {

    /*
    Ici on va tester si le user qui actionne le Auth existe. 
    S'il n'existe pas, on va lancer LoginHTML.
    Si user existe, on teste encore si on a déjà les infos complémentaires, et
    si oui, on laisse passer. S'il n'y a pas ces infos, on lance juste le formulaire.
    */
  
    //console.log('1. onAuthStateChanged a reçu un getAuth de user')
    if (user) {

        const dbRef = ref( getDatabase() );

        get( child ( dbRef , `users/${user.uid}` ) )
    
        .then( (snapshot) => {
    
            console.log( '2.a Le snapshot est parti !' , snapshot.val() )
            if ( !snapshot.exists() || !snapshot.child('activity').val()  ) { 
                /*
                Ici on balance le formulaire seulement si : user = true && !exists || !activity

                    Si exists() c'est que user est connecté et si activity, c'est que form est completé.
                    Ça implique que :
                    - le mec connecté mais pas complété va avoir le formulaire
                    - le mec pas connecté mais complété va pas passer là
                    - le mec connecté et complété passe au else et passera
                */
                

                console.log( '3.a Le snapshot était vide ou navait pas de valeurs autre que celles rentrées par Auth()');
                new LoginHTML(user.uid , user.displayName , user.email , user.photoURL);
            }
    
            
            else { 
                //Si on est déjà connecté et que infos complémentaire = true

                console.log('3.b Le snapshot n était pas vide ou avait des valeurs autre que celles de Auth()');

                document.querySelector('#bodyApp').innerHTML = '';

                //new EspaceCandidat{}

            }
    
        });


  } else {
      //Si !user, alors on fait LoginHTML et c'est lui ensuite qui teste si la DB est renseignée.

    new LoginHTML();
    console.log( '2.b user existe pas')

  }

});









