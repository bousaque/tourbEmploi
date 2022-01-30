export class HeaderApp {

    constructor() {

        this.initUI();

    };

    initUI() {

        document.querySelector('#headerApp').innerHTML = `
        <div id="">
            <img src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FLogoTourbillonTemp.png?alt=media&token=3444195f-3665-4ede-84f2-4ff20b361ae8" alt="Logo Tourbillon Emploi" />
            <img src="https://firebasestorage.googleapis.com/v0/b/projet-nomades-1.appspot.com/o/general_media%2Flogos_footer%2FMenuBurgerTemp.png?alt=media&token=4bf65d44-7933-4663-9f5e-5df8e15325cd" alt="Menu Burger"
        </div>
        `;

    };

};