import { getDatabase , get, ref , set , update , child } from "firebase/database";
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

export class DataBaseUser {

    constructor(userId , name , email ) {

        this.userId = userId;
        this.name = name;
        this.email = email;

    }

    writeUserData() {

        const dbRef = ref( getDatabase() );

        get( child ( dbRef , `users/${this.userId}` ) )
        .then( (snapshot) => {
    
            if (!snapshot.exists()) {

                set(ref(database, 'users/' + this.userId), {
    
                    username: this.name,
                    email: this.email

                  });

            } else {

                update(ref(database, 'users/' + this.userId), {
    
                    username: this.name,
                    email: this.email 

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