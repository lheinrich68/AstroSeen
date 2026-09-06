import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Empêche le navigateur de restaurer une ancienne position de scroll au
// rechargement — combiné aux polices web (chargement asynchrone qui modifie
// légèrement la hauteur de page), ça pouvait faire "sauter" la page vers le
// bas de façon apparemment aléatoire.
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
