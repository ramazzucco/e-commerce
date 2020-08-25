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

    if (pantalla < 611) {
        menuColumn();
    } else {
        menuInline();
    }

    // --SACA EL BOTON MENU Y PONE EL MENU INLINE----//
    function menuInline() {
        document.querySelector(".buttonCollapse").setAttribute("style", "display: none;");
        document.getElementById("menu-column").removeAttribute("style");
        document.getElementById("menu-inline").setAttribute("style", "display: flex;");
    }

    // ----SACA EL MENU INLINE Y PONE EL BOTON MENU ----//
    function menuColumn() {
        document.querySelector(".buttonCollapse").setAttribute("style", "display: flex;");
        document.getElementById("menu-inline").setAttribute("style", "display: none;");
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
    //------------------------COLOCA EL FORMULARIO DE LOGEO-------------------------//
    const login = document.querySelector(".material-icons.icon-login");
    if (login) {
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            login.onclick = function() {
                modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            let input = document.querySelectorAll("form input");
            input.forEach( element => {
                if(element.value != ""){
                    element.style.borderBottom = "black solid 2px"
                }
                element.onblur = () => {
        
                   if(element.value != ""){
                       element.style.borderBottom = "black solid 2px"
                    }
                }
            })
            let enviar = document.querySelector(".button_login");
            enviar.onclick = () => {
                let email = document.getElementById("email");
                let password = document.getElementById("password");
                // if(email.value != "" && password.value != ""){
                //     document.querySelector(".form").style.boxShadow = `inset 0px 0px 10px 10px rgba(0, 255, 0, 0.5)`
                // }
            }
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
