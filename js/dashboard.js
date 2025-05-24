const API_URL = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('adminToken')) {
        window.location.href = 'index.html';
        return;
    }
    loadAdminReports();
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function translateSeverity(severity) {
    if (!severity) return 'Non spécifié';
    
    const translations = {
        'low': 'Faible',
        'medium': 'Moyen',
        'high': 'Élevé',
        'LOW': 'Faible',
        'MEDIUM': 'Moyen',
        'HIGH': 'Élevé',
        'unknown': 'Non spécifié'
    };
    return translations[severity] || severity;
}

function translateType(type) {
    if (!type) return 'Non spécifié';
    
    const translations = {
        'flood': 'Inondation',
        'blocked_road': 'Route bloquée'
    };
    return translations[type] || type;
}

function createAdminReportCard(report) {
    const card = document.createElement('div');
    card.className = 'admin-report-card';
    
// Vérifications pour éviter les erreurs null/undefined
    const latitude = report.latitude || 0;
    const longitude = report.longitude || 0;
    const location = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    const type = report.type || 'Non spécifié';
    const description = report.description || 'Aucune description';
    const severity = report.severity || 'unknown';
    const deviceId = report.deviceId || 'Non spécifié';
    const timestamp = report.timestamp || new Date();
    
    // Sécuriser toLowerCase()
    const severityClass = severity ? severity.toLowerCase() : 'unknown';

    card.innerHTML = `
        <h3>${translateType(type)}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Type:</strong> ${translateType(type)}</p>
        <p><strong>Niveau de gravité :</strong> <span class="severity severity-${severityClass}">${translateSeverity(severity)}</span></p>
        <p><strong>Localisation:</strong> ${location}</p>
        <p><strong>Latitude:</strong> ${latitude}</p>
        <p><strong>Longitude:</strong> ${longitude}</p>
        <p><strong>Signalé le :</strong> ${formatDate(timestamp)}</p>
        <p><strong>Device ID:</strong> ${deviceId}</p>`
    ;
    
    return card;
}
async function loadAdminReports() {
    try {
        console.log('Tentative de connexion à:', `${API_URL}/reports/all`);
        
        const response = await fetch(`${API_URL}/reports/all`);
        console.log('Status de la réponse:', response.status);
        
        if (!response.ok) {
            console.error('Réponse non OK:', response.status, response.statusText);
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const reports = await response.json();
        console.log('Données reçues:', reports);
        console.log('Nombre de rapports:', reports.length);
        
        const list = document.getElementById('adminReportsList');
        if (!list) {
            console.error('Élément adminReportsList non trouvé');
            return;
        }
        
        list.innerHTML = '';
        
        if (reports.length === 0) {
            list.innerHTML = '<p>Aucun rapport disponible dans la base de données.</p>';
            return;
        }
        
        reports.forEach((report, index) => {
            console.log(`Rapport ${index}:`, report);
            list.appendChild(createAdminReportCard(report));
        });
        
        console.log('Chargement terminé avec succès');
    } catch (err) {
        console.error('Erreur détaillée:', err);
        console.error('Type d\'erreur:', err.name);
        console.error('Message d\'erreur:', err.message);
        
        const list = document.getElementById('adminReportsList');
        if (list) {
            list.innerHTML = `<p style="color: red;">Erreur: ${err.message}</p>`;
        }
    }
}