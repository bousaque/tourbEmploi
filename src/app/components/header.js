export class HeaderApp {

    constructor() {

        this.initUI();

    };

    initUI() {

        document.querySelector('#headerApp').innerHTML = `
        <div id="header">
            <div id="logosHeaderBOX">
                <img id="logoTourbillon" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLOGO_TourbillonEmploi.png?alt=media&token=3327fe1f-319b-40d0-a622-373c01126c7a" alt="Logo Tourbillon Emploi" />
                <div id="ownSocNetworks">
                    <a href="https://www.linkedin.com/in/tourbillon-emploi-4b4761233/" target="_blank">
                        <img class="resSoc" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FLogoLinkedIn_%20%23F59D44.svg?alt=media&token=e3b301b5-86c7-4d7d-8909-1e81e7c740a5" alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/tourbillon_emploi/" target="_blank">
                        <img class="resSoc" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FInsta_Logo_Tourbillon_%23f59d44.svg?alt=media&token=fbf3d140-8d4e-4620-82a3-35638141f26f" alt="Facebook" />
                    </a>
                </div>
            </div>
        </div>
        `;

        
    };


};