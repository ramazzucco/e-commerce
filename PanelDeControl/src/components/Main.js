import React, { Component } from 'react'

//Components.
import SideBar from "./SideBar";
import Content from './Content';

export default class Main extends Component {
    render() {
        return (
            <div className="content_container d-flex">
                <SideBar />
                <Content />
            </div>
        )
    }
}
