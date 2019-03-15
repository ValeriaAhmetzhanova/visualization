import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";

export const fetchPictures = () => (dispatch) => {

    dispatch(picturesLoading());

    return fetch(baseUrl + 'visualizations', { mode: 'no-cors' })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(pictures => dispatch(addPictures(pictures)))
        .catch(error => dispatch(picturesFailed(error.message)));
};

export const picturesLoading = () => ({
    type: ActionTypes.PICTURES_LOADING
});

export const picturesFailed = (errmess) => ({
    type: ActionTypes.PICTURES_FAILED,
    payload: errmess
});

export const addPictures = (pictures) => ({
    type: ActionTypes.ADD_PICTURES,
    payload: pictures
});

export const fetchNetworks = () => (dispatch) => {

    dispatch(networksLoading());

    return fetch(baseUrl + 'networks', { mode: 'no-cors' })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(networks => dispatch(addNetworks(networks)))
        .catch(error => dispatch(networksFailed(error.message)));
};

export const networksLoading = () => ({
    type: ActionTypes.NETWORKS_LOADING
});

export const networksFailed = (errmess) => ({
    type: ActionTypes.NETWORKS_FAILED,
    payload: errmess
});

export const addNetworks = (networks) => ({
    type: ActionTypes.ADD_NETWORKS,
    payload: networks
});