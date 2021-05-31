/*--------------------------------------------*/
//Todos los productos
/*--------------------------------------------*/

import { products } from './all-products.js';

const total_pages = Math.floor(products.length);

/*Añadir los productos a la página*/
if(document.getElementById('products-container'))
{
    const products_container = document.getElementById('products-container');
    renderProducts(products,products_container);
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

    product.innerHTML = `
        <div class="product__content">
            <div class="product__image">
                <img src="${element.img}" alt="${element.title}"/>
            </div>

            <div class="product__description">
                <h4 class="product__brand">${element.brand}</h4>
                <h3 class="product__title">${element.title}</h3>
                <span class="product__price">$${element.price}</span>
            </div>
        </div>
        <div class="product__options">
            <div class="product__add">
                <div class="minus"></div>
                <div class="plus"></div>
            </div>                    
            <button class="btn btn__purchase">Añadir <span class="amount">0</span> por <span class="total">$0.00</span></button>
        </div>
    `;

    return product;
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