window.onload = () => {
    //========================================HEADER _ HEADER _ HEADER==============================================//
    //--------------  INPUT SEARCH -----------------------------//
    let input = document.querySelector(".search input");
    let iconSearch = document.querySelector(".icon-search");

    input.onfocus = () => {
        input.setAttribute("style","box-shadow: -5px 1px 10px 5px var(--bgColorHover);")
        iconSearch.setAttribute("style","box-shadow: 5px 1px 10px 5px var(--bgColorHover);")
        input.onblur = () => {
            input.removeAttribute("style");
            iconSearch.removeAttribute("style")
        }
    }

    //---------COLAPSAR BOTON MENU----------------------//

    let button = document.querySelector(".buttonCollapse");

    let menu = document.getElementById("menu-column");

    let pantalla = window.screen.width;

    button.onclick = () => {
        if (menu.hasAttribute("style") == false) {
            menu.setAttribute("style", "display: flex;");
        } else {
            menu.removeAttribute("style");
        }
    };

    if (pantalla < 768) {
        menuColumn();
    } else {
        menuInline();
    }

    // --SACA EL BOTON MENU Y PONE EL MENU INLINE----//
    function menuInline() {
        document.querySelector(".buttonCollapse").setAttribute("style", "display: none;");
        document.querySelector(".navBar-inline").removeAttribute("style");
        document.getElementById("menu-inline").setAttribute("style", "display: flex;");
        document.querySelector(".navBar-inline").setAttribute("style", "display: flex")
        document.getElementById("menu-column").removeAttribute("style")
    }

    // ----SACA EL MENU INLINE Y PONE EL BOTON MENU ----//
    function menuColumn() {
        document.querySelector(".buttonCollapse").setAttribute("style", "display: flex;");
        document.querySelector(".navBar-inline").setAttribute("style", "display: none;");
    }

    // -CAMBIA EL MENU SEGUN EL TAMAÑO DE PANTALLA-//
    window.onresize = () => {
        // console.log(window.screen.width)
        if (window.screen.width < 768) {
            menuColumn();
        } else {
            menuInline();
        }
    };

    const login = document.querySelector(".material-icons.icon-login");

    if(login.hasAttribute("data-user")){
        login.classList.add("loginOn")
    }

    //----------------------   ABRIR Y CERRAR CARRITO   -------------------------//

    const cartIcon = document.querySelector(".icon-cart");
    const cartContainer = document.querySelector(".container_cart");

    if(cartIcon){
        cartIcon.onclick = () => {
            if(cartContainer.hasAttribute("style") == false){
                cartIcon.classList.add("loginOn");
                cartContainer.setAttribute("style","display: flex");
            } else {
                cartContainer.removeAttribute("style");
                cartIcon.classList.remove("loginOn");
            }
        }

    }
    
    //==========================================BODY _ BODY _ BODY=============================================//

    //-------------------------------- SLIDER AUTOMATICO Y MANUAL-------------------------------//
    $(function(){
        $('#slider a:gt(0)').hide();
        var interval = setInterval(changeDiv, 6000);
        function changeDiv(){
        $('#slider a:first-child').fadeOut(1000).next('a').fadeIn(1000).end().appendTo('#slider');
        };
        $('.mas').click(function(){
        changeDiv();
        clearInterval(interval);
        interval = setInterval(changeDiv, 6000);
        });
        $('.menos').click(function(){
        $('#slider a:first-child').fadeOut(1000);
        $('#slider a:last-child').fadeIn(1000).prependTo('#slider');
        clearInterval(interval);
        interval = setInterval(changeDiv, 6000);
        });
    });

    //------------   MODIFICAR LA CANTIDAD DE PRODUCTOS A COMPRAR EN EL CARRITO--------//

    const singleProduct = document.querySelectorAll(".singleProduct");

    singleProduct.forEach( product => {

        const id = product.getAttribute("data-id");
        const price = product.querySelector(".cart_content h6 span").innerHTML;
        const discount = product.querySelector(".cart_content h5 span").innerHTML;
        const quantity = document.getElementById(`quantity${id}`);
        const oneSubTotal = document.querySelector(`.price.id${id} span`);
        const totalPrice = document.querySelector(".total_price h3 span");
        quantity.onchange = () => {

            const subTotal = ((Number(price) - ( Number(price) * Number(discount) ) / 100 )) * Number(quantity.value);
            oneSubTotal.innerHTML = subTotal.toFixed(2);
            const subtotales = document.querySelectorAll(".price span")

            let total = 0;
            subtotales.forEach(subtotal => {
                total += Number(subtotal.innerHTML);
            })
            totalPrice.innerHTML = total.toFixed(2);

        }

    })

 //---------------------------------- AGREGAR AL CARRITO ----------------------------------------//

    const iconAdd = document.querySelectorAll(".fa-cart-plus");

    if(sessionStorage.cart){
        document.querySelector(".oneProduct").innerHTML = sessionStorage.getItem("cart");
        document.querySelector(".form_cart").innerHTML += sessionStorage.getItem("itemsId");
    }

    let items = [];
    let itemsId = [];

    iconAdd.forEach( element => {

        element.onclick = () => {

            const id = element.getAttribute("data-id");
            const image = document.querySelector(`.prod${id} .item_image`);
            const name = document.querySelector(`.prod${id} .item_name`);
            const price = document.querySelector(`.prod${id} .item_price`);

            if(!sessionStorage.cart){

                items.push(`<div class="row"><div class="image_cart"><img src="${image.src}" alt=""></div><div class="content_cart"><h3>${name.innerHTML}</h3><p>${price.innerHTML}</p></div></div>`);
                itemsId.push(`<input name="id" style="display: none;" value="${id}">`);
                sessionStorage.setItem("cart",`${items}`);
                sessionStorage.setItem("itemsId",`${itemsId}`);

            } else {

                items = [];
                itemsId = [];
                const sessionItems = sessionStorage.getItem("cart");
                const sessionItemsId = sessionStorage.getItem("itemsId");
                items.push(`<div class="row"><div class="image_cart"><img src="${image.src}" alt=""></div><div class="content_cart"><h3>${name.innerHTML}</h3><p>${price.innerHTML}</p></div></div>`, sessionItems);
                itemsId.push(`<input name="id" style="display: none;" value="${id}">`, sessionItemsId);
                // items.push(sessionItems);
                // itemsId.push(sessionItemsId);
                sessionStorage.setItem("cart",`${items}`);
                sessionStorage.setItem("itemsId",`${itemsId}`);

            }

            document.querySelector(".oneProduct").innerHTML = items.join("");
            document.querySelector(".form_cart").innerHTML += itemsId.join("");

        }

        const clearCart = document.querySelector(".clear_cart");
        clearCart.onclick = () => {

            sessionStorage.clear("cart");
            sessionStorage.clear("itemsId");
            sessionStorage.clear("cantItems");
            document.querySelector(".oneProduct").innerHTML = sessionStorage.getItem("cart");
            document.querySelector(".form_cart").innerHTML += "";
            location.reload(true);

        }
        
    })

    //---------------------------------    PROFILE   ---------------------------------------------//
    const enableModify = document.querySelector(".eneable_modify");

    if(enableModify){
        const inputs = document.querySelectorAll(".form_update_profile input");
        const cancelar = document.querySelector(".disable_modify");
        const enviar = document.querySelector(".modify_myDates");
        const buttonsEneabled = document.querySelector(".buttons_eneabled");

        enableModify.onclick = () => {

            enableModify.setAttribute("style","display:none;");
            buttonsEneabled.setAttribute("style","display: flex;");

            inputs.forEach( input => {
                input.removeAttribute("disabled")
            })

        }

        cancelar.onclick = () => {

            buttonsEneabled.removeAttribute("style");
            enableModify.removeAttribute("style");

            inputs.forEach( input => {
                input.setAttribute("disabled","")
            })
        }

    }

    const enabled = document.querySelectorAll(".enabled_button");
    console.log(enabled)
    if(enabled){

        enabled.forEach( button => {
            const id = button.getAttribute("data-id");
            button.onclick = () => {

                const detail = document.querySelector(`.id${id}`);
                // const primaryContent = document.querySelector(`.${id}`)
                if(detail.hasAttribute("style")){
                    detail.removeAttribute("style");
                } else {
                    detail.setAttribute("style","display: flex;");
                }

            }
        })

    }
};
