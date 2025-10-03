import axios from "axios";

const API_URL = "http://127.0.0.1:8000/slots/";

//export const getSlots = () => axios.get(API_URL).then(res => res.data);

export const createSlot = (slotData) =>
    axios.post(API_URL, slotData).then(res => res.data);

export const updateSlot = (id, slotData) =>
    axios.put(`${API_URL}${id}/`, slotData).then(res => res.data);

export const deleteSlot = (id) =>
    axios.delete(`${API_URL}${id}/`).then(res => res.data);

const mapSlot = (s) => ({
    id: s.id,
    slotId: s.slot_id,
    slotDate: s.slot_date,
    startTime: s.start_time,
    endTime: s.end_time,
    duration: s.duration,
    originGate: s.origin_gate,
    destinationTerminal: s.destination_terminal,
    totalSlots: s.total_slots,
    availableSlots: s.available_slots,
    reservedSlots: s.reserved_slots,
    basePrice: s.base_price,
    currency: s.currency,
    status: s.status,
    operatorName: s.operator_name,
    contactPerson: s.contact_person,
    contactPhone: s.contact_phone,
    contactEmail: s.contact_email,
    createdAt: s.created_at,
});

export const getSlots = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("Slots response:", response.data);
    return response.data.map(mapSlot);
}
    
