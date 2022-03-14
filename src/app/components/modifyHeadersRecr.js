import { getStorage, uploadBytes } from "firebase/storage";

export class ModifyHeadersRecr {

    constructor() {

    };

    initUI() {

        document.querySelector('#bodyApp').innerHTML =`
        <div id="modifyBOX">
            <div id="backEspRECR"></div>
            <form id="inputBOXModifyRECR">
                <label for="inputModifyRECR">Rentrez ici l'adresse correspondante :</label>
                <input type="text" id="inputModifyRECR"/>
                <div id="submitInputModifyRECR"></div>
            </form>
        </div>
        `;

    };

    async modifyRTDB() {

        const newData = document.querySelector('#submitInputModifyRECR').value;

        const storage = getStorage();
        const storageRef = ref(storage, 'some-child');
        
        
    };


};