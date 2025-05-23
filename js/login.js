console.log('Login script loaded');

document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    console.log('Username:', username, 'Password:', password);
});