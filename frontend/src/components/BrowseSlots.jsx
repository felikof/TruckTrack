import FiltersSidebar from './FiltersSidebar';
import SlotCard from './SlotCard';
import { useState } from 'react';

export default function BrowseSlots({ slots, filters, onFilterChange, onBookSlot }) {
    const [availableSlots] = useState([
        {
            id: 1,
            timeSlot: '08:00',
            duration: '2h 30m',
            gate: 'Gate A1',
            terminal: 'Terminal 3',
            price: 45000,
            currency: 'CFA',
            stops: [
                { time: '08:00', location: 'Gate A1', transfer: '15min temps de transfert' },
                { time: '08:15', location: 'Pont-bascule', transfer: '20min processus' },
                { time: '08:45', location: 'Terminal 3', transfer: 'Destination finale' }
            ],
            amenities: ['pont-bascule', 'parking', 'sécurité'],
            available: true,
            slotsLeft: 12
        },
        {
            id: 2,
            timeSlot: '10:30',
            duration: '3h 15m',
            gate: 'Gate B2',
            terminal: 'Terminal 3',
            price: 52000,
            currency: 'CFA',
            stops: [
                { time: '10:30', location: 'Gate B2', transfer: '20min temps de transfert' },
                { time: '11:00', location: 'Douanes', transfer: '45min inspection' },
                { time: '12:15', location: 'Pont-bascule', transfer: '15min processus' },
                { time: '12:45', location: 'Terminal 3', transfer: 'Destination finale' }
            ],
            amenities: ['pont-bascule', 'inspection', 'douanes', 'parking'],
            available: true,
            slotsLeft: 8
        },
        {
            id: 3,
            timeSlot: '14:20',
            duration: '2h 45m',
            gate: 'Gate C1',
            terminal: 'Terminal 3',
            price: 48000,
            currency: 'CFA',
            stops: [
                { time: '14:20', location: 'Gate C1', transfer: '10min temps de transfert' },
                { time: '14:45', location: 'Pont-bascule', transfer: '25min processus' },
                { time: '15:30', location: 'Terminal 3', transfer: 'Destination Finale' }
            ],
            amenities: ['pont-bascule', 'parking', 'sécurité', 'inspection'],
            available: true,
            slotsLeft: 15
        }
    ])
    return (
        <div className="content-area">
            <FiltersSidebar filters={filters} onFilterChange={onFilterChange} slotsCount={slots.length} />

            <section className="results-section">
                <div className="slots-list">
                    {slots.map((slot) => (
                        <SlotCard
                            key={slot.id}
                            slot={slot}
                            variant="browse"
                            onBook={onBookSlot}
                        />
                    ))}
                </div>

                <div className="popular-section">
                    <div className="popular-header">
                        <span className="popular-badge">Populaires</span>
                        <span className="slots-count">{availableSlots.length} places restantes</span>
                    </div>

                    <div className="popular-slot">
                        <div className="provider-info">
                            <div className="provider-icon">🏢</div>
                            <span className="provider-name">Autorité portuaire</span>
                        </div>
                        <div className="popular-duration">Durée 2h 15m</div>
                    </div>
                </div>
            </section>
        </div>
    );
}