/*Menu hamburguesa animado*/

if(document.querySelector('.hamburger-icon__container'))
{
    const hamburguer_icon = document.querySelector('.hamburger-icon__container');
    const menu = document.querySelector('nav.header-hero__menu');
    hamburguer_icon.addEventListener('click', animatedHamburguerIcon);

    function animatedHamburguerIcon()
    {
        this.querySelector('.hamburger-icon').classList.toggle('actived__hamburguer');
        if(menu.style.maxHeight)
        {
            menu.style.maxHeight = null;
        }
        else
        {
            menu.style.maxHeight = menu.scrollHeight + 'px';
        }
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
