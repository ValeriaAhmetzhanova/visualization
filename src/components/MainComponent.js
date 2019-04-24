import React, { Component } from 'react';
import Results from './ResultsComponent';

import Header from './HeaderComponent';
import Home from './HomeComponent';

import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Networks from "./NetworksComponent";

import { connect } from 'react-redux';
import { fetchNetworks } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        // pictures: state.pictures,
        networks: state.networks
    }
};

const mapDispatchToProps = dispatch => ({
    // fetchPictures: () => dispatch(fetchPictures()),
    fetchNetworks: () => dispatch(fetchNetworks())
});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // this.props.fetchPictures();
        this.props.fetchNetworks();
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
                    <Route exact path='/gallery' component={() => <Results />} />
                    <Route exact path='/networks' component={() => <Networks networks={this.props.networks} />} />
                    <Redirect to="/networks" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));