const API_URL = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('adminToken')) {
        window.location.href = 'index.html';
        return;
    }
    console.log('Dashboard loaded successfully');
});

async function loadAdminReports() {
    try {
        const response = await fetch(`${API_URL}/reports/all`);
        if (!response.ok) throw new Error('Erreur de chargement');

        const reports = await response.json();
        const list = document.getElementById('adminReportsList');
        list.innerHTML = '';
        reports.forEach(r => list.appendChild(createAdminReportCard(r)));
    } catch (err) {
        alert('Erreur lors du chargement des données');
        console.error(err);
    }
}

function createAdminReportCard(report) {
    const card = document.createElement('div');
    card.className = 'admin-report-card';
    
    card.innerHTML = `
        <h3>${report.location}</h3>
        <p>${report.description}</p>
        <p>Severity: ${report.severity}</p>
    `;
    
    return card;
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}