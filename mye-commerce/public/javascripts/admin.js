window.onload = () => {

    const buttons = document.querySelectorAll(".sideBar_button")
    buttons.forEach( button => {
        button.onclick = () => {
            const dataItem = button.getAttribute("data-title");
            const item = document.querySelector(".items." + dataItem);

            if(button.hasAttribute("style") == false){
                button.setAttribute("style", "box-shadow: inset 0 0 3px 1px black;")
            } else {
                button.removeAttribute("style")
            }

            if(item.hasAttribute("style") == false){
                item.setAttribute("style", "display: flex;")
            } else {
                item.removeAttribute("style")
            }

        }
    })

    const buttonsDelete = document.querySelectorAll(".button_form_delete");

    buttonsDelete.forEach( button => {
        button.onclick = (e) => {
            const eliminar = confirm("Esta seguro que desea eliminar este producto ?")
            console.log(eliminar)
            if(eliminar == false){
                e.preventDefault()
            } else {}

        }
    })
    

}