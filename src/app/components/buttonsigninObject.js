export class SignIn {

    constructor(appBody) {

        this.appBody = appBody;
        this.initUI();
        this.initEvents();
    }

    initUI() {

        this.appBody.innerHTML = `
        <section id="eventSignin">
            <button>
                Connexion
            </button>
        </section>
        `

    }

    initEvents() {

        //Définition de la méthode qui attache les eventListners

        let signinButton = this.appBody.querySelector('section button');
        //On met le bouton login dans une variable

        //!!! le targetting fonctionne selon les règles CSS !!!


        signinButton.addEventListener('click' , ($event) => {
            //On add l'eventListener click
            //On donne un nom audit event, ici $event


            $event.preventDefault(); 
            //On empêche le comportement par défaut, lequel (si on avait un submit form) 
            //rechargerait la page !!! Mais un input et un bouton flottants ne rechargent pas la page


            //this.login();
            //On enclenche la méthode login sur la méthode initEvents de la classe LoginPage


        })

    }

}

