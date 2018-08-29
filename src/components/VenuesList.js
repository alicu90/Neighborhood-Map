import React from 'react';
import PropTypes from 'prop-types';

import Venue from '../components/Venue';

const VenuesList = (props) => (
    // <div className="venue-list-container">
        <ul className="venue-list-content">
            {props.venues
                .map(venue => (
                    <li key={venue.id} 
                        tabIndex="-1">
                        <Venue 
                            venue = {venue}
                            toggleInfo= {props.toggleInfo}                            
                        />
                    </li>
                ))}
        </ul>
    // </div>
)

VenuesList.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleInfo: PropTypes.func.isRequired
}

export default VenuesList