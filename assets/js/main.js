/*--------------------------------------------*/
//Menu hamburguesa animado
/*--------------------------------------------*/

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

/*--------------------------------------------*/
//Formulario de búsqueda
/*--------------------------------------------*/

if(document.querySelector('#category__search__menu'))
{
    const category_container = document.querySelector('#category__search__menu');
    const span_button_toggle = category_container.querySelector('span.category');
    const category_pick_container = category_container.querySelector('div.category-pick');
    
    /*Events*/
    span_button_toggle.addEventListener('click', displayCategories);
    category_pick_container.addEventListener('click', (e) => { checkedLabel(e); });

    /*Functions*/
    function displayCategories()
    {
        category_container.classList.toggle('actived');
    }

    function checkedLabel(e)
    {
        if(e.target.classList.contains('radio__indicator') || e.target.classList.contains('radio__link') || e.target.classList.contains('radio-container'))
        {
            const label = findNearestParentLabel(e.target);
            if(!label.classList.contains('checked'))
            {
                //Eliminar la clase checked del elemento seleccionado
                this.document.querySelector('label.checked').classList.toggle('checked');

                //Actualizar el elemento seleccionado
                label.classList.toggle('checked');

                //Actualizar el texto del elemento span.category
                span_button_toggle.textContent = label.querySelector('.radio__link').textContent;
                console.log(label.querySelector('.radio__link').textContent);
            }
        }
    }

    //Buscar el label
    function findNearestParentLabel(el)
    {
        let label = el;
        while(label.tagName != 'LABEL')
        {
            label = label.parentElement
        }
        return label;
    }
}


/*--------------------------------------------*/
//Lista de categorias de los productos - celular
/*--------------------------------------------*/

if(document.getElementById('category_select__mobile'))
{
    const category_mobile_container = document.getElementById('category_select__mobile')
    const category_selected = category_mobile_container.querySelector('span.category__selected');

    /*Events*/

    category_selected.addEventListener('click', displayAllCategoriesMobile);

    /*Functions*/

    function displayAllCategoriesMobile()
    {
        const all_categories_container = category_mobile_container.querySelector('.all__btn__categories');

        if(all_categories_container.style.maxHeight)
        {
            all_categories_container.style.maxHeight = null;
        }
        else
        {
            all_categories_container.style.maxHeight = all_categories_container.scrollHeight + 'px';
        }
    }
}