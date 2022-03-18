export class HeaderApp {

    constructor() {

        this.initUI();

    };

    initUI() {

        document.querySelector('#headerApp').innerHTML = `
        <div id="header">
            <img id="logoTourbillon" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLOGO_TourbillonEmploi.png?alt=media&token=3327fe1f-319b-40d0-a622-373c01126c7a" alt="Logo Tourbillon Emploi" />
            <div class="box">
	            <a id="popupBox" class="button" href="#popup1">
                    <img id="coachingButton" href="#popup1" class="button" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_UI%2FLogoCoaching1_Climbing.png?alt=media&token=7cde543a-0fdc-4c7b-97c7-5542f30968b1" alt="Bouton Coaching" />
                    <span id="coachingTxt">Coaching</span>
                </a>
            </div>
            <div id="popup1" class="overlay">
	            <div class="popup">
		            <a class="close" href="#">&times;</a>
                    <h2>
                        Vous vous questionnez à propos de l'entretien, vous avez besoin de soutien, inscrivez-vous pour bénéficier d'un coaching. 
                    </h2>
		            <p>
                        Dans le cadre de Tourbillon Emploi, une séance de coaching est proposée avant 
                        l'entretien pour vous aider.
                    </p>
                    <p>
                        Le coaching professionnel consiste à accompagner une personne ou un mini groupe 
                        pendant 20 à 30 minutes, afin de vous aider à : 
                    </p>
                    <ul>
                        <li>
                            Répondre à vos questions par rapport à l'entretien d'embauche
                        </li>
                        <li>
                            Mettre en avant vos qualités, vos compétences, et votre potentiel
                        </li>
                        <li>
                            Renforcer votre confiance en vous
                        </li>
                        <li>
                            Finaliser la préparation de votre entretien d'embauche
                        </li>
		            </ul>
                    <p>
                        Le coaching est un facilitateur :  Il ne détient pas la vérité, mais il vous soutient et 
                        vous aide à évoluer vers son objectif. 
                    </p>
                    <p>
                        Cela vous intéresse ? La seule condition pour en bénéficier est d'avoir réservé 
                        au moins un entretien avec un recruter quel qu'il soit et de réserver votre coaching.
                    </p>
	            </div>
            </div>
        </div>
        `;

    };


};