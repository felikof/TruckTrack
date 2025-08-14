// MyBookings.jsx
import SlotCard from './SlotCard';

export default function MyBookings({ bookings, onCancel, onModify }) {
    return (
        <section className="results-section">
            <div className="section-header">
                <h2>Mes réservations</h2>
                <span className="results-count">{bookings.length} Réservations actives</span>
            </div>
            
            <div className="slots-list">
                {bookings.map((booking) => (
                    <SlotCard 
                        key={booking.id} 
                        slot={booking} 
                        variant="booking" 
                        onCancel={onCancel} 
                        onModify={onModify} 
                    />
                ))}
            </div>
        </section>
    );
}