import React, { Component } from "react";

export default class Message extends Component {

    state = {
        user: [],
        messages: [],
    }

    async componentDidMount(){
        const res = await fetch("http://localhost:3000/api/dashboard/messages");
        const data = await res.json();
        const user = data.meta.users.filter(user => user.id === this.props.location.state )
        this.setState({
            user: user[0],
            messages: data.data,
        })
        console.log(this.state)
    }

    onChange = (e) => {
        var f=new Date();
        const date = (f.getDate() + " / " + f.getMonth() + " / " + f.getFullYear() + "  -  " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
        let products_id = "";
        this.state.messages.filter(m => { if(m.users_id === this.props.location.state){ products_id = m.products_id } })
        this.setState({
            users_id: 1,
            to_id: this.props.location.state,
            [e.target.name]: e.target.value,
            products_id: products_id,
            from_name: "ADMIN",
            to_name: this.state.user.first_name + " " + this.state.user.last_name,
            date: date
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        const data = {
            users_id: this.state.users_id,
            to_id: this.state.to_id,
            content: this.state.content,
            products_id: this.state.products_id,
            from_name: this.state.from_name,
            to_name: this.state.to_name,
            date: this.state.date
        }
        const newmessage = data;
        newmessage.product = this.state.messages.map(m => m.product ? m.product : "" )
        this.setState({
            messages: [
                ...this.state.messages,
                newmessage
            ],
        })
        document.querySelector("textarea").value = "";
        const options = {
            method:"POST",
            body: JSON.stringify(data) ,
            headers: {
                "content-type": "application/json"
            }
        }
        fetch("http://localhost:3000/api/dashboard/newmessage", options)
        .then(response => response.json())
        .then(response => console.log(response))
        console.log(this.state)
    }

    render() {
        return (
            <div className="d-flex flex-column w-100">
                {
                    this.state.messages.map( message => {
                        if(message.users_id === this.props.location.state || message.to_id === this.props.location.state){
                            return (
                                <div
                                    className="message bg-dark px-4"
                                    style={changeStyle(message.from_name,this.state.messages)}
                                    key={message.id}
                                >
                                    <p className="date">{message.date}</p>
                                    <p className="text-capitalize text-white font-weight-bold mb-0">
                                        {message.from_name}
                                    </p>
                                    <hr className="m-0 bg-info"></hr>
                                    <p className="text-white mb-2 mt-3">{message.content}</p>
                                    <p className="mb-0">
                                        <a
                                            className="text-info"
                                            href={`http:///localhost:3000/products/${message.products_id > 0 ? message.product.category_id : ""}/${message.products_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >{message.products_id > 0 ? message.product.name : ""}</a>
                                    </p>
                                </div>
                            );

                        }
                    })
                }
                <form className="form_messages d-flex flex-column w-100 my-5" id="form_messages" method="post">
                    <label className="mx-auto" htmlFor="">Escriba su mensaje aqui.</label>
                    <textarea className="rounded-lg w-50 mx-auto" 
                        name="content"
                        cols="100"
                        rows="1"
                        onChange={this.onChange}
                    >
                    </textarea>
                    <button type="submit" onClick={this.handlerSubmit}>Enviar</button>
                </form>
            </div>
        )
    }
}
function changeStyle(name, messages) {
    let style = "";
    messages.map((m) => {
        if (name === "ADMIN") {
            style = {
                marginLeft: "50%",
            };
        } else {
            style = {
                marginRight: "50%",
            };
        }
    });
    return style;
}