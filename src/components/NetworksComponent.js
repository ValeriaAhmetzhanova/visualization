import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';
import {
    Card, CardBody,
    CardTitle, Media, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col, Input, Button
} from 'reactstrap';

class Networks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            layer: '',
            selectedNetwork: null
        };
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    onNetworkSelect(network) {
        this.setState({ selectedNetwork: network});
        console.log(network);
    }

    static renderNetwork(network) {
        if (network != null)
            return(
                <div>
                    <Media body className="ml-5 m-2 selected">
                        <Media heading>Selected network is {network.name}</Media>
                        <p>{network.description}</p>
                    </Media>

                </div>


            );
        else
            return(
                <div></div>
            );
    }



    render() {
        const networks = Object.values(this.props.networks.networks).map((network) => {
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

        const modal = () => {
            if (this.state.selectedNetwork != null)

                return (
                    <Form>
                        <FormGroup row>
                            <Label htmlFor="layer" md={2}>Layer</Label>
                            <Col md={{size: 3, offset: 1}}>
                                <Input type="select" name="layer"
                                       placeholder={this.state.layer}
                                       innerRef={(input) => this.layer = input}>
                                    <option>1</option>
                                    <option>2</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Form>
                );
            else return (
              <p>Oops! Choose network first</p>
            );
        };

        return (
            <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-5 col-md-5 m-1">
                        {networks}
                    </div>
                    <div  className="col-5 col-md-5 m-1">
                        {Networks.renderNetwork(this.state.selectedNetwork)}
                        <div className={"row go"}>
                            <Button className={"selected"}
                                    outline
                                    onClick={() => this.toggleModal()}>
                                Go!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Create Visualization</ModalHeader>
                    <ModalBody>
                        {modal()}
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }

}

export default Networks;