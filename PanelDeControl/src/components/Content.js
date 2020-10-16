import React, { Component } from "react";
import { Route } from "react-router-dom"

// Components.
import Cards from "./Cards"
import LastProduct from "./LastProduct"
import Categorys from "./Categorys"
import Products from './Products'
import Category from "./Category"
import Users from './Users'
import Ofertas from "./Ofertas"
import Messages from "./Messages"
import Message from "./Message"
import NuevaOferta from "./NuevaOferta"
import ProductModify from "./ProductModify"
import ProductCreate from "./ProductCreate";
import MoreVisited from "./MoreVisited";


export default class Content extends Component {

    render() {
        return (
            <React.Fragment>
                <Route exact path="/">
                    <div className="col-10 d-flex flex-wrap">
                        <Cards />
                        <Categorys />
                        <LastProduct />
                        <MoreVisited />
                    </div>
                </Route>
                <Route path="/content/products" component={Products}/>
                <Route path="/content/celulares" component={Category}/>
                <Route path="/content/laptops" component={Category}/>
                <Route path="/content/parlantes" component={Category}/>
                <Route path="/content/teclados" component={Category}/>
                <Route path="/content/mouse" component={Category}/>
                <Route path="/content/users" component={Users}/>
                <Route path="/content/ofertas" component={Ofertas}/>
                <Route path="/content/usersWithMessages" component={Messages}/>
                <Route path="/content/message" component={Message}/>
                <Route path="/content/nuevaOferta" component={NuevaOferta}/>
                <Route path="/content/productCreate" component={ProductCreate}/>
                <Route path="/content/productModify" component={ProductModify}/>
            </React.Fragment>
        );
    }
}
