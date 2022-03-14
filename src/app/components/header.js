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
                        Scéances de coaching
                    </h2>
		            <p>
                        Une séance de coaching est proposée pendant l'évènement, qui consiste en un entretien de 15 minutes
                        avec un.e job-coach pour se préparer aux entretiens.
                    </p>
                    <p>
                        La seule condition pour pouvoir en bénéficier est d'avoir réservé au moins un entretien avec un recruteur,
                        quel qu'il soit.
                    </p>
                    <p>
                        Afin de mieux se préparer, voici quelques ressources qui seront utiles pour faire une bonne impression,
                        comprendre ce qu'on attend d'un candidat lors d'un entretien et toutes les questions qui peuvent porter 
                        sur le recrutement et comment l'approcher.
		            </p>
	            </div>
            </div>
        </div>
        `;

    };


};