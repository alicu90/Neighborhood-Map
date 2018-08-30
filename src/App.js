import React, { Component } from 'react';

import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import Sidebar from './components/Sidebar';
import Map from './components/Map';

import './css/App.css';

// Foursquare API
const foursquare = require('react-foursquare')({
  clientID: 'CC3DJ10N4EPLPTCDWZGK5MKAJ5IATEHDDM24NNC00A2ZOSIU',
  clientSecret: 'EIXALEUEUAVKFMPRTW42XZWBESLS30BRXUO0JO0E31Z01FG0'
})

class App extends Component {
  state = {

    location: {lat: 44.426765, lng: 26.102537},
    defaultZoom: 15,

    // Venues
    venues: [],
    filteredVenues: [],
    selectedVenue: {},
    query: "",

    // Errors
    venuesError: false,
    addressError: false,
    mapsError: false
  }

  gm_authFailure(){
    window.alert("Google Maps error!")
  }

  componentWillMount() {
    this.getVenues(this.state.location);
  }

  componentDidMount(){
    window.gm_authFailure = this.gm_authFailure;
  }

  // Clear venues
  clearVenues = () => {
    this.setState({
      venues: [],
      filteredVenues: []
    })
  }
  


  getVenues = (location) => {
    const params = {
      // Current location
      'll': `${location.lat}, ${location.lng}`,
      // Search for outdoor places
      'section': 'outdoor',
      // Get maximum 15 locations
      'limit': 15,
    }

    this.clearVenues();

    // Venues from Foursquare
    foursquare.venues.explore(params)
    .then(r => {
      r.response.groups[0].items.map(item => {
        return this.setState({
          venues: this.state.venues.concat([item.venue]),
          filteredVenues: this.state.filteredVenues.concat([item.venue])
        })
      })
    }).catch(error => {return this.setState({venuesError: true})});
  }


  updateLocation = (address) => {
    if (address) {
      this.setState({ 
        location: address
      });

      this.clearVenues();

      // Venue list
      this.getVenues(this.state.location);
    } 
  }

  toggleInfo = (venue) => {
    this.setState({
      selectedVenue: venue,
    });

    if (this.state.sidebarVisible) {
      this.toggleSidebarVisibility();
    }
  }


  updateFilter = (query) => {
    if (query) {
        this.setState({ query })
        const match = new RegExp(escapeRegExp(query), 'i')
        // Sort venue list
        let sortedVenueList = this.state.venues.filter(venue => match.test(venue.name)).sort(sortBy('name'))
        this.setState({
            filteredVenues: sortedVenueList
        });
    } else {
        this.setState({
            query: "",
            filteredVenues: this.state.venues
        });
    }
  }


  render() {
    return (
      <div className="App">
        <Sidebar
          location = {this.state.location}
          updateLocation = {this.updateLocation}
          addressError = {this.state.addressError}
                
          venues = {this.state.venues}
          filteredVenues = {this.state.filteredVenues}
          query = {this.state.query}
          updateFilter = {this.updateFilter}
          toggleInfo = {this.toggleInfo}
          venuesError = {this.state.venuesError}
          toggleSidebarVisibility = {this.toggleSidebarVisibility}
        />
          <Map
            isMarkerShown
            venues = {this.state.filteredVenues}
            location = {this.state.location}
            selectedVenue = {this.state.selectedVenue}
            zoom = {this.state.defaultZoom}
            toggleInfo = {this.toggleInfo}
            mapsError = {this.state.mapsError}
          />
        

      </div>
    )
  }
}

export default App
