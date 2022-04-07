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
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogoClairBoisSq.svg?alt=media&token=c8a9c6f1-b001-4a5e-bb8d-b46ca0bd7e00" alt="Logo Clair-Bois" />
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
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogoTrajetSq.svg?alt=media&token=2741bd8b-91a2-4653-b9e6-20dadc70ed9d" alt="Logo Trajets" />
            </a>
            <a href="https://www.pro-geneve.ch/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogo%20PRO.png?alt=media&token=eb2bc533-70a8-4983-939a-a3c1c2bfa157" alt="Logo PRO" />
            </a>
            <a href="https://www.partage.ch/fr/">
                <img  class="logos_footer" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogoPartageSq.svg?alt=media&token=470ef30d-9601-4193-9c4f-bf048e63fa01" alt="Logo Partage" />
            </a>
        </div>
        <div id="ownSocNetworks">
            <a href="https://www.linkedin.com/in/tourbillon-emploi-4b4761233/" target="_blank">
                <img id="linkedIn" class="resSoc" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FLogoLinkedInSq.svg?alt=media&token=38fef720-2e2e-443e-90fc-24ad9aae4562" alt="Logo LinkedIn" />
            </a>
            <a href="https://www.instagram.com/tourbillon_emploi/" target="_blank">
                <img class="resSoc" src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_reseauxSociaux%2FinstagramLogo.svg?alt=media&token=07bded61-68d5-4f0a-934f-9320e80a4f08" alt="Logo Instagram" />
            </a>
            <span id="hashtagTourbEmploi">#TourbillonEmploi</span>
        </div>
        <p id="signature">D&eacute;velopp&eacute; par V. Magnenat</p>
        `;
        
    };
    
};