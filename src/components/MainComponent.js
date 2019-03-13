import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Gallery from './GalleryComponent';
import { PICTURES } from "../shared/pictures";
import Header from './HeaderComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: PICTURES
        };
    }

    render() {

        const HomePage = () => {
            return(
                <Home />
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/gallery' component={() => <Gallery pictures={this.state.pictures} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;