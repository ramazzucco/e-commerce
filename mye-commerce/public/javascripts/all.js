window.onload = () => {
    //========================================HEADER _ HEADER _ HEADER==============================================//

    let button = document.querySelector(".buttonCollapse");

    let menu = document.getElementById("menu-column");

    let pantalla = window.screen.width;

    //---------COLAPSAR BOTON MENU----------------------//
    button.onclick = () => {
        if (menu.hasAttribute("style") == false) {
            menu.setAttribute("style", "display: flex;");
        } else {
            menu.removeAttribute("style");
        }
    };

    if (pantalla < 611) {
        menuColumn();
    } else {
        menuInline();
    }

    // --SACA EL BOTON MENU Y PONE EL MENU INLINE----//
    function menuInline() {
        document
            .querySelector(".buttonCollapse")
            .setAttribute("style", "display: none;");
        document.getElementById("menu-column").removeAttribute("style");
        document
            .getElementById("menu-inline")
            .setAttribute("style", "display: flex;");
    }

    // ----SACA EL MENU INLINE Y PONE EL BOTON MENU ----//
    function menuColumn() {
        document
            .querySelector(".buttonCollapse")
            .setAttribute("style", "display: flex;");
        document
            .getElementById("menu-inline")
            .setAttribute("style", "display: none;");
    }

    // -CAMBIA EL MENU SEGUN EL TAMAÑO DE PANTALLA-//
    window.onresize = () => {
        // console.log(window.screen.width)
        if (window.screen.width < 611) {
            menuColumn();
        } else {
            menuInline();
        }
    };
    //------------------------COLOCA EL FORMULARIO DE LOGEO-----------------//
    const login = document.querySelector(".material-icons.icon-login");
    if (login) {
        login.onclick = () => {
            if (
                document.querySelector(".navbar-login").hasAttribute("style") ==
                false
            ) {
                document
                    .querySelector(".search")
                    .setAttribute("style", "display: none");
                document
                    .querySelector(".navbar-login")
                    .setAttribute("style", "display: flex;");
                document
                    .querySelector(".navbar-login form")
                    .setAttribute("style", "display: flex;");
            } else {
                document
                    .querySelector(".search")
                    .setAttribute("style", "display: flex");
                document
                    .querySelector(".navbar-login")
                    .removeAttribute("style");
                document
                    .querySelector(".navbar-login form")
                    .removeAttribute("style");
            }
        };
    }

    //===============================================BODY _ BODY _ BODY=============================================//
   
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

};
