import React, { Component } from 'react'

export default class Products extends Component {

    state = {
        totalProducts: 0,
        categorys: [],
        products: []
    }

    async componentDidMount () {
        const res = await fetch("http://localhost:3000/api/product");
        const data = await res.json();
        this.setState({
            totalProducts: data.meta.totalItems,
            categorys: data.categories,
            products: data.data
        })
        console.log(data)
    }

    render() {
        return (
            <div className="col-10 mt-2">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Total de Productos: {this.state.totalProducts}</th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Descuento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map( product => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <a className="text-primary"
                                           href={`${product.link}`}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                        >
                                            {product.name}
                                        </a>
                                    </td>
                                    <td>$ {Number(product.price).toLocaleString()}</td>
                                    <td className="text-capitalize">{product.category.title}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.discount} %</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
