import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';

import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Media, Button
} from 'reactstrap';

class Networks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedNetwork: null
        }
    }

    onNetworkSelect(network) {
        this.setState({ selectedNetwork: network});
    }

    renderNetwork(network) {
        if (network != null)
            return(
                <Media body className="ml-5 m-2">
                    <Media heading>Selected network is {network.name}</Media>
                    <p>{baseUrl + network.description}</p>
                </Media>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        const networks = this.props.networks.networks.map((network) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={network.id}
                          onClick={() => this.onNetworkSelect(network)}>
                        <CardBody>
                            <CardTitle>{network.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {networks}
                </div>
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderNetwork(this.state.selectedNetwork)}
                    </div>
                </div>
                <Button type="submit" >
                    Go!
                </Button>
            </div>
        );
    }
}

export default Networks;