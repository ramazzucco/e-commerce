import React, { Component } from "react";

export default class NuevaOferta extends Component {

    state = {
        totalProducts: 0,
        categorys: [],
        products: [],
        products_id: "",
        description: "",
        image: []
    }

    async componentDidMount () {
        const res = await fetch("http://localhost:3000/api/product");
        const data = await res.json();
        this.setState({
            totalProducts: data.meta.totalItems,
            categorys: data.categories,
            products: data.data,
        })
    }

    handlerSubmit =  e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("products_id", this.state.products_id);
        formData.append("description", this.state.description);
        formData.append("image", this.state.image)

        const config = {
            method:"POST",
            body: formData,
        }
        fetch("http://localhost:3000/api/dashboard/promotions", config )
        .then(res => res.json())
        .then(res => res.create === "success" ? window.location.href = "http://localhost:5000/content/ofertas" : "")
    }
    onChange = e => {
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

    }

    render() {
        return (
            <div className="col-10">
                <table className="table my-3 w-100 table-dark">
                    <thead>
                        <tr>
                            <th scope="col" className="pl-5">
                                Nueva Oferta
                            </th>
                        </tr>
                    </thead>
                </table>
                <form
                    onSubmit={this.handlerSubmit}
                    className="form_create_promotion w-50 mx-auto mt-2"
                    method="post"
                    encType="multipart/form-data"
                >
                    <div className="form-group">
                        <select className="form-control" onChange={this.onChange} name="products_id" id="">
                            <option value={this.state.product} disabled selected>Seleccione un producto</option>
                            {
                                this.state.products.map( product => {
                                    return (
                                        <option key={product.id} value={product.id}>{ product.name }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            onChange={this.onChange}
                            value={this.state.description}
                            className="form-control"
                            name="description"
                            id="description"
                            cols="30"
                            rows="10"
                        ></textarea>
                    </div>
                    <div className="image d-flex justify-content-center">
                        <img src=""  alt="" />
                    </div>
                    <div className="form-group">
                        <input className="form-control-file promotions"
                            onChange={this.onChange}
                            type="file"
                            name="image"
                            id="image_promotions"
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button  type="submit" className="send_offer btn btn-dark">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}
