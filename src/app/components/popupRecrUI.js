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



export class PopupRecrUI {

    constructor() {

        this.recrID = '';
        this.recruteurName = '';

        this.googlePopup();

    };
  
    async googlePopup() {
        //Async parce qu'on attend le retour du fetch

        const auth = getAuth();

        const popUpGoogle = await signInWithPopup(auth, provider)
        this.recrID = popUpGoogle.user.uid;
        this.fName = popUpGoogle.user.displayName;
        
        //console.log(this.userId)

        const dbRefRTDB = ref( getDatabase() , 'recruteurs' );
        const snapshotRecruteur = await get( dbRefRTDB , `${this.userId}` );
        const dbRecruteur = snapshotRecruteur.val();

        console.log(dbRecruteur)

        // let candidatOUT = '';
        // for (const userId in dbCandidat) {
        //     if (Object.hasOwnProperty.call(dbCandidat, userId)) {
        //         const candidat = dbCandidat[userId];

        //         // console.log(userId)
        //         // console.log(this.userId)
        //         // console.log(userId === this.userId)

        //         if(userId === this.userId) {
                    
        //             //console.log('userId === this.userId')
        //             candidatOUT = candidat.activity;
        //         };
                
        //     };
        // };

        //console.log(candidatOUT) //= emploi ou non ?
        //console.log(this.userId) //= 7wsCR7hZodRIW8fgaxeYN32Hjo22
        // console.log('this.userId && candidatOUT = ' + this.userId && candidatOUT) //= candidatOUT donc true
        // console.log('candidatOUT && this.userId = ' + candidatOUT && this.userId) //=  userId donc true      

        // console.log( !(!(candidatOUT && this.userId) ) )

        // console.log('this.userId && !candidatOUT = ' + this.userId && !candidatOUT) //= false
        // console.log('!this.userId && !candidatOUT = ' + !this.userId && !candidatOUT) //= false



        // switch (true) {

        //     case !(!(candidatOUT && this.userId) ):

        //         console.log('Enregistré et formulaire rempli');
        //         new EspaceCandidat( this.userId , this.fName );
        //         break;
            
        //     case this.userId && !candidatOUT:

        //         console.log('Enregistré mais formulaire non rempli');
        //         this.signupAction();
        //         break;
                
        //     case !this.userId && !candidatOUT:
                
        //         console.log('Non enregistré et formulaire non rempli');
        //         this.db = new DataBaseUser(
        //             getAuth().currentUser.uid , 
        //             getAuth().currentUser.displayName , 
        //             getAuth().currentUser.email 
                            
        //         );
        //         this.db.writeUserData();
        //         this.signupAction();
        //         break;
            
        //     default: console.log('Default dans le switch')
        // };

        
        

        

    };

   
};