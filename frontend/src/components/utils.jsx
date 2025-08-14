// utils.js
export const formatPrice = (price, currency) => {
    return `${currency} ${price.toLocaleString()}`;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

export const getStatusBadge = (status) => {
    const statusConfig = {
        confirmed: { class: 'status-confirmed', text: 'Confirmé' },
        pending: { class: 'status-pending', text: 'En attente' },
        scheduled: { class: 'status-scheduled', text: 'Prévu ' },
        'in-progress': { class: 'status-in-progress', text: 'En cours' },
        completed: { class: 'status-completed', text: 'Completé' },
        cancelled: { class: 'status-cancelled', text: 'Annulé' }
    };
    return statusConfig[status] || { class: 'status-default', text: status };
};

export const getAmenityIcon = (amenity) => {
    const icons = {
        bascule: '⚖️',
        inspection: '🔍',
        douanes: '📋',
        parking: '🅿️',
        sécurité: '🛡️'
    };
    return icons[amenity] || '⚖️';
};