import React, { Component } from "react";
import "../App.css";
import SideBarButton from "./SideBarButton";

export default class SideBar extends Component {
    render() {
        return (
            <div className="btn-group d-flex flex-column bg-dark col-2 pt-5" role="group">
                <SideBarButton  />
            </div>
        );
    }
}
