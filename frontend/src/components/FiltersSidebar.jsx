// FiltersSidebar.jsx
import { useState } from 'react';

export default function FiltersSidebar({ filters, slotsCount }) {
    const [setFilters] = useState({
        timeRange: { start: '07:00', end: '18:00' },
        selectedTime: '08:00',
        facilities: {
            bascule: true,
            inspection: false,
            douane: false,
            parking: true
        }
    })
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }
    return (
        <aside className="filters-sidebar">
            <div className="filters-header">
                <h3>Filtres</h3>
                <button className="reset-btn">Réinitialiser</button>
                <div className="results-count">
                    <span className="available-badge">Disponible</span>
                    <span className="recommended-badge">Recommandé</span>
                    <span className="count">{slotsCount} places restantes</span>
                </div>
            </div>

            <div className="filter-section">
                <h4>Installations</h4>
                <div className="facilities-list">
                    {Object.entries(filters.facilities).map(([facility, checked]) => (
                        <label key={facility} className="facility-checkbox">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => handleFilterChange('facilities', { ...filters.facilities, [facility]: e.target.checked })}
                            />
                            <span className="facility-name">
                                {facility.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}