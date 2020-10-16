import React, { Component } from 'react'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

export default class Celulares extends Component {

    state = {
        title: "",
        totalProducts: 0,
        products: [],
        deleteOne: true,
        deleteArray: false,
        arrayId: [],
        checked: false
    }

    async componentDidMount () {
        const res = await fetch(`http://localhost:3000/api/dashboard/category/${this.props.location.state}`);
        const data = await res.json();
        this.setState({
            title: data.meta.title,
            totalProducts: data.meta.totalItems,
            totalPrice: data.meta.totalPrice,
            products: data.data
        })
        console.log(this.props.location.state)
    }

    deleteProduct = (id, product) => {
        if(id.length !== "undefined"){
            swal({
                title: "Eliminar?",
                text: `Esta seguro que desea eliminar el producto "${product}"`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    swal( `Productos "${product}"`, "Fue eliminado con exito", "success");
                    const option = {
                    method: "DELETE",
                    }
                    fetch(`http://localhost:3000/api/product/delete/${id}`, option)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            products: data.products
                        })
                    })
                } else {
                    swal("Eliminar producto, cancelado");
                }
            })
        } else {
            swal("No ha seleccionado ningun producto")
        }

    }

    deleteArray = () => {
        this.setState({
            deleteOne: !this.state.deleteOne,
            deleteArray: !this.state.deleteArray,
            checked: !this.state.checked
        })
    }

    checkId = (e) => {
        if(e.target.checked === true){
            this.setState({
                arrayId: [...this.state.arrayId, e.target.value]
            })
        } else {
            this.setState({
                arrayId: this.state.arrayId.filter( id => id !== e.target.value)
            })
        }

        if(this.state.arrayId.length + 1 > 0){
            this.setState({
                checked: true
            })
        } else {
            this.setState({
                checked: false
            })
        }
    }



    render() {
        return (
            <div className="col-10 mt-2">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">{this.state.title} ({this.state.totalProducts})</th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Descuento</th>
                            <th scope="col">Modificar</th>
                            <th scope="col">
                                <button className="btn btn-outline-danger btn-sm m-0"
                                    onClick={this.deleteArray}
                                >
                                    Eliminar
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map( product => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <a className="text-primary"
                                           href={`${product.page}`}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                        >
                                            {product.name}
                                        </a>
                                    </td>
                                    <td>$ {product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.discount} %</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mb-0">
                                            <Link to={{ pathname: `/content/productModify`,
                                                state: product.id
                                                }}
                                                className="text-white text-decoration-none"
                                            >
                                                Modificar
                                            </Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button className={`btn btn-danger btn-sm
                                            ${this.state.deleteOne === true ? "d-flex" : "d-none"} mb-0`}
                                            onClick={() => this.deleteProduct(product.id, product.name) }
                                        >
                                            Eliminar
                                        </button>
                                        <input className={`checkId
                                            ${this.state.deleteArray === false ? "d-none" : "d-flex"}`}
                                            type="checkbox"
                                            name="id"
                                            value={product.id}
                                            onClick={this.checkId}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan="2">Total</th>
                            <th colSpan="4">$ { this.state.totalPrice }</th>
                            <th colSpan="1">
                                <button className={`btn btn-outline-primary btn-sm
                                    ${this.state.checked === false ? "d-none" : "d-flex"}`}
                                    onClick={() => this.deleteProduct(this.state.arrayId, this.state.arrayId) }
                                >
                                    Aceptar
                                </button>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
