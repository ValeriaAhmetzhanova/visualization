import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';

import ResultsGallery from './GalleryComponent'


class Results extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <ResultsGallery />
                </div>

            </React.Fragment>
        );
    }

}

export default Results;