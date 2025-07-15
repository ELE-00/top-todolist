import './styles.css';
import { renderDashboard } from "./modules/dashboard.js";
import { initUIDash, initUIContent, attachContentListeners } from "./modules/initUI.js";

initUIDash();
renderDashboard();
initUIContent();
attachContentListeners(); 
