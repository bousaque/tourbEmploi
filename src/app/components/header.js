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
		            <a class="close left" href="#">&#10006;</a>
                    <h2>
                        Vous vous questionnez à propos de l'entretien, vous avez besoin de soutien, inscrivez-vous pour bénéficier d'un coaching. 
                    </h2>
		            <p>
                        Dans le cadre de Tourbillon Emploi, une séance de coaching est <b>proposée</b> avant 
                        l'entretien pour vous aider.
                    </p>
                    <p>
                        Le coaching professionnel consiste à accompagner une personne ou un mini groupe 
                        pendant 20 à 30 minutes, afin de vous aider à : 
                    </p>
                    <ul id="popupList">
                        <li class="popList spaceLis">
                            Répondre à vos questions par rapport à l'entretien d'embauche
                        </li>
                        <li class="popList spaceLis">
                            Mettre en avant vos qualités, vos compétences, et votre potentiel
                        </li>
                        <li class="popList spaceLis">
                            Renforcer votre confiance en vous
                        </li>
                        <li class="popList spaceLis">
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
                    <p>Afin de se préparer efficacement, vous trouverez cinq fiches thématiques de recommandations et de conseils :</p>
                    <ul id="popupList">
                        <li class="popList spaceLis">
                            <a href="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Ffiches_coaching%2F1.%20Astuces%20pour%20le%20CV.pdf?alt=media&token=516f2898-359c-4e67-981e-bdd58efe35f8" target="_blank">
                                1. Astuces pour le CV
                            </a>
                        </li>
                        <li class="popList spaceLis">
                            <a href="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Ffiches_coaching%2F2.%20Entretien%20-%20De%CC%81roule%CC%81.pdf?alt=media&token=297ebd32-19ec-400f-b61f-36817b9ec1c9" target="_blank">
                                2. Entretien - Déroulé
                            </a>
                        </li>
                        <li class="popList spaceLis">
                            <a href="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Ffiches_coaching%2F3.%20Entretien%20-%20Astuces.pdf?alt=media&token=047e4dc8-44a5-491c-a2de-d9548aa2d433" target="_blank">
                                3. Entretien - Astuces
                            </a>
                        </li>
                        <li class="popList spaceLis">
                            <a href="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Ffiches_coaching%2F4.%20Entretien%20-%20Questions-types.pdf?alt=media&token=6d31e2a3-17db-4aa0-a0ff-82a56a00ec8b" target="_blank">
                                4. Entretien - Questions-types
                            </a>
                        </li>
                        <li class="popList spaceLis">
                            <a href="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Ffiches_coaching%2F5.%20Pre%CC%81sentation%20-%20Qualite%CC%81s%20et%20points%20faibles.pdf?alt=media&token=1091e3cd-200c-490a-b9d2-b00fb3ad2de6" target="_blank">
                                5. Présentation - Qualités et points faibles
                            </a>
                        </li>
	            </div>
            </div>
        </div>
        `;

    };


};