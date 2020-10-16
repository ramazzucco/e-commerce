import React, { Component } from 'react'
import { Link } from "react-router-dom"
import swal from 'sweetalert';

export default class ProductCreate extends Component {
    state = {
        category: 0,
        name: "",
        price: 0,
        description: "",
        stock: 0,
        discount: 0,
        image: [],
        categorys: [],
        categoryName: ""
    }

    onChange = e => {
        if(e.target.name === "category"){
            this.setState({
                categoryName: document.querySelector(`.id${[e.target.value]}`).innerText
            })
        }
        if(e.target.files){
            this.setState({
                [e.target.name]: e.target.value,
                [e.target.name]: e.target.files[0]
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        validtionOnChange(this.state);
    }

    async componentDidMount(){
        const res = await fetch("http://localhost:3000/api/dashboard/categories")
        const data = await res.json();
        console.log(data)
        this.setState({
            categorys: data.data
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        validationSubmit(this.state);
    }

    render() {
        return (
            <form className="form_create col-10 pt-2 pb-5"
                onSubmit={this.handlerSubmit}
                method="post"
                encType="multipart/form-data"
            >
                <div className="col-12 bg-dark mb-5">
                    <h5 className="text-center text-info text-uppercase p-3">
                        Nuevo producto
                    </h5>
                </div>
                <div className="form-column col-12">
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Categoria</label>
                        <select className="form-control text-info"
                            onChange={this.onChange}
                            name="category"
                            id="category"
                        >
                            <option value={0} className="text-muted">
                                Seleccione una categoria
                            </option>
                            {
                                this.state.categorys.map( category => {
                                   return <option key={category.products.id}
                                        value={category.products.id}
                                        className={`id${category.products.id}`}
                                    >
                                        {category.products.title}
                                    </option>
                                })
                            }
                        </select>
                        <div className="invalid-feedback category"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Nombre</label>
                        <input
                            type="text"
                            className="form-control text-info"
                            id="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            name="name"
                        />
                        <div className="invalid-feedback name"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Precio</label>
                        <input
                            type="number"
                            className="form-control text-info"
                            id="price"
                            value={this.state.price}
                            onChange={this.onChange}
                            name="price"
                        />
                        <div className="invalid-feedback price"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Descripcion</label>
                        <textarea className="form-control text-info"
                            value={this.state.description}
                            onChange={this.onChange}
                            name="description"
                            id="description"
                        ></textarea>
                        <div className="invalid-feedback description"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Stock</label>
                        <input
                            type="number"
                            className="form-control text-info"
                            id="stock"
                            value={this.state.stock}
                            onChange={this.onChange}
                            name="stock"
                        />
                        <div className="invalid-feedback stock"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Descuento</label>
                        <input
                            type="number"
                            className="form-control text-info"
                            id="discount"
                            value={this.state.discount}
                            onChange={this.onChange}
                            name="discount"
                        />
                        <div className="invalid-feedback discount"></div>
                    </div>
                    <div className="form-group col-10 mx-auto">
                        <label htmlFor="validationServer01">Imagen</label>
                        <input className="form-control"
                            onChange={this.onChange}
                            type="file"
                            name="image"
                            id="image"
                        />
                        <div className="invalid-feedback image"></div>
                    </div>
                    <div className="d-flex buttonModify justify-content-center">
                        <button className="btn btn-dark my-5 text-info"
                            type="submit"
                            onClick={this.handlerSubmit}
                        >
                            Crear
                        </button>
                        <button className="goToCategory d-none btn btn-dark my-5 ml-5">
                            <Link className="text-decoration-none text-center text-uppercase  text-info"
                                to={{ pathname: `/content/${this.state.categoryName}`,
                                state: this.state.categoryName
                                }}
                            >
                                Ir a categoria {this.state.categoryName}
                            </Link>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}
function validationSubmit(state){
    const formData = new FormData();
    const errors = [];

    state.category !== 0 ? formData.append("category_id", state.category)
        : errors.push("category", "Debe seleccionar una categoria");
    state.name !== "" ? formData.append("name", state.name) : errors.push("name", "Debe ingresar un nombre");
    state.price !== 0 ? formData.append("price", state.price) : errors.push("price", "Debe ingresar un precio");
    state.description !== "" ? formData.append("description", state.description)
        : errors.push("description", "Debe ingresar una descripcion");
    if(state.image.length === 0){
        formData.append("image", 'sin_imagen.jpg')
    } else {
        if(state.image.type === "image/jpeg" || state.image.type === "image/jpg" || state.image.type === "image/png"){
            formData.append("image", state.image)
        } else {
            errors.push("image", `La imagen debe ser del tipo ".jpeg" o ".jpg" o ".png"`)
        }
    }
    formData.append("stock", state.stock);
    formData.append("discount", state.discount);

    if(errors.length){
        for (let i = 0; i < errors.length; i=i+2) {
            console.log(`.${errors[i]}`)
            document.getElementById(`${errors[i]}`).classList.add("is-invalid")
            document.querySelector(`.form_create .invalid-feedback.${errors[i]}`)
            .classList.add("d-flex")
            document.querySelector(`.form_create .invalid-feedback.${errors[i]}`)
            .innerHTML = `<p className="error text-left text-danger">${errors[(i+1)]}</p>`
        }
    } else {
        const option = {
            method: "POST",
            body: formData,
        }
        fetch(`http://localhost:3000/api/product/create`, option)
        .then(res => res.json())
        .then(data => {
            if(data.error === false){
                document.querySelector(".goToCategory").classList.remove("d-none")
                swal({
                    title: state.name,
                    text: data.msg,
                    icon: "success",
                })
            } else {
                swal(state.name, data.msg, "error");
            }
        })
    }
}

function validtionOnChange(state){
    if(state.category !== 0){
        document.getElementById("category").classList.remove("is-invalid");
        document.querySelector(`.form_create .invalid-feedback.category`).innerHTML = "";
    }
    if(state.name !== ""){
        document.getElementById("name").classList.remove("is-invalid");
        document.querySelector(`.form_create .invalid-feedback.name`).innerHTML = "";
    }
    if(state.price !== 0){
        document.getElementById("price").classList.remove("is-invalid");
        document.querySelector(`.form_create .invalid-feedback.price`).innerHTML = "";
    }
    if(state.description !== ""){
        document.getElementById("description").classList.remove("is-invalid");
        document.querySelector(`.form_create .invalid-feedback.description`).innerHTML = "";
    }
    if(state.image.type === "image/jpeg" || state.image.type === "image/jpg" || state.image.type === "image/png"){
        document.getElementById("image").classList.remove("is-invalid");
        document.querySelector(`.form_create .invalid-feedback.image`).innerHTML = "";
    }
}