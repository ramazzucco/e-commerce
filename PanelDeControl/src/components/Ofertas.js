import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Ofertas extends Component {
    state = {
        totalItems: 0,
        promotions: []
    }

    async componentDidMount() {
        const res = await fetch("http://localhost:3000/api/dashboard/promotions");
        const data = await res.json();
        this.setState({
            totalItems: data.meta.totalItems,
            promotions: data.data
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-10 d-flex flex-wrap mt-2">
                    <table className="table mb-0 table-dark">
                        <thead>
                            <tr>
                                <th scope="col" className="pl-5 text-capitalize">Ofertas</th>
                                <th scope="col" className="text-right">
                                    <Link
                                        className="text-decoration-none"
                                        to="/content/nuevaOferta"
                                    >
                                        <button className="btn btn-outline-info btn-sm my-0">
                                            Nueva Oferta
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                    </table>
                {
                    this.state.promotions.map((promo,i) => {
                        return (
                            <div className="card oferta mb-3 mx-auto col-4 h-50 shadow p-3 mb-5 bg-white rounded" 
                                key={i}
                            >
                                <img src={`http://localhost:3000/images/${promo.image}`} 
                                    className="card-img-top" 
                                    alt="..." 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{promo.product_name}</h5>
                                    <p className="card-text">{promo.description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </React.Fragment>
        )
    }
}
