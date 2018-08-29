import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Catch errors from Geosuggest address search
class VenueErrorBoundary extends Component {
    static propTypes = {
        venuesError: PropTypes.bool,
        children: PropTypes.node
    }

    state = {
        gotError: false
    }

    componentDidCatch(error, info) {
        this.setState({
            gotError: true
        })
    }

    showErrorMessage = () => {
        return (
            <div className="error-container">
                <h1>Trouble getting the list of cafés...</h1>
                <p>Did you add the Foursquare API credentials in App.js? If not, please do so. Else Foursquare is probably out of reach or your network connection is lost :(</p>
            </div>
        )
    }

    render() {
        if (this.gotError || this.props.venuesError) {
            return this.showErrorMessage()
        }
        return this.props.children
    }
}

export default VenueErrorBoundary