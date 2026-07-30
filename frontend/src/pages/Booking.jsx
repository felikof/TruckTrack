import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Settings, Bell, User, Layers, Anchor, Clock, MapPin,
  ArrowRight, X, Truck, UserRound, Building2,
  CheckCircle2, Package, ShieldCheck, AlertCircle, CalendarDays,
  QrCode, XCircle, RotateCcw
} from 'lucide-react';
import UserProfile from '../components/UserProfile';
import { getSlots} from '../services/slotService';
import notificationService from '../services/notificationService';
import userService from '../services/userService';
import truckService from '../services/truckService';
import driverService from '../services/driverService';
import companyService from '../services/companyService';


// ============================================================
// DONNÉES SIMULÉES — reflète le modèle Slot / Reservation réel
// API: GET /api/slots/?status=active
// API: GET /api/reservations/?driver=me
// ============================================================

const OPERATION_META = {
  loading: { label: 'Chargement', color: '#F2A93B', icon: Package },
  unloading: { label: 'Déchargement', color: '#4C6FFF', icon: Package },
  transit: { label: 'Transit', color: '#8993A6', icon: ArrowRight },
};

const RESERVATION_STATUS_META = { 
  pending: { label: 'En attente', color: '#D97706' },
  confirmed: { label: 'Confirmée', color: '#16A34A' },
  completed: { label: 'Terminée', color: '#4C6FFF' },
  cancelled: { label: 'Annulée', color: '#DC2626' },
};

// référence de "maintenant" pour les calculs de compte à rebours de la démo
const NOW = new Date('2026-07-24T16:00:00');  // 17 juillet 2026, 09:30

// const initialSlots = [
//   { id: 'SLOT-001', date: '2026-07-17', start: '08:00', end: '10:30', origin: 'Porte A1', destination: 'Terminal 3', total: 12, available: 12, operation: 'loading' },
//   { id: 'SLOT-002', date: '2026-07-17', start: '10:00', end: '13:15', origin: 'Porte B2', destination: 'Terminal 3', total: 8, available: 8, operation: 'unloading' },
//   { id: 'SLOT-003', date: '2026-07-17', start: '14:00', end: '16:45', origin: 'Porte C1', destination: 'Terminal 3', total: 6, available: 6, operation: 'transit' },
//   { id: 'SLOT-004', date: '2026-07-17', start: '16:00', end: '18:30', origin: 'Porte A1', destination: 'Terminal 1', total: 10, available: 4, operation: 'loading' },
//   { id: 'SLOT-005', date: '2026-07-17', start: '07:00', end: '09:15', origin: 'Porte B2', destination: 'Terminal 2', total: 9, available: 1, operation: 'unloading' },
// ];

// API: GET /api/reservations/?driver=me
const initialReservations = [
  { id: 'RSV-1042', slotId: 'SLOT-015', date: '2026-07-25', start: '18:00', end: '20:00', origin: 'LCT', destination: 'Zone transit', operation: 'loading', carrier: 'Sogetra', driver: 'Kodjo Mensah', truck: 'TG-4471-A', status: 'pending' },
  { id: 'RSV-1043', slotId: 'SLOT-002', date: '2026-07-17', start: '10:00', end: '13:15', origin: 'Porte B2', destination: 'Terminal 3', operation: 'unloading', carrier: 'Sogetra', driver: 'Ama Doe', truck: 'TG-2290-B', status: 'pending' },
  { id: 'RSV-1039', slotId: 'SLOT-091', date: '2026-07-18', start: '09:00', end: '11:20', origin: 'Porte A1', destination: 'Terminal 1', operation: 'loading', carrier: 'Sogetra', driver: 'Kodjo Mensah', truck: 'TG-4471-A', status: 'confirmed' },
  { id: 'RSV-1050', slotId: 'SLOT-098', date: '2026-07-19', start: '07:30', end: '10:00', origin: 'Porte C1', destination: 'Terminal 2', operation: 'transit', carrier: 'Sogetra', driver: 'Ama Doe', truck: 'TG-2290-B', status: 'confirmed' },
  { id: 'RSV-0988', slotId: 'SLOT-054', date: '2026-07-10', start: '07:30', end: '09:45', origin: 'Porte C1', destination: 'Terminal 2', operation: 'transit', carrier: 'Sogetra', driver: 'Ama Doe', truck: 'TG-2290-B', status: 'completed' },
  { id: 'RSV-0975', slotId: 'SLOT-041', date: '2026-07-08', start: '14:00', end: '16:10', origin: 'Porte B2', destination: 'Terminal 3', operation: 'unloading', carrier: 'Sogetra', driver: 'Kodjo Mensah', truck: 'TG-4471-A', status: 'completed' },
  { id: 'RSV-0960', slotId: 'SLOT-030', date: '2026-07-05', start: '11:00', end: '13:15', origin: 'Porte A1', destination: 'Terminal 1', operation: 'loading', carrier: 'Sogetra', driver: 'Ama Doe', truck: 'TG-2290-B', status: 'cancelled' },
];

const HOURS = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const HOUR_LOAD = [30, 55, 40, 70, 85, 45, 60, 90, 35, 50, 65, 20];

const savedTrucks = [
  { plate: 'TG-4471-A', type: 'Semi-remorque' },
  { plate: 'TG-2290-B', type: 'Porteur' },
];

const savedDrivers = [
  { name: 'Kodjo Mensah', phone: '+228 90 12 34 56', license: 'PL-88213' },
  { name: 'Ama Doe', phone: '+228 91 45 67 89', license: 'PL-77042' },
];

// function durationLabel(start, end) {
//   const [sh, sm] = start.split(':').map(Number);
//   const [eh, em] = end.split(':').map(Number);
//   const mins = (eh * 60 + em) - (sh * 60 + sm);
//   const h = Math.floor(mins / 60);
//   const m = mins % 60;
//   return m ? `${h}h ${m}m` : `${h}h`;
// }

function durationLabel(start, end) {
  if (!start || !end) return '—';
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const mins = (eh * 60 + em) - (sh * 60 + sm);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

function formatDayLabel(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  const today = new Date(NOW.toDateString());
  const diffDays = Math.round((d - today) / 86400000);
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Demain';
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
}

function countdownLabel(dateStr, start) {
  const target = new Date(`${dateStr}T${start}:00`);
  const diffMs = target - NOW;
  if (diffMs <= 0) return 'En cours';
  const diffH = Math.floor(diffMs / 3600000);
  if (diffH < 1) return `Dans ${Math.round(diffMs / 60000)} min`;
  if (diffH < 24) return `Dans ${diffH}h`;
  return `Dans ${Math.round(diffH / 24)} j`;
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function Booking() {
  const [slots, setSlots] = useState([]);
  // const [slots] = useState(initialSlots);
  const [reservations, setReservations] = useState(initialReservations);
  const [activeNav, setActiveNav] = useState('browse');
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [timeFrom, setTimeFrom] = useState('07:00');
  const [timeTo, setTimeTo] = useState('18:00');
  const [preferredHours, setPreferredHours] = useState([]);
  const [reservingSlot, setReservingSlot] = useState(null);
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [cancelTarget, setCancelTarget] = useState(null);
  // const [UserProfile, setShowUserProfile] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFleetManager, setShowFleetManager] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);


  const togglePreferredHour = (h) => {
    setPreferredHours(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]);
  };

  useEffect(() => {
      getSlots()
          .then(setSlots)
          .catch(err => console.error('Erreur de chargement des créneaux :', err))
          .finally(() => setLoadingSlots(false));
    }, [])

  const filteredSlots = useMemo(() => {
    return slots.filter(s => {
      if (onlyAvailable && s.available === 0) return false;
      if (s.start < timeFrom || s.start > timeTo) return false;
      if (preferredHours.length > 0 && !preferredHours.includes(s.start)) return false;
      return true;
    });
  }, [slots, onlyAvailable, timeFrom, timeTo, preferredHours]);

  // API: DELETE /api/reservations/{id}/  (ou PATCH status='cancelled')
  const handleCancelReservation = () => {
    setReservations(prev => prev.map(r => r.id === cancelTarget.id ? { ...r, status: 'cancelled' } : r));
    setCancelTarget(null);
  };

  const navLinks = [
    { id: 'browse', label: 'Parcourir les créneaux' },
    { id: 'booking', label: 'Mes réservations' },
    { id: 'scheduled', label: 'Programmées' },
    { id: 'history', label: 'Historique' },
  ];

  // API: GET /api/users/?email=<email stocké au login>
  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('accessToken');
    if (email && token) {
      userService.getUser(token, email)
        .then(setCurrentUser)
        .catch(err => console.error('Erreur de chargement du profil :', err));
    }
  }, []);

  // API: GET /api/notifications/?company=me  (à filtrer côté serveur sur l'utilisateur connecté)
  useEffect(() => {
    notificationService.getMyNotifications()
      .then(setNotifications)
      .catch(err => console.error('Erreur de chargement des notifications :', err));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = (notif) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    notificationService.markAsRead(notif.id).catch(err => console.error(err));
  };

  {showFleetManager && <FleetManagerModal onClose={() => setShowFleetManager(false)} />}

  return (
    <div className="tb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .tb-root {
          --bg: #F3F5F9;
          --panel: #FFFFFF;
          --border: #ECEEF2;
          --text: #14171F;
          --text-dim: #8993A6;
          --blue-t: #4C6FFF;
          --blue: #0015b2;
          --blue-soft: #EEF1FF;
          --green: #16A34A;
          --green-soft: #E7F8ED;
          --orange: #FB8C1E;
          --amber: #F2A93B;
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .tb-root * { box-sizing: border-box; }
        .tb-mono { font-family: 'JetBrains Mono', monospace; }

        /* NAVBAR */
        .tb-navbar {
          background: #fff; border-bottom: 1px solid var(--border);
          padding: 14px 28px; display: flex; align-items: center; justify-content: space-between;
        }
        .tb-brand { font-family: 'Oswald', sans-serif; display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 25px; color: var(--blue); }
        .tb-brand-mark {
          width: 30px; height: 30px; border-radius: 8px;
          background: linear-gradient(135deg, var(--blue), #7B8CFF);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .tb-navlinks { font-family: 'Oswald', sans-serif; font-size: 20px; display: flex; gap: 36px; }
        .tb-navlink {
          background: none; border: none; cursor: pointer; font-size: 13.5px; font-weight: 500;
          color: var(--text-dim); padding-bottom: 18px; margin-bottom: -18px; border-bottom: 2px solid transparent;
        }
        .tb-navlink.active { color: var(--blue); border-bottom-color: var(--blue); }
        .tb-navicons { display: flex; align-items: center; gap: 10px; }
        .tb-icon-circle {
          width: 34px; height: 34px; border-radius: 50%; background: #F5F6FA; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; color: var(--text-dim); cursor: pointer;
        }
        .tb-avatar {
          width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #7C5CFC, #A78BFA);
          display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 12.5px;
        }

        .tb-body { display: grid; grid-template-columns: 260px 1fr; gap: 20px; padding: 22px 28px; align-items: start; }
        .tb-body.tb-body-full { grid-template-columns: 1fr; }

        /* SIDEBAR FILTERS */
        .tb-sidebar { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; padding: 18px; }
        .tb-sidebar-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .tb-sidebar-title { font-weight: 700; font-size: 15px; }
        .tb-reset { background: none; border: none; color: var(--blue); font-size: 12.5px; cursor: pointer; font-weight: 500; }

        .tb-pill-toggle {
          border: none; border-radius: 20px; padding: 7px 14px; font-size: 12px; font-weight: 600;
          cursor: pointer; color: #fff; margin-bottom: 8px; width: 100%; text-align: left;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .tb-pill-count { text-align: center; font-size: 11.5px; color: var(--text-dim); margin-bottom: 16px; }

        .tb-filter-label { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); margin: 16px 0 8px; }
        .tb-time-range { display: flex; align-items: center; gap: 6px; }
        .tb-time-input {
          flex: 1; display: flex; align-items: center; gap: 6px; border: 1px solid var(--border);
          border-radius: 8px; padding: 7px 9px; font-size: 12.5px; color: var(--text);
        }
        .tb-time-input input { border: none; outline: none; width: 100%; font-size: 12.5px; font-family: inherit; }

        .tb-hour-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px; }
        .tb-hour-btn {
          border: 1px solid var(--border); background: #fff; border-radius: 8px; padding: 7px 0;
          font-size: 12px; cursor: pointer; color: var(--text-dim); font-weight: 500;
        }
        .tb-hour-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; }

        .tb-histogram { display: flex; align-items: flex-end; gap: 4px; height: 46px; margin-top: 16px; }
        .tb-bar { flex: 1; background: #E7EAF3; border-radius: 3px 3px 0 0; }

        .tb-apply-btn {
          width: 100%; background: #14171F; color: #fff; border: none; border-radius: 10px;
          padding: 12px 0; font-weight: 600; font-size: 13.5px; margin-top: 18px; cursor: pointer;
        }

        /* PAGE HEADER (autres onglets) */
        .tb-page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px; }
        .tb-page-title { font-size: 19px; font-weight: 800; }
        .tb-page-sub { font-size: 12.5px; color: var(--text-dim); margin-top: 3px; }
        .tb-page-search {
          display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--border);
          border-radius: 10px; padding: 9px 12px; min-width: 240px;
        }
        .tb-page-search input { border: none; outline: none; font-size: 13px; width: 100%; font-family: inherit; }
        .tb-filter-tabs { display: flex; gap: 6px; }
        .tb-filter-tab {
          border: 1px solid var(--border); background: #fff; border-radius: 20px; padding: 7px 14px;
          font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--text-dim);
        }
        .tb-filter-tab.active { background: var(--text); border-color: var(--text); color: #fff; }

        /* SLOT / RESERVATION CARDS */
        .tb-list { display: flex; flex-direction: column; gap: 14px; }
        .tb-card { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; }
        .tb-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .tb-operator { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13.5px; }
        .tb-operator-mark {
          width: 26px; height: 26px; border-radius: 7px; background: var(--orange);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .tb-duration { font-size: 12px; color: var(--text-dim); }

        .tb-card-main { display: grid; grid-template-columns: 100px 1fr 180px; gap: 18px; align-items: center; }
        .tb-time-big { font-size: 22px; font-weight: 800; line-height: 1.1; }
        .tb-gate-label { font-size: 12px; color: var(--text-dim); margin-top: 2px; }

        .tb-timeline { display: flex; align-items: center; }
        .tb-tl-stop { text-align: center; flex-shrink: 0; }
        .tb-tl-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blue); margin: 0 auto 6px; }
        .tb-tl-time { font-size: 12.5px; font-weight: 700; }
        .tb-tl-place { font-size: 11px; color: var(--text-dim); margin-top: 1px; }
        .tb-tl-line { flex: 1; height: 1px; background: repeating-linear-gradient(to right, var(--border) 0 4px, transparent 4px 8px); margin: 0 8px 18px; position: relative; }
        .tb-tl-op {
          position: absolute; top: -22px; left: 50%; transform: translateX(-50%);
          font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 10px; white-space: nowrap;
        }

        .tb-right-col { text-align: right; }
        .tb-terminal { font-size: 12.5px; color: var(--text-dim); margin-bottom: 4px; }
        .tb-avail { font-size: 13.5px; font-weight: 700; color: var(--blue); margin-bottom: 10px; }
        .tb-avail.full { color: #DC2626; }
        .tb-reserve-btn {
          background: var(--blue); color: #fff; border: none; border-radius: 9px;
          padding: 9px 20px; font-weight: 600; font-size: 13px; cursor: pointer;
        }
        .tb-reserve-btn:disabled { background: #C6CCDA; cursor: not-allowed; }

        .tb-card-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); }
        .tb-badge-row { display: flex; gap: 6px; }
        .tb-badge-icon {
          width: 28px; height: 28px; border-radius: 8px; background: #F5F6FA; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; color: var(--text-dim);
        }
        .tb-slots-left { font-size: 12px; color: var(--text-dim); }

        /* Reservation-specific card bits */
        .tb-pill-status { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .tb-res-meta-row { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
        .tb-res-meta { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--text-dim); }
        .tb-res-meta b { color: var(--text); font-weight: 600; }
        .tb-cancel-btn {
          background: none; border: 1px solid var(--border); color: #DC2626; border-radius: 9px;
          padding: 8px 16px; font-weight: 600; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; gap: 6px;
        }
        .tb-cancel-btn:hover { background: #FDEBEC; border-color: #F6B8BD; }

        /* Scheduled / agenda view */
        .tb-day-group { margin-bottom: 22px; }
        .tb-day-label { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 700; margin-bottom: 10px; text-transform: capitalize; }
        .tb-code-block {
          background: #14171F; color: #fff; border-radius: 10px; padding: 12px 16px;
          display: flex; align-items: center; justify-content: space-between; margin-top: 12px;
        }
        .tb-code-value { font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; }
        .tb-code-note { font-size: 11px; color: #9AA3B8; margin-top: 2px; }
        .tb-countdown { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; background: var(--blue-soft); color: var(--blue); }

        /* History table */
        .tb-htable-wrap { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        table.tb-htable { width: 100%; border-collapse: collapse; font-size: 13px; }
        .tb-htable th {
          text-align: left; padding: 12px 16px; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--text-dim); background: #F8F9FC; border-bottom: 1px solid var(--border); font-weight: 700;
        }
        .tb-htable td { padding: 13px 16px; border-bottom: 1px solid var(--border); }
        .tb-htable tr:last-child td { border-bottom: none; }

        .tb-empty-state { text-align: center; padding: 50px 20px; color: var(--text-dim); }
        .tb-empty-state svg { margin-bottom: 10px; color: #C6CCDA; }

        /* MODAL */
        .tb-modal-overlay { position: fixed; inset: 0; background: rgba(15,20,30,0.45); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
        .tb-modal { background: #fff; border-radius: 16px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
        .tb-modal-header { padding: 20px 22px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start; }
        .tb-modal-title { font-size: 16.5px; font-weight: 700; }
        .tb-modal-sub { font-size: 12.5px; color: var(--text-dim); margin-top: 3px; }
        .tb-close-btn { background: #F5F6FA; border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-dim); }

        .tb-recap {
          margin: 18px 22px 0; background: var(--blue-soft); border-radius: 12px; padding: 14px 16px;
          display: flex; justify-content: space-between; font-size: 12.5px;
        }
        .tb-recap b { font-size: 13.5px; }

        .tb-section { padding: 18px 22px 0; }
        .tb-section-title { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; margin-bottom: 12px; }
        .tb-section-title svg { color: var(--blue); }

        .tb-quickselect { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .tb-chip {
          border: 1px solid var(--border); background: #fff; border-radius: 20px; padding: 6px 12px;
          font-size: 12px; cursor: pointer; color: var(--text-dim);
        }
        .tb-chip.active { background: var(--text); color: #fff; border-color: var(--text); }

        .tb-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
        .tb-field label { display: block; font-size: 11px; color: var(--text-dim); margin-bottom: 5px; font-weight: 600; }
        .tb-field input, .tb-field select {
          width: 100%; border: 1px solid var(--border); border-radius: 8px; padding: 9px 10px;
          font-size: 13px; outline: none; font-family: inherit; color: var(--text);
        }
        .tb-field input:focus, .tb-field select:focus { border-color: var(--blue); }

        .tb-modal-footer { padding: 20px 22px 22px; }
        .tb-confirm-btn {
          width: 100%; background: var(--blue); color: #fff; border: none; border-radius: 10px;
          padding: 13px 0; font-weight: 700; font-size: 14px; cursor: pointer;
        }
        .tb-danger-btn {
          width: 100%; background: #DC2626; color: #fff; border: none; border-radius: 10px;
          padding: 13px 0; font-weight: 700; font-size: 14px; cursor: pointer;
        }

        .tb-success { padding: 40px 22px; text-align: center; }
        .tb-success-icon { color: var(--green); margin-bottom: 12px; }
        .tb-success-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
        .tb-success-sub { font-size: 13px; color: var(--text-dim); }
      `}</style>

      {/* NAVBAR */}
      <div className="tb-navbar">
        <div className="tb-brand">
          {/* <div className="tb-brand-mark"><Anchor size={16} /></div> */}
          Truck Tracking
        </div>
        {/* <div className="tb-navlinks">
          {navLinks.map(l => (
            <button key={l.id} className={`tb-navlink ${activeNav === l.id ? 'active' : ''}`} onClick={() => setActiveNav(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="tb-navicons">
          <div className="tb-icon-circle"><Settings size={15} /></div>
          <div className="tb-icon-circle"><Bell size={15} /></div>
          <button><div className="tb-avatar" type="button" onClick={() => setShowUserProfile(true)}>
            <User size={25} />
          </div></button>
        </div> */}
        <div className="tb-navlinks">
          {navLinks.map(l => (
            <button key={l.id} className={`tb-navlink ${activeNav === l.id ? 'active' : ''}`} onClick={() => setActiveNav(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="tb-navicons">
          <div className="tb-topbar-icon-wrap">
            <button
              className={`tb-icon-circle ${showFleetManager ? 'active' : ''}`}
              onClick={() => setShowFleetManager(true)}
              title="Ma flotte"
            >
              <Truck size={15} />
            </button>
          </div>

          <div className="tb-topbar-icon-wrap">
            <button
              className={`tb-icon-circle ${showNotifications ? 'active' : ''}`}
              onClick={() => { setShowNotifications(v => !v); setShowUserProfile(false); }}
              title="Notifications"
            >
              <Bell size={15} />
              {unreadCount > 0 && <span className="tb-notif-badge">{unreadCount}</span>}
            </button>
            {showNotifications && (
              <>
                <div className="tb-backdrop" onClick={() => setShowNotifications(false)} />
                <NotificationsDropdown
                  notifications={notifications}
                  onSelect={markNotificationRead}
                  onClose={() => setShowNotifications(false)}
                />
              </>
            )}
          </div>

          <div className="tb-topbar-icon-wrap">
            <button className="tb-avatar" type="button" onClick={() => { setShowUserProfile(v => !v); setShowNotifications(false); }}>
              <User size={18} />
            </button>
            {showUserProfile && (
              <>
                <div className="tb-backdrop" onClick={() => setShowUserProfile(false)} />
                <UserProfileDropdown currentUser={currentUser} onClose={() => setShowUserProfile(false)} />
              </>
            )}
          </div>
        </div>
      </div>

      {activeNav === 'browse' && (
        <div className="tb-body">
          <div className="tb-sidebar">
            <div className="tb-sidebar-head">
              <span className="tb-sidebar-title">Filtres</span>
              <button className="tb-reset" onClick={() => { setOnlyAvailable(true); setTimeFrom('07:00'); setTimeTo('18:00'); setPreferredHours([]); }}>
                Réinitialiser
              </button>
            </div>

            <button
              className="tb-pill-toggle"
              style={{ background: onlyAvailable ? 'var(--green)' : '#C6CCDA' }}
              onClick={() => setOnlyAvailable(v => !v)}
            >
              Disponible
            </button>
            <button className="tb-pill-toggle" style={{ background: 'var(--blue)' }}>
              Recommandé
            </button>
            <div className="tb-pill-count">{filteredSlots.length} créneaux restants</div>

            <div className="tb-filter-label">Horaire</div>
            <div className="tb-time-range">
              <div className="tb-time-input">
                <Clock size={12} color="#8993A6" />
                <input type="time" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} />
              </div>
              <ArrowRight size={13} color="#8993A6" />
              <div className="tb-time-input">
                <Clock size={12} color="#8993A6" />
                <input type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} />
              </div>
            </div>

            <div className="tb-filter-label">Sélectionner l'horaire préféré</div>
            <div className="tb-hour-grid">
              {HOURS.map(h => (
                <button
                  key={h}
                  className={`tb-hour-btn ${preferredHours.includes(h) ? 'active' : ''}`}
                  onClick={() => togglePreferredHour(h)}
                >
                  {h}
                </button>
              ))}
            </div>

            <div className="tb-histogram">
              {HOUR_LOAD.map((v, i) => (
                <div key={i} className="tb-bar" style={{ height: `${v}%` }} />
              ))}
            </div>

            <button className="tb-apply-btn">Appliquer les filtres</button>
          </div>

          <div className="tb-list">
            {filteredSlots.map(slot => {
              const opMeta = OPERATION_META[slot.operation];
              const OpIcon = opMeta.icon;
              const isFull = slot.available === 0;
              const isReserved = confirmedIds.includes(slot.id);
              return (
                <div className="tb-card" key={slot.id}>
                  <div className="tb-card-top">
                    <div className="tb-operator">
                      {/* <div className="tb-operator-mark"><Anchor size={13} /></div> */}
                      Autorité Portuaire
                    </div>
                    <div className="tb-duration">Durée {durationLabel(slot.start_time, slot.end_time)}</div>
                  </div>

                  <div className="tb-card-main">
                    <div>
                      <div className="tb-time-big">{slot.start_time}</div>
                      <div className="tb-gate-label">{slot.origin_gate}</div>
                    </div>

                    <div className="tb-timeline">
                      <div className="tb-tl-stop">
                        <div className="tb-tl-dot" />
                        <div className="tb-tl-time">{slot.start_time}</div>
                        <div className="tb-tl-place">{slot.origin_gate}</div>
                      </div>
                      <div className="tb-tl-line">
                        <span className="tb-tl-op" style={{ background: `${opMeta.color}22`, color: opMeta.color }}>
                          {opMeta.label}
                        </span>
                      </div>
                      <div className="tb-tl-stop">
                        <div className="tb-tl-dot" style={{ background: opMeta.color }} />
                        <div className="tb-tl-time">{slot.end_time}</div>
                        <div className="tb-tl-place">{slot.destination_terminal}</div>
                      </div>
                    </div>

                    <div className="tb-right-col">
                      <div className="tb-terminal">{slot.destination_terminal}</div>
                      <div className={`tb-avail ${isFull ? 'full' : ''}`}>
                        {isReserved ? 'Réservé' : isFull ? 'Complet' : `${slot.total_slots} places dispo.`}
                      </div>
                      <button
                        className="tb-reserve-btn"
                        disabled={isFull || isReserved}
                        onClick={() => setReservingSlot(slot)}
                      >
                        {isReserved ? 'Confirmé' : 'Réserver'}
                      </button>
                    </div>
                  </div>

                  <div className="tb-card-bottom">
                    <div className="tb-badge-row">
                      <div className="tb-badge-icon" title={opMeta.label}><OpIcon size={13} /></div>
                      <div className="tb-badge-icon" title="Suivi GPS disponible"><MapPin size={13} /></div>
                      <div className="tb-badge-icon" title="Créneau vérifié"><ShieldCheck size={13} /></div>
                      <div className="tb-badge-icon" title="Détails"><Search size={13} /></div>
                    </div>
                    <div className="tb-slots-left">{slot.available_slots}/{slot.total_slots} places restantes</div>
                  </div>
                </div>
              );
            })}
            {filteredSlots.length === 0 && (
              <div className="tb-card" style={{ textAlign: 'center', color: '#8993A6', padding: '40px 20px' }}>
                Aucun créneau ne correspond à ces filtres.
              </div>
            )}
          </div>
        </div>
      )}

      {activeNav === 'booking' && (
        <div className="tb-body tb-body-full" style={{ padding: '22px 28px' }}>
          <ReservationsView reservations={reservations} onCancel={setCancelTarget} />
        </div>
      )}

      {activeNav === 'scheduled' && (
        <div className="tb-body tb-body-full" style={{ padding: '22px 28px' }}>
          <ScheduledView reservations={reservations} />
        </div>
      )}

      {activeNav === 'history' && (
        <div className="tb-body tb-body-full" style={{ padding: '22px 28px' }}>
          <HistoryView reservations={reservations} />
        </div>
      )}

      {reservingSlot && (
        <ReservationModal
          slot={reservingSlot}
          onClose={() => setReservingSlot(null)}
          onConfirmed={(id) => setConfirmedIds(prev => [...prev, id])}
        />
      )}

      {cancelTarget && (
        <CancelModal
          reservation={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={handleCancelReservation}
        />
      )}
    </div>
  );
}

function UserProfileDropdown({ currentUser, onClose }) {
  return (
    <div className="tb-dropdown tb-dropdown-narrow">
      <div className="tb-dropdown-header">
        Mon compte
        <button className="tb-close-btn" onClick={onClose}><X size={13} /></button>
      </div>
      <div className="tb-profile-body">
        <div className="tb-profile-avatar-lg">
          <User size={22} />
        </div>
        {currentUser ? (
          <>
            <div className="tb-profile-name">{currentUser.first_name} {currentUser.name}</div>
            <div className="tb-profile-email">{currentUser.email}</div>
          </>
        ) : (
          <div className="tb-profile-email">Chargement…</div>
        )}
      </div>
    </div>
  );
}

function NotificationsDropdown({ notifications, onSelect, onClose }) {
  const sorted = [...notifications].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="tb-dropdown">
      <div className="tb-dropdown-header">
        Notifications
        <button className="tb-close-btn" onClick={onClose}><X size={13} /></button>
      </div>
      {sorted.length === 0 && <div className="tb-dropdown-empty">Aucune notification.</div>}
      {sorted.map(n => (
        <div key={n.id} className={`tb-dropdown-item ${!n.read ? 'unread' : ''}`} onClick={() => onSelect(n)}>
          <div className="tb-dropdown-icon">
            <CheckCircle2 size={14} />
          </div>
          <div className="tb-dropdown-text">
            <div className="tb-dropdown-title">{n.message}</div>
            <div className="tb-dropdown-sub">{n.bookingId}</div>
            <div className="tb-dropdown-time">{n.createdAt}</div>
          </div>
          {!n.read && <span className="tb-unread-dot" />}
        </div>
      ))}
    </div>
  );
}

function FleetManagerModal({ onClose }) {
  const [tab, setTab] = useState('trucks');
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      truckService.getMyTrucks(),
      driverService.getMyDrivers(),
      companyService.getMyCompany(),
    ])
      .then(([t, d, c]) => { setTrucks(t); setDrivers(d); setCompany(c); })
      .catch(err => console.error('Erreur de chargement de la flotte :', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tb-modal-overlay" onClick={onClose}>
      <div className="tb-modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="tb-modal-header">
          <div className="tb-modal-title">Ma flotte</div>
          <button className="tb-close-btn" onClick={onClose}><X size={15} /></button>
        </div>

        <div className="tb-filter-tabs" style={{ padding: '14px 22px 0' }}>
          <button className={`tb-filter-tab ${tab === 'trucks' ? 'active' : ''}`} onClick={() => setTab('trucks')}>Camions</button>
          <button className={`tb-filter-tab ${tab === 'drivers' ? 'active' : ''}`} onClick={() => setTab('drivers')}>Chauffeurs</button>
          <button className={`tb-filter-tab ${tab === 'company' ? 'active' : ''}`} onClick={() => setTab('company')}>Transporteur</button>
        </div>

        <div style={{ padding: 22 }}>
          {loading && <div style={{ color: '#8993A6', fontSize: 13 }}>Chargement…</div>}

          {!loading && tab === 'trucks' && (
            <TruckList trucks={trucks} onAdd={(t) => setTrucks(prev => [...prev, t])} />
          )}
          {!loading && tab === 'drivers' && (
            <DriverList drivers={drivers} onAdd={(d) => setDrivers(prev => [...prev, d])} />
          )}
          {!loading && tab === 'company' && (
            <CompanyForm company={company} onSaved={setCompany} />
          )}
        </div>
      </div>
    </div>
  );
}

function TruckList({ trucks, onAdd }) {
  const [plate, setPlate] = useState('');
  const [type, setType] = useState('Semi-remorque');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await truckService.createTruck({ plate, type });
      onAdd(created);
      setPlate('');
    } catch (err) {
      console.error('Erreur d\'ajout du camion :', err.response?.data || err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="tb-list" style={{ marginBottom: 16 }}>
        {trucks.map(t => (
          <div key={t.id} className="tb-truck-row">
            <Truck size={15} color="#4C6FFF" />
            <span className="tb-mono">{t.plate}</span>
            <span style={{ color: '#8993A6', marginLeft: 'auto' }}>{t.type}</span>
          </div>
        ))}
        {trucks.length === 0 && <div style={{ color: '#8993A6', fontSize: 12.5 }}>Aucun camion enregistré.</div>}
      </div>
      <form onSubmit={handleAdd} className="tb-field-row" style={{ marginBottom: 0 }}>
        <div className="tb-field">
          <label>Immatriculation</label>
          <input placeholder="TG-4471-A" value={plate} onChange={(e) => setPlate(e.target.value)} required />
        </div>
        <div className="tb-field">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Semi-remorque</option>
            <option>Porteur</option>
            <option>Citerne</option>
            <option>Frigorifique</option>
          </select>
        </div>
        <button type="submit" className="tb-confirm-btn" style={{ gridColumn: '1 / -1' }} disabled={saving}>
          {saving ? 'Ajout…' : 'Ajouter le camion'}
        </button>
      </form>
    </div>
  );
}

function DriverList({ drivers, onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await driverService.createDriver({ name, phone, license });
      onAdd(created);
      setName(''); setPhone(''); setLicense('');
    } catch (err) {
      console.error('Erreur d\'ajout du chauffeur :', err.response?.data || err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="tb-list" style={{ marginBottom: 16 }}>
        {drivers.map(d => (
          <div key={d.id} className="tb-truck-row">
            <UserRound size={15} color="#4C6FFF" />
            <span>{d.name}</span>
            <span style={{ color: '#8993A6', marginLeft: 'auto' }}>{d.phone}</span>
          </div>
        ))}
        {drivers.length === 0 && <div style={{ color: '#8993A6', fontSize: 12.5 }}>Aucun chauffeur enregistré.</div>}
      </div>
      <form onSubmit={handleAdd} className="tb-field-row" style={{ marginBottom: 0 }}>
        <div className="tb-field">
          <label>Nom complet</label>
          <input placeholder="Kodjo Mensah" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="tb-field">
          <label>Téléphone</label>
          <input placeholder="+228 90 12 34 56" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="tb-field" style={{ gridColumn: '1 / -1' }}>
          <label>Numéro de permis</label>
          <input placeholder="PL-88213" value={license} onChange={(e) => setLicense(e.target.value)} required />
        </div>
        <button type="submit" className="tb-confirm-btn" style={{ gridColumn: '1 / -1' }} disabled={saving}>
          {saving ? 'Ajout…' : 'Ajouter le chauffeur'}
        </button>
      </form>
    </div>
  );
}

function CompanyForm({ company, onSaved }) {
  const [form, setForm] = useState(company || { company_name: '', phone: '', address: '' });
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = company
        ? await companyService.updateCompany(company.id, form)
        : await companyService.createCompany(form);
      onSaved(saved);
    } catch (err) {
      console.error('Erreur de sauvegarde du transporteur :', err.response?.data || err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tb-field" style={{ marginBottom: 12 }}>
        <label>Nom de l'entreprise</label>
        <input value={form.company_name} onChange={(e) => update('company_name', e.target.value)} required />
      </div>
      <div className="tb-field-row">
        <div className="tb-field">
          <label>Téléphone</label>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
        </div>
        <div className="tb-field">
          <label>Adresse</label>
          <input value={form.address} onChange={(e) => update('address', e.target.value)} />
        </div>
      </div>
      <button type="submit" className="tb-confirm-btn" disabled={saving}>
        {saving ? 'Enregistrement…' : 'Enregistrer le transporteur'}
      </button>
    </form>
  );
}

// ============================================================
// ONGLET "MES RÉSERVATIONS" — réservations actives (en attente / confirmées)
// API: GET /api/reservations/?driver=me&status=pending,confirmed
// ============================================================

function ReservationsView({ reservations, onCancel }) {
  const [statusTab, setStatusTab] = useState('active');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return reservations.filter(r => {
      if (!['pending', 'confirmed'].includes(r.status)) return false;
      if (statusTab !== 'active' && r.status !== statusTab) return false;
      const s = search.toLowerCase();
      if (s && !r.id.toLowerCase().includes(s) && !r.truck.toLowerCase().includes(s) && !r.driver.toLowerCase().includes(s)) return false;
      return true;
    });
  }, [reservations, statusTab, search]);

  return (
    <div>
      <div className="tb-page-header">
        <div>
          <div className="tb-page-title">Mes réservations</div>
          <div className="tb-page-sub">{filtered.length} réservation(s) active(s)</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div className="tb-page-search">
            <Search size={14} color="#8993A6" />
            <input placeholder="Réservation, camion, chauffeur…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="tb-filter-tabs">
            <button className={`tb-filter-tab ${statusTab === 'active' ? 'active' : ''}`} onClick={() => setStatusTab('active')}>Toutes</button>
            <button className={`tb-filter-tab ${statusTab === 'pending' ? 'active' : ''}`} onClick={() => setStatusTab('pending')}>En attente</button>
            <button className={`tb-filter-tab ${statusTab === 'confirmed' ? 'active' : ''}`} onClick={() => setStatusTab('confirmed')}>Confirmées</button>
          </div>
        </div>
      </div>

      <div className="tb-list">
        {filtered.map(r => {
          const opMeta = OPERATION_META[r.operation];
          const statusMeta = RESERVATION_STATUS_META[r.status];
          return (
            <div className="tb-card" key={r.id}>
              <div className="tb-card-top">
                <div className="tb-operator">
                  <div className="tb-operator-mark"><Anchor size={13} /></div>
                  {r.id}
                </div>
                <span className="tb-pill-status" style={{ background: `${statusMeta.color}1A`, color: statusMeta.color }}>
                  {r.status === 'pending' ? <Clock size={11} /> : <CheckCircle2 size={11} />}
                  {statusMeta.label}
                </span>
              </div>

              <div className="tb-card-main" style={{ gridTemplateColumns: '100px 1fr' }}>
                <div>
                  <div className="tb-time-big">{r.start}</div>
                  <div className="tb-gate-label">{r.date}</div>
                </div>
                <div className="tb-timeline">
                  <div className="tb-tl-stop">
                    <div className="tb-tl-dot" />
                    <div className="tb-tl-time">{r.start}</div>
                    <div className="tb-tl-place">{r.origin}</div>
                  </div>
                  <div className="tb-tl-line">
                    <span className="tb-tl-op" style={{ background: `${opMeta.color}22`, color: opMeta.color }}>{opMeta.label}</span>
                  </div>
                  <div className="tb-tl-stop">
                    <div className="tb-tl-dot" style={{ background: opMeta.color }} />
                    <div className="tb-tl-time">{r.end}</div>
                    <div className="tb-tl-place">{r.destination}</div>
                  </div>
                </div>
              </div>

              <div className="tb-res-meta-row">
                <div className="tb-res-meta"><Building2 size={13} /> <b>{r.carrier}</b></div>
                <div className="tb-res-meta"><UserRound size={13} /> <b>{r.driver}</b></div>
                <div className="tb-res-meta"><Truck size={13} /> <b>{r.truck}</b></div>
                <button className="tb-cancel-btn" style={{ marginLeft: 'auto' }} onClick={() => onCancel(r)}>
                  <XCircle size={13} /> Annuler
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="tb-empty-state">
            <Package size={32} />
            <div>Aucune réservation active pour le moment.</div>
          </div>
        )}
      </div>
    </div>
  );
}


// ============================================================
// ONGLET "PROGRAMMÉES" — agenda des réservations confirmées à venir
// API: GET /api/reservations/?driver=me&status=confirmed&date__gte=today
// ============================================================

function ScheduledView({ reservations }) {
  const grouped = useMemo(() => {
    const upcoming = reservations
      .filter(r => r.status === 'confirmed')
      .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
    const map = {};
    upcoming.forEach(r => {
      if (!map[r.date]) map[r.date] = [];
      map[r.date].push(r);
    });
    return map;
  }, [reservations]);

  const dates = Object.keys(grouped);

  return (
    <div>
      <div className="tb-page-header">
        <div>
          <div className="tb-page-title">Créneaux programmés</div>
          <div className="tb-page-sub">Présentez le code d'accès au poste d'entrée le jour du passage</div>
        </div>
      </div>

      {dates.length === 0 && (
        <div className="tb-empty-state">
          <CalendarDays size={32} />
          <div>Aucun créneau confirmé à venir.</div>
        </div>
      )}

      {dates.map(date => (
        <div className="tb-day-group" key={date}>
          <div className="tb-day-label"><CalendarDays size={15} color="#4C6FFF" /> {formatDayLabel(date)}</div>
          <div className="tb-list">
            {grouped[date].map(r => {
              const opMeta = OPERATION_META[r.operation];
              return (
                <div className="tb-card" key={r.id}>
                  <div className="tb-card-top">
                    <div className="tb-operator">
                      <div className="tb-operator-mark"><Anchor size={13} /></div>
                      {r.origin} → {r.destination}
                    </div>
                    <span className="tb-countdown">{countdownLabel(r.date, r.start)}</span>
                  </div>

                  <div className="tb-card-main" style={{ gridTemplateColumns: '100px 1fr' }}>
                    <div>
                      <div className="tb-time-big">{r.start}</div>
                      <div className="tb-gate-label">{durationLabel(r.start, r.end)}</div>
                    </div>
                    <div className="tb-res-meta-row" style={{ border: 'none', paddingTop: 0, marginTop: 0 }}>
                      <div className="tb-res-meta"><Building2 size={13} /> <b>{r.carrier}</b></div>
                      <div className="tb-res-meta"><UserRound size={13} /> <b>{r.driver}</b></div>
                      <div className="tb-res-meta"><Truck size={13} /> <b>{r.truck}</b></div>
                      <div className="tb-res-meta">
                        <span className="tb-pill-status" style={{ background: `${opMeta.color}1A`, color: opMeta.color }}>{opMeta.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="tb-code-block">
                    <div>
                      <div className="tb-code-value">{r.id}</div>
                      <div className="tb-code-note">Code d'accès à présenter à {r.origin}</div>
                    </div>
                    <QrCode size={30} color="#9AA3B8" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ONGLET "HISTORIQUE" — réservations terminées / annulées
// API: GET /api/reservations/?driver=me&status=completed,cancelled
// ============================================================

function HistoryView({ reservations }) {
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('all');

  const filtered = useMemo(() => {
    return reservations
      .filter(r => ['completed', 'cancelled'].includes(r.status))
      .filter(r => statusTab === 'all' || r.status === statusTab)
      .filter(r => {
        const s = search.toLowerCase();
        if (!s) return true;
        return r.id.toLowerCase().includes(s) || r.truck.toLowerCase().includes(s) || r.driver.toLowerCase().includes(s);
      })
      .sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start));
  }, [reservations, search, statusTab]);

  return (
    <div>
      <div className="tb-page-header">
        <div>
          <div className="tb-page-title">Historique</div>
          <div className="tb-page-sub">{filtered.length} réservation(s) archivée(s)</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div className="tb-page-search">
            <Search size={14} color="#8993A6" />
            <input placeholder="Réservation, camion, chauffeur…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="tb-filter-tabs">
            <button className={`tb-filter-tab ${statusTab === 'all' ? 'active' : ''}`} onClick={() => setStatusTab('all')}>Toutes</button>
            <button className={`tb-filter-tab ${statusTab === 'completed' ? 'active' : ''}`} onClick={() => setStatusTab('completed')}>Terminées</button>
            <button className={`tb-filter-tab ${statusTab === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusTab('cancelled')}>Annulées</button>
          </div>
        </div>
      </div>

      <div className="tb-htable-wrap">
        <table className="tb-htable">
          <thead>
            <tr>
              <th>Réservation</th>
              <th>Date</th>
              <th>Trajet</th>
              <th>Opération</th>
              <th>Camion</th>
              <th>Chauffeur</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const opMeta = OPERATION_META[r.operation];
              const statusMeta = RESERVATION_STATUS_META[r.status];
              return (
                <tr key={r.id}>
                  <td className="tb-mono" style={{ color: '#4C6FFF', fontSize: 12.5 }}>{r.id}</td>
                  <td>
                    <div>{r.date}</div>
                    <div style={{ fontSize: 11.5, color: '#8993A6' }}>{r.start_time}–{r.end_time}</div>
                  </td>
                  <td style={{ fontSize: 12.5, color: '#8993A6' }}>{r.origin_gate} → {r.destination_terminal}</td>
                  <td>
                    <span className="tb-pill-status" style={{ background: `${opMeta.color}1A`, color: opMeta.color }}>{opMeta.label}</span>
                  </td>
                  <td className="tb-mono" style={{ fontSize: 12.5 }}>{r.truck}</td>
                  <td>{r.driver}</td>
                  <td>
                    <span className="tb-pill-status" style={{ background: `${statusMeta.color}1A`, color: statusMeta.color }}>
                      {r.status === 'completed' ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                      {statusMeta.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="tb-empty-state">
            <RotateCcw size={32} />
            <div>Aucun résultat dans l'historique.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MODALE DE RÉSERVATION — transporteur / chauffeur / camion
// API: POST /api/reservations/  { slot_id, truck, driver, carrier }
// ============================================================

function ReservationModal({ slot, onClose, onConfirmed }) {
  const [step, setStep] = useState('form');
  const [carrier, setCarrier] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverForm, setDriverForm] = useState({ name: '', phone: '', license: '' });
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckForm, setTruckForm] = useState({ plate: '', type: 'Semi-remorque' });

  const pickDriver = (d) => {
    setSelectedDriver(d);
    setDriverForm({ name: d.name, phone: d.phone, license: d.license });
  };

  const pickTruck = (t) => {
    setSelectedTruck(t);
    setTruckForm({ plate: t.plate, type: t.type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onConfirmed(slot.id);
      onClose();
    }, 1400);
  };

  if (step === 'success') {
    return (
      <div className="tb-modal-overlay">
        <div className="tb-modal">
          <div className="tb-success">
            <CheckCircle2 size={44} className="tb-success-icon" />
            <div className="tb-success-title">Réservation confirmée</div>
            <div className="tb-success-sub">Le créneau {slot.slot_id} a été réservé pour {truckForm.plate || 'votre camion'}.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tb-modal-overlay" onClick={onClose}>
      <div className="tb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tb-modal-header">
          <div>
            <div className="tb-modal-title">Réserver ce créneau</div>
            <div className="tb-modal-sub">{slot.slot_id} · {slot.origin_gate} → {slot.destination_terminal}</div>
          </div>
          <button className="tb-close-btn" onClick={onClose}><X size={15} /></button>
        </div>

        <div className="tb-recap">
          <div>
            <div style={{ color: '#8993A6' }}>Horaire</div>
            <b>{slot.start_time} – {slot.end_time}</b>
          </div>
          <div>
            <div style={{ color: '#8993A6' }}>Opération</div>
            <b>{OPERATION_META[slot.operation].label}</b>
          </div>
          <div>
            <div style={{ color: '#8993A6' }}>Places restantes</div>
            <b>{slot.available_slots}</b>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="tb-section">
            <div className="tb-section-title"><Building2 size={15} /> Transporteur</div>
            <div className="tb-field" style={{ marginBottom: 4 }}>
              <label>Nom de l'entreprise de transport</label>
              <input
                placeholder="Ex : Sogetra, Transit Plus…"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="tb-section">
            <div className="tb-section-title"><UserRound size={15} /> Chauffeur</div>
            <div className="tb-quickselect">
              {savedDrivers.map(d => (
                <button
                  type="button"
                  key={d.name}
                  className={`tb-chip ${selectedDriver?.name === d.name ? 'active' : ''}`}
                  onClick={() => pickDriver(d)}
                >
                  {d.name}
                </button>
              ))}
              <button
                type="button"
                className={`tb-chip ${selectedDriver === null ? 'active' : ''}`}
                onClick={() => { setSelectedDriver(null); setDriverForm({ name: '', phone: '', license: '' }); }}
              >
                + Nouveau chauffeur
              </button>
            </div>
            <div className="tb-field-row">
              <div className="tb-field">
                <label>Nom complet</label>
                <input
                  placeholder="Kodjo Mensah"
                  value={driverForm.name}
                  onChange={(e) => setDriverForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="tb-field">
                <label>Téléphone</label>
                <input
                  placeholder="+228 90 12 34 56"
                  value={driverForm.phone}
                  onChange={(e) => setDriverForm(f => ({ ...f, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="tb-field">
              <label>Numéro de permis</label>
              <input
                placeholder="PL-88213"
                value={driverForm.license}
                onChange={(e) => setDriverForm(f => ({ ...f, license: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="tb-section">
            <div className="tb-section-title"><Truck size={15} /> Camion</div>
            <div className="tb-quickselect">
              {savedTrucks.map(t => (
                <button
                  type="button"
                  key={t.plate}
                  className={`tb-chip ${selectedTruck?.plate === t.plate ? 'active' : ''}`}
                  onClick={() => pickTruck(t)}
                >
                  {t.plate}
                </button>
              ))}
              <button
                type="button"
                className={`tb-chip ${selectedTruck === null ? 'active' : ''}`}
                onClick={() => { setSelectedTruck(null); setTruckForm({ plate: '', type: 'Semi-remorque' }); }}
              >
                + Nouveau camion
              </button>
            </div>
            <div className="tb-field-row" style={{ marginBottom: 0 }}>
              <div className="tb-field">
                <label>Immatriculation</label>
                <input
                  placeholder="TG-4471-A"
                  value={truckForm.plate}
                  onChange={(e) => setTruckForm(f => ({ ...f, plate: e.target.value }))}
                  required
                />
              </div>
              <div className="tb-field">
                <label>Type de véhicule</label>
                <select
                  value={truckForm.type}
                  onChange={(e) => setTruckForm(f => ({ ...f, type: e.target.value }))}
                >
                  <option>Semi-remorque</option>
                  <option>Porteur</option>
                  <option>Citerne</option>
                  <option>Frigorifique</option>
                </select>
              </div>
            </div>
          </div>

          <div className="tb-modal-footer">
            <button type="submit" className="tb-confirm-btn">Confirmer la réservation</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// MODALE D'ANNULATION
// ============================================================

function CancelModal({ reservation, onClose, onConfirm }) {
  return (
    <div className="tb-modal-overlay" onClick={onClose}>
      <div className="tb-modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div className="tb-modal-header" style={{ borderBottom: 'none' }}>
          <div className="tb-modal-title">Annuler cette réservation ?</div>
          <button className="tb-close-btn" onClick={onClose}><X size={15} /></button>
        </div>
        <div style={{ padding: '0 22px 6px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#FDEBEC', borderRadius: 10, padding: '12px 14px' }}>
            <AlertCircle size={17} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 12.5, color: '#7A1E24' }}>
              La réservation <b>{reservation.id}</b> ({reservation.date} à {reservation.start}) sera annulée. Le créneau sera libéré pour d'autres transporteurs.
            </div>
          </div>
        </div>
        <div className="tb-modal-footer">
          <button className="tb-danger-btn" onClick={onConfirm}>Confirmer l'annulation</button>
        </div>
      </div>
    </div>
  );
}