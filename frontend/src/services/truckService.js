// import axios from "axios";
// import toast from "react-hot-toast";

// const API_URL = "http://127.0.0.1:8000/api/trucks/";

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

// // Mapping des données
// const mapTruck = (t) => ({
//     id: t.id,
//     plateNumber: t.plate_number,
//     chassisNumber: t.chassis_number,
//     engineNumber: t.engine_number,
//     make: t.make,
//     model: t.model,
//     year: t.year,
//     color: t.color,
//     fuelType: t.fuel_type,
//     truckType: t.truck_type,
//     cargoType: t.cargo_type,
//     maxWeight: t.max_weight,
//     dimensions: t.dimensions,
//     registrationDate: t.registration_date,
//     registrationExpiry: t.registration_expiry,
//     insuranceProvider: t.insurance_provider,
//     insurancePolicyNumber: t.insurance_policy_number,
//     insuranceExpiry: t.insurance_expiry,
//     ownerType: t.owner_type,
//     ownerName: t.company,
//     ownerContact: t.owner_contact,
//     driverAssigned: t.driver_assigned,
//     gpsInstalled: t.gps_installed,
//     trackingDeviceId: t.tracking_device_id,
//     createdAt: t.created_at,
// });

// // CRUD
// export const createTruck = async (truckData) => {
//   const token = localStorage.getItem("accessToken");
//   const res = await axios.post(
//     "http://127.0.0.1:8000/trucks/",
//     truckData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   toast.success("Truck created successfully!");
//   return res.data.map(mapTruck);
// };

// export const updateTruck = async (id, truckData) => {
//     const response = await axiosInstance.put(`${id}/`, truckData, {
//         headers: getAuthHeader(),
//     });
//     toast.success("Truck updated successfully!");
//     return response.data;
// };

// export const deleteTruck = async (id) => {
//     const response = await axiosInstance.delete(`${id}/`, {
//         headers: getAuthHeader(),
//     });
//     toast.success("Truck deleted successfully!");
//     return response.data;
// };

// // Récupération de la liste
// export const getTrucks = async () => {
//     const response = await axiosInstance.get("", {
//         headers: getAuthHeader(),
//     });
//     return response.data.map(mapTruck);
// };

// src/services/truckService.js
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/trucks/';

const truckService = {
  getAuthHeaders: () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }),

  getMyTrucks: async () => {
    const response = await axios.get(API_URL, truckService.getAuthHeaders());
    return response.data;
  },

  createTruck: async (data) => {
    const response = await axios.post(API_URL, data, truckService.getAuthHeaders());
    return response.data;
  },
};

export default truckService;