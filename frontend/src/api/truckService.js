import axios from "axios";

const API_URL = "http://127.0.0.1:8000/trucks/";

export const createTruck = (truckData) =>
    axios.post(API_URL, truckData).then(res => res.data);

export const updateTruck = (id, truckData) =>
    axios.put(`${API_URL}${id}/`, truckData).then(res => res.data);

export const deleteTruck = (id) =>
    axios.delete(`${API_URL}${id}/`).then(res => res.data);

const mapTruck = (t) => ({
    id: t.id,
    plate_number: t.plate_number,
    chassis_number: t.chassis_number,
    engine_number: t.engine_number,
    make: t.make,
    model: t.model,
    year: t.year,
    color: t.color,
    fuel_type: t.fuel_type,
    truck_type: t.truck_type,
    cargo_type: t.cargo_type,
    max_weight: t.max_weight,
    dimensions: t.dimensions,
    registration_date: t.registration_date,
    registration_expiry: t.registration_expiry,
    insurance_provider: t.insurance_provider,
    insurance_policy_number: t.insurance_policy_number,
    insurance_expiry: t.insurance_expiry,
    owner_type: t.owner_type,
    owner_name: t.owner_name,
    owner_contact: t.owner_contact,
    driver_assigned: t.driver_assigned,

    gps_installed: t.gps_installed,
    tracking_device_id: t.tracking_device_id,
    special_equipment: t.special_equipment,
    operating_permits: t.operating_permits,
    created_at: t.created_at,
});

export const getTrucks = () =>
    axios.get(API_URL).then(res => res.data.map(mapTruck));