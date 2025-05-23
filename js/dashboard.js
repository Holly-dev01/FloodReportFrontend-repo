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
        console.log('Reports loaded:', reports);
    } catch (err) {
        alert('Erreur lors du chargement des données');
        console.error('Error loading reports:', err);
    }
}