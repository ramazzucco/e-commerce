import React, { Component } from 'react'

export default class Users extends Component {

    state = {
        users: [],
        totalUsers: 0,
    };

    async componentDidMount() {
        const res = await fetch("http://localhost:3000/api/apiUsers");
        const data = await res.json();
        this.setState({
            users: data.data,
            totalUsers: data.meta.totalItems,
        });
    }

    render() {
        return (
            <div className="col-10 mt-2">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Total de usuarios: ({this.state.totalUsers})</th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Email</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map( user => {
                            if(user.status === 2){
                                return (
                                    <tr className="bg-success" key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.city}</td>
                                        <td>{user.avatar}</td>
                                        <td>{user.status}</td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.city}</td>
                                        <td>{user.avatar}</td>
                                        <td>{user.status}</td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
