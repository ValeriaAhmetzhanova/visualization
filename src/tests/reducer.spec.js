import React from 'react';
import {Networks} from '../redux/networks';
import { initialState, Reducer } from '../redux/reducer';
import * as t from '../redux/actionTypes';

describe('networks reducer', () => {

    it('NETWORKS_LOADING', () => {
        const action = {
            type: t.NETWORKS_LOADING,
        };

        expect(Networks(initialState, action)).toEqual({
            ...initialState,
            errMess: null, isLoading: true
        })
    });

    it('NETWORKS_ADDED', () => {
        const action = {
            type: t.ADD_NETWORKS,
        };

        expect(Networks(initialState, action)).toEqual({
            ...initialState,
            isLoading: false, errMess: null, networks: action.payload
        })
    })

});