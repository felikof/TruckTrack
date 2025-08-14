// SearchForm.jsx
import { useState } from 'react';
export default function SearchForm({ formData, onFormChange, onSubmit }) {
    const [searchForm, setSearchForm] = useState({
        origin: 'Gate A1',
        destination: 'Terminal 3',
        date: '2025-01-15',
        returnSlot: false,
        truckType: 'Standard',
        cargoType: 'Conteneur'
    })
    return (
        <div className="search-section">
            <form onSubmit={onSubmit} className="search-form">
                <div className="search-row">
                    <div className="input-group">
                        <label>De</label>
                        <select
                            value={formData.origin}
                            onChange={(e) => onFormChange(prev => ({ ...prev, origin: e.target.value }))}
                            className="location-input"
                        >
                            <option value="Gate A1">Gate A1</option>
                            <option value="Gate B2">Gate B2</option>
                            <option value="Gate C1">Gate C1</option>
                        </select>
                    </div>

                    <button type="button" className="swap-btn">⇄</button>

                    <div className="input-group">
                        <label>Á</label>
                        <select
                            value={formData.destination}
                            onChange={(e) => onFormChange(prev => ({ ...prev, destination: e.target.value }))}
                            className="location-input"
                        >
                            <option value="Terminal 1">Terminal 1</option>
                            <option value="Terminal 2">Terminal 2</option>
                            <option value="Terminal 3">Terminal 3</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Date du créneau</label>
                        <input
                            type="date"
                            value={searchForm.date}
                            onChange={(e) => setSearchForm(prev => ({ ...prev, date: e.target.value }))}
                            className="date-input"
                        />
                    </div>

                    <div className="input-group">
                        <label>Créneau de retour</label>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={searchForm.returnSlot}
                                onChange={(e) => setSearchForm(prev => ({ ...prev, returnSlot: e.target.checked }))}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="input-group">
                        <label>Type de camion</label>
                        <select
                            value={searchForm.truckType}
                            onChange={(e) => setSearchForm(prev => ({ ...prev, truckType: e.target.value }))}
                            className="select-input"
                        >
                            <option value="Standard">Standard</option>
                            <option value="Heavy Duty">Poids lourd</option>
                            <option value="Conteneur">Conteneur</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Type de chargement</label>
                        <select
                            value={searchForm.cargoType}
                            onChange={(e) => setSearchForm(prev => ({ ...prev, cargoType: e.target.value }))}
                            className="select-input"
                        >
                            <option value="Conteneur">Conteneur</option>
                            <option value="Bulk">Marchandise</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                </div>
            </form >
        </div >
    );
}