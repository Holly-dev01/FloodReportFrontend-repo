console.log('Login script loaded');

document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === 'admin' && password === 'admin') {
        alert('Login successful!');
    } else {
        alert('Invalid credentials');
    }
});