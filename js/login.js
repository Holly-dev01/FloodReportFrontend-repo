console.log('Login script loaded');

document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === 'holly' && password === 'holly') {
        localStorage.setItem('adminToken', 'admin-token');
        window.location.href = 'dashboard.html';
    } else {
        alert('Identifiants invalides');
    }
});