import React, { Component } from 'react'
import { Doughnut } from "react-chartjs-2";

export default class Cardas extends Component {

    state = {
        data: [],
        chartData: {
            labels: [],
            datasets: [],
        },
    }

    async componentDidMount () {
        const resProducts = await fetch("http://localhost:3000/api/dashboard/widgets");
        const products = await resProducts.json();
        this.setState({
            data: products.data,
            chartData: {
                labels: products.data.map((card) => {
                    return card.text;
                }),
                datasets: [
                    {
                        label: `Informacion General`,
                        data: products.data.map((card) => {
                            return card.value;
                        }),
                        backgroundColor: [
                            "rgba(0, 0, 255, 1)",
                            "rgba(0, 255, 0, 1)",
                            "rgba(255, 0, 0, 1)",
                        ],
                    },
                ]
            },
        })
    }

    render() {
        return (
            <div className="col-6 d-flex">
                <Doughnut
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: "Informacion General",
                            fontSize: 20,
                        },
                        maintainAspectRatio: true,
                    }}/>
            </div>
        )
    }
}
