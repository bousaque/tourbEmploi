export class ModifyPen {

    constructor(buttonHTML , buttonText, eventButton) {
        //On fait passer les trois paramètres utiles : la zone buttonHTML sur laquelle
        //on mettra l'eventListener, le buttonText qui définira le'affiche texte et
        // et enfin l'eventButton qui contiendra la logique métier du bouton

        this.buttonHTML = buttonHTML;
        this.buttonText = buttonText;
        this.eventButton = eventButton;
            //!!! Ici eventButton sera une fonction mais qu'on ne veut pas déclenchée avant le click,
            //du coup on ne lui met pas de parenthèses.

        this.initUI();
        this.initEvents();

    };

    initUI() {
        
        //console.log(this.buttonHTML);
        
        this.buttonHTML.innerHTML = `${this.buttonText}`;

        //console.log('buttonHTML READY');

    };

    initEvents() {
        
        this.buttonHTML.addEventListener('click', ($event) => {
        
            //console.log('intiEvents READY');
            $event.preventDefault();

            this.eventButton();
                //!!!
                //Là on veut que la fonction contenue dans eventButton se déclenche,
                //du coup on lui met les parenthèses.
        
        });
    };

};