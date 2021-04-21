/*Menu hamburguesa animado*/

const hamburguer_icon = document.querySelector('.hamburger-icon');

hamburguer_icon.addEventListener('click', animatedHamburguerIcon);

function animatedHamburguerIcon(e)
{
    this.classList.toggle('actived__hamburguer');
}