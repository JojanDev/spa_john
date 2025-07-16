import { renderHeader } from './componetes/header';
import { router } from './router/router';
import './estilos/style.css'


const header = document.querySelector("#header");
const app = document.querySelector("#app");

renderHeader(header)

window.addEventListener('DOMContentLoaded', () => {
  router(app)
});

window.addEventListener('hashchange', () => {
  router(app)
})