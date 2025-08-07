// import React, { useState } from 'react';
// import { format, addDays, isToday } from 'date-fns';
// import { fr } from 'date-fns/locale';

// const TimeSlot = () => {
//     // États
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [customerName, setCustomerName] = useState('');
//     const [bookedSlots, setBookedSlots] = useState([
//         { date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '10:00', name: 'Jean Dupont' },
//         { date: format(new Date(), 'yyyy-MM-dd'), time: '14:30', name: 'Marie Martin' },
//     ]);

//     // Génération des créneaux horaires (8h-18h par tranches de 30min)
//     const generateTimeSlots = () => {
//         const slots = [];
//         for (let hour = 8; hour < 18; hour++) {
//             slots.push(`${hour.toString().padStart(2, '0')}:00`);
//             slots.push(`${hour.toString().padStart(2, '0')}:30`);
//         }
//         return slots;
//     };

//     const timeSlots = generateTimeSlots();

//     // Jours disponibles (7 jours à partir d'aujourd'hui)
//     const availableDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

//     // Vérifier si un créneau est réservé
//     const isSlotBooked = (time) => {
//         return bookedSlots.some(
//             slot => slot.date === format(selectedDate, 'yyyy-MM-dd') && slot.time === time
//         );
//     };

//     // Vérifier si un créneau est passé
//     const isSlotPassed = (time) => {
//         const slotDateTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${time}`);
//         return isToday(selectedDate) && slotDateTime < new Date();
//     };

//     // Réserver un créneau
//     const handleBooking = () => {
//         if (!selectedTime || !customerName) return;

//         const newBooking = {
//             date: format(selectedDate, 'yyyy-MM-dd'),
//             time: selectedTime,
//             name: customerName
//         };

//         setBookedSlots([...bookedSlots, newBooking]);
//         setSelectedTime(null);
//         setCustomerName('');
//         alert(`Réservation confirmée le ${format(selectedDate, 'dd/MM/yyyy')} à ${selectedTime}`);
//     };

//     // Annuler une réservation
//     const cancelBooking = (index) => {
//         const updatedBookings = [...bookedSlots];
//         updatedBookings.splice(index, 1);
//         setBookedSlots(updatedBookings);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-4xl mx-auto">
//                 {/* En-tête */}
//                 <header className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">Réservation de créneaux</h1>
//                     <p className="text-gray-600">
//                         Sélectionnez une date et un horaire pour votre rendez-vous
//                     </p>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Colonne de gauche - Sélection de date */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold mb-4">Choisir une date</h2>
//                             <div className="space-y-2">
//                                 {availableDays.map((day, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setSelectedDate(day)}
//                                         className={`w-full py-3 px-4 rounded-lg text-left transition-colors ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
//                                                 ? 'bg-blue-100 text-blue-700 border border-blue-300'
//                                                 : 'bg-white hover:bg-gray-50 border border-gray-200'
//                                             }`}
//                                     >
//                                         <div className="font-medium">
//                                             {format(day, 'EEEE', { locale: fr })}
//                                         </div>
//                                         <div className="text-sm">
//                                             {format(day, 'dd MMMM yyyy', { locale: fr })}
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Colonne centrale - Sélection d'horaire */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold mb-4">
//                                 Horaires disponibles - {format(selectedDate, 'EEEE dd MMMM', { locale: fr })}
//                             </h2>

//                             <div className="grid grid-cols-2 gap-3">
//                                 {timeSlots.map((time, index) => {
//                                     const isBooked = isSlotBooked(time);
//                                     const isPassed = isSlotPassed(time);

//                                     return (
//                                         <button
//                                             key={index}
//                                             onClick={() => !isBooked && !isPassed && setSelectedTime(time)}
//                                             disabled={isBooked || isPassed}
//                                             className={`py-3 px-4 rounded-md border transition-colors ${selectedTime === time
//                                                     ? 'bg-blue-100 border-blue-500 text-blue-700'
//                                                     : isBooked
//                                                         ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
//                                                         : isPassed
//                                                             ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'
//                                                             : 'bg-white border-gray-300 hover:bg-gray-50'
//                                                 }`}
//                                         >
//                                             {time}
//                                             {isBooked && <span className="block text-xs mt-1">Réservé</span>}
//                                             {isPassed && <span className="block text-xs mt-1">Passé</span>}
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Colonne de droite - Formulaire de réservation */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold mb-4">Confirmer la réservation</h2>

//                             {selectedTime ? (
//                                 <>
//                                     <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//                                         <p className="font-medium">Vous avez sélectionné :</p>
//                                         <p className="text-lg">
//                                             {format(selectedDate, 'EEEE dd MMMM', { locale: fr })} à {selectedTime}
//                                         </p>
//                                     </div>

//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Votre nom complet
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={customerName}
//                                             onChange={(e) => setCustomerName(e.target.value)}
//                                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                             placeholder="Jean Dupont"
//                                         />
//                                     </div>

//                                     <button
//                                         onClick={handleBooking}
//                                         disabled={!customerName}
//                                         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors disabled:bg-blue-300"
//                                     >
//                                         Confirmer la réservation
//                                     </button>
//                                 </>
//                             ) : (
//                                 <div className="text-center py-8 text-gray-500">
//                                     <svg
//                                         className="mx-auto h-12 w-12 text-gray-400"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={1}
//                                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                                         />
//                                     </svg>
//                                     <p className="mt-2">Veuillez sélectionner un créneau horaire</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Liste des réservations */}
//                         <div className="mt-6 bg-white rounded-xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold mb-4">Vos réservations</h2>

//                             {bookedSlots.length === 0 ? (
//                                 <p className="text-gray-500 text-center py-4">Aucune réservation</p>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {bookedSlots.map((booking, index) => (
//                                         <div
//                                             key={index}
//                                             className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
//                                         >
//                                             <div>
//                                                 <p className="font-medium">
//                                                     {format(new Date(booking.date), 'dd/MM/yyyy')} à {booking.time}
//                                                 </p>
//                                                 <p className="text-sm text-gray-600">{booking.name}</p>
//                                             </div>
//                                             <button
//                                                 onClick={() => cancelBooking(index)}
//                                                 className="text-red-600 hover:text-red-800 text-sm font-medium"
//                                             >
//                                                 Annuler
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TimeSlot;

import React, { useState } from 'react';
import '/src/TimeSlot.css';

const TimeSlot = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        type: 'Chargement'
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Créneau réservé pour le ${formData.date} à ${formData.time} (${formData.type})`);
    };

    return (
        <div className="booking-container">
            <h2>Réserver un créneau</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <label>
                    Date :
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </label>

                <label>
                    Heure :
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </label>

                <label>
                    Type :
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Chargement">Chargement</option>
                        <option value="Déchargement">Déchargement</option>
                        <option value="Inspection">Inspection</option>
                    </select>
                </label>

                <button type="submit">Réserver</button>
            </form>
        </div>
    );
};

export default TimeSlot;

