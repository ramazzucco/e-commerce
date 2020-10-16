import React, { Component } from 'react'
import "../css/navBar.css"

export default class NavBar extends Component {

    date = () => {
        const f=new Date();
        const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        const date = (f.getDate() + " de " + month[f.getMonth()] + " de " + f.getFullYear());
        return date;
    }

    render() {
        return (
            <nav className="navbar bg-dark d-flex justify-content-end">
                <div className="col-7">
                    <p className="h3 text-primary">Panel de Control</p>
                </div>
                <div className="col-2">
                    <p className="text-light m-0 text-right">{this.date()}</p>
                </div>
                <div className="col-2 d-flex justify-content-end">
                    <p className="text-light m-0">Ramiro Mazzucco</p>
                </div>
                <div className="col-1 avatar d-flex justify-content-end">
                    <img src={`http://localhost:3000/images/avatars/avatar-1598737544821.JPG`} alt="" />
                </div>
            </nav>
        )
    }
}
