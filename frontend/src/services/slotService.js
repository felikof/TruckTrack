// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api/slots/';

// const getAuthHeaders = () => ({
//     headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
// });

// export const getSlots = async (filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     const response = await axios.get(`${API_URL}?${params}`, getAuthHeaders());
//     return response.data;
// };

// export const createSlot = async (slotData) => {
//     const response = await axios.post(API_URL, slotData, getAuthHeaders());
//     return response.data;
// };

// export const updateSlot = async (id, slotData) => {
//     const response = await axios.put(`${API_URL}${id}/`, slotData, getAuthHeaders());
//     return response.data;
// };

// export const deleteSlot = async (id) => {
//     await axios.delete(`${API_URL}${id}/`, getAuthHeaders());
// };

// // slotService.js — ajoute cette fonction de transformation
// const toCamelCase = (slot) => ({
//     id: slot.id,
//     slotId: slot.slot_id,
//     slotDate: slot.slot_date,
//     startTime: slot.start_time,
//     endTime: slot.end_time,
//     duration: slot.duration,
//     originGate: slot.origin_gate,
//     destinationTerminal: slot.destination_terminal,
//     totalSlots: slot.total_slots,
//     availableSlots: slot.available_slots,
//     reservedSlots: slot.reserved_slots,
//     status: slot.status,
//     operation: slot.operation,
// });

// export const getSlots = async (filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     const response = await axios.get(`${API_URL}?${params}`, getAuthHeaders());
//     return response.data.map(toCamelCase);
// };

// export const createSlot = async (slotData) => {
//     const payload = {
//         slot_date: slotData.slotDate,
//         start_time: slotData.startTime,
//         end_time: slotData.endTime,
//         duration: slotData.duration,
//         origin_gate: slotData.originGate,
//         destination_terminal: slotData.destinationTerminal,
//         total_slots: slotData.totalSlots,
//         available_slots: slotData.availableSlots,
//         status: slotData.status,
//         operation: slotData.operation,
//     };
//     const response = await axios.post(API_URL, payload, getAuthHeaders());
//     return toCamelCase(response.data);
// };

// export const updateSlot = async (id, slotData) => {
//     const payload = {
//         slot_date: slotData.slotDate,
//         start_time: slotData.startTime,
//         end_time: slotData.endTime,
//         duration: slotData.duration,
//         origin_gate: slotData.originGate,
//         destination_terminal: slotData.destinationTerminal,
//         total_slots: slotData.totalSlots,
//         available_slots: slotData.availableSlots,
//         status: slotData.status,
//         operation: slotData.operation,
//     };
//     const response = await axios.put(`${API_URL}${id}/`, payload, getAuthHeaders());
//     return toCamelCase(response.data);
// };

// export const deleteSlot = async (id) => {
//     await axios.delete(`${API_URL}${id}/`, getAuthHeaders());
// };

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/slots/';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});

// const toCamelCase = (slot) => ({
//     id: slot.id,
//     slotId: slot.slot_id,
//     slotDate: slot.slot_date[0],
//     startTime: slot.start_time[0],
//     endTime: slot.end_time[0],
//     originGate: slot.origin_gate[0],
//     destinationTerminal: slot.destination_terminal[0],
//     totalSlots: slot.total_slots[0],
//     availableSlots: slot.available_slots[0],
//     reservedSlots: slot.reserved_slots[0],
//     status: slot.status,
//     operation: slot.operation,
// });

// const toSnakeCase = (slotData) => ({
//     slot_date: slotData.slotDate[0],
//     start_time: slotData.startTime[0],
//     end_time: slotData.endTime[0],
//     origin_gate: slotData.originGate[0],
//     destination_terminal: slotData.destinationTerminal[0],
//     total_slots: slotData.totalSlots[0],
//     available_slots: slotData.availableSlots,
//     status: slotData.status,
//     operation: slotData.operation,
// });

export const getSlots = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}?${params}`, getAuthHeaders());
    return response.data;
};

export const createSlot = async (slotData) => {
    console.log("Payload for createSlot:", slotData); // Debugging line
    try {
        const response = await axios.post(API_URL, slotData, getAuthHeaders());
        console.log("Response from createSlot:", response.data); // Debugging line
        return (response.data);
    } catch (error) {
        console.log('ERREUR 400 DÉTAIL:', JSON.stringify(error.response?.data, null, 2));
        throw error;
    }
};

export const updateSlot = async (id, slotData) => {
    const response = await axios.put(`${API_URL}${id}/`, (slotData), getAuthHeaders());
    return (response.data);
};

export const deleteSlot = async (id) => {
    await axios.delete(`${API_URL}${id}/`, getAuthHeaders());
};

// Export par défaut — pour les fichiers qui importent le service comme un objet groupé
const slotService = { getSlots, createSlot, updateSlot, deleteSlot };
export default slotService;