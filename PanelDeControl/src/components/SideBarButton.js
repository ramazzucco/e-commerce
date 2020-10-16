import React, { Component } from 'react'
import { Link } from "react-router-dom"


export default class SideBarButton extends Component {

    state = {
        categories: [],
        style: "green"
    }

    async componentDidMount() {
        const res = await fetch("http://localhost:3000/api/product");
        const {categories} = await res.json();
        this.setState({
            categories: categories
        })
    }


    render() {
        return (
            <React.Fragment>
               <div className="d-flex mx-auto">
                    <p>
                        <i className="fa fa-wifi" style={{color: this.state.style}}  aria-hidden="true"></i>
                    </p>
                    <button>
                        <Link  to="/">
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </Link>
                    </button>
               </div>
                <button id="btnGroupDrop1" 
                    type="button" 
                    className="dropdown-toggle button text-decoration-none"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Productos
                </button>
                <div className="dropdown-menu col-11" aria-labelledby="btnGroupDrop1">
                    <p className="dropdown-item">
                        <Link className="text-decoration-none text-capitalize" to="/content/products">
                            Todos los Productos
                        </Link>
                    </p>
                    {
                        this.state.categories.map( (category,i) => {
                            return (
                                <p className="dropdown-item " key={i}>
                                    <Link className="text-decoration-none text-capitalize"
                                        to={{ pathname: `/content/${category.name}`,
                                        state: category.id
                                        }}
                                    >
                                        {category.name}
                                    </Link>
                                </p>
                            )
                        })
                    }
                    <p className="dropdown-item ">
                        <Link className="text-decoration-none text-capitalize"
                            to="/content/productCreate"
                        >
                            Agregar Producto
                        </Link>
                    </p>
                </div>
                <button type="button" >
                    <Link className="button text-decoration-none text-uppercase" to="/content/users">
                        Usuarios
                    </Link>
                </button>
                <button type="button" >
                    <Link className="button text-decoration-none text-uppercase" to="/content/usersWithMessages">
                        Mensajes
                    </Link>
                </button>
                <button type="button" >
                    <Link className="button text-decoration-none text-uppercase" to="/content/ofertas">
                        Ofertas
                    </Link>
                </button>
            </React.Fragment>
        )
    }
}
    
    
