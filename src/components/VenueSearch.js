import React from 'react';
import PropTypes from 'prop-types';

import VenueErrorBoundary from '../components/VenueErrorBoundary';
import VenuesList from '../components/VenuesList';

const VenueSearch = props =>
    <div className="venue-search-container">
        <div role="search">
            <label htmlFor="cafe-filter">Filter outdoor places</label>
            <input 
                type="text"
                role="search"
                className="address-search-input"
                name="cafe-filter"
                tabIndex="-1"
                placeholder="Filter outdoor places"
                value= {props.query}
                onChange= {(e) => props.updateFilter(e.target.value)}
            />
        </div>
        <VenueErrorBoundary venuesError={props.venuesError}>
            <VenuesList
                venues = {props.filteredVenues}
                toggleInfo = {props.toggleInfo}                
            />
        </VenueErrorBoundary>
    </div>

VenueSearch.propTypes = {
    venues: PropTypes.array.isRequired,
    filteredVenues: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
    venuesError: PropTypes.bool.isRequired
}

export default VenueSearch