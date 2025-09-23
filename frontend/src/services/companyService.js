// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/companies/';

// export const createCompany = (companyData) =>
//     axios.post(API_URL, companyData).then(res => res.data);

// export const updateCompany = (id, companyData) =>
//     axios.put(`${API_URL}${id}/`, companyData).then(res => res.data);

// export const deleteCompany = (id) =>
//     axios.delete(`${API_URL}${id}/`).then(res => res.data);

// const mapCompany = (c) => ({
//     id: c.id,
//     name: c.name,
//     address: c.address,
//     phone: c.phone,
//     email: c.email,
//     website: c.website,
//     createdAt: c.created_at,
// });         

// export const getCompanies = () =>
//     axios.get(API_URL).then(res => res.data.map(mapCompany));

// export const getCompanyById = (id) =>
//     axios.get(`${API_URL}${id}/`).then(res => mapCompany(res.data));

// export const getCompanyByName = (name) =>
//     axios.get(`${API_URL}?name=${name}`).then(res => res.data.map(mapCompany));

// export const getCompanyByEmail = (email) =>
//     axios.get(`${API_URL}?email=${email}`).then(res => res.data.map(mapCompany));   

// frontend/src/services/CompanyService.js
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/companies/';

const mapCompany = (c) => ({
  id: c.id,
  companyName: c.company_name,
  registrationNumber: c.registration_number,
  taxId: c.tax_id,
  companyType: c.company_type,
  establishedYear: c.established_year,
  PhoneNumber: c.phone_number,
  email: c.email,
  website: c.website,
  address: c.address,
  city: c.city,
  postalCode: c.postal_code,
  contactPersonName: c.contact_person_name,
  contactPersonTitle: c.contact_person_title,
  contactPersonPhone: c.contact_person_phone,
  contactPersonEmail: c.contact_person_email,
  fleetSize: c.fleet_size,
  operatingLicense: c.operating_license,
  licenseExpiry: c.license_expiry,
  insuranceProvider: c.insurance_provider,
  insurancePolicyNumber: c.insurance_policy_number,
  insuranceExpiry: c.insurance_expiry,
  servicesOffered: c.services_offered,
  operatingRoutes: c.operating_routes,
  certifications: c.certifications
});

export const createCompany = (companyData) =>
    axios.post(API_URL, companyData).then(res => mapCompany(res.data));

// Créer un nouveau transporteur
export const registerCompany = async (companyData) => 
  await axios.post(API_URL, companyData).then(res => mapCompany(res.data));

// Récupérer la liste des transporteurs
export const getCompanies = async () => 
  await axios.get(API_URL).then(res => res.data.map(mapCompany));


// Récupérer un transporteur par ID
export const getCompanyById = async (id) => 
  await axios.get(`${API_URL}${id}/`).then(res => mapCompany(res.data));

