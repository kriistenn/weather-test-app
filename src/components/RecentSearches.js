import React from 'react';

function RecentSearches({ recentSearches, onSearch, currentCity }) {
    return (
        <div className="recent-searches">
            <h3>Recent Searches</h3>
            <ul>
                {recentSearches.map((city, index) => (
                    <li
                        key={index}
                        onClick={() => onSearch(city)}
                        className={`recent-search-item ${city === currentCity ? 'active' : ''}`}
                    >
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentSearches;
