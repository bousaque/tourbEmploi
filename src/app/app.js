//AUTH
import { getAuth, onAuthStateChanged } from "firebase/auth";

//DATABASE
import { getDatabase, ref , get , child } from 'firebase/database';

//Own
import { PopupCandUI } from './components/popupCandUI';
import { EspaceRecruteur } from "./features/espaceRecruteur";
import { EspaceCandidat } from "./features/espaceCandidat";

import { HeaderApp } from "./components/header";
import { PwRecrUI } from "./components/pwRecrUI";
import { FooterApp } from "./components/footer";



new HeaderApp();
new PwRecrUI();
new FooterApp();

