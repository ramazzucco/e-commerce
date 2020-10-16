import React, { Component } from "react";
import "../css/lastProduct.css"

export default class LastProduct extends Component {
    state = {
        product: [],
    };

    async componentDidMount() {
        const res = await fetch("http://localhost:3000/api/dashboard/lastProduct");
        const data = await res.json();
        this.setState({
            product: data.data,
        });
        console.log(data)
    }

    render() {
        return (
            <div className="card-container col-6 my-5">
                <div className="card front w-50 p-0 mx-auto">
                    <div className="card-title">
                        <h5 className="text-center my-2 font-weight-bold text-capitalize">
                            Ultimo producto agregado
                        </h5>
                    </div>
                    <img src={`http://localhost:3000/images/${this.state.product.image}`}
                        className="card-img"
                        alt={this.state.product.name}
                    />
                </div>
                <div className="card back w-50 p-0 mx-auto">
                    <div className="detail my-auto">
                        <h5 className="text-center font-weight-bolder mb-3">{this.state.product.name}</h5>
                        <p className="text-center text-capitalize">{this.state.product.category}</p>
                        <h6 className="text-center mb-3">$ {this.state.product.price}</h6>
                        <p className="text-center">
                            Stock <span className="text-info">{this.state.product.stock}</span> Unidades
                        </p>
                        <p className="text-center">
                            Descuento <span className="text-info">{this.state.product.discount}</span> %
                        </p>
                        <p className="text-center">
                            <a className="mx-auto"
                                href={this.state.product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ir al Producto
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
