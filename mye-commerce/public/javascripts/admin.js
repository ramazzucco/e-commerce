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

    const users = document.querySelectorAll(".messages_admin .user .userName");

    users.forEach( user => {

        user.onclick = () => {

            const id = user.getAttribute("data-id")
            const messages = document.querySelector(`.message.id${id}`)
            const newMessage = document.querySelector(`.writeMessage.id${id}`)

            if(messages.hasAttribute("style")){
                messages.removeAttribute("style");
                newMessage.removeAttribute("style");
            } else {
                messages.setAttribute("style", "display: flex;");
                newMessage.setAttribute("style", "display: flex;");
            }

        }

    })
}