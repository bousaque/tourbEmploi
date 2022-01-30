
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase , get, ref , child } from "firebase/database";

import { HeaderApp } from "./components/header";
import { FooterApp } from "./components/footer";


import { LoginHTML } from "./features/loginHTML";
import { EspaceCandidat } from "./features/espaceCandidat";


let uidUser; 
let userId;
let name;
let email;
let imageUrl;
let username;



/* 
Button{}
On met la classe Button{} avant la classe Login{} puisque Login{}
va instancier un nouveau Button{}. Donc quand on découpera, le problème
se règlera de lui-même puisq2ue l'import fera qu'il sera déclaré au début 
du fichier.
*/
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

new HeaderApp();
new FooterApp();

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {

    /*
    Ici on va tester si le user qui actionne le Auth existe. 
    S'il n'existe pas, on va lancer LoginHTML.
    Si user existe, on teste encore si on a déjà les infos complémentaires, et
    si oui, on laisse passer. S'il n'y a pas ces infos, on lance juste le formulaire.
    */
  
   
   if (user) {
       
       /*
       Etape 1.5 du connecté
       */
      
      const dbRef = ref( getDatabase() );
      const snapshot = await get( child ( dbRef , `users/${user.uid}` ) );
      const userId = user.uid;
      const snapshotDyn = snapshot.val();
      
        //console.log(snapshotDyn);
        //console.log(activity);
        //console.log(snapshot._node.children_.root_.left.left.value.value_);


        if ( !userId || !snapshotDyn || !snapshotDyn.activity ) { 

            /*
            Etape 2 du connecté - enregistré
            Ici on balance le formulaire seulement si : user = true && !exists || !activity

                Si exists() c'est que user est connecté et si activity, c'est que form est completé.
                Ça implique que :
                - le mec connecté mais pas complété va avoir le formulaire
                - le mec pas connecté mais complété va pas passer là
                - le mec connecté et complété passe au else et passera
            */
                

            new LoginHTML(user.uid , user.displayName , user.email , user.photoURL);
        }
    
            
        else { 
            /*
            Etape 3 du connecté + enregistré
            Si on est déjà connecté et que infos complémentaire = true
            */

            document.querySelector('#bodyApp').innerHTML = '';

            new EspaceCandidat(userId , snapshotDyn.fName);

        };
    
        


    } else {

        /*
        Etape 1 du non-connecté/jamais venu

        Si !user, alors on fait LoginHTML et c'est lui ensuite qui teste si la DB est renseignée.
        */

        new LoginHTML();

    };

});

