import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Messages extends Component {
    state = {
        totalItems: 0,
        users: [],
    };

    async componentDidMount() {
        const res = await fetch("http://localhost:3000/api/dashboard/usersWithMessages");
        const data = await res.json();
        this.setState({
            totalItems: data.meta.totalItems,
            users: data.data,
        });
    }

    render() {
        return (
            <div className="message_container  col-10">
                {
                    this.state.users.map( user => {
                        return (
                            <div key={user.id} className="col-12 w-100 my-3 p-2 rounded-pill bg-dark">

                                <Link className="text-info font-weight-bold text-capitalize pl-3"
                                    to={{ pathname: `/content/message`,
                                        state: user.id
                                    }}
                                >
                                    {user.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

