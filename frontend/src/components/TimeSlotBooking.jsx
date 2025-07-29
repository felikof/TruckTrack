import React, { useState } from 'react';
import { format, addDays, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';

const TimeSlotBooking = () => {
    // État pour la date sélectionnée
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Créneaux disponibles (8h-18h par tranches de 30min)
    const generateTimeSlots = () => {
        const slots = [];
        const startHour = 8;
        const endHour = 18;

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Créneaux déjà réservés (simulés)
    const [bookedSlots, setBookedSlots] = useState([
        { date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '10:00', name: 'Jean Dupont' },
        { date: format(new Date(), 'yyyy-MM-dd'), time: '14:30', name: 'Marie Martin' },
    ]);

    // Fonction pour réserver un créneau
    const handleBookSlot = () => {
        if (!selectedSlot) return;

        const newBooking = {
            date: format(selectedDate, 'yyyy-MM-dd'),
            time: selectedSlot,
            name: 'Nouveau Client' // À remplacer par un formulaire
        };

        setBookedSlots([...bookedSlots, newBooking]);
        setSelectedSlot(null);
        alert(`Créneau réservé le ${format(selectedDate, 'dd/MM/yyyy')} à ${selectedSlot}`);
    };

    // Fonction pour annuler une réservation
    const handleCancelBooking = (index) => {
        const updatedSlots = [...bookedSlots];
        updatedSlots.splice(index, 1);
        setBookedSlots(updatedSlots);
    };

    // Vérifier si un créneau est déjà réservé
    const isSlotBooked = (time) => {
        return bookedSlots.some(
            slot =>
                slot.date === format(selectedDate, 'yyyy-MM-dd') &&
                slot.time === time
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Réservation de créneaux</h2>

            {/* Sélecteur de date */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Choisir une date</h3>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {[...Array(7)].map((_, i) => {
                        const date = addDays(new Date(), i);
                        const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

                        return (
                            <button
                                key={i}
                                onClick={() => setSelectedDate(date)}
                                className={`py-2 px-4 rounded-lg flex flex-col items-center min-w-[70px] ${isSelected
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="font-medium">
                                    {format(date, 'EEE', { locale: fr })}
                                </span>
                                <span>{format(date, 'dd')}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Sélection de créneau */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">
                    Créneaux disponibles le {format(selectedDate, 'EEEE dd MMMM yyyy', { locale: fr })}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => {
                        const isBooked = isSlotBooked(time);
                        const isPast = isBefore(
                            new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${time}:00`),
                            new Date()
                        );

                        return (
                            <button
                                key={time}
                                onClick={() => !isBooked && !isPast && setSelectedSlot(time)}
                                disabled={isBooked || isPast}
                                className={`py-2 px-3 rounded-md border text-center ${selectedSlot === time
                                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                                        : isBooked
                                            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                            : isPast
                                                ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'
                                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {time}
                                {isBooked && <span className="block text-xs mt-1">Réservé</span>}
                                {isPast && <span className="block text-xs mt-1">Passé</span>}
                            </button>
                        );
                    })}
                </div>

                {selectedSlot && (
                    <div className="mt-4">
                        <button
                            onClick={handleBookSlot}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                        >
                            Réserver à {selectedSlot}
                        </button>
                    </div>
                )}
            </div>

            {/* Créneaux réservés */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Créneaux réservés</h3>

                {bookedSlots.length === 0 ? (
                    <p className="text-gray-500">Aucun créneau réservé</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Heure</th>
                                    <th className="py-2 px-4 text-left">Client</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookedSlots.map((slot, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            {format(new Date(slot.date), 'dd/MM/yyyy', { locale: fr })}
                                        </td>
                                        <td className="py-3 px-4">{slot.time}</td>
                                        <td className="py-3 px-4">{slot.name}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleCancelBooking(index)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Annuler
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlotBooking;