// import React, { useState, useMemo } from 'react';
// import {
//   Plus, Pencil, Trash2, Search, Clock, Truck, MapPin, TrendingUp,
//   Package, X, AlertCircle, CheckCircle2, ChevronDown, Radio,
//   ArrowUpRight, Gauge, Navigation2
// } from 'lucide-react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, LineChart, Line
// } from 'recharts';

// // ============================================================
// // DONNÉES SIMULÉES — à remplacer par des appels Axios vers l'API DRF
// // (voir commentaires "API:" à chaque endroit concerné)
// // ============================================================

// const GATES = ['Porte Nord', 'Porte Sud', 'Porte Est', 'Terminal Conteneurs'];
// const TERMINALS = ['Quai A', 'Quai B', 'Quai C', 'Zone de Transit'];

// const STATUS_META = {
//   active: { label: 'Actif', color: '#4ADE80' },
//   inactive: { label: 'Inactif', color: '#8FA1B8' },
//   cancelled: { label: 'Annulé', color: '#F2545B' },
//   completed: { label: 'Terminé', color: '#3FC7D6' },
// };

// const OPERATION_META = {
//   loading: { label: 'Chargement', color: '#F2A93B' },
//   unloading: { label: 'Déchargement', color: '#3FC7D6' },
//   transit: { label: 'Transit', color: '#8FA1B8' },
// };

// const initialSlots = [
//   { id: 'SLOT-001', date: '2026-07-16', start: '06:00', end: '09:15', origin: 'Porte Nord', destination: 'Quai A', total: 12, available: 3, reserved: 9, status: 'active', operation: 'loading' },
//   { id: 'SLOT-002', date: '2026-07-16', start: '09:15', end: '12:30', origin: 'Porte Sud', destination: 'Quai B', total: 10, available: 0, reserved: 10, status: 'active', operation: 'unloading' },
//   { id: 'SLOT-003', date: '2026-07-16', start: '12:30', end: '15:45', origin: 'Terminal Conteneurs', destination: 'Zone de Transit', total: 8, available: 5, reserved: 3, status: 'active', operation: 'transit' },
//   { id: 'SLOT-004', date: '2026-07-16', start: '15:45', end: '19:00', origin: 'Porte Est', destination: 'Quai C', total: 14, available: 14, reserved: 0, status: 'inactive', operation: 'loading' },
//   { id: 'SLOT-005', date: '2026-07-15', start: '06:00', end: '09:15', origin: 'Porte Nord', destination: 'Quai A', total: 12, available: 0, reserved: 12, status: 'completed', operation: 'loading' },
//   { id: 'SLOT-006', date: '2026-07-15', start: '09:15', end: '12:30', origin: 'Porte Sud', destination: 'Quai B', total: 10, available: 2, reserved: 6, status: 'cancelled', operation: 'unloading' },
// ];

// const initialReservations = [
//   { id: 'RSV-1042', slotId: 'SLOT-001', truck: 'TG-4471-A', driver: 'Kodjo Mensah', company: 'Sogetra', createdAt: '2026-07-15 08:12', status: 'confirmed' },
//   { id: 'RSV-1043', slotId: 'SLOT-001', truck: 'TG-2290-B', driver: 'Ama Doe', company: 'Transit Plus', createdAt: '2026-07-15 09:30', status: 'confirmed' },
//   { id: 'RSV-1044', slotId: 'SLOT-002', truck: 'TG-1187-C', driver: 'Yao Kokou', company: 'Sogetra', createdAt: '2026-07-15 10:05', status: 'confirmed' },
//   { id: 'RSV-1045', slotId: 'SLOT-003', truck: 'TG-6650-D', driver: 'Essi Adjo', company: 'Fret Togo', createdAt: '2026-07-16 06:40', status: 'pending' },
//   { id: 'RSV-1046', slotId: 'SLOT-002', truck: 'TG-3321-E', driver: 'Komi Ayao', company: 'Transit Plus', createdAt: '2026-07-16 07:02', status: 'confirmed' },
// ];

// const initialTrucks = [
//   { id: 'TG-4471-A', driver: 'Kodjo Mensah', status: 'en_route', zone: 'Porte Nord → Quai A', speed: 24, x: 22, y: 68, heading: 40, lastUpdate: '08:41:02' },
//   { id: 'TG-2290-B', driver: 'Ama Doe', status: 'loading', zone: 'Quai A', speed: 0, x: 34, y: 30, heading: 0, lastUpdate: '08:40:51' },
//   { id: 'TG-1187-C', driver: 'Yao Kokou', status: 'loading', zone: 'Quai B', speed: 0, x: 55, y: 26, heading: 0, lastUpdate: '08:40:44' },
//   { id: 'TG-6650-D', driver: 'Essi Adjo', status: 'en_route', zone: 'Terminal Conteneurs → Transit', speed: 18, x: 70, y: 72, heading: 300, lastUpdate: '08:41:10' },
//   { id: 'TG-3321-E', driver: 'Komi Ayao', status: 'idle', zone: 'Zone d\u2019attente', speed: 0, x: 12, y: 82, heading: 0, lastUpdate: '08:38:20' },
//   { id: 'TG-8804-F', driver: 'Afi Sena', status: 'en_route', zone: 'Porte Sud → Quai C', speed: 31, x: 47, y: 55, heading: 80, lastUpdate: '08:41:15' },
// ];

// const TRUCK_STATUS_META = {
//   en_route: { label: 'En route', color: '#3FC7D6' },
//   loading: { label: 'En chargement', color: '#F2A93B' },
//   idle: { label: 'À l\u2019arrêt', color: '#8FA1B8' },
// };

// const weeklyReservations = [
//   { day: 'Lun', reservations: 34 },
//   { day: 'Mar', reservations: 41 },
//   { day: 'Mer', reservations: 38 },
//   { day: 'Jeu', reservations: 52 },
//   { day: 'Ven', reservations: 47 },
//   { day: 'Sam', reservations: 29 },
//   { day: 'Dim', reservations: 18 },
// ];

// // ============================================================
// // COMPOSANT PRINCIPAL
// // ============================================================

// export default function PALAdminDashboard() {
//   const [activeTab, setActiveTab] = useState('creneaux');
//   const [slots, setSlots] = useState(initialSlots);
//   const [reservations] = useState(initialReservations);
//   const [trucks] = useState(initialTrucks);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingSlot, setEditingSlot] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   const tabs = [
//     { id: 'creneaux', label: 'Créneaux', icon: Clock },
//     { id: 'reservations', label: 'Réservations', icon: Package },
//     { id: 'stats', label: 'Statistiques', icon: TrendingUp },
//     { id: 'gps', label: 'Suivi GPS', icon: Radio },
//   ];

//   // ---- CRUD Créneaux -----------------------------------------------------
//   // API: GET /api/slots/
//   const filteredSlots = useMemo(() => {
//     return slots.filter(s => {
//       const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase())
//         || s.origin.toLowerCase().includes(search.toLowerCase())
//         || s.destination.toLowerCase().includes(search.toLowerCase());
//       const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [slots, search, statusFilter]);

//   const openCreateModal = () => {
//     setEditingSlot(null);
//     setModalOpen(true);
//   };

//   const openEditModal = (slot) => {
//     setEditingSlot(slot);
//     setModalOpen(true);
//   };

//   // API: POST /api/slots/  ou  PUT /api/slots/{id}/
//   const handleSaveSlot = (formValues) => {
//     if (editingSlot) {
//       setSlots(prev => prev.map(s => s.id === editingSlot.id ? { ...s, ...formValues } : s));
//     } else {
//       const newId = `SLOT-${String(slots.length + 1).padStart(3, '0')}`;
//       setSlots(prev => [{ id: newId, reserved: 0, ...formValues }, ...prev]);
//     }
//     setModalOpen(false);
//     setEditingSlot(null);
//   };

//   // API: DELETE /api/slots/{id}/
//   const handleDeleteSlot = () => {
//     setSlots(prev => prev.filter(s => s.id !== deleteTarget.id));
//     setDeleteTarget(null);
//   };

//   // ---- Statistiques dérivées ---------------------------------------------
//   const kpis = useMemo(() => {
//     const activeSlots = slots.filter(s => s.status === 'active').length;
//     const totalCapacity = slots.reduce((acc, s) => acc + s.total, 0);
//     const totalReserved = slots.reduce((acc, s) => acc + s.reserved, 0);
//     const occupation = totalCapacity ? Math.round((totalReserved / totalCapacity) * 100) : 0;
//     const todayReservations = reservations.filter(r => r.createdAt.startsWith('2026-07-16')).length;
//     const enRoute = trucks.filter(t => t.status === 'en_route').length;
//     return { activeSlots, occupation, todayReservations, enRoute };
//   }, [slots, reservations, trucks]);

//   const statusDistribution = useMemo(() => {
//     const counts = {};
//     slots.forEach(s => { counts[s.status] = (counts[s.status] || 0) + 1; });
//     return Object.entries(counts).map(([key, value]) => ({
//       name: STATUS_META[key].label,
//       value,
//       color: STATUS_META[key].color,
//     }));
//   }, [slots]);

//   const operationDistribution = useMemo(() => {
//     const counts = {};
//     slots.forEach(s => { counts[s.operation] = (counts[s.operation] || 0) + 1; });
//     return Object.entries(counts).map(([key, value]) => ({
//       name: OPERATION_META[key].label,
//       value,
//       color: OPERATION_META[key].color,
//     }));
//   }, [slots]);

//   return (
//     <div className="pal-root">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

//         .pal-root {
//           --navy-950: #0A1420;
//           --navy-900: #101E30;
//           --navy-800: #16283F;
//           --navy-700: #1D3350;
//           --line: #24384f;
//           --amber: #F2A93B;
//           --cyan: #3FC7D6;
//           --green: #4ADE80;
//           --red: #F2545B;
//           --text: #EAF0F6;
//           --text-dim: #8FA1B8;
//           font-family: 'Inter', sans-serif;
//           background: var(--navy-950);
//           color: var(--text);
//           min-height: 100vh;
//           display: flex;
//           border-radius: 12px;
//           overflow: hidden;
//           border: 1px solid var(--line);
//         }
//         .pal-root * { box-sizing: border-box; }
//         .pal-mono { font-family: 'JetBrains Mono', monospace; }
//         .pal-display { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; }

//         .pal-sidebar {
//           width: 220px;
//           background: var(--navy-900);
//           border-right: 1px solid var(--line);
//           padding: 24px 14px;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//           flex-shrink: 0;
//         }
//         .pal-brand {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 0 8px 22px 8px;
//           margin-bottom: 14px;
//           border-bottom: 1px solid var(--line);
//         }
//         .pal-brand-mark {
//           width: 34px; height: 34px;
//           background: linear-gradient(135deg, var(--amber), #c97f1f);
//           border-radius: 8px;
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'Oswald', sans-serif;
//           font-weight: 700;
//           color: var(--navy-950);
//           font-size: 15px;
//         }
//         .pal-brand-text { line-height: 1.15; }
//         .pal-brand-title { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 0.03em; }
//         .pal-brand-sub { font-size: 10.5px; color: var(--text-dim); letter-spacing: 0.08em; }

//         .pal-navitem {
//           display: flex; align-items: center; gap: 10px;
//           padding: 10px 12px;
//           border-radius: 8px;
//           font-size: 13.5px;
//           font-weight: 500;
//           color: var(--text-dim);
//           cursor: pointer;
//           transition: background 0.15s ease, color 0.15s ease;
//           background: transparent;
//           border: none;
//           text-align: left;
//           width: 100%;
//         }
//         .pal-navitem:hover { background: var(--navy-800); color: var(--text); }
//         .pal-navitem.active { background: var(--navy-800); color: var(--amber); }
//         .pal-navitem.active svg { color: var(--amber); }

//         .pal-main {
//           flex: 1;
//           min-width: 0;
//           display: flex;
//           flex-direction: column;
//           background:
//             radial-gradient(circle at top right, rgba(63,199,214,0.06), transparent 40%),
//             var(--navy-950);
//         }
//         .pal-topbar {
//           padding: 18px 28px;
//           border-bottom: 1px solid var(--line);
//           display: flex; align-items: center; justify-content: space-between;
//         }
//         .pal-topbar-title { font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
//         .pal-topbar-sub { font-size: 12.5px; color: var(--text-dim); margin-top: 2px; }
//         .pal-badge-live {
//           display: flex; align-items: center; gap: 6px;
//           font-size: 11.5px; color: var(--green);
//           font-family: 'JetBrains Mono', monospace;
//           padding: 6px 10px;
//           border: 1px solid rgba(74,222,128,0.3);
//           border-radius: 20px;
//           background: rgba(74,222,128,0.08);
//         }
//         .pal-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pal-pulse 1.6s ease-in-out infinite; }
//         @keyframes pal-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

//         .pal-content { padding: 24px 28px; overflow-y: auto; flex: 1; }

//         /* Toolbar */
//         .pal-toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 18px; flex-wrap: wrap; }
//         .pal-search {
//           display: flex; align-items: center; gap: 8px;
//           background: var(--navy-900); border: 1px solid var(--line);
//           border-radius: 8px; padding: 8px 12px; flex: 1; min-width: 200px; max-width: 320px;
//         }
//         .pal-search input { background: transparent; border: none; outline: none; color: var(--text); font-size: 13px; width: 100%; }
//         .pal-search input::placeholder { color: var(--text-dim); }
//         .pal-select {
//           background: var(--navy-900); border: 1px solid var(--line); color: var(--text);
//           padding: 8px 10px; border-radius: 8px; font-size: 13px; outline: none; cursor: pointer;
//         }
//         .pal-btn-primary {
//           display: flex; align-items: center; gap: 6px;
//           background: var(--amber); color: var(--navy-950);
//           border: none; padding: 9px 16px; border-radius: 8px;
//           font-weight: 600; font-size: 13px; cursor: pointer;
//           margin-left: auto;
//           transition: filter 0.15s ease;
//         }
//         .pal-btn-primary:hover { filter: brightness(1.08); }

//         /* Table */
//         .pal-table-wrap { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: var(--navy-900); }
//         table.pal-table { width: 100%; border-collapse: collapse; font-size: 13px; }
//         .pal-table th {
//           text-align: left; padding: 11px 14px; font-size: 10.5px; letter-spacing: 0.06em;
//           text-transform: uppercase; color: var(--text-dim); border-bottom: 1px solid var(--line);
//           font-weight: 600; background: var(--navy-800);
//         }
//         .pal-table td { padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: middle; }
//         .pal-table tr:last-child td { border-bottom: none; }
//         .pal-table tr:hover td { background: rgba(255,255,255,0.015); }
//         .pal-id { font-family: 'JetBrains Mono', monospace; color: var(--cyan); font-size: 12.5px; }
//         .pal-route { display: flex; align-items: center; gap: 6px; color: var(--text-dim); font-size: 12.5px; }

//         .pal-pill {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
//         }
//         .pal-capacity-bar { width: 70px; height: 5px; border-radius: 3px; background: var(--navy-700); overflow: hidden; }
//         .pal-capacity-fill { height: 100%; border-radius: 3px; }
//         .pal-icon-btn {
//           background: transparent; border: 1px solid var(--line); color: var(--text-dim);
//           width: 28px; height: 28px; border-radius: 6px; display: inline-flex;
//           align-items: center; justify-content: center; cursor: pointer; margin-right: 4px;
//           transition: all 0.15s ease;
//         }
//         .pal-icon-btn:hover { color: var(--text); border-color: var(--text-dim); }
//         .pal-icon-btn.danger:hover { color: var(--red); border-color: var(--red); }

//         /* KPI cards */
//         .pal-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
//         .pal-kpi-card { background: var(--navy-900); border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px; }
//         .pal-kpi-label { font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
//         .pal-kpi-value { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; }
//         .pal-kpi-icon { float: right; color: var(--amber); opacity: 0.8; }

//         .pal-panel { background: var(--navy-900); border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; }
//         .pal-panel-title { font-family: 'Oswald', sans-serif; font-size: 14px; letter-spacing: 0.03em; margin-bottom: 14px; text-transform: uppercase; color: var(--text-dim); }

//         .pal-charts-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; margin-top: 14px; }
//         .pal-legend-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; margin-top: 8px; }
//         .pal-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

//         /* GPS map */
//         .pal-gps-grid { display: grid; grid-template-columns: 1fr 300px; gap: 14px; }
//         .pal-map-wrap {
//           position: relative; border: 1px solid var(--line); border-radius: 10px;
//           background: var(--navy-900); overflow: hidden; aspect-ratio: 16/10;
//         }
//         .pal-map-svg { width: 100%; height: 100%; }
//         .pal-truck-list { display: flex; flex-direction: column; gap: 8px; max-height: 520px; overflow-y: auto; }
//         .pal-truck-card { background: var(--navy-900); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; }
//         .pal-truck-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
//         .pal-truck-id { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--cyan); }
//         .pal-truck-meta { font-size: 11.5px; color: var(--text-dim); display: flex; align-items: center; gap: 5px; margin-top: 3px; }

//         /* Modal */
//         .pal-modal-overlay {
//           position: fixed; inset: 0; background: rgba(5,10,18,0.7);
//           display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px;
//         }
//         .pal-modal {
//           background: var(--navy-900); border: 1px solid var(--line); border-radius: 12px;
//           width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto;
//         }
//         .pal-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; border-bottom: 1px solid var(--line); }
//         .pal-modal-title { font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.02em; }
//         .pal-modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
//         .pal-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//         .pal-field label { display: block; font-size: 11.5px; color: var(--text-dim); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
//         .pal-field input, .pal-field select {
//           width: 100%; background: var(--navy-800); border: 1px solid var(--line); color: var(--text);
//           padding: 9px 10px; border-radius: 7px; font-size: 13px; outline: none;
//         }
//         .pal-field input:focus, .pal-field select:focus { border-color: var(--amber); }
//         .pal-modal-footer { padding: 16px 20px; border-top: 1px solid var(--line); display: flex; justify-content: flex-end; gap: 10px; }
//         .pal-btn-ghost { background: transparent; border: 1px solid var(--line); color: var(--text-dim); padding: 9px 16px; border-radius: 8px; font-size: 13px; cursor: pointer; }
//         .pal-btn-ghost:hover { color: var(--text); }

//         .pal-empty { text-align: center; padding: 40px 20px; color: var(--text-dim); font-size: 13px; }
//       `}</style>

//       {/* SIDEBAR */}
//       <aside className="pal-sidebar">
//         <div className="pal-brand">
//           <div className="pal-brand-mark">PF</div>
//           <div className="pal-brand-text">
//             <div className="pal-brand-title">PAL Flux</div>
//             <div className="pal-brand-sub">Port de Lomé</div>
//           </div>
//         </div>
//         {tabs.map(tab => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.id}
//               className={`pal-navitem ${activeTab === tab.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               <Icon size={16} />
//               {tab.label}
//             </button>
//           );
//         })}
//       </aside>

//       {/* MAIN */}
//       <div className="pal-main">
//         <div className="pal-topbar">
//           <div>
//             <div className="pal-topbar-title">
//               {tabs.find(t => t.id === activeTab)?.label}
//             </div>
//             <div className="pal-topbar-sub">Régulation du flux de camions — Administrateur PAL</div>
//           </div>
//           <div className="pal-badge-live">
//             <span className="pal-dot" />
//             SYSTÈME EN LIGNE
//           </div>
//         </div>

//         <div className="pal-content">
//           {activeTab === 'creneaux' && (
//             <CreneauxTab
//               slots={filteredSlots}
//               search={search}
//               setSearch={setSearch}
//               statusFilter={statusFilter}
//               setStatusFilter={setStatusFilter}
//               onCreate={openCreateModal}
//               onEdit={openEditModal}
//               onDelete={setDeleteTarget}
//             />
//           )}

//           {activeTab === 'reservations' && (
//             <ReservationsTab reservations={reservations} slots={slots} />
//           )}

//           {activeTab === 'stats' && (
//             <StatsTab
//               kpis={kpis}
//               statusDistribution={statusDistribution}
//               operationDistribution={operationDistribution}
//               weeklyReservations={weeklyReservations}
//             />
//           )}

//           {activeTab === 'gps' && (
//             <GPSTab trucks={trucks} />
//           )}
//         </div>
//       </div>

//       {modalOpen && (
//         <SlotModal
//           slot={editingSlot}
//           onClose={() => { setModalOpen(false); setEditingSlot(null); }}
//           onSave={handleSaveSlot}
//         />
//       )}

//       {deleteTarget && (
//         <ConfirmDeleteModal
//           slot={deleteTarget}
//           onCancel={() => setDeleteTarget(null)}
//           onConfirm={handleDeleteSlot}
//         />
//       )}
//     </div>
//   );
// }

// // ============================================================
// // ONGLET CRÉNEAUX (CRUD)
// // ============================================================

// function CreneauxTab({ slots, search, setSearch, statusFilter, setStatusFilter, onCreate, onEdit, onDelete }) {
//   return (
//     <div>
//       <div className="pal-toolbar">
//         <div className="pal-search">
//           <Search size={14} color="#8FA1B8" />
//           <input
//             placeholder="Rechercher un créneau, une porte, un quai…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <select className="pal-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//           <option value="all">Tous les statuts</option>
//           {Object.entries(STATUS_META).map(([key, meta]) => (
//             <option key={key} value={key}>{meta.label}</option>
//           ))}
//         </select>
//         <button className="pal-btn-primary" onClick={onCreate}>
//           <Plus size={15} /> Nouveau créneau
//         </button>
//       </div>

//       <div className="pal-table-wrap">
//         <table className="pal-table">
//           <thead>
//             <tr>
//               <th>Créneau</th>
//               <th>Date &amp; horaire</th>
//               <th>Trajet</th>
//               <th>Opération</th>
//               <th>Occupation</th>
//               <th>Statut</th>
//               <th style={{ textAlign: 'right' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {slots.map(slot => {
//               const occRate = slot.total ? Math.round((slot.reserved / slot.total) * 100) : 0;
//               const statusMeta = STATUS_META[slot.status];
//               const opMeta = OPERATION_META[slot.operation];
//               return (
//                 <tr key={slot.id}>
//                   <td className="pal-id">{slot.id}</td>
//                   <td>
//                     <div>{slot.date}</div>
//                     <div style={{ color: '#8FA1B8', fontSize: 12 }}>{slot.start} – {slot.end}</div>
//                   </td>
//                   <td>
//                     <div className="pal-route">
//                       <MapPin size={12} /> {slot.origin} <ArrowUpRight size={11} /> {slot.destination}
//                     </div>
//                   </td>
//                   <td>
//                     <span className="pal-pill" style={{ background: `${opMeta.color}22`, color: opMeta.color }}>
//                       {opMeta.label}
//                     </span>
//                   </td>
//                   <td>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                       <div className="pal-capacity-bar">
//                         <div className="pal-capacity-fill" style={{ width: `${occRate}%`, background: occRate >= 90 ? '#F2545B' : occRate >= 50 ? '#F2A93B' : '#4ADE80' }} />
//                       </div>
//                       <span className="pal-mono" style={{ fontSize: 11.5, color: '#8FA1B8' }}>{slot.reserved}/{slot.total}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <span className="pal-pill" style={{ background: `${statusMeta.color}22`, color: statusMeta.color }}>
//                       {statusMeta.label}
//                     </span>
//                   </td>
//                   <td style={{ textAlign: 'right' }}>
//                     <button className="pal-icon-btn" onClick={() => onEdit(slot)} title="Modifier">
//                       <Pencil size={13} />
//                     </button>
//                     <button className="pal-icon-btn danger" onClick={() => onDelete(slot)} title="Supprimer">
//                       <Trash2 size={13} />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {slots.length === 0 && <div className="pal-empty">Aucun créneau ne correspond à votre recherche.</div>}
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // MODALE CRÉATION / ÉDITION D'UN CRÉNEAU
// // ============================================================

// function SlotModal({ slot, onClose, onSave }) {
//   const [form, setForm] = useState(slot || {
//     date: '2026-07-17',
//     start: '06:00',
//     end: '09:15',
//     origin: GATES[0],
//     destination: TERMINALS[0],
//     total: 10,
//     available: 10,
//     status: 'active',
//     operation: 'loading',
//   });

//   const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ ...form, total: Number(form.total), available: Number(form.available) });
//   };

//   return (
//     <div className="pal-modal-overlay" onClick={onClose}>
//       <div className="pal-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="pal-modal-header">
//           <div className="pal-modal-title">{slot ? 'Modifier le créneau' : 'Nouveau créneau'}</div>
//           <button className="pal-icon-btn" onClick={onClose}><X size={14} /></button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="pal-modal-body">
//             <div className="pal-field-row">
//               <div className="pal-field">
//                 <label>Date</label>
//                 <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} required />
//               </div>
//               <div className="pal-field">
//                 <label>Statut</label>
//                 <select value={form.status} onChange={(e) => update('status', e.target.value)}>
//                   {Object.entries(STATUS_META).map(([key, meta]) => (
//                     <option key={key} value={key}>{meta.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="pal-field-row">
//               <div className="pal-field">
//                 <label>Heure de début</label>
//                 <input type="time" value={form.start} onChange={(e) => update('start', e.target.value)} required />
//               </div>
//               <div className="pal-field">
//                 <label>Heure de fin</label>
//                 <input type="time" value={form.end} onChange={(e) => update('end', e.target.value)} required />
//               </div>
//             </div>

//             <div className="pal-field-row">
//               <div className="pal-field">
//                 <label>Porte d'origine</label>
//                 <select value={form.origin} onChange={(e) => update('origin', e.target.value)}>
//                   {GATES.map(g => <option key={g} value={g}>{g}</option>)}
//                 </select>
//               </div>
//               <div className="pal-field">
//                 <label>Terminal de destination</label>
//                 <select value={form.destination} onChange={(e) => update('destination', e.target.value)}>
//                   {TERMINALS.map(t => <option key={t} value={t}>{t}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div className="pal-field-row">
//               <div className="pal-field">
//                 <label>Type d'opération</label>
//                 <select value={form.operation} onChange={(e) => update('operation', e.target.value)}>
//                   {Object.entries(OPERATION_META).map(([key, meta]) => (
//                     <option key={key} value={key}>{meta.label}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="pal-field">
//                 <label>Capacité totale</label>
//                 <input type="number" min="1" value={form.total} onChange={(e) => update('total', e.target.value)} required />
//               </div>
//             </div>
//           </div>
//           <div className="pal-modal-footer">
//             <button type="button" className="pal-btn-ghost" onClick={onClose}>Annuler</button>
//             <button type="submit" className="pal-btn-primary" style={{ marginLeft: 0 }}>
//               {slot ? 'Enregistrer' : 'Créer le créneau'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ConfirmDeleteModal({ slot, onCancel, onConfirm }) {
//   return (
//     <div className="pal-modal-overlay" onClick={onCancel}>
//       <div className="pal-modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
//         <div className="pal-modal-body" style={{ paddingTop: 24 }}>
//           <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
//             <AlertCircle size={20} color="#F2545B" style={{ flexShrink: 0, marginTop: 2 }} />
//             <div>
//               <div style={{ fontWeight: 600, marginBottom: 4 }}>Supprimer {slot.id} ?</div>
//               <div style={{ fontSize: 13, color: '#8FA1B8' }}>
//                 Cette action est irréversible. {slot.reserved > 0 && `${slot.reserved} réservation(s) associée(s) seront affectées.`}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="pal-modal-footer">
//           <button className="pal-btn-ghost" onClick={onCancel}>Annuler</button>
//           <button
//             className="pal-btn-primary"
//             style={{ marginLeft: 0, background: '#F2545B', color: '#fff' }}
//             onClick={onConfirm}
//           >
//             Supprimer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // ONGLET RÉSERVATIONS
// // ============================================================

// function ReservationsTab({ reservations, slots }) {
//   const getSlot = (id) => slots.find(s => s.id === id);

//   return (
//     <div className="pal-table-wrap">
//       <table className="pal-table">
//         <thead>
//           <tr>
//             <th>Réservation</th>
//             <th>Créneau</th>
//             <th>Camion</th>
//             <th>Chauffeur</th>
//             <th>Transporteur</th>
//             <th>Créée le</th>
//             <th>Statut</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reservations.map(rsv => {
//             const slot = getSlot(rsv.slotId);
//             return (
//               <tr key={rsv.id}>
//                 <td className="pal-id">{rsv.id}</td>
//                 <td>
//                   <div className="pal-id" style={{ fontSize: 12.5 }}>{rsv.slotId}</div>
//                   {slot && <div style={{ fontSize: 11.5, color: '#8FA1B8' }}>{slot.start}–{slot.end} · {slot.destination}</div>}
//                 </td>
//                 <td className="pal-mono" style={{ fontSize: 12.5 }}>{rsv.truck}</td>
//                 <td>{rsv.driver}</td>
//                 <td style={{ color: '#8FA1B8' }}>{rsv.company}</td>
//                 <td className="pal-mono" style={{ fontSize: 12, color: '#8FA1B8' }}>{rsv.createdAt}</td>
//                 <td>
//                   <span
//                     className="pal-pill"
//                     style={{
//                       background: rsv.status === 'confirmed' ? '#4ADE8022' : '#F2A93B22',
//                       color: rsv.status === 'confirmed' ? '#4ADE80' : '#F2A93B',
//                     }}
//                   >
//                     {rsv.status === 'confirmed' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
//                     {rsv.status === 'confirmed' ? 'Confirmée' : 'En attente'}
//                   </span>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ============================================================
// // ONGLET STATISTIQUES
// // ============================================================

// function StatsTab({ kpis, statusDistribution, operationDistribution, weeklyReservations }) {
//   return (
//     <div>
//       <div className="pal-kpi-grid">
//         <div className="pal-kpi-card">
//           <Clock size={16} className="pal-kpi-icon" />
//           <div className="pal-kpi-label">Créneaux actifs</div>
//           <div className="pal-kpi-value">{kpis.activeSlots}</div>
//         </div>
//         <div className="pal-kpi-card">
//           <Gauge size={16} className="pal-kpi-icon" />
//           <div className="pal-kpi-label">Taux d'occupation</div>
//           <div className="pal-kpi-value">{kpis.occupation}%</div>
//         </div>
//         <div className="pal-kpi-card">
//           <Package size={16} className="pal-kpi-icon" />
//           <div className="pal-kpi-label">Réservations aujourd'hui</div>
//           <div className="pal-kpi-value">{kpis.todayReservations}</div>
//         </div>
//         <div className="pal-kpi-card">
//           <Truck size={16} className="pal-kpi-icon" />
//           <div className="pal-kpi-label">Camions en transit</div>
//           <div className="pal-kpi-value">{kpis.enRoute}</div>
//         </div>
//       </div>

//       <div className="pal-charts-grid">
//         <div className="pal-panel">
//           <div className="pal-panel-title">Réservations — 7 derniers jours</div>
//           <ResponsiveContainer width="100%" height={220}>
//             <LineChart data={weeklyReservations}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#24384f" vertical={false} />
//               <XAxis dataKey="day" stroke="#8FA1B8" fontSize={12} tickLine={false} axisLine={{ stroke: '#24384f' }} />
//               <YAxis stroke="#8FA1B8" fontSize={12} tickLine={false} axisLine={false} />
//               <Tooltip
//                 contentStyle={{ background: '#16283F', border: '1px solid #24384f', borderRadius: 8, fontSize: 12.5 }}
//                 labelStyle={{ color: '#EAF0F6' }}
//               />
//               <Line type="monotone" dataKey="reservations" stroke="#F2A93B" strokeWidth={2.5} dot={{ fill: '#F2A93B', r: 3.5 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="pal-panel">
//           <div className="pal-panel-title">Répartition par statut</div>
//           <ResponsiveContainer width="100%" height={180}>
//             <PieChart>
//               <Pie data={statusDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={3}>
//                 {statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
//               </Pie>
//               <Tooltip contentStyle={{ background: '#16283F', border: '1px solid #24384f', borderRadius: 8, fontSize: 12.5 }} />
//             </PieChart>
//           </ResponsiveContainer>
//           {statusDistribution.map((entry, i) => (
//             <div className="pal-legend-row" key={i}>
//               <span className="pal-legend-dot" style={{ background: entry.color }} />
//               <span style={{ color: '#8FA1B8' }}>{entry.name}</span>
//               <span style={{ marginLeft: 'auto' }} className="pal-mono">{entry.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pal-panel" style={{ marginTop: 14 }}>
//         <div className="pal-panel-title">Répartition par type d'opération</div>
//         <ResponsiveContainer width="100%" height={180}>
//           <BarChart data={operationDistribution} layout="vertical" margin={{ left: 10 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#24384f" horizontal={false} />
//             <XAxis type="number" stroke="#8FA1B8" fontSize={12} tickLine={false} axisLine={{ stroke: '#24384f' }} allowDecimals={false} />
//             <YAxis type="category" dataKey="name" stroke="#8FA1B8" fontSize={12.5} tickLine={false} axisLine={false} width={110} />
//             <Tooltip contentStyle={{ background: '#16283F', border: '1px solid #24384f', borderRadius: 8, fontSize: 12.5 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
//             <Bar dataKey="value" radius={[0, 4, 4, 0]}>
//               {operationDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // ONGLET SUIVI GPS
// // ============================================================
// // API: idéalement une connexion WebSocket ou un polling GET /api/trucks/positions/
// // vers votre fournisseur GPS pour rafraîchir x/y (ou lat/lng) en temps réel.

// function GPSTab({ trucks }) {
//   const [selected, setSelected] = useState(trucks[0]?.id ?? null);

//   const zones = [
//     { label: 'Porte Nord', x: 8, y: 62 },
//     { label: 'Porte Sud', x: 8, y: 90 },
//     { label: 'Quai A', x: 34, y: 18 },
//     { label: 'Quai B', x: 55, y: 14 },
//     { label: 'Quai C', x: 78, y: 18 },
//     { label: 'Zone de Transit', x: 72, y: 80 },
//   ];

//   return (
//     <div className="pal-gps-grid">
//       <div className="pal-map-wrap">
//         <svg className="pal-map-svg" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet">
//           <defs>
//             <pattern id="palGrid" width="5" height="5" patternUnits="userSpaceOnUse">
//               <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#1D3350" strokeWidth="0.15" />
//             </pattern>
//           </defs>
//           <rect width="100" height="62" fill="url(#palGrid)" />

//           {/* Bassin portuaire stylisé */}
//           <path d="M 0,0 L 30,0 L 26,10 L 60,8 L 64,0 L 100,0 L 100,62 L 0,62 Z" fill="#0D1826" opacity="0.6" />
//           <text x="50" y="6" fill="#3FC7D6" fontSize="2.6" fontFamily="JetBrains Mono, monospace" opacity="0.5" textAnchor="middle">BASSIN PORTUAIRE</text>

//           {/* Zones / quais */}
//           {zones.map((z, i) => (
//             <g key={i}>
//               <circle cx={z.x} cy={z.y} r="1.1" fill="#1D3350" stroke="#3FC7D6" strokeWidth="0.25" />
//               <text x={z.x} y={z.y - 2.4} fill="#8FA1B8" fontSize="2.3" fontFamily="Inter, sans-serif" textAnchor="middle">{z.label}</text>
//             </g>
//           ))}

//           {/* Routes schématiques */}
//           <path d="M 8,62 L 8,62 L 34,18" stroke="#24384f" strokeWidth="0.6" fill="none" strokeDasharray="1,1" />
//           <path d="M 8,90 L 55,14" stroke="#24384f" strokeWidth="0.6" fill="none" strokeDasharray="1,1" />

//           {/* Camions */}
//           {trucks.map(t => {
//             const meta = TRUCK_STATUS_META[t.status];
//             const isSelected = selected === t.id;
//             return (
//               <g
//                 key={t.id}
//                 transform={`translate(${t.x}, ${t.y * 0.62})`}
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setSelected(t.id)}
//               >
//                 {t.status === 'en_route' && (
//                   <circle r="2.2" fill={meta.color} opacity="0.25">
//                     <animate attributeName="r" values="2.2;4;2.2" dur="2s" repeatCount="indefinite" />
//                     <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
//                   </circle>
//                 )}
//                 <circle r={isSelected ? 1.6 : 1.2} fill={meta.color} stroke="#0A1420" strokeWidth="0.3" />
//                 {isSelected && (
//                   <text x="2.2" y="0.6" fontSize="2.4" fill="#EAF0F6" fontFamily="JetBrains Mono, monospace">{t.id}</text>
//                 )}
//               </g>
//             );
//           })}
//         </svg>
//       </div>

//       <div className="pal-truck-list">
//         {trucks.map(t => {
//           const meta = TRUCK_STATUS_META[t.status];
//           const isSelected = selected === t.id;
//           return (
//             <div
//               key={t.id}
//               className="pal-truck-card"
//               style={{ cursor: 'pointer', borderColor: isSelected ? meta.color : undefined }}
//               onClick={() => setSelected(t.id)}
//             >
//               <div className="pal-truck-top">
//                 <span className="pal-truck-id">{t.id}</span>
//                 <span className="pal-pill" style={{ background: `${meta.color}22`, color: meta.color }}>{meta.label}</span>
//               </div>
//               <div className="pal-truck-meta"><Navigation2 size={11} /> {t.driver}</div>
//               <div className="pal-truck-meta"><MapPin size={11} /> {t.zone}</div>
//               <div className="pal-truck-meta">
//                 <Gauge size={11} /> {t.speed} km/h
//                 <span style={{ marginLeft: 'auto' }} className="pal-mono">{t.lastUpdate}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import {
  Plus, Pencil, Trash2, Search, Clock, Truck, MapPin, TrendingUp,
  Package, X, AlertCircle, CheckCircle2, Radio,
  ArrowUpRight, Gauge, Navigation2, Sun, Moon
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// ============================================================
// THÈMES — chaque couleur sémantique est résolue depuis ce token
// system, pas codée en dur, pour que le mode clair reste lisible
// et cohérent avec l'identité portuaire (pas juste un fond inversé).
// ============================================================

const THEMES = {
  dark: {
    bg: '#0A1420',
    panel: '#101E30',
    elevated: '#16283F',
    surfaceAlt: '#1D3350',
    line: '#24384f',
    text: '#EAF0F6',
    textDim: '#8FA1B8',
    amber: '#F2A93B',
    amberSoft: '#c97f1f',
    cyan: '#3FC7D6',
    green: '#4ADE80',
    red: '#F2545B',
    mapBasin: '#0D1826',
    overlay: 'rgba(5,10,18,0.7)',
  },
  light: {
    bg: '#EEF1F6',
    panel: '#FFFFFF',
    elevated: '#F4F7FA',
    surfaceAlt: '#E3E9F0',
    line: '#D9E0E9',
    text: '#0F1E30',
    textDim: '#5B6B80',
    amber: '#B9700D',
    amberSoft: '#8f5709',
    cyan: '#0E7C88',
    green: '#25904F',
    red: '#C22F3B',
    mapBasin: '#E3E9F0',
    overlay: 'rgba(15,25,40,0.35)',
  },
};

// ============================================================
// DONNÉES SIMULÉES — à remplacer par des appels Axios vers l'API DRF
// (voir commentaires "API:" à chaque endroit concerné)
// ============================================================

const GATES = ['Porte Nord', 'Porte Sud', 'Porte Est', 'Terminal Conteneurs'];
const TERMINALS = ['Quai A', 'Quai B', 'Quai C', 'Zone de Transit'];

// colorKey référence une entrée du THEME courant (amber / cyan / green / red / textDim)
const STATUS_META = {
  active: { label: 'Actif', colorKey: 'green' },
  inactive: { label: 'Inactif', colorKey: 'textDim' },
  cancelled: { label: 'Annulé', colorKey: 'red' },
  completed: { label: 'Terminé', colorKey: 'cyan' },
};

const OPERATION_META = {
  loading: { label: 'Chargement', colorKey: 'amber' },
  unloading: { label: 'Déchargement', colorKey: 'cyan' },
  transit: { label: 'Transit', colorKey: 'textDim' },
};

const TRUCK_STATUS_META = {
  en_route: { label: 'En route', colorKey: 'cyan' },
  loading: { label: 'En chargement', colorKey: 'amber' },
  idle: { label: 'À l\u2019arrêt', colorKey: 'textDim' },
};

const initialSlots = [
  { id: 'SLOT-001', date: '2026-07-16', start: '06:00', end: '09:15', origin: 'Porte Nord', destination: 'Quai A', total: 12, available: 3, reserved: 9, status: 'active', operation: 'loading' },
  { id: 'SLOT-002', date: '2026-07-16', start: '09:15', end: '12:30', origin: 'Porte Sud', destination: 'Quai B', total: 10, available: 0, reserved: 10, status: 'active', operation: 'unloading' },
  { id: 'SLOT-003', date: '2026-07-16', start: '12:30', end: '15:45', origin: 'Terminal Conteneurs', destination: 'Zone de Transit', total: 8, available: 5, reserved: 3, status: 'active', operation: 'transit' },
  { id: 'SLOT-004', date: '2026-07-16', start: '15:45', end: '19:00', origin: 'Porte Est', destination: 'Quai C', total: 14, available: 14, reserved: 0, status: 'inactive', operation: 'loading' },
  { id: 'SLOT-005', date: '2026-07-15', start: '06:00', end: '09:15', origin: 'Porte Nord', destination: 'Quai A', total: 12, available: 0, reserved: 12, status: 'completed', operation: 'loading' },
  { id: 'SLOT-006', date: '2026-07-15', start: '09:15', end: '12:30', origin: 'Porte Sud', destination: 'Quai B', total: 10, available: 2, reserved: 6, status: 'cancelled', operation: 'unloading' },
];

const initialReservations = [
  { id: 'RSV-1042', slotId: 'SLOT-001', truck: 'TG-4471-A', driver: 'Kodjo Mensah', company: 'Sogetra', createdAt: '2026-07-15 08:12', status: 'confirmed' },
  { id: 'RSV-1043', slotId: 'SLOT-001', truck: 'TG-2290-B', driver: 'Ama Doe', company: 'Transit Plus', createdAt: '2026-07-15 09:30', status: 'confirmed' },
  { id: 'RSV-1044', slotId: 'SLOT-002', truck: 'TG-1187-C', driver: 'Yao Kokou', company: 'Sogetra', createdAt: '2026-07-15 10:05', status: 'confirmed' },
  { id: 'RSV-1045', slotId: 'SLOT-003', truck: 'TG-6650-D', driver: 'Essi Adjo', company: 'Fret Togo', createdAt: '2026-07-16 06:40', status: 'pending' },
  { id: 'RSV-1046', slotId: 'SLOT-002', truck: 'TG-3321-E', driver: 'Komi Ayao', company: 'Transit Plus', createdAt: '2026-07-16 07:02', status: 'confirmed' },
];

const initialTrucks = [
  { id: 'TG-4471-A', driver: 'Kodjo Mensah', status: 'en_route', zone: 'Porte Nord → Quai A', speed: 24, x: 22, y: 68, lastUpdate: '08:41:02' },
  { id: 'TG-2290-B', driver: 'Ama Doe', status: 'loading', zone: 'Quai A', speed: 0, x: 34, y: 30, lastUpdate: '08:40:51' },
  { id: 'TG-1187-C', driver: 'Yao Kokou', status: 'loading', zone: 'Quai B', speed: 0, x: 55, y: 26, lastUpdate: '08:40:44' },
  { id: 'TG-6650-D', driver: 'Essi Adjo', status: 'en_route', zone: 'Terminal Conteneurs → Transit', speed: 18, x: 70, y: 72, lastUpdate: '08:41:10' },
  { id: 'TG-3321-E', driver: 'Komi Ayao', status: 'idle', zone: 'Zone d\u2019attente', speed: 0, x: 12, y: 82, lastUpdate: '08:38:20' },
  { id: 'TG-8804-F', driver: 'Afi Sena', status: 'en_route', zone: 'Porte Sud → Quai C', speed: 31, x: 47, y: 55, lastUpdate: '08:41:15' },
];

const weeklyReservations = [
  { day: 'Lun', reservations: 34 },
  { day: 'Mar', reservations: 41 },
  { day: 'Mer', reservations: 38 },
  { day: 'Jeu', reservations: 52 },
  { day: 'Ven', reservations: 47 },
  { day: 'Sam', reservations: 29 },
  { day: 'Dim', reservations: 18 },
];

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function PALAdminDashboard() {
  const [themeName, setThemeName] = useState('dark');
  const theme = THEMES[themeName];

  const [activeTab, setActiveTab] = useState('creneaux');
  const [slots, setSlots] = useState(initialSlots);
  const [reservations] = useState(initialReservations);
  const [trucks] = useState(initialTrucks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tabs = [
    { id: 'creneaux', label: 'Créneaux', icon: Clock },
    { id: 'reservations', label: 'Réservations', icon: Package },
    { id: 'stats', label: 'Statistiques', icon: TrendingUp },
    { id: 'gps', label: 'Suivi GPS', icon: Radio },
  ];

  // ---- CRUD Créneaux -----------------------------------------------------
  // API: GET /api/slots/
  const filteredSlots = useMemo(() => {
    return slots.filter(s => {
      const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase())
        || s.origin.toLowerCase().includes(search.toLowerCase())
        || s.destination.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [slots, search, statusFilter]);

  const openCreateModal = () => {
    setEditingSlot(null);
    setModalOpen(true);
  };

  const openEditModal = (slot) => {
    setEditingSlot(slot);
    setModalOpen(true);
  };

  // API: POST /api/slots/  ou  PUT /api/slots/{id}/
  const handleSaveSlot = (formValues) => {
    if (editingSlot) {
      setSlots(prev => prev.map(s => s.id === editingSlot.id ? { ...s, ...formValues } : s));
    } else {
      const newId = `SLOT-${String(slots.length + 1).padStart(3, '0')}`;
      setSlots(prev => [{ id: newId, reserved: 0, ...formValues }, ...prev]);
    }
    setModalOpen(false);
    setEditingSlot(null);
  };

  // API: DELETE /api/slots/{id}/
  const handleDeleteSlot = () => {
    setSlots(prev => prev.filter(s => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  // ---- Statistiques dérivées ---------------------------------------------
  const kpis = useMemo(() => {
    const activeSlots = slots.filter(s => s.status === 'active').length;
    const totalCapacity = slots.reduce((acc, s) => acc + s.total, 0);
    const totalReserved = slots.reduce((acc, s) => acc + s.reserved, 0);
    const occupation = totalCapacity ? Math.round((totalReserved / totalCapacity) * 100) : 0;
    const todayReservations = reservations.filter(r => r.createdAt.startsWith('2026-07-16')).length;
    const enRoute = trucks.filter(t => t.status === 'en_route').length;
    return { activeSlots, occupation, todayReservations, enRoute };
  }, [slots, reservations, trucks]);

  const statusDistribution = useMemo(() => {
    const counts = {};
    slots.forEach(s => { counts[s.status] = (counts[s.status] || 0) + 1; });
    return Object.entries(counts).map(([key, value]) => ({
      name: STATUS_META[key].label,
      value,
      color: theme[STATUS_META[key].colorKey],
    }));
  }, [slots, theme]);

  const operationDistribution = useMemo(() => {
    const counts = {};
    slots.forEach(s => { counts[s.operation] = (counts[s.operation] || 0) + 1; });
    return Object.entries(counts).map(([key, value]) => ({
      name: OPERATION_META[key].label,
      value,
      color: theme[OPERATION_META[key].colorKey],
    }));
  }, [slots, theme]);

  const rootVars = {
    '--bg': theme.bg,
    '--panel': theme.panel,
    '--elevated': theme.elevated,
    '--surface-alt': theme.surfaceAlt,
    '--line': theme.line,
    '--text': theme.text,
    '--text-dim': theme.textDim,
    '--amber': theme.amber,
    '--amber-soft': theme.amberSoft,
    '--cyan': theme.cyan,
    '--green': theme.green,
    '--red': theme.red,
  };

  return (
    <div className="pal-root" style={rootVars}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .pal-root {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--line);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .pal-root * { box-sizing: border-box; }
        .pal-mono { font-family: 'JetBrains Mono', monospace; }
        .pal-display { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; }

        .pal-sidebar {
          width: 220px;
          background: var(--panel);
          border-right: 1px solid var(--line);
          padding: 24px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex-shrink: 0;
        }
        .pal-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 8px 22px 8px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--line);
        }
        .pal-brand-mark {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, var(--amber), var(--amber-soft));
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          color: var(--bg);
          font-size: 15px;
        }
        .pal-brand-text { line-height: 1.15; }
        .pal-brand-title { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 0.03em; }
        .pal-brand-sub { font-size: 10.5px; color: var(--text-dim); letter-spacing: 0.08em; }

        .pal-navitem {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-dim);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          background: transparent;
          border: none;
          text-align: left;
          width: 100%;
        }
        .pal-navitem:hover { background: var(--elevated); color: var(--text); }
        .pal-navitem.active { background: var(--elevated); color: var(--amber); }
        .pal-navitem.active svg { color: var(--amber); }

        .pal-sidebar-footer {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        .pal-theme-toggle {
          display: flex; background: var(--elevated); border: 1px solid var(--line);
          border-radius: 8px; padding: 3px; gap: 3px;
        }
        .pal-theme-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 7px 0; border-radius: 6px; border: none; cursor: pointer;
          font-size: 12px; font-weight: 500; background: transparent; color: var(--text-dim);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .pal-theme-btn.active { background: var(--panel); color: var(--amber); box-shadow: 0 1px 2px rgba(0,0,0,0.15); }

        .pal-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(circle at top right, rgba(63,199,214,0.06), transparent 40%),
            var(--bg);
        }
        .pal-topbar {
          padding: 18px 28px;
          border-bottom: 1px solid var(--line);
          display: flex; align-items: center; justify-content: space-between;
        }
        .pal-topbar-title { font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
        .pal-topbar-sub { font-size: 12.5px; color: var(--text-dim); margin-top: 2px; }
        .pal-badge-live {
          display: flex; align-items: center; gap: 6px;
          font-size: 11.5px; color: var(--green);
          font-family: 'JetBrains Mono', monospace;
          padding: 6px 10px;
          border: 1px solid var(--green);
          border-radius: 20px;
          background: color-mix(in srgb, var(--green) 10%, transparent);
        }
        .pal-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pal-pulse 1.6s ease-in-out infinite; }
        @keyframes pal-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

        .pal-content { padding: 24px 28px; overflow-y: auto; flex: 1; }

        /* Toolbar */
        .pal-toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 18px; flex-wrap: wrap; }
        .pal-search {
          display: flex; align-items: center; gap: 8px;
          background: var(--panel); border: 1px solid var(--line);
          border-radius: 8px; padding: 8px 12px; flex: 1; min-width: 200px; max-width: 320px;
        }
        .pal-search input { background: transparent; border: none; outline: none; color: var(--text); font-size: 13px; width: 100%; }
        .pal-search input::placeholder { color: var(--text-dim); }
        .pal-select {
          background: var(--panel); border: 1px solid var(--line); color: var(--text);
          padding: 8px 10px; border-radius: 8px; font-size: 13px; outline: none; cursor: pointer;
        }
        .pal-btn-primary {
          display: flex; align-items: center; gap: 6px;
          background: var(--amber); color: var(--bg);
          border: none; padding: 9px 16px; border-radius: 8px;
          font-weight: 600; font-size: 13px; cursor: pointer;
          margin-left: auto;
          transition: filter 0.15s ease;
        }
        .pal-btn-primary:hover { filter: brightness(1.08); }

        /* Table */
        .pal-table-wrap { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: var(--panel); }
        table.pal-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .pal-table th {
          text-align: left; padding: 11px 14px; font-size: 10.5px; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--text-dim); border-bottom: 1px solid var(--line);
          font-weight: 600; background: var(--elevated);
        }
        .pal-table td { padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: middle; }
        .pal-table tr:last-child td { border-bottom: none; }
        .pal-table tr:hover td { background: color-mix(in srgb, var(--text) 3%, transparent); }
        .pal-id { font-family: 'JetBrains Mono', monospace; color: var(--cyan); font-size: 12.5px; }
        .pal-route { display: flex; align-items: center; gap: 6px; color: var(--text-dim); font-size: 12.5px; }

        .pal-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
        }
        .pal-capacity-bar { width: 70px; height: 5px; border-radius: 3px; background: var(--surface-alt); overflow: hidden; }
        .pal-capacity-fill { height: 100%; border-radius: 3px; }
        .pal-icon-btn {
          background: transparent; border: 1px solid var(--line); color: var(--text-dim);
          width: 28px; height: 28px; border-radius: 6px; display: inline-flex;
          align-items: center; justify-content: center; cursor: pointer; margin-right: 4px;
          transition: all 0.15s ease;
        }
        .pal-icon-btn:hover { color: var(--text); border-color: var(--text-dim); }
        .pal-icon-btn.danger:hover { color: var(--red); border-color: var(--red); }

        /* KPI cards */
        .pal-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
        .pal-kpi-card { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px; }
        .pal-kpi-label { font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .pal-kpi-value { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; }
        .pal-kpi-icon { float: right; color: var(--amber); opacity: 0.85; }

        .pal-panel { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; }
        .pal-panel-title { font-family: 'Oswald', sans-serif; font-size: 14px; letter-spacing: 0.03em; margin-bottom: 14px; text-transform: uppercase; color: var(--text-dim); }

        .pal-charts-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; margin-top: 14px; }
        .pal-legend-row { display: flex; align-items: center; gap: 8px; font-size: 12.5px; margin-top: 8px; }
        .pal-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* GPS map */
        .pal-gps-grid { display: grid; grid-template-columns: 1fr 300px; gap: 14px; }
        .pal-map-wrap {
          position: relative; border: 1px solid var(--line); border-radius: 10px;
          background: var(--panel); overflow: hidden; aspect-ratio: 16/10;
        }
        .pal-map-svg { width: 100%; height: 100%; }
        .pal-truck-list { display: flex; flex-direction: column; gap: 8px; max-height: 520px; overflow-y: auto; }
        .pal-truck-card { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; }
        .pal-truck-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .pal-truck-id { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--cyan); }
        .pal-truck-meta { font-size: 11.5px; color: var(--text-dim); display: flex; align-items: center; gap: 5px; margin-top: 3px; }

        /* Modal */
        .pal-modal-overlay {
          position: fixed; inset: 0; background: var(--overlay, rgba(5,10,18,0.7));
          display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px;
        }
        .pal-modal {
          background: var(--panel); border: 1px solid var(--line); border-radius: 12px;
          width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto;
        }
        .pal-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; border-bottom: 1px solid var(--line); }
        .pal-modal-title { font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.02em; }
        .pal-modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
        .pal-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .pal-field label { display: block; font-size: 11.5px; color: var(--text-dim); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
        .pal-field input, .pal-field select {
          width: 100%; background: var(--elevated); border: 1px solid var(--line); color: var(--text);
          padding: 9px 10px; border-radius: 7px; font-size: 13px; outline: none;
        }
        .pal-field input:focus, .pal-field select:focus { border-color: var(--amber); }
        .pal-modal-footer { padding: 16px 20px; border-top: 1px solid var(--line); display: flex; justify-content: flex-end; gap: 10px; }
        .pal-btn-ghost { background: transparent; border: 1px solid var(--line); color: var(--text-dim); padding: 9px 16px; border-radius: 8px; font-size: 13px; cursor: pointer; }
        .pal-btn-ghost:hover { color: var(--text); }

        .pal-empty { text-align: center; padding: 40px 20px; color: var(--text-dim); font-size: 13px; }
      `}</style>

      {/* SIDEBAR */}
      <aside className="pal-sidebar">
        <div className="pal-brand">
          <div className="pal-brand-mark">PF</div>
          <div className="pal-brand-text">
            <div className="pal-brand-title">PAL Flux</div>
            <div className="pal-brand-sub">Port de Lomé</div>
          </div>
        </div>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`pal-navitem ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}

        <div className="pal-sidebar-footer">
          <div className="pal-theme-toggle">
            <button
              className={`pal-theme-btn ${themeName === 'dark' ? 'active' : ''}`}
              onClick={() => setThemeName('dark')}
            >
              <Moon size={13} /> Sombre
            </button>
            <button
              className={`pal-theme-btn ${themeName === 'light' ? 'active' : ''}`}
              onClick={() => setThemeName('light')}
            >
              <Sun size={13} /> Clair
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="pal-main">
        <div className="pal-topbar">
          <div>
            <div className="pal-topbar-title">
              {tabs.find(t => t.id === activeTab)?.label}
            </div>
            <div className="pal-topbar-sub">Régulation du flux de camions — Administrateur PAL</div>
          </div>
          <div className="pal-badge-live">
            <span className="pal-dot" />
            SYSTÈME EN LIGNE
          </div>
        </div>

        <div className="pal-content">
          {activeTab === 'creneaux' && (
            <CreneauxTab
              slots={filteredSlots}
              theme={theme}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onCreate={openCreateModal}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
            />
          )}

          {activeTab === 'reservations' && (
            <ReservationsTab reservations={reservations} slots={slots} theme={theme} />
          )}

          {activeTab === 'stats' && (
            <StatsTab
              kpis={kpis}
              theme={theme}
              statusDistribution={statusDistribution}
              operationDistribution={operationDistribution}
              weeklyReservations={weeklyReservations}
            />
          )}

          {activeTab === 'gps' && (
            <GPSTab trucks={trucks} theme={theme} />
          )}
        </div>
      </div>

      {modalOpen && (
        <SlotModal
          slot={editingSlot}
          onClose={() => { setModalOpen(false); setEditingSlot(null); }}
          onSave={handleSaveSlot}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          slot={deleteTarget}
          theme={theme}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteSlot}
        />
      )}
    </div>
  );
}

// ============================================================
// ONGLET CRÉNEAUX (CRUD)
// ============================================================

function CreneauxTab({ slots, theme, search, setSearch, statusFilter, setStatusFilter, onCreate, onEdit, onDelete }) {
  return (
    <div>
      <div className="pal-toolbar">
        <div className="pal-search">
          <Search size={14} color={theme.textDim} />
          <input
            placeholder="Rechercher un créneau, une porte, un quai…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="pal-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Tous les statuts</option>
          {Object.entries(STATUS_META).map(([key, meta]) => (
            <option key={key} value={key}>{meta.label}</option>
          ))}
        </select>
        <button className="pal-btn-primary" onClick={onCreate}>
          <Plus size={15} /> Nouveau créneau
        </button>
      </div>

      <div className="pal-table-wrap">
        <table className="pal-table">
          <thead>
            <tr>
              <th>Créneau</th>
              <th>Date &amp; horaire</th>
              <th>Trajet</th>
              <th>Opération</th>
              <th>Occupation</th>
              <th>Statut</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map(slot => {
              const occRate = slot.total ? Math.round((slot.reserved / slot.total) * 100) : 0;
              const statusColor = theme[STATUS_META[slot.status].colorKey];
              const opColor = theme[OPERATION_META[slot.operation].colorKey];
              const capColor = occRate >= 90 ? theme.red : occRate >= 50 ? theme.amber : theme.green;
              return (
                <tr key={slot.id}>
                  <td className="pal-id">{slot.id}</td>
                  <td>
                    <div>{slot.date}</div>
                    <div style={{ color: theme.textDim, fontSize: 12 }}>{slot.start} – {slot.end}</div>
                  </td>
                  <td>
                    <div className="pal-route">
                      <MapPin size={12} /> {slot.origin} <ArrowUpRight size={11} /> {slot.destination}
                    </div>
                  </td>
                  <td>
                    <span className="pal-pill" style={{ background: `${opColor}22`, color: opColor }}>
                      {OPERATION_META[slot.operation].label}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="pal-capacity-bar">
                        <div className="pal-capacity-fill" style={{ width: `${occRate}%`, background: capColor }} />
                      </div>
                      <span className="pal-mono" style={{ fontSize: 11.5, color: theme.textDim }}>{slot.reserved}/{slot.total}</span>
                    </div>
                  </td>
                  <td>
                    <span className="pal-pill" style={{ background: `${statusColor}22`, color: statusColor }}>
                      {STATUS_META[slot.status].label}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="pal-icon-btn" onClick={() => onEdit(slot)} title="Modifier">
                      <Pencil size={13} />
                    </button>
                    <button className="pal-icon-btn danger" onClick={() => onDelete(slot)} title="Supprimer">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {slots.length === 0 && <div className="pal-empty">Aucun créneau ne correspond à votre recherche.</div>}
      </div>
    </div>
  );
}

// ============================================================
// MODALE CRÉATION / ÉDITION D'UN CRÉNEAU
// ============================================================

function SlotModal({ slot, onClose, onSave }) {
  const [form, setForm] = useState(slot || {
    date: '2026-07-17',
    start: '06:00',
    end: '09:15',
    origin: GATES[0],
    destination: TERMINALS[0],
    total: 10,
    available: 10,
    status: 'active',
    operation: 'loading',
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, total: Number(form.total), available: Number(form.available) });
  };

  return (
    <div className="pal-modal-overlay" onClick={onClose}>
      <div className="pal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pal-modal-header">
          <div className="pal-modal-title">{slot ? 'Modifier le créneau' : 'Nouveau créneau'}</div>
          <button className="pal-icon-btn" onClick={onClose}><X size={14} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pal-modal-body">
            <div className="pal-field-row">
              <div className="pal-field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} required />
              </div>
              <div className="pal-field">
                <label>Statut</label>
                <select value={form.status} onChange={(e) => update('status', e.target.value)}>
                  {Object.entries(STATUS_META).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pal-field-row">
              <div className="pal-field">
                <label>Heure de début</label>
                <input type="time" value={form.start} onChange={(e) => update('start', e.target.value)} required />
              </div>
              <div className="pal-field">
                <label>Heure de fin</label>
                <input type="time" value={form.end} onChange={(e) => update('end', e.target.value)} required />
              </div>
            </div>

            <div className="pal-field-row">
              <div className="pal-field">
                <label>Porte d'origine</label>
                <select value={form.origin} onChange={(e) => update('origin', e.target.value)}>
                  {GATES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="pal-field">
                <label>Terminal de destination</label>
                <select value={form.destination} onChange={(e) => update('destination', e.target.value)}>
                  {TERMINALS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="pal-field-row">
              <div className="pal-field">
                <label>Type d'opération</label>
                <select value={form.operation} onChange={(e) => update('operation', e.target.value)}>
                  {Object.entries(OPERATION_META).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))}
                </select>
              </div>
              <div className="pal-field">
                <label>Capacité totale</label>
                <input type="number" min="1" value={form.total} onChange={(e) => update('total', e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="pal-modal-footer">
            <button type="button" className="pal-btn-ghost" onClick={onClose}>Annuler</button>
            <button type="submit" className="pal-btn-primary" style={{ marginLeft: 0 }}>
              {slot ? 'Enregistrer' : 'Créer le créneau'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({ slot, theme, onCancel, onConfirm }) {
  return (
    <div className="pal-modal-overlay" onClick={onCancel}>
      <div className="pal-modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
        <div className="pal-modal-body" style={{ paddingTop: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertCircle size={20} color={theme.red} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Supprimer {slot.id} ?</div>
              <div style={{ fontSize: 13, color: theme.textDim }}>
                Cette action est irréversible. {slot.reserved > 0 && `${slot.reserved} réservation(s) associée(s) seront affectées.`}
              </div>
            </div>
          </div>
        </div>
        <div className="pal-modal-footer">
          <button className="pal-btn-ghost" onClick={onCancel}>Annuler</button>
          <button
            className="pal-btn-primary"
            style={{ marginLeft: 0, background: theme.red, color: '#fff' }}
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ONGLET RÉSERVATIONS
// ============================================================

function ReservationsTab({ reservations, slots, theme }) {
  const getSlot = (id) => slots.find(s => s.id === id);

  return (
    <div className="pal-table-wrap">
      <table className="pal-table">
        <thead>
          <tr>
            <th>Réservation</th>
            <th>Créneau</th>
            <th>Camion</th>
            <th>Chauffeur</th>
            <th>Transporteur</th>
            <th>Créée le</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(rsv => {
            const slot = getSlot(rsv.slotId);
            const confirmed = rsv.status === 'confirmed';
            const rsvColor = confirmed ? theme.green : theme.amber;
            return (
              <tr key={rsv.id}>
                <td className="pal-id">{rsv.id}</td>
                <td>
                  <div className="pal-id" style={{ fontSize: 12.5 }}>{rsv.slotId}</div>
                  {slot && <div style={{ fontSize: 11.5, color: theme.textDim }}>{slot.start}–{slot.end} · {slot.destination}</div>}
                </td>
                <td className="pal-mono" style={{ fontSize: 12.5 }}>{rsv.truck}</td>
                <td>{rsv.driver}</td>
                <td style={{ color: theme.textDim }}>{rsv.company}</td>
                <td className="pal-mono" style={{ fontSize: 12, color: theme.textDim }}>{rsv.createdAt}</td>
                <td>
                  <span className="pal-pill" style={{ background: `${rsvColor}22`, color: rsvColor }}>
                    {confirmed ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                    {confirmed ? 'Confirmée' : 'En attente'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// ONGLET STATISTIQUES
// ============================================================

function StatsTab({ kpis, theme, statusDistribution, operationDistribution, weeklyReservations }) {
  return (
    <div>
      <div className="pal-kpi-grid">
        <div className="pal-kpi-card">
          <Clock size={16} className="pal-kpi-icon" />
          <div className="pal-kpi-label">Créneaux actifs</div>
          <div className="pal-kpi-value">{kpis.activeSlots}</div>
        </div>
        <div className="pal-kpi-card">
          <Gauge size={16} className="pal-kpi-icon" />
          <div className="pal-kpi-label">Taux d'occupation</div>
          <div className="pal-kpi-value">{kpis.occupation}%</div>
        </div>
        <div className="pal-kpi-card">
          <Package size={16} className="pal-kpi-icon" />
          <div className="pal-kpi-label">Réservations aujourd'hui</div>
          <div className="pal-kpi-value">{kpis.todayReservations}</div>
        </div>
        <div className="pal-kpi-card">
          <Truck size={16} className="pal-kpi-icon" />
          <div className="pal-kpi-label">Camions en transit</div>
          <div className="pal-kpi-value">{kpis.enRoute}</div>
        </div>
      </div>

      <div className="pal-charts-grid">
        <div className="pal-panel">
          <div className="pal-panel-title">Réservations — 7 derniers jours</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyReservations}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.line} vertical={false} />
              <XAxis dataKey="day" stroke={theme.textDim} fontSize={12} tickLine={false} axisLine={{ stroke: theme.line }} />
              <YAxis stroke={theme.textDim} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: theme.elevated, border: `1px solid ${theme.line}`, borderRadius: 8, fontSize: 12.5, color: theme.text }}
                labelStyle={{ color: theme.text }}
              />
              <Line type="monotone" dataKey="reservations" stroke={theme.amber} strokeWidth={2.5} dot={{ fill: theme.amber, r: 3.5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="pal-panel">
          <div className="pal-panel-title">Répartition par statut</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: theme.elevated, border: `1px solid ${theme.line}`, borderRadius: 8, fontSize: 12.5, color: theme.text }} />
            </PieChart>
          </ResponsiveContainer>
          {statusDistribution.map((entry, i) => (
            <div className="pal-legend-row" key={i}>
              <span className="pal-legend-dot" style={{ background: entry.color }} />
              <span style={{ color: theme.textDim }}>{entry.name}</span>
              <span style={{ marginLeft: 'auto' }} className="pal-mono">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pal-panel" style={{ marginTop: 14 }}>
        <div className="pal-panel-title">Répartition par type d'opération</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={operationDistribution} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.line} horizontal={false} />
            <XAxis type="number" stroke={theme.textDim} fontSize={12} tickLine={false} axisLine={{ stroke: theme.line }} allowDecimals={false} />
            <YAxis type="category" dataKey="name" stroke={theme.textDim} fontSize={12.5} tickLine={false} axisLine={false} width={110} />
            <Tooltip contentStyle={{ background: theme.elevated, border: `1px solid ${theme.line}`, borderRadius: 8, fontSize: 12.5, color: theme.text }} cursor={{ fill: `${theme.text}0A` }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {operationDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ============================================================
// ONGLET SUIVI GPS
// ============================================================
// API: idéalement une connexion WebSocket ou un polling GET /api/trucks/positions/
// vers votre fournisseur GPS pour rafraîchir x/y (ou lat/lng) en temps réel.

function GPSTab({ trucks, theme }) {
  const [selected, setSelected] = useState(trucks[0]?.id ?? null);

  const zones = [
    { label: 'Porte Nord', x: 8, y: 62 },
    { label: 'Porte Sud', x: 8, y: 90 },
    { label: 'Quai A', x: 34, y: 18 },
    { label: 'Quai B', x: 55, y: 14 },
    { label: 'Quai C', x: 78, y: 18 },
    { label: 'Zone de Transit', x: 72, y: 80 },
  ];

  return (
    <div className="pal-gps-grid">
      <div className="pal-map-wrap">
        <svg className="pal-map-svg" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="palGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke={theme.surfaceAlt} strokeWidth="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="62" fill="url(#palGrid)" />

          {/* Bassin portuaire stylisé */}
          <path d="M 0,0 L 30,0 L 26,10 L 60,8 L 64,0 L 100,0 L 100,62 L 0,62 Z" fill={theme.mapBasin} opacity="0.6" />
          <text x="50" y="6" fill={theme.cyan} fontSize="2.6" fontFamily="JetBrains Mono, monospace" opacity="0.55" textAnchor="middle">BASSIN PORTUAIRE</text>

          {/* Zones / quais */}
          {zones.map((z, i) => (
            <g key={i}>
              <circle cx={z.x} cy={z.y} r="1.1" fill={theme.surfaceAlt} stroke={theme.cyan} strokeWidth="0.25" />
              <text x={z.x} y={z.y - 2.4} fill={theme.textDim} fontSize="2.3" fontFamily="Inter, sans-serif" textAnchor="middle">{z.label}</text>
            </g>
          ))}

          {/* Routes schématiques */}
          <path d="M 8,62 L 34,18" stroke={theme.line} strokeWidth="0.6" fill="none" strokeDasharray="1,1" />
          <path d="M 8,90 L 55,14" stroke={theme.line} strokeWidth="0.6" fill="none" strokeDasharray="1,1" />

          {/* Camions */}
          {trucks.map(t => {
            const color = theme[TRUCK_STATUS_META[t.status].colorKey];
            const isSelected = selected === t.id;
            return (
              <g
                key={t.id}
                transform={`translate(${t.x}, ${t.y * 0.62})`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(t.id)}
              >
                {t.status === 'en_route' && (
                  <circle r="2.2" fill={color} opacity="0.25">
                    <animate attributeName="r" values="2.2;4;2.2" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r={isSelected ? 1.6 : 1.2} fill={color} stroke={theme.bg} strokeWidth="0.3" />
                {isSelected && (
                  <text x="2.2" y="0.6" fontSize="2.4" fill={theme.text} fontFamily="JetBrains Mono, monospace">{t.id}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="pal-truck-list">
        {trucks.map(t => {
          const color = theme[TRUCK_STATUS_META[t.status].colorKey];
          const isSelected = selected === t.id;
          return (
            <div
              key={t.id}
              className="pal-truck-card"
              style={{ cursor: 'pointer', borderColor: isSelected ? color : undefined }}
              onClick={() => setSelected(t.id)}
            >
              <div className="pal-truck-top">
                <span className="pal-truck-id">{t.id}</span>
                <span className="pal-pill" style={{ background: `${color}22`, color: color }}>{TRUCK_STATUS_META[t.status].label}</span>
              </div>
              <div className="pal-truck-meta"><Navigation2 size={11} /> {t.driver}</div>
              <div className="pal-truck-meta"><MapPin size={11} /> {t.zone}</div>
              <div className="pal-truck-meta">
                <Gauge size={11} /> {t.speed} km/h
                <span style={{ marginLeft: 'auto' }} className="pal-mono">{t.lastUpdate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}