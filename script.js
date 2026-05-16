let isAuthenticated = false;
let currentUser = null;

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

function toggleAuthMenu() {
    const overlay = document.getElementById('authOverlay');
    overlay.classList.toggle('hidden');
    if (!overlay.classList.contains('hidden')) {
        switchAuthTab('login');
    }
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const registerTabBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTabBtn.classList.add('bg-gray-800', 'text-white');
        loginTabBtn.classList.remove('bg-gray-300', 'text-gray-900');
        registerTabBtn.classList.remove('bg-gray-800', 'text-white');
        registerTabBtn.classList.add('bg-gray-300', 'text-gray-900');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerTabBtn.classList.add('bg-gray-800', 'text-white');
        registerTabBtn.classList.remove('bg-gray-300', 'text-gray-900');
        loginTabBtn.classList.remove('bg-gray-800', 'text-white');
        loginTabBtn.classList.add('bg-gray-300', 'text-gray-900');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (email && password) {
        isAuthenticated = true;
        currentUser = email;
        localStorage.setItem('user', email);
        updateAuthUI();
        toggleAuthMenu();
        document.getElementById('mobileMenu').classList.add('hidden');
        showWelcomeMessage();
    }
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (name && email && password) {
        isAuthenticated = true;
        currentUser = name;
        localStorage.setItem('user', name);
        updateAuthUI();
        toggleAuthMenu();
        document.getElementById('mobileMenu').classList.add('hidden');
        showWelcomeMessage();
    }
}

function handleHelpSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('helpForm');
    form.classList.add('hidden');
    document.getElementById('formMessage').classList.remove('hidden');
    setTimeout(() => {
        form.classList.remove('hidden');
        document.getElementById('formMessage').classList.add('hidden');
        form.reset();
    }, 3000);
}

function updateAuthUI() {
    if (isAuthenticated) {
        const authBtn = document.getElementById('authBtn');
        const authBtnMobile = document.getElementById('authBtnMobile');
        if (authBtn) authBtn.textContent = 'Выход';
        if (authBtnMobile) authBtnMobile.textContent = 'Выход';

        document.querySelectorAll('button[onclick="toggleAuthMenu()"]').forEach(btn => {
            btn.onclick = function() {
                logout();
            };
        });
    }
}

function logout() {
    isAuthenticated = false;
    currentUser = null;
    localStorage.removeItem('user');
    const authBtn = document.getElementById('authBtn');
    const authBtnMobile = document.getElementById('authBtnMobile');
    if (authBtn) authBtn.textContent = 'Войти';
    if (authBtnMobile) authBtnMobile.textContent = 'Войти';
    document.getElementById('welcomeMessage').classList.add('hidden');
    
    document.querySelectorAll('button[onclick="logout()"]').forEach(btn => {
        btn.onclick = function() {
            toggleAuthMenu();
        };
    });
}

function showWelcomeMessage() {
    document.getElementById('welcomeMessage').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('welcomeMessage').classList.add('hidden');
    }, 3000);
}

function initializeAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        isAuthenticated = true;
        currentUser = user;
        updateAuthUI();
    }
}

document.addEventListener('DOMContentLoaded', initializeAuth);
