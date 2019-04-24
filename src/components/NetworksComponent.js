import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';

import ResultsGallery from './GalleryComponent'
import {
    Card, CardBody, Spinner,
    CardTitle, Media, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col, Input, Button
} from 'reactstrap';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class Step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }

        this.toggle = this.toggle.bind(this);
    }

    onSelect(item) {
        this.props.onSelect(item);
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-10 col-md-10 m-1">
                        <h4 className="step">{this.props.description}</h4>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 col-md-5 m-1">
                        <div className="network-selector">
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {this.props.selection}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.props.items}
                            </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        );
    }


}

class Networks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            layer: '',
            selectedNetwork: {name: 'Not selected', id: -1},
            selectedLayer: {name: 'Not selected', depth: -1},
            selectedChannel: 0,
            dropdownOpen: false,
            submitEnabled: true
        };


        this.toggleModal = this.toggleModal.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onChannelSelect = this.onChannelSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    onNetworkSelect(network) {
        this.setState({ 
            selectedNetwork: network,
            selectedLayer: {name: 'Not selected', depth: -1},
            selectedChannel: 0
        });
        console.log(network);
    }

    onLayerSelect(layer) {
        this.setState({ 
            selectedLayer: layer,
            selectedChannel: 0
        });
        console.log(layer);
    }
    
    onChannelSelect(value) {
        this.setState({ selectedChannel: value});
    }

    onSubmit() {
        this.setState({submitEnabled:false});
        this.submit(this.state.selectedNetwork.name, this.state.selectedLayer.name, this.state.selectedChannel);
        
    }
    
    submit(net, l, c) {
        const url = baseUrl + 'jobs/'
        fetch(url, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Request-Method':'POST',
                'Access-Control-Request-Headers':'Content-Type'
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Request-Headers':'Content-Type',
                // 'Access-Control-Request-Method':'POST'
            },
            body: JSON.stringify({
                network: net,
                layer: l,
                channel: c
            })
        }).then(res => {
            console.log(res)
            res.json()
        }).then(
          (result) => {
            console.log(result);
            
            // this.setState({submitEnabled:true})
            setTimeout(() => {
                
                this.setState({
                    submitEnabled:true,
                    selectedNetwork: {name:'Not selected', id:-1},
                    selectedLayer: {name:'Not selected', depth:0},
                    selectedChannel: 0
                });

                alert('The job has been added');

            }, 1000);
          },
          (error) => {
            console.log(error);
            // this.setState({submitEnabled:true})
            setTimeout(() => {this.setState({submitEnabled:true});}, 1000);
          }
        )
    }

    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;

        
        return (
          <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
          >
            <Slider.Handle value={value} {...restProps} />
          </Tooltip>
        );
    }


    render() {

        const networks = Object.values(this.props.networks.networks).map((network) => {
            return (
                <DropdownItem key={network.id} onClick={() => this.onNetworkSelect(network)}>{network.name}</DropdownItem>
            );
        });
        
        var layers = null;

        if (this.state.selectedNetwork.id>=0) {
            layers = Object.values(this.state.selectedNetwork.layers).map((layer) => {
                return (
                    <DropdownItem key={layer.name} onClick={() => this.onLayerSelect(layer)}>{layer.name} - {layer.depth}</DropdownItem>
                );  
            });
        } 


        var currentConfig = 'Current config: network - ' + this.state.selectedNetwork.name + ' layer - ' + this.state.selectedLayer.name +  ' channel - ' + this.state.selectedChannel;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="step-1">
                        <Step selection={this.state.selectedNetwork.name} 
                            items={networks} 
                            description="Step 1. Select network architecture"/>

                        {this.state.selectedNetwork.id>=0 && this.state.selectedNetwork.description.length>0 &&
                            <div className="row">
                                <div className="col-10 col-md-10 m-1">
                                    <br/>
                                    <h5>Description</h5>
                                    <br/>
                                    <p className="step">{this.state.selectedNetwork.description}</p>
                                    <br/>
                                </div>
                            </div>
                        }

                        {this.state.selectedNetwork.id>=0 &&
                            <ResultsGallery network={this.state.selectedNetwork.name}/>
                        }
                    </div>

                    <div className="step-2">
                        {this.state.selectedNetwork.id>=0 && 
                            <Step selection={this.state.selectedLayer.name} 
                            items={layers} 
                            description="Step 2. Select layer and channel"/>
                        }
                    </div>
                    

                    
                    <div className="step-3">
                        {this.state.selectedLayer.depth>0 &&
                            <div className="row">
                                <div className="col-10 col-md-10 m-1">
                                    <h4 className="step">Step 3. Select channel (the selected value must lie in [0, {this.state.selectedLayer.depth}))</h4>
                                    <br/>
                                    <div className="slider-container">
                                        <Slider min={0} max={this.state.selectedLayer.depth-1} onAfterChange={this.onChannelSelect} handle={this.handle}/>
                                    </div>
                                    <br/>

                                    <div className="current-config">
                                        {currentConfig}
                                    </div>
                                    <br/>
                                    
                                    {this.state.submitEnabled &&
                                        <Button onClick={this.onSubmit} className="button-submit" outline color="success">submit</Button>
                                    }
                                    {!this.state.submitEnabled &&
                                        <Spinner color="success" className="button-submit"/>
                                    }
                                    
                                </div>
                            </div>
                        }
                    </div>
                    
                    

                    {/* {this.state.selectedLayer.depth>0 &&
                        <ResultsGallery network={this.state.selectedNetwork.name} layer={this.state.selectedLayer.name}/>
                    } */}

                    


                </div>

            </React.Fragment>
        );
    }

}

export default Networks;