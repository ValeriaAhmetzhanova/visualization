import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-grid-gallery';
import { baseUrl } from '../shared/baseUrl';

class ResultsGallery extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images,
            network: this.props.network,
            layer: this.props.layer,
            isLoaded: false,
            title: this.getTitle(this.props.network, this.props.layer)
        };

    }

    getTitle(network, layer) {
        var title = 'Sample visualizations'

        if (network.length > 0) {
            title += ' for ';
            title += network;
        }

        if (layer.length > 0) {
            title += '-';
            title += layer;
        }

        return title;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({title:this.getTitle(nextProps.network, nextProps.layer)});

        if (this.props.network != nextProps.network || this.props.layer != nextProps.layer) {
            this.getImages(nextProps.network, nextProps.layer);
        }
    }

    toImages(data) {
        console.log(data);
        return Object.values(data).map((item) => {
            return (
                {
                    src: baseUrl + item.results[0].img_url,
                    thumbnail: baseUrl + item.results[0].img_url,
                    thumbnailWidth: 256,
                    thumbnailHeight: 256,
                    caption: item.config.network + ", " + item.config.layer + ":" + item.config.channel,
                    tags: [{value:item.config.network, title:item.config.network}]
                }
            );
        });
    }

    getImages(network, layer) {
        var url = baseUrl + 'visualizations';

        if (network.length > 0) {
            url += '/';
            url += network;
        }

        if (layer.length > 0) {
            url += '/';
            url += layer;
        }

        fetch(url).then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              images: this.toImages(result.data)
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    componentDidMount() {
        this.getImages(this.props.network, this.props.layer);
    }

    render () {
        return (
            
            <React.Fragment>
                {this.state.images.length>0 &&
                    <div className="row">
                        <div className="col-10 col-md-10 m-1">
                            <br/>
                            <h5>{this.state.title}</h5>
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="col-10 col-md-10 m-1">
                        <Gallery
                            images={this.state.images}
                            enableLightbox={true}
                            enableImageSelection={false}/>
                    </div>
                </div>
                <br/>
                <br/>
            </React.Fragment>

            
                
        );
    }
}

ResultsGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.string,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

ResultsGallery.defaultProps = {
    images: [],
    network: '',
    layer: ''
};


// import React, { Component } from 'react';
// import { Media } from 'reactstrap';
// import { baseUrl } from '../shared/baseUrl';

// class Gallery extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dropdownOpen: false
//         }

//         this.toggle = this.toggle.bind(this);
//     }


//     render() {
//         const gallery = this.props.pictures.pictures.map((picture) => {
//             return(
//                 <div key={picture.id} className="col-12 mt-5">
//                     <Media tag="li">
//                         <Media left middle>
//                             <Media object src={picture.image} alt={picture.name} />
//                         </Media>
//                         <Media body className="ml-5">
//                             <Media heading>{picture.name}</Media>
//                             <p>{picture.description}</p>
//                         </Media>
//                     </Media>
//                 </div>
//             );
//         });

//         return (
//             <div className="container">
//                 <div className="row">
//                     <Media list>
//                         {gallery}
//                     </Media>
//                 </div>
//             </div>
//         );
//     }
// }

export default ResultsGallery;