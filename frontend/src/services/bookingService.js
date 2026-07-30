// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/bookings/";

// // Instance Axios (utile si tu veux ajouter le token automatiquement)
// const axiosInstance = axios.create({
//     baseURL: API_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Fonction pour injecter le token si besoin
// const getAuthHeader = () => {
//     const token = localStorage.getItem("accessToken");
//     return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // CRUD
// export const createBooking = async (bookingData) => {
//   const token = localStorage.getItem("accessToken");
//   const res = await axios.post(
//     "http://127.0.0.1:8000/api/bookings/",
//     bookingData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return res.data;
// };

// export const updateBooking = async (id, bookingData) => {
//     const response = await axiosInstance.put(`${id}/`, bookingData, {
//         headers: getAuthHeader(),
//     });
//     return response.data;
// };

// export const deleteBooking = async (id) => {
//     const response = await axiosInstance.delete(`${id}/`, {
//         headers: getAuthHeader(),
//     });
//     return response.data;
// };

// // Mapping des données
// const mapBooking = (b) => ({
//     id: b.id,
//     bookingReference: b.booking_reference,
//     slotId: b.slot_id,
//     truckId: b.truck_id,
//     customerName: b.customer_name,
//     customerEmail: b.customer_email,
//     customerPhone: b.customer_phone,
//     numberOfSlots: b.number_of_slots,
//     totalPrice: b.total_price,
//     currency: b.currency,
//     status: b.status,
//     createdAt: b.created_at,
// });

// export const getBookings = async () => {
//     const token = localStorage.getItem("accessToken");
//     const response = await axios.get(API_URL, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//     console.log("Bookings response:", response.data);
//     return response.data.map(mapBooking);
// }

// // export const getBookingById = async (id) => {
// //     const token = localStorage.getItem("accessToken");
// //     const response = await axios.get(`${API_URL}${id}/`, {
// //         headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //         },
// //     });
// //     return mapBooking(response.data);
// // }

// export const getBookingsByUser = async (userId) => {
//   const token = localStorage.getItem("accessToken");
//   const response = await axios.get(`${API_URL}?user_id=${userId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data.map(mapBooking);
// };

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/bookings/';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});

const fromApiBooking = (b) => ({
    id: b.id,
    bookNum: b.book_num,
    slotId: b.slot?.id ?? b.slot,
    slotCode: b.slot?.slot_id,
    truck: b.truck?.plate ?? b.truck,
    driver: b.driver?.name ?? b.driver,
    company: b.company?.company_name ?? b.company,
    bookingDate: b.booking_date,
    status: b.status,
    cancelledBy: b.cancelled_by,
});

export const getBookings = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}?${params}`, getAuthHeaders());
    return response.data.map(fromApiBooking);
};

// API: PATCH /api/bookings/{id}/cancel/  (l'action custom ajoutée sur BookingViewSet)
export const cancelBooking = async (id) => {
    const response = await axios.patch(`${API_URL}${id}/cancel/`, {}, getAuthHeaders());
    return fromApiBooking(response.data);
};

// validation admin d'une réservation en attente
export const confirmBooking = async (id) => {
    const response = await axios.patch(`${API_URL}${id}/`, { status: 'Confirmed' }, getAuthHeaders());
    return fromApiBooking(response.data);
};

