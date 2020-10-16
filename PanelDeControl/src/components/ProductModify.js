import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default class ProductModify extends Component {
    state = {
        id: 0,
        category: 0,
        name: "",
        price: 0,
        description: "",
        stock: 0,
        discount: 0,
        categorys: []
    }

    async componentDidMount() {
        const res = await fetch(`http://localhost:3000/api/product/${this.props.location.state}`);
        const data = await res.json();
        this.setState({
            id: data.data.id,
            category: data.data.category,
            name: data.data.name,
            price: data.data.price,
            description: data.data.description,
            stock: data.data.stock,
            discount: data.data.discount,
            categorys: data.data.categorys
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        const data = {
            category: this.state.category.id,
            name: this.state.name,
            price: Number(this.state.price),
            description: this.state.description,
            stock: this.state.stock,
            discount: this.state.discount
        }
        console.log("desde react: ",data)
        const option = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(`http://localhost:3000/api/product/update/${this.state.id}`, option)
        .then(res => res.json())
        .then(data => {
            if(data.error === false){
                swal({
                    title: this.state.name,
                    text: "Ha sido Actualizado",
                    icon: "success",
                })
                document.querySelector("button.goToCategory").classList.remove("d-none")
                document.querySelector("button.goToCategory").classList.add("d-flex")
            } else {
                this.setState({
                })
                swal(this.state.name, "No ha sido Actualizado", "error");
            }
        })
    }

    render() {
        return (
            <form className="col-10 py-5">
                <h5 className="text-center mb-5">{this.state.name}</h5>
                <div className="form-column col-12">
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Categoria</label>
                        <select className="form-control bg-dark text-info" 
                            onChange={this.onChange}
                            name="category"
                        >
                            {
                                this.state.categorys.map( category => {
                                    if(category.id === this.state.category){
                                        return <option selected key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    } else {
                                        return <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    }
                                })
                            }
                        </select>
                        <div className="valid-feedback category"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Nombre</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-info"
                            id="validationServer01"
                            value={this.state.name}
                            onChange={this.onChange}
                            name="name"
                        />
                        <div className="valid-feedback name"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Precio</label>
                        <input
                            type="number"
                            className="form-control bg-dark text-info"
                            id="validationServer01"
                            value={this.state.price}
                            onChange={this.onChange}
                            name="price"
                        />
                        <div className="valid-feedback price"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Descripcion</label>
                        <textarea className="form-control bg-dark text-info" 
                            value={this.state.description}
                            onChange={this.onChange}
                            name="description"
                        ></textarea>
                        <div className="valid-feedback description"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Stock</label>
                        <input
                            type="number"
                            className="form-control bg-dark text-info"
                            id="validationServer01"
                            value={this.state.stock}
                            onChange={this.onChange}
                            name="stock"
                        />
                        <div className="valid-feedback stock"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Descuento</label>
                        <input
                            type="number"
                            className="form-control bg-dark text-info"
                            id="validationServer01"
                            value={this.state.discount}
                            onChange={this.onChange}
                            name="discount"
                        />
                        <div className="valid-feedback discount"></div>
                    </div>
                    <div className="d-flex buttonModify justify-content-center">
                        <button className="btn btn-dark my-5 text-info"
                            type="submit"
                            onClick={this.handlerSubmit}
                        >
                            Modificar
                        </button>
                        <button className="goToCategory d-none btn btn-dark my-5 ml-5">
                            <Link className="text-decoration-none text-center text-uppercase  text-info"
                                to={{ pathname: `/content/${this.state.category.title}`,
                                state: this.state.category.title
                                }}
                            >
                                Ir a categoria {this.state.category.title}
                            </Link>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

