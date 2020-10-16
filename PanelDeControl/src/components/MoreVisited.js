import React, { Component } from 'react'

export default class MoreVisited extends Component {
    state = {
        visitas: []
    }

    async componentDidMount() {
        const res = await fetch("http://localhost:3000/api/dashboard/morevisited");
        const data = await res.json();
        this.setState({
            visitas: data.data.top10
        })
        console.log("visitas", data)
    }

    reload = async() => {
        const res = await fetch("http://localhost:3000/api/dashboard/morevisited");
        const data = await res.json();
        this.setState({
            visitas: data.data.top10
        })
    }

    render() {
        return (
            <div className="col-6 mt-5">
                <div className="title bg-dark p-1">
                    <h5 className="text-center text-white font-weight-bolder">Top 10 Mas Visitados</h5>
                </div>
                <table className="table table-sm border-dark border-bottom">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Visita N°</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.visitas.map( (visita,i) => {
                                    return (
                                        <tr key={i} className="text-center">
                                            <th className="p-0" scope="row">{i + 1}</th>
                                            <th className="p-0" scope="row">
                                                <a href={`http://localhost:3000/products/${visita.category}/${visita.productsId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary"
                                                >
                                                    {visita.product}
                                                </a>
                                            </th>
                                            <th className="p-0" scope="row">{visita.visitaN}</th>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
        )
    }
}
