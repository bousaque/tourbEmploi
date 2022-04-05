export class FooterApp {

    constructor() {

        this.initUI();

    };

    initUI() {
        
        document.querySelector('#footerApp').innerHTML = `
        <div id="footerLogos">
            <div id="footerL1">
            <a href="https://csp.ch/geneve/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20CSP%20Gene%CC%80ve.png?alt=media&token=5da5c47f-f2a6-4309-8950-5e51c2b5f642" alt="Logo CSP" />
            </a>
            <a href="https://geneveroule.ch/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20Geneveroule.png?alt=media&token=a66f7074-0388-405f-9a9f-f2a4bb140fa1" alt="Logo Geneveroule" />
            </a>
            <a href="https://clairbois.ch/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20Clair-Bois.jpeg?alt=media&token=4d9da627-9c58-470a-9b0f-c0146f6b425d" alt="Logo Clair-Bois" />
            </a>
            <a href="https://www.022familles.ch/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20022%20Familles.jpeg?alt=media&token=311eb496-cb2d-4343-88e1-abc63b29f06e" alt="Logo 022Familles" />
            </a>
        </div>
        <div id="footerL2">
            <a href="https://espace-entreprise.ch/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20Espace%20Entreprise.png?alt=media&token=6cdfe7c0-6da7-45c5-9084-97945ab80ba4" alt="Logo Espace Entreprises" />
            </a>
            <a href="https://www.trajets.org/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20Trajets%20Nom.png?alt=media&token=9895ed0c-4262-4dd0-9776-d4661aae6267" alt="Logo Trajets" />
            </a>
            <a href="https://www.pro-geneve.ch/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20PRO.png?alt=media&token=eb2bc533-70a8-4983-939a-a3c1c2bfa157" alt="Logo PRO" />
            </a>
            <a href="https://www.partage.ch/fr/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2Flogo-partage.svg?alt=media&token=7183fb04-1122-4c43-9e46-6f189d4ea8fe" alt="Logo Partage" />
            </a>
            <p id="signature">D&eacute;velopp&eacute; par V. Magnenat</p>
        </div>
        `;
        
    };
    
};