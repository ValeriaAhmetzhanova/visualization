import { fetchNetworks } from "../redux/ActionCreators";
import configureStore from 'redux-mock-store'
import * as types from "../redux/ActionTypes";
import React from 'react';
import NetworksComponent from '../components/GalleryComponent';
import Enzyme from 'enzyme';
import thunk from 'redux-thunk'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

it('fetch networks', () => {

    const expectedActions = [
        { type: types.NETWORKS_LOADING}
        ]

    const middlewares = [thunk]
    const store = configureStore(middlewares)
    fetchNetworks()
        .then(expect(store.getActions()).toEqual(expectedActions))

})