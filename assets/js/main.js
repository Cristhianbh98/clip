/*Menu hamburguesa animado*/

if(document.querySelector('.hamburger-icon__container'))
{
    const hamburguer_icon = document.querySelector('.hamburger-icon__container');
    hamburguer_icon.addEventListener('click', animatedHamburguerIcon);

    function animatedHamburguerIcon()
    {
        this.querySelector('.hamburger-icon').classList.toggle('actived__hamburguer');
    }
}

/*Formulario de búsqueda*/

if(document.querySelector('#category__search__menu'))
{
    const category_container = document.querySelector('#category__search__menu')
    category_container.addEventListener('click', displayCategories);

    function displayCategories()
    {
        this.classList.toggle('actived');
    }
}
