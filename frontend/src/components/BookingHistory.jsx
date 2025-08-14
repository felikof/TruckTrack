// BookingHistory.jsx
import SlotCard from './SlotCard';

export default function BookingHistory({ history }) {
    return (
        <section className="results-section">
            <div className="section-header">
                <h2>Historique des réservations</h2>
                <span className="results-count">{history.length} réservations passées</span>
            </div>
            
            <div className="slots-list">
                {history.map((item) => (
                    <SlotCard key={item.id} slot={item} variant="history" />
                ))}
            </div>
        </section>
    );
}