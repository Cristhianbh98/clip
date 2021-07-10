//Import products to show
import { products } from './modules/all-products.js';

//Modules import
import Links from './modules/Links.js';

//Create an instance of the class
const links = new Links();

let products_pages = slicePoducts(products);

/*--------------------------------------------*/
//Función para obtener los productos por categoría
/*--------------------------------------------*/

function getProductsByCategory(category)
{
    return new Promise((resolve, reject) =>
    {
        const product_by_category = products.filter( product => product.category === category )

        if(!product_by_category)
        {
            const err = new Error();
            err.message = 'No existe tal categoria';
            reject(err)
        }

        resolve(product_by_category);

    });
}

function slicePoducts(products)
{
    let i,j,products_pages = [],chunk = 9;

    for (i=0,j=products.length; i<j; i+=chunk) 
    {
        products_pages = products_pages.concat({page: products_pages.length + 1 , data: [...products.slice(i,i+chunk)]});
    }

    return products_pages;
}

/*--------------------------------------------*/
//Todos los productos
/*--------------------------------------------*/

/*Añadir los productos a la página*/
if(document.getElementById('products-container'))
{
    const products_container = document.getElementById('products-container');
    const products_to_render = products_pages[0].data;
    renderProducts(products_to_render,products_container);
}

function renderProducts(products = [],products_container)
{
    products.forEach( element =>{
        const product = createProduct(element);
        products_container.appendChild(product);
    });
}

function createProduct(element)
{
    const product = document.createElement('DIV');
    product.classList.add('product_container');
    product.classList.add('product');

    product.innerHTML = `<div class="product__content"><div class="product__image"><img src="${element.img}" alt="${element.title}"/></div><div class="product__description"><h4 class="product__brand">${element.brand}</h4><h3 class="product__title">${element.title}</h3><span class="product__price">$${element.price}</span></div></div><div class="product__options"><div class="product__add"><div class="minus"></div><div class="plus"></div></div><button class="btn btn__purchase">Añadir <span class="amount">0</span> por <span class="total">$0.00</span></button></div>`;

    return product;
}

/*--------------------------------------------*/
//Paginación de los productos
/*--------------------------------------------*/

if(document.querySelector('.pagination'))
{
    const pagination_container = document.querySelector('.pagination');
    pagination_container.addEventListener('click', handleClickPagination);

    renderAllPageItem();
}

function renderAllPageItem()
{
    const pagination_container = document.querySelector('.pagination');
    const right_arrow = pagination_container.querySelector('.arrow-right.p__item');
    let i = 1, j = products_pages.length, page_item;
    for(i;i<=j;i++)
    {
        page_item = generatePageItem(i);
        if(i === 1) page_item.classList.add('actived');
        pagination_container.insertBefore(page_item,right_arrow);
    }
}

function generatePageItem(number)
{
    const DIV = document.createElement('DIV');
    DIV.classList.add('p__item');
    DIV.classList.add('page');
    const SPAN = document.createElement('SPAN');
    SPAN.textContent = number;
    DIV.appendChild(SPAN);

    return DIV;
}

function handleClickPagination(e)
{
    if((e.target.classList.contains('p__item') && e.target.classList.contains('page')) || e.target.tagName === 'SPAN') makeCurrentPagination(e.target);

    if((e.target.classList.contains('p__item') && e.target.classList.contains('arrow')) || e.target.tagName === 'I') handleRow(e.target);

    handleHiddenArrows();
}

function makeCurrentPagination(el)
{
    const p_item = findNearestParentDIV(el);

    if(!p_item.classList.contains('actived'))
    {
        document.querySelector('.pagination .p__item.page.actived').classList.remove('actived');
        p_item.classList.add('actived');
        showCurrentPage(p_item);
    }
}

function handleRow(el)
{   
    const arrow_item = findNearestParentDIV(el);

    if(arrow_item.classList.contains('arrow-left')) moveCurrentPageToLeft();
    if(arrow_item.classList.contains('arrow-right')) moveCurrentPageToRight();

}

function moveCurrentPageToRight()
{
    const current_page = document.querySelector('.pagination .p__item.page.actived');
    const next_element = current_page.nextElementSibling
    if(next_element.classList.contains('page'))
    {
        current_page.classList.remove('actived');
        next_element.classList.add('actived');
        showCurrentPage(next_element);
    }
}

function moveCurrentPageToLeft()
{
    const current_page = document.querySelector('.pagination .p__item.page.actived');
    const previous_element = current_page.previousElementSibling;
    if(previous_element.classList.contains('page'))
    {
        current_page.classList.remove('actived');
        previous_element.classList.add('actived');
        showCurrentPage(previous_element);
    }
}

function showCurrentPage(el)
{
    const page = Number(el.textContent);
    const products_container = document.getElementById('products-container');
    const products_to_render = products_pages[page-1].data;
    products_container.innerHTML = '';
    renderProducts(products_to_render,products_container);
}

function handleHiddenArrows()
{
    const left_arrow = document.querySelector('.arrow-left.arrow');
    const right_arrow = document.querySelector('.arrow-right.arrow');
    const current_page = Number(document.querySelector('.p__item.page.actived').textContent);
    if(current_page === 1 && !left_arrow.classList.contains('hidden'))  left_arrow.classList.add('hidden');
    if(current_page === products_pages.length && !right_arrow.classList.contains('hidden'))  right_arrow.classList.add('hidden');
    if(current_page > 1 && left_arrow.classList.contains('hidden'))  left_arrow.classList.remove('hidden');
    if(current_page < products_pages.length && right_arrow.classList.contains('hidden'))  right_arrow.classList.remove('hidden');
}

function findNearestParentDIV(el)
{
    let div = el;
    while(div.tagName != 'DIV')
    {
        div = div.parentElement;
    }
    return div;
}

/*--------------------------------------------*/
//Opciones de producto
/*--------------------------------------------*/

if(document.getElementById('products-container'))
{
    const products_container = document.getElementById('products-container');

    /*Events*/
    products_container.addEventListener('click', (e)=>{productOptionsManager(e)})

    /*Functions*/

    function productOptionsManager(e)
    {
        if(e.target.classList.contains('plus')) addProduct(e);
        if(e.target.classList.contains('minus') && e.target.classList.contains('actived')) subtractProduct(e);
    }

    function addProduct(e)
    {
        const product = findProductParent(e.target);

        const price = product.querySelector('.product__price').textContent.substring(1);
        const product_price = parseFloat(price,10);

        const amount = parseInt(product.querySelector('span.amount').textContent,10);
        const product_amount = parseInt(amount,10)

        let new_product_amount = product_amount + 1;
        let new_total = (product_price * new_product_amount).toFixed(2);

        product.querySelector('span.amount').textContent = new_product_amount;
        product.querySelector('span.total').textContent = '$' + new_total;

        if(!product.querySelector('.minus').classList.contains('actived')) product.querySelector('.minus').classList.add('actived');
        
    }

    function subtractProduct(e)
    {
        const product = findProductParent(e.target);

        const price = product.querySelector('.product__price').textContent.substring(1);
        const product_price = parseFloat(price,10);

        const amount = parseInt(product.querySelector('span.amount').textContent,10);
        const product_amount = parseInt(amount,10);

        let new_product_amount = product_amount - 1;
        let new_total = (product_price * new_product_amount).toFixed(2);

        product.querySelector('span.amount').textContent = new_product_amount;
        product.querySelector('span.total').textContent = '$' + new_total;

        if(new_product_amount == 0) e.target.classList.remove('actived');
        
    }

    function findProductParent(el)
    {
        let product = el;
        while(!product.classList.contains('product'))
        {
            product = product.parentElement;
        }
        return product;
    }
}

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
//Cerrar formulario de busqueda y el contenedor de categorias para movil
/*--------------------------------------------*/

document.querySelector('body').addEventListener('click', (e) => handleBodyEvent(e.target))

function handleBodyEvent(el)
{
    if(!el.classList.contains('category') && !el.classList.contains('category-pick') && !el.classList.contains('category-container'))
    {
        if(document.getElementById('category__search__menu').classList.contains('actived'))
        {
            document.getElementById('category__search__menu').classList.remove('actived');
        } 
    }

    if(!el.classList.contains('all__btn__categories') && !el.classList.contains('category__selected') && !el.classList.contains('btn__category'))
    {
        const all_categories_container = document.getElementById('category_select__mobile').querySelector('.all__btn__categories');

        if(all_categories_container.style.maxHeight)
        {
            all_categories_container.style.maxHeight = null;
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
                document.querySelector('label.checked').classList.toggle('checked');

                //Actualizar el elemento seleccionado
                label.classList.toggle('checked');

                //Actualizar el texto del elemento span.category
                span_button_toggle.textContent = label.querySelector('.radio__link').textContent;

                //Toggle de menu
                category_container.classList.toggle('actived');
            }
        }
    }

    //Buscar el label
    function findNearestParentLabel(el)
    {
        let label = el;
        while(label.tagName != 'LABEL')
        {
            label = label.parentElement;
        }
        return label;
    }
}

/*--------------------------------------------*/
//Lista de categorias de los productos
/*--------------------------------------------*/

if(document.getElementById('category_select'))
{
    const category_container = document.getElementById('category_select');

    /*Events*/

    category_container.addEventListener('click', (e) => selectCategory(e));

    /*Functions*/

    function selectCategory(e)
    {
        if(e.target.classList.contains('btn__category'))
        {
            const button_category = e.target;
            if(!button_category.classList.contains('checked'))
            {
                category_container.querySelector('.checked').classList.toggle('checked');
                document.querySelector('span.category__selected').textContent = button_category.textContent;
                button_category.classList.toggle('checked');
                showProductsByCategory(button_category.textContent.toUpperCase());
            }
        }
    }
}

/*--------------------------------------------*/
//Lista de categorias de los productos - celular
/*--------------------------------------------*/

if(document.getElementById('category_select__mobile'))
{
    const category_mobile_container = document.getElementById('category_select__mobile')
    const category_selected = category_mobile_container.querySelector('span.category__selected');
    const all_categories_container = category_mobile_container.querySelector('.all__btn__categories');

    /*Events*/

    category_selected.addEventListener('click', displayAllCategoriesMobile);
    all_categories_container.addEventListener('click', (e)=> selectCategoryMobile(e));

    /*Functions*/

    function selectCategoryMobile(e)
    {
        if(e.target.classList.contains('btn__category'))
        {
            const button_category = e.target;

            category_selected.textContent = button_category.textContent;
            all_categories_container.style.maxHeight = null;

            const container_categories = document.getElementById('category_select');
            const all_buttons_category = container_categories.querySelectorAll('button.btn.btn__category');

            container_categories.querySelector('.checked').classList.toggle('checked');

            all_buttons_category.forEach((item) => {
                if(item.textContent == category_selected.textContent) item.classList.toggle('checked');
            });
            showProductsByCategory(button_category.textContent.toUpperCase());
        }
    }

    function displayAllCategoriesMobile()
    {
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

/*--------------------------------------------*/
//Mostrar los productos por categoria
/*--------------------------------------------*/

function showProductsByCategory(category)
{
    if(category === 'TODOS')
    {
        const pages = slicePoducts(products);
        products_pages = pages;

        /*Productos*/
        const products_container = document.getElementById('products-container');
        const products_to_render = products_pages[0].data;

        products_container.innerHTML = '';

        renderProducts(products_to_render,products_container);

        /*Paginación*/

        const actual_pages = document.querySelectorAll('div.pagination.container .page.p__item');            
        actual_pages.forEach( el => el.remove());

        renderAllPageItem();
    }
    else
    {
        getProductsByCategory(category)
        .then( products => {
            const pages = slicePoducts(products);
            
            products_pages = pages;
            
            /*Productos*/
            const products_container = document.getElementById('products-container');
            const products_to_render = products_pages[0].data;

            products_container.innerHTML = '';

            renderProducts(products_to_render,products_container);

            /*Paginación*/

            const actual_pages = document.querySelectorAll('div.pagination.container .page.p__item');            
            actual_pages.forEach( el => el.remove());

            renderAllPageItem();

        })
    }
}