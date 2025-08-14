// SlotCard.jsx
import { formatPrice, getAmenityIcon, getStatusBadge } from './utils';

export default function SlotCard({ slot, variant = 'browse', onBook, onCancel, onModify }) {
    return (
        <div className={`slot-card ${variant}-card`}>
            <div className="slot-header">
                {/* Contenu de l'en-tête en fonction du variant */}
                <div className="provider-info">
                    <div className="provider-icon">🏢</div>
                    <span className="provider-name">Autorité portuaire</span>
                </div>
                <div className="duration-info">
                    <span className="duration">Durée {slot.duration}</span>
                </div>
            </div>

            <div className="slot-details">
                {/* Détails du créneau */}
                <div className="time-info">
                    <div className="departure-time">
                        <span className="time">{slot.timeSlot}</span>
                        <span className="location">{slot.gate}</span>
                    </div>

                    <div className="route-visualization">
                        {slot.stops.map((stop, index) => (
                            <div key={index} className="route-stop">
                                <div className="stop-time">{stop.time}</div>
                                <div className="stop-dot"></div>
                                <div className="stop-info">
                                    <div className="stop-location">{stop.location}</div>
                                    <div className="transfer-time">{stop.transfer}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="arrival-info">
                        <span className="location">{slot.terminal}</span>
                    </div>
                </div>

                <div className="slot-amenities">
                    {slot.amenities.map((amenity) => (
                        <span key={amenity} className="amenity" title={amenity}>
                            {getAmenityIcon(amenity)}
                        </span>
                    ))}
                </div>

                {variant === 'browse' && (
                    <div className="slot-actions">
                        <span className="slots-left">{slot.slotsLeft} places restantes</span>
                        <button className="book-btn" onClick={() => onBook(slot.id)}>
                            Reserve
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}