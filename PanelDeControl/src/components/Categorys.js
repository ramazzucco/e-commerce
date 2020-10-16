import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class Categorys extends Component {
    state = {
        categorys: [],
        chartData: {
            labels: [],
            datasets: [],
        },
    };

    async componentDidMount() {
        const res = await fetch(
            "http://localhost:3000/api/dashboard/categories"
        );
        const data = await res.json();
        this.setState({
            categorys: data.data,
            chartData: {
                labels: data.data.map((category) => {
                    return category.products.title;
                }),
                datasets: [
                    {
                        label: `Total de Productos: ${data.meta.totalProducts}`,
                        data: data.data.map((category) => {
                            return category.total_products;
                        }),
                        backgroundColor: [
                            "rgba(63, 81, 181, 0.5)",
                            "rgba(77, 182, 172, 0.5)",
                            "rgba(66, 133, 244, 0.5)",
                            "rgba(156, 39, 176, 0.5)",
                            "rgba(233, 30, 99, 0.5)",
                        ],
                    },
                ]
            },
        });
    }

    render() {
        return (
            <div className="col-6">
                <Bar data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: "Cantidad de Productos por Categorias",
                            fontSize: 20,
                        },
                        scales: {
                            yAxes:[
                                {
                                    ticks:{
                                        beginAtZero: true
                                    }
                                }
                            ],
                        }
                    }}
                />
            </div>
        );
    }
}
