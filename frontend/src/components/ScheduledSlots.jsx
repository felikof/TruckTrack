// ScheduledSlots.jsx
import SlotCard from './SlotCard';

export default function ScheduledSlots({ slots }) {
    return (
        <section className="results-section">
            <div className="section-header">
                <h2>Créneaux prévus</h2>
                <span className="results-count">{slots.length} créneaux prévus</span>
            </div>
            
            <div className="slots-list">
                {slots.map((slot) => (
                    <SlotCard key={slot.id} slot={slot} variant="scheduled" />
                ))}
            </div>
        </section>
    );
}