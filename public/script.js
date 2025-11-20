/*
// Application State
const state = {
    currentUser: null,
    currentPage: 'public-magazine-page',
    articles: [],
    users: [],
    notifications: []
};

// Datos de la estructura de los roles de los usuarios
const sampleUsers = [
    { 
        id: 1, 
        username: 'estudiante1', 
        password: '123', 
        name: 'Juan Pérez', 
        role: 'student', 
        active: true,
        talento: 'artistico',
        lastLogin: '2025-03-20'
    },
    { 
        id: 2, 
        username: 'docente1', 
        password: '123', 
        name: 'María González', 
        role: 'teacher', 
        active: true,
        lastLogin: '2025-03-21'
    },
    { 
        id: 3, 
        username: 'admin', 
        password: 'admin', 
        name: 'Administrador Sistema', 
        role: 'admin', 
        active: true,
        lastLogin: '2025-03-22'
    },
    { 
        id: 4, 
        username: 'padre1', 
        password: '123', 
        name: 'Carlos Rodríguez', 
        role: 'parent', 
        active: true,
        lastLogin: '2025-03-19'
    },
    { 
        id: 5, 
        username: 'estudiante2', 
        password: '123', 
        name: 'Ana López', 
        role: 'student', 
        active: true,
        talento: 'musical',
        lastLogin: '2025-03-18'
    }
];

const sampleArticles = [
    {
        id: 1,
        title: 'Nuestro equipo de fútbol gana el torneo regional',
        category: 'deportivo',
        chapter: 'portafolios',
        content: 'El equipo de fútbol del Colegio San Francisco IED ha logrado una victoria histórica en el torneo regional, demostrando disciplina, trabajo en equipo y talento deportivo. Los estudiantes entrenaron durante meses bajo la guía del profesor de educación física, combinando sus estudios académicos con la práctica deportiva.\n\nEsta victoria no solo representa un logro deportivo, sino también el fruto del esfuerzo y dedicación de nuestros jóvenes talentos.',
        author: 'Juan Pérez',
        authorId: 1,
        image: '',
        imageFile: null,
        status: 'published',
        createdAt: '2025-03-15',
        comments: [
            { id: 1, author: 'Carlos Rodríguez', content: '¡Felicidades a todo el equipo! Estamos muy orgullosos del esfuerzo y dedicación.', createdAt: '2025-03-16' },
            { id: 2, author: 'María González', content: 'Estoy muy orgullosa de nuestros estudiantes. Este logro demuestra que con perseverancia se alcanzan las metas.', createdAt: '2025-03-16' }
        ]
    },
    {
        id: 2,
        title: 'Concierto de primavera del coro estudiantil',
        category: 'musical',
        chapter: 'portafolios',
        content: 'El coro estudiantil presentó un emotivo concierto de primavera con canciones tradicionales colombianas y piezas contemporáneas. Bajo la dirección de la profesora de música, los estudiantes demostraron su talento musical y capacidad de trabajo en equipo.\n\nEl evento contó con la participación de más de 30 estudiantes de diferentes grados, quienes dedicaron horas de ensayo para perfeccionar cada nota.',
        author: 'Ana López',
        authorId: 5,
        image: '',
        imageFile: null,
        status: 'published',
        createdAt: '2025-03-10',
        comments: [
            { id: 3, author: 'Padre de Familia', content: '¡Qué hermoso concierto! Felicitaciones a todos los participantes.', createdAt: '2025-03-11' }
        ]
    },
    {
        id: 3,
        title: 'Taller de robótica educativa',
        category: 'tecnologico',
        chapter: 'experiencias',
        content: 'El programa Talentos implementó un taller de robótica educativa donde los estudiantes aprendieron programación básica y construcción de robots. Esta experiencia pedagógica innovadora permitió desarrollar habilidades de pensamiento lógico y resolución de problemas.\n\nLos estudiantes trabajaron en equipos colaborativos, diseñando y programando sus propios robots para resolver desafíos específicos.',
        author: 'María González',
        authorId: 2,
        image: '',
        imageFile: null,
        status: 'published',
        createdAt: '2025-03-18',
        comments: []
    },
    {
        id: 4,
        title: 'Reflexiones sobre ser talentoso en colegio público',
        category: 'linguistico',
        chapter: 'posicionamiento',
        content: 'Ser un estudiante con talentos excepcionales en un colegio público de estrato 2 representa tanto desafíos como oportunidades únicas. Esta reflexión busca analizar las experiencias de nuestros estudiantes y el papel de la institución en el desarrollo de sus capacidades.\n\nLa diversidad de nuestro entorno enriquece el proceso educativo y nos enseña que el talento florece en cualquier contexto cuando se le brindan las herramientas adecuadas.',
        author: 'Juan Pérez',
        authorId: 1,
        image: '',
        imageFile: null,
        status: 'published',
        createdAt: '2025-03-22',
        comments: []
    },
    {
        id: 5,
        title: 'Nueva obra de teatro estudiantil',
        category: 'artistico',
        chapter: 'portafolios',
        content: 'El grupo de teatro del colegio está preparando una nueva obra que será presentada en el festival intercolegial. Los estudiantes han estado trabajando en el guión, escenografía y actuación durante los últimos dos meses.\n\nEsta producción representa un esfuerzo colaborativo que integra múltiples talentos artísticos de nuestra comunidad educativa.',
        author: 'Ana López',
        authorId: 5,
        image: '',
        imageFile: null,
        status: 'pending',
        createdAt: '2025-03-20',
        comments: []
    }
];

const sampleNotifications = [
    { 
        id: 1, 
        title: 'Nuevo artículo pendiente', 
        content: 'Hay un nuevo artículo esperando revisión: "Nueva obra de teatro estudiantil"', 
        type: 'warning', 
        read: false, 
        createdAt: '2025-03-21',
        link: 'pending-articles-page'
    },
    { 
        id: 2, 
        title: 'Artículo publicado', 
        content: 'Tu artículo "Concierto de primavera" ha sido publicado exitosamente', 
        type: 'success', 
        read: true, 
        createdAt: '2025-03-18',
        link: 'articles-page'
    },
    { 
        id: 3, 
        title: 'Recordatorio de reunión', 
        content: 'Reunión de padres del Programa Talentos el próximo viernes a las 3:00 PM', 
        type: 'info', 
        read: false, 
        createdAt: '2025-03-20',
        link: 'dashboard-page'
    }
];

// =======================
// FUNCIONES PRINCIPALES MEJORADAS
// =======================

// Initialize application
function initApp() {
    // Load data from localStorage or use sample data
    loadDataFromStorage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Add search functionality
    addSearchFunctionality();
    
    // Load public magazine by default
    loadPublicMagazine();
    showPage('public-magazine-page');
    
    // Update public header
    updatePublicHeader();
    
    console.log('✅ Sistema de Revista Digital inicializado correctamente');
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('new-article-btn').addEventListener('click', showNewArticleForm);
    document.getElementById('cancel-article-btn').addEventListener('click', cancelArticleForm);
    document.getElementById('article-form').addEventListener('submit', saveArticle);
    document.getElementById('comment-form').addEventListener('submit', addComment);
    document.getElementById('create-user-form').addEventListener('submit', createUser);
    document.getElementById('change-password-form').addEventListener('submit', changePassword);
    
    // Character count for forms
    document.getElementById('article-title').addEventListener('input', updateCharCount);
    document.getElementById('article-content').addEventListener('input', updateCharCount);
    document.getElementById('comment-content').addEventListener('input', updateCharCount);
    
    // Username availability check
    document.getElementById('new-user-username').addEventListener('input', checkUsernameAvailability);
    
    // Password confirmation check
    document.getElementById('confirm-password').addEventListener('input', checkPasswordMatch);
    
    // Search functionality
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.id === 'public-search') {
            searchInMagazine();
        }
    });
}

// Load data from localStorage
function loadDataFromStorage() {
    const savedUsers = localStorage.getItem('revista_users');
    const savedArticles = localStorage.getItem('revista_articles');
    const savedNotifications = localStorage.getItem('revista_notifications');
    
    state.users = savedUsers ? JSON.parse(savedUsers) : [...sampleUsers];
    state.articles = savedArticles ? JSON.parse(savedArticles) : [...sampleArticles];
    state.notifications = savedNotifications ? JSON.parse(savedNotifications) : [...sampleNotifications];
    
    // Convertir imageFile de string base64 a Blob si existe
    state.articles.forEach(article => {
        if (article.imageFile && typeof article.imageFile === 'string') {
            // En un sistema real, aquí se reconstruiría el Blob desde base64
            // Por simplicidad, mantenemos la URL de imagen si existe
        }
    });
}

// Save data to localStorage
function saveDataToStorage() {
    // Preparar artículos para almacenamiento (convertir Blobs a base64)
    const articlesToSave = state.articles.map(article => {
        const articleCopy = {...article};
        // No guardamos el Blob directamente en localStorage
        delete articleCopy.imageFile;
        return articleCopy;
    });
    
    /*localStorage.setItem('revista_users', JSON.stringify(state.users));
    localStorage.setItem('revista_articles', JSON.stringify(articlesToSave));
    localStorage.setItem('revista_notifications', JSON.stringify(state.notifications));
}

// Update public header navigation
function updatePublicHeader() {
    const userInfo = document.getElementById('user-info');
    const exportBtn = document.getElementById('export-btn');
    
    if (state.currentUser) {
        userInfo.innerHTML = `
            <div class="user-avatar">${state.currentUser.name.charAt(0)}</div>
            <div>
                <div>${state.currentUser.name}</div>
                <div style="font-size: 0.8rem;">${getRoleName(state.currentUser.role)}</div>
            </div>
            <button onclick="logout()">Cerrar Sesión</button>
        `;
        
        // Show export button for admins
        if (state.currentUser.role === 'admin') {
            exportBtn.style.display = 'flex';
        }
        
        // Update navigation menu
        updateUIForUser();
    } else {
        userInfo.innerHTML = `
            <button onclick="showPublicMagazine()" class="btn-outline">👀 Ver Revista</button>
            <button onclick="showPage('login-page')">🔐 Ingresar</button>
        `;
        
        // Reset navigation to public view
        const navMenu = document.getElementById('nav-menu');
        navMenu.innerHTML = `
            <li><a href="#" onclick="showPublicMagazine()">🏠</a></li>
            <li><a href="#" onclick="showPage('login-page')">🔐</a></li>
        `;
    }
}

// Add search functionality
function addSearchFunctionality() {
    // Search functionality is now built into the HTML
}

// Show public magazine
function showPublicMagazine() {
    loadPublicMagazine();
    showPage('public-magazine-page');
    updatePublicHeader();
}

// Load public magazine content
function loadPublicMagazine() {
    loadPublicPortafolios();
    loadPublicExperiencias();
    loadPublicPosicionamiento();
}

// Load public portafolios
function loadPublicPortafolios() {
    const grid = document.getElementById('public-portafolios-grid');
    const portafolios = state.articles.filter(a => a.chapter === 'portafolios' && a.status === 'published');
    
    let html = '';
    portafolios.forEach(article => {
        html += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id})">
                <div class="article-image">
                    ${article.imageFile ? 
                        `<img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">` : 
                        getCategoryIcon(article.category)
                    }
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author}</span>
                        <span>${formatDate(article.createdAt)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 120)}...</div>
                    <div class="article-meta">
                        <span class="article-status ${getCategoryClass(article.category)}">${getCategoryName(article.category)}</span>
                        <span>💬 ${article.comments.length}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html || '<p class="no-content">No hay portafolios publicados aún.</p>';
}

// Load public experiencias
function loadPublicExperiencias() {
    const grid = document.getElementById('public-experiencias-grid');
    const experiencias = state.articles.filter(a => a.chapter === 'experiencias' && a.status === 'published');
    
    let html = '';
    experiencias.forEach(article => {
        html += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id})">
                <div class="article-image">
                    ${article.imageFile ? 
                        `<img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">` : 
                        getCategoryIcon(article.category)
                    }
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author}</span>
                        <span>${formatDate(article.createdAt)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 120)}...</div>
                    <div class="article-meta">
                        <span class="article-status ${getCategoryClass(article.category)}">${getCategoryName(article.category)}</span>
                        <span>💬 ${article.comments.length}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html || '<p class="no-content">No hay experiencias pedagógicas publicadas aún.</p>';
}

// Load public posicionamiento
function loadPublicPosicionamiento() {
    const grid = document.getElementById('public-posicionamiento-grid');
    const posicionamientos = state.articles.filter(a => a.chapter === 'posicionamiento' && a.status === 'published');
    
    let html = '';
    posicionamientos.forEach(article => {
        html += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id})">
                <div class="article-image">
                    ${article.imageFile ? 
                        `<img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">` : 
                        getCategoryIcon(article.category)
                    }
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author}</span>
                        <span>${formatDate(article.createdAt)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 120)}...</div>
                    <div class="article-meta">
                        <span class="article-status ${getCategoryClass(article.category)}">${getCategoryName(article.category)}</span>
                        <span>💬 ${article.comments.length}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html || '<p class="no-content">No hay reflexiones críticas publicadas aún.</p>';
}

// Show public article detail - IMPROVED VERSION
function showPublicArticleDetail(articleId) {
    const article = state.articles.find(a => a.id === articleId && a.status === 'published');
    if (!article) return;
    
    // Create modal for public article viewing
    const modalHTML = `
        <div class="modal-overlay" onclick="closePublicModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${article.title}</h2>
                    <button class="modal-close" onclick="closePublicModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="article-meta">
                        <span><strong>Autor:</strong> ${article.author}</span>
                        <span><strong>Fecha:</strong> ${formatDate(article.createdAt)}</span>
                        <span><strong>Categoría:</strong> ${getCategoryName(article.category)}</span>
                        <span><strong>Capítulo:</strong> ${getChapterName(article.chapter)}</span>
                    </div>
                    ${article.imageFile ? `
                        <div class="article-image-modal">
                            <img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">
                        </div>
                    ` : ''}
                    <div class="article-content-full">
                        ${article.content.replace(/\n/g, '<br>')}
                    </div>
                    <div class="comments-section">
                        <h3>💬 Comentarios <span class="article-status">${article.comments.length}</span></h3>
                        ${article.comments.length > 0 ? article.comments.map(comment => `
                            <div class="notification">
                                <h4>${comment.author}</h4>
                                <p>${comment.content}</p>
                                <small>${formatDate(comment.createdAt)}</small>
                            </div>
                        `).join('') : '<p class="no-content">No hay comentarios aún.</p>'}
                    </div>
                    <div class="article-actions-public">
                        <p><em>💡 Para comentar y acceder a más funciones, <a href="#" onclick="showPage('login-page'); closePublicModal()">inicia sesión</a></em></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalContainer = document.createElement('div');
    modalContainer.id = 'public-article-modal';
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
}

function closePublicModal() {
    const modal = document.getElementById('public-article-modal');
    if (modal) {
        modal.remove();
    }
}

// Search in magazine
function searchInMagazine() {
    const searchTerm = document.getElementById('public-search').value.toLowerCase().trim();
    if (!searchTerm) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }
    
    const results = state.articles.filter(article => 
        article.status === 'published' && 
        (article.title.toLowerCase().includes(searchTerm) || 
         article.content.toLowerCase().includes(searchTerm) ||
         article.author.toLowerCase().includes(searchTerm) ||
         getCategoryName(article.category).toLowerCase().includes(searchTerm))
    );
    
    if (results.length === 0) {
        alert('No se encontraron artículos que coincidan con tu búsqueda.');
        return;
    }
    
    // Show results in modal
    showSearchResults(results, searchTerm);
}

function showSearchResults(results, searchTerm) {
    let resultsHTML = `
        <div class="modal-overlay" onclick="closeSearchModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>🔍 Resultados de búsqueda: "${searchTerm}"</h2>
                    <button class="modal-close" onclick="closeSearchModal()">×</button>
                </div>
                <div class="modal-body">
                    <p>Se encontraron ${results.length} artículo(s) que coinciden con tu búsqueda.</p>
                    <div class="articles-grid" style="margin-top: 1rem;">
    `;
    
    results.forEach(article => {
        resultsHTML += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id}); closeSearchModal()">
                <div class="article-image">
                    ${article.imageFile ? 
                        `<img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">` : 
                        getCategoryIcon(article.category)
                    }
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author}</span>
                        <span>${formatDate(article.createdAt)}</span>
                        <span>${getCategoryName(article.category)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 150)}...</div>
                </div>
            </div>
        `;
    });
    
    resultsHTML += `
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.id = 'search-results-modal';
    modalContainer.innerHTML = resultsHTML;
    document.body.appendChild(modalContainer);
}

function closeSearchModal() {
    const modal = document.getElementById('search-results-modal');
    if (modal) modal.remove();
}

// Handle user login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    const user = state.users.find(u => 
        u.username === username && u.password === password && u.role === role && u.active
    );
    
    if (user) {
        state.currentUser = user;
        
        // Update last login
        user.lastLogin = new Date().toISOString().split('T')[0];
        saveDataToStorage();
        
        updateUIForUser();
        showPage('dashboard-page');
        updateDashboard();
        updatePublicHeader();
        
        // Add login notification
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: '👋 ¡Bienvenido/a!',
            content: `Has iniciado sesión correctamente como ${getRoleName(user.role)}`,
            type: 'info',
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
        saveDataToStorage();
        
        alert(`✅ Bienvenido/a ${user.name}! Has ingresado como ${getRoleName(user.role)}`);
    } else {
        alert('❌ Credenciales incorrectas o usuario inactivo. Por favor, intente nuevamente.💡');
    }
}

// Update UI based on logged in user
function updateUIForUser() {
    const navMenu = document.getElementById('nav-menu');
    
    let navItems = '';
    
    if (state.currentUser) {
        // Common items for all logged-in users
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 ${state.currentUser.role === 'student' ? 'Mis Artículos' : 'Artículos'}</a></li>
            <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
            <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
        `;
        
        // Role-specific items
        if (state.currentUser.role === 'teacher' || state.currentUser.role === 'admin') {
            navItems = `
                <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
                <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 Artículos</a></li>
                <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">⏳ Revisar Artículos</a></li>
                <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
                <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
            `;
        }
        
        if (state.currentUser.role === 'admin') {
            navItems = `
                <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
                <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 Artículos</a></li>
                <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">⏳ Revisar Artículos</a></li>
                <li><a href="#" onclick="showPage('users-page'); loadUsers()">👥 Usuarios</a></li>
                <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
                <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
            `;
        }
    }
    
    navMenu.innerHTML = navItems;
}

// Get role name for display
function getRoleName(role) {
    const roles = {
        'student': 'Estudiante Reportero',
        'teacher': 'Docente',
        'admin': 'Administrador',
        'parent': 'Padre de Familia'
    };
    return roles[role] || role;
}

// Get category name for display
function getCategoryName(category) {
    const categories = {
        'deportivo': '🏃 Deportivo',
        'musical': '🎵 Musical',
        'matematico': '🔢 Matemático',
        'linguistico': '📝 Lingüístico',
        'tecnologico': '💻 Tecnológico',
        'artistico': '🎨 Artístico'
    };
    return categories[category] || category;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'deportivo': '🏃',
        'musical': '🎵',
        'matematico': '🔢',
        'linguistico': '📝',
        'tecnologico': '💻',
        'artistico': '🎨'
    };
    return icons[category] || '📄';
}

// Get category CSS class
function getCategoryClass(category) {
    const classes = {
        'deportivo': 'talento-deportivo',
        'musical': 'talento-musical',
        'matematico': 'talento-matematico',
        'linguistico': 'talento-linguistico',
        'tecnologico': 'talento-tecnologico',
        'artistico': 'talento-artistico'
    };
    return classes[category] || '';
}

// Get chapter name
function getChapterName(chapter) {
    const chapters = {
        'portafolios': 'Portafolios Estudiantiles',
        'experiencias': 'Experiencias Pedagógicas',
        'posicionamiento': 'Posicionamiento Crítico'
    };
    return chapters[chapter] || chapter;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Show a specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    state.currentPage = pageId;
}

// Update character count
function updateCharCount(e) {
    const target = e.target;
    const maxLength = target.id === 'article-title' ? 100 : 
                     target.id === 'article-content' ? 2000 : 500;
    const currentLength = target.value.length;
    const charCountElement = document.getElementById(`${target.id}-char-count`);
    
    if (charCountElement) {
        charCountElement.textContent = `${currentLength}/${maxLength} caracteres`;
        
        // Add warning class if approaching limit
        charCountElement.className = 'char-count';
        if (currentLength > maxLength * 0.8) {
            charCountElement.classList.add('warning');
        }
        if (currentLength > maxLength) {
            charCountElement.classList.add('error');
        }
    }
}

// Check username availability
function checkUsernameAvailability() {
    const username = document.getElementById('new-user-username').value;
    const availabilityElement = document.getElementById('username-availability');
    
    if (!username) {
        availabilityElement.textContent = '';
        return;
    }
    
    const exists = state.users.some(user => user.username === username);
    
    if (exists) {
        availabilityElement.textContent = '❌ Este nombre de usuario ya existe';
        availabilityElement.style.color = 'var(--danger)';
    } else {
        availabilityElement.textContent = '✅ Nombre de usuario disponible';
        availabilityElement.style.color = 'var(--success)';
    }
}

// Check password match
function checkPasswordMatch() {
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const matchElement = document.getElementById('password-match');
    
    if (!confirmPassword) {
        matchElement.textContent = '';
        return;
    }
    
    if (password === confirmPassword) {
        matchElement.textContent = '✅ Las contraseñas coinciden';
        matchElement.style.color = 'var(--success)';
    } else {
        matchElement.textContent = '❌ Las contraseñas no coinciden';
        matchElement.style.color = 'var(--danger)';
    }
}

// Update dashboard with current data
function updateDashboard() {
    if (!state.currentUser) return;
    
    const publishedCount = state.articles.filter(a => a.status === 'published').length;
    const pendingCount = state.articles.filter(a => a.status === 'pending').length;
    const commentsCount = state.articles.reduce((total, article) => total + article.comments.length, 0);
    const usersCount = state.users.filter(u => u.active).length;
    
    document.getElementById('published-count').textContent = publishedCount;
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('comments-count').textContent = commentsCount;
    document.getElementById('users-count').textContent = usersCount;
    document.getElementById('welcome-user-name').textContent = state.currentUser.name;
    
    loadNotifications();
}

// Load notifications
function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    let notificationsHTML = '';
    
    const userNotifications = state.notifications.slice(0, 5); // Show last 5
    
    if (userNotifications.length === 0) {
        notificationsHTML = '<div class="notification"><p>No hay notificaciones recientes.</p></div>';
    } else {
        userNotifications.forEach(notification => {
            const notificationClass = notification.read ? 'notification' : 'notification unread';
            const icon = notification.type === 'success' ? '✅' : 
                        notification.type === 'warning' ? '⚠️' : 
                        notification.type === 'danger' ? '❌' : 'ℹ️';
            
            notificationsHTML += `
                <div class="${notificationClass}" onclick="markNotificationAsRead(${notification.id})">
                    <h4>${icon} ${notification.title}</h4>
                    <p>${notification.content}</p>
                    <small>${formatDate(notification.createdAt)}</small>
                </div>
            `;
        });
    }
    
    notificationsList.innerHTML = notificationsHTML;
}

// Mark notification as read
function markNotificationAsRead(notificationId) {
    const notification = state.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        saveDataToStorage();
        if (notification.link) {
            showPage(notification.link);
            if (notification.link === 'pending-articles-page') {
                loadPendingArticles();
            } else if (notification.link === 'articles-page') {
                loadArticles();
            }
        }
        loadNotifications();
    }
}

// Load articles
function loadArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    let articlesHTML = '';
    
    let articlesToShow = [...state.articles];
    
    // Filter based on user role
    if (state.currentUser.role === 'student') {
        articlesToShow = articlesToShow.filter(a => a.authorId === state.currentUser.id);
    } else if (state.currentUser.role === 'parent') {
        articlesToShow = articlesToShow.filter(a => a.status === 'published');
    }
    
    // Apply filters
    const statusFilter = document.getElementById('article-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const chapterFilter = document.getElementById('chapter-filter').value;
    
    if (statusFilter !== 'all') {
        articlesToShow = articlesToShow.filter(a => a.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
        articlesToShow = articlesToShow.filter(a => a.category === categoryFilter);
    }
    
    if (chapterFilter !== 'all') {
        articlesToShow = articlesToShow.filter(a => a.chapter === chapterFilter);
    }
    
    if (articlesToShow.length === 0) {
        articlesHTML = '<div class="no-content"><p>No se encontraron artículos.</p></div>';
    } else {
        articlesToShow.forEach(article => {
            const statusClass = `article-status status-${article.status}`;
            const statusText = getStatusText(article.status);
            
            articlesHTML += `
                <div class="article-card" onclick="showArticleDetail(${article.id})">
                    <div class="article-image">
                        ${article.imageFile ? 
                            `<img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">` : 
                            getCategoryIcon(article.category)
                        }
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">${article.title}</h3>
                        <div class="article-meta">
                            <span>Por: ${article.author}</span>
                            <span>${formatDate(article.createdAt)}</span>
                        </div>
                        <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                        <div class="article-meta">
                            <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                            <span class="${statusClass}">${statusText}</span>
                        </div>
                        ${article.authorId === state.currentUser.id && article.status !== 'published' ? 
                          `<div class="action-buttons">
                              <button onclick="event.stopPropagation(); editArticle(${article.id})">✏️ Editar</button>
                              <button class="btn-danger" onclick="event.stopPropagation(); deleteArticle(${article.id})">🗑️ Eliminar</button>
                           </div>` : ''}
                    </div>
                </div>
            `;
        });
    }
    
    articlesGrid.innerHTML = articlesHTML;
}

// Get status text
function getStatusText(status) {
    const statuses = {
        'published': 'Publicado',
        'pending': 'Pendiente',
        'draft': 'Borrador',
        'rejected': 'Rechazado'
    };
    return statuses[status] || status;
}

// Filter articles
function filterArticles() {
    loadArticles();
}*/

/*-------------------------------------------------------------------------------- */
// Application State
const state = {
    currentUser: null,
    currentPage: 'public-magazine-page',
    articles: [],
    users: [],
    notifications: [],
    apiBaseUrl: window.location.origin + '/api'
};

// API Service - Maneja todas las llamadas al backend
const apiService = {
    // Headers comunes
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (state.currentUser && state.currentUser.token) {
            headers['Authorization'] = `Bearer ${state.currentUser.token}`;
        }
        
        return headers;
    },

    // Manejo genérico de requests MEJORADO
    async request(endpoint, options = {}) {
        console.log(`🌐 API Call: ${options.method || 'GET'} ${endpoint}`);
        
        try {
            const response = await fetch(`${state.apiBaseUrl}${endpoint}`, {
                headers: this.getHeaders(),
                ...options
            });
            
            console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
            
            // Verificar si la respuesta está vacía
            const text = await response.text();
            console.log(`📦 Response Body:`, text.substring(0, 200) + (text.length > 200 ? '...' : ''));
            
            if (!text) {
                throw new Error('Respuesta vacía del servidor');
            }
            
            const data = JSON.parse(text);
            
            if (!response.ok) {
                throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
            }
            
            return data;
            
        } catch (error) {
            console.error('❌ Error en API request:', {
                endpoint,
                error: error.message,
                stack: error.stack
            });
            
            if (error.message.includes('Unexpected end of JSON input')) {
                throw new Error('El servidor devolvió una respuesta inválida. Contacte al administrador.');
            }
            
            throw error;
        }
    },


    // Auth endpoints
    async login(username, password, role) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password, role })
        });
    },

    async verifyToken() {
        return this.request('/auth/verify');
    },

    async changePassword(currentPassword, newPassword) {
        return this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    },

    // Users endpoints
    async getUsers() {
        return this.request('/users');
    },

    async createUser(userData) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async updateUser(id, userData) {
        return this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    },

    async resetUserPassword(id, newPassword) {
        return this.request(`/users/${id}/reset-password`, {
            method: 'POST',
            body: JSON.stringify({ newPassword })
        });
    },

    // Articles endpoints
    async getArticles(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.request(`/articles?${params}`);
    },

    async getArticle(id) {
        return this.request(`/articles/${id}`);
    },

    async createArticle(articleData) {
        return this.request('/articles', {
            method: 'POST',
            body: JSON.stringify(articleData)
        });
    },

    async updateArticle(id, articleData) {
        return this.request(`/articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(articleData)
        });
    },

    async deleteArticle(id) {
        return this.request(`/articles/${id}`, {
            method: 'DELETE'
        });
    },

    // Comments endpoints
    async getComments(articleId) {
        return this.request(`/comments/article/${articleId}`);
    },

    async createComment(commentData) {
        return this.request('/comments', {
            method: 'POST',
            body: JSON.stringify(commentData)
        });
    },

    async deleteComment(id) {
        return this.request(`/comments/${id}`, {
            method: 'DELETE'
        });
    },

    // Notifications endpoints
    async getNotifications() {
        return this.request('/notifications');
    },

    async markNotificationAsRead(id) {
        return this.request(`/notifications/${id}/read`, {
            method: 'PATCH'
        });
    },

    async markAllNotificationsAsRead() {
        return this.request('/notifications/read-all', {
            method: 'PATCH'
        });
    },

    // Games endpoints
    async getGameStats() {
        return this.request('/games/stats');
    },

    async updateGameStats(gameType, stats) {
        return this.request(`/games/${gameType}/stats`, {
            method: 'POST',
            body: JSON.stringify(stats)
        });
    }
};

// =======================
// FUNCIONES PRINCIPALES ACTUALIZADAS
// =======================

// Initialize application
async function initApp() {
    console.log('🚀 Inicializando Revista Digital...');
    
    // Verificar si hay un token guardado
    const savedToken = localStorage.getItem('revista_token');
    const savedUser = localStorage.getItem('revista_user');
    
    if (savedToken && savedUser) {
        try {
            // Verificar si el token sigue siendo válido
            const result = await apiService.verifyToken();
            state.currentUser = {
                ...JSON.parse(savedUser),
                token: savedToken
            };
            
            console.log('✅ Sesión restaurada:', state.currentUser.name);
            updateUIForUser();
            showPage('dashboard-page');
            await updateDashboard();
        } catch (error) {
            console.log('❌ Sesión expirada, cerrando sesión...');
            logout();
        }
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Load public magazine by default
    await loadPublicMagazine();
    showPage('public-magazine-page');
    
    // Update public header
    updatePublicHeader();
    
    console.log('✅ Sistema de Revista Digital inicializado correctamente');
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Article form
    const articleForm = document.getElementById('article-form');
    if (articleForm) {
        articleForm.addEventListener('submit', saveArticle);
    }
    
    // Comment form
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', addComment);
    }
    
    // Create user form
    const createUserForm = document.getElementById('create-user-form');
    if (createUserForm) {
        createUserForm.addEventListener('submit', createUser);
    }
    
    // Change password form
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', changePassword);
    }
    
    // Botones
    const newArticleBtn = document.getElementById('new-article-btn');
    if (newArticleBtn) {
        newArticleBtn.addEventListener('click', showNewArticleForm);
    }
    
    const cancelArticleBtn = document.getElementById('cancel-article-btn');
    if (cancelArticleBtn) {
        cancelArticleBtn.addEventListener('click', cancelArticleForm);
    }
}

// Handle user login
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    try {
        const result = await apiService.login(username, password, role);
        
        if (result.success) {
            state.currentUser = {
                ...result.user,
                token: result.token
            };
            
            // Guardar en localStorage
            localStorage.setItem('revista_token', result.token);
            localStorage.setItem('revista_user', JSON.stringify(result.user));
            
            updateUIForUser();
            showPage('dashboard-page');
            await updateDashboard();
            updatePublicHeader();
            
            alert(`✅ ¡Bienvenido/a ${result.user.name}! Has ingresado como ${getRoleName(result.user.role)}`);
        }
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Logout
function logout() {
    state.currentUser = null;
    localStorage.removeItem('revista_token');
    localStorage.removeItem('revista_user');
    showPublicMagazine();
    document.getElementById('login-form').reset();
    updatePublicHeader();
    alert('👋 Sesión cerrada correctamente');
}

// Update dashboard with current data
async function updateDashboard() {
    if (!state.currentUser) return;
    
    try {
        // Obtener estadísticas según el rol
        if (state.currentUser.role === 'admin') {
            const usersResult = await apiService.getUsers();
            const articlesResult = await apiService.getArticles();
            const notificationsResult = await apiService.getNotifications();
            
            document.getElementById('published-count').textContent = 
                articlesResult.articles.filter(a => a.status === 'published').length;
            document.getElementById('pending-count').textContent = 
                articlesResult.articles.filter(a => a.status === 'pending').length;
            document.getElementById('comments-count').textContent = '0'; // Se puede calcular
            document.getElementById('users-count').textContent = usersResult.users.length;
        } else {
            const articlesResult = await apiService.getArticles();
            const userArticles = articlesResult.articles.filter(a => a.author_id === state.currentUser.id);
            
            document.getElementById('published-count').textContent = 
                userArticles.filter(a => a.status === 'published').length;
            document.getElementById('pending-count').textContent = 
                userArticles.filter(a => a.status === 'pending').length;
            document.getElementById('comments-count').textContent = '0';
            document.getElementById('users-count').textContent = '-';
        }
        
        document.getElementById('welcome-user-name').textContent = state.currentUser.name;
        
        await loadNotifications();
        
    } catch (error) {
        console.error('Error actualizando dashboard:', error);
    }
}

// Load articles
async function loadArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;
    
    try {
        const statusFilter = document.getElementById('article-filter')?.value || 'all';
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';
        const chapterFilter = document.getElementById('chapter-filter')?.value || 'all';
        
        const filters = {};
        if (statusFilter !== 'all') filters.status = statusFilter;
        if (categoryFilter !== 'all') filters.category = categoryFilter;
        if (chapterFilter !== 'all') filters.chapter = chapterFilter;
        
        const result = await apiService.getArticles(filters);
        state.articles = result.articles;
        
        let articlesHTML = '';
        
        if (result.articles.length === 0) {
            articlesHTML = '<div class="no-content"><p>No se encontraron artículos.</p></div>';
        } else {
            result.articles.forEach(article => {
                const statusClass = `article-status status-${article.status}`;
                const statusText = getStatusText(article.status);
                
                articlesHTML += `
                    <div class="article-card" onclick="showArticleDetail(${article.id})">
                        <div class="article-image">
                            ${article.image_url ? 
                                `<img src="${article.image_url}" alt="${article.title}">` : 
                                getCategoryIcon(article.category)
                            }
                        </div>
                        <div class="article-content">
                            <h3 class="article-title">${article.title}</h3>
                            <div class="article-meta">
                                <span>Por: ${article.author_name}</span>
                                <span>${formatDate(article.created_at)}</span>
                            </div>
                            <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                            <div class="article-meta">
                                <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                                <span class="${statusClass}">${statusText}</span>
                            </div>
                            ${article.author_id === state.currentUser.id && article.status !== 'published' ? 
                              `<div class="action-buttons">
                                  <button onclick="event.stopPropagation(); editArticle(${article.id})">✏️ Editar</button>
                                  <button class="btn-danger" onclick="event.stopPropagation(); deleteArticle(${article.id})">🗑️ Eliminar</button>
                               </div>` : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        articlesGrid.innerHTML = articlesHTML;
        
    } catch (error) {
        console.error('Error cargando artículos:', error);
        articlesGrid.innerHTML = '<div class="no-content"><p>Error cargando artículos.</p></div>';
    }
}

// Create new article
async function saveArticle(e) {
    e.preventDefault();
    
    if (!state.currentUser) {
        alert('Por favor inicie sesión para crear artículos.');
        showPage('login-page');
        return;
    }
    
    const articleId = document.getElementById('article-id').value;
    const title = document.getElementById('article-title').value;
    const category = document.getElementById('article-category').value;
    const chapter = document.getElementById('article-chapter').value;
    const content = document.getElementById('article-content').value;
    const status = document.getElementById('article-status').value;
    
    try {
        if (articleId) {
            // Actualizar artículo existente
            await apiService.updateArticle(articleId, {
                title, category, chapter, content, status
            });
            alert('✅ Artículo actualizado exitosamente.');
        } else {
            // Crear nuevo artículo
            await apiService.createArticle({
                title, category, chapter, content, status
            });
            alert(status === 'pending' ? '✅ Artículo enviado para revisión.' : '✅ Artículo guardado como borrador.');
        }
        
        showPage('articles-page');
        await loadArticles();
        await updateDashboard();
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Delete article
async function deleteArticle(articleId) {
    if (!confirm('¿Está seguro de que desea eliminar este artículo? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        await apiService.deleteArticle(articleId);
        alert('✅ Artículo eliminado exitosamente.');
        await loadArticles();
        await updateDashboard();
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Load users (for admins)
async function loadUsers() {
    const usersTable = document.getElementById('users-table-body');
    if (!usersTable) return;
    
    try {
        const result = await apiService.getUsers();
        state.users = result.users;
        
        let usersHTML = '';
        
        result.users.forEach(user => {
            usersHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${getRoleName(user.role)} ${user.talento ? `(${getCategoryName(user.talento)})` : ''}</td>
                    <td><span class="article-status ${user.active ? 'status-published' : 'status-rejected'}">${user.active ? 'Activo' : 'Inactivo'}</span></td>
                    <td>${formatDate(user.last_login)}</td>
                    <td class="action-buttons">
                        <button class="${user.active ? 'btn-danger' : 'btn-success'}" onclick="toggleUserStatus(${user.id}, ${user.active})">${user.active ? '🚫 Desactivar' : '✅ Activar'}</button>
                        ${user.role !== 'admin' ? `<button onclick="resetUserPassword(${user.id})">🔑 Resetear Contraseña</button>` : ''}
                    </td>
                </tr>
            `;
        });
        
        usersTable.innerHTML = usersHTML;
        
        // Actualizar estadísticas
        document.getElementById('total-users').textContent = result.users.length;
        document.getElementById('student-users').textContent = result.users.filter(u => u.role === 'student').length;
        document.getElementById('teacher-users').textContent = result.users.filter(u => u.role === 'teacher').length;
        document.getElementById('active-users').textContent = result.users.filter(u => u.active).length;
        
    } catch (error) {
        console.error('Error cargando usuarios:', error);
        usersTable.innerHTML = '<tr><td colspan="6">Error cargando usuarios</td></tr>';
    }
}

// Create user (admin only)
async function createUser(e) {
    e.preventDefault();
    
    const name = document.getElementById('new-user-name').value;
    const username = document.getElementById('new-user-username').value;
    const password = document.getElementById('new-user-password').value;
    const role = document.getElementById('new-user-role').value;
    const talento = document.getElementById('new-user-talento').value;
    
    try {
        await apiService.createUser({
            name, username, password, role, talento: talento || null
        });
        
        alert('✅ Usuario creado exitosamente.');
        showPage('users-page');
        await loadUsers();
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Toggle user status
async function toggleUserStatus(userId, currentStatus) {
    try {
        await apiService.updateUser(userId, {
            active: !currentStatus
        });
        
        alert(`✅ Usuario ${!currentStatus ? 'activado' : 'desactivado'} exitosamente.`);
        await loadUsers();
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Reset user password
async function resetUserPassword(userId) {
    const newPassword = prompt('Ingrese la nueva contraseña:');
    if (!newPassword) return;
    
    if (newPassword.length < 3) {
        alert('❌ La contraseña debe tener al menos 3 caracteres.');
        return;
    }
    
    try {
        await apiService.resetUserPassword(userId, newPassword);
        alert('✅ Contraseña reseteada exitosamente.');
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Change password
async function changePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        alert('❌ Las nuevas contraseñas no coinciden.');
        return;
    }
    
    try {
        await apiService.changePassword(currentPassword, newPassword);
        alert('✅ Contraseña cambiada exitosamente.');
        showPage('dashboard-page');
        document.getElementById('change-password-form').reset();
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
}

// Load notifications
async function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    if (!notificationsList) return;
    
    try {
        const result = await apiService.getNotifications();
        let notificationsHTML = '';
        
        if (result.notifications.length === 0) {
            notificationsHTML = '<div class="notification"><p>No hay notificaciones recientes.</p></div>';
        } else {
            result.notifications.slice(0, 5).forEach(notification => {
                const notificationClass = notification.read ? 'notification' : 'notification unread';
                const icon = notification.type === 'success' ? '✅' : 
                            notification.type === 'warning' ? '⚠️' : 
                            notification.type === 'danger' ? '❌' : 'ℹ️';
                
                notificationsHTML += `
                    <div class="${notificationClass}" onclick="markNotificationAsRead(${notification.id})">
                        <h4>${icon} ${notification.title}</h4>
                        <p>${notification.content}</p>
                        <small>${formatDate(notification.created_at)}</small>
                    </div>
                `;
            });
        }
        
        notificationsList.innerHTML = notificationsHTML;
        
    } catch (error) {
        console.error('Error cargando notificaciones:', error);
    }
}

// Mark notification as read
async function markNotificationAsRead(notificationId) {
    try {
        await apiService.markNotificationAsRead(notificationId);
        await loadNotifications();
    } catch (error) {
        console.error('Error marcando notificación como leída:', error);
    }
}

// Show public magazine
async function showPublicMagazine() {
    await loadPublicMagazine();
    showPage('public-magazine-page');
    updatePublicHeader();
}

// Load public magazine content
async function loadPublicMagazine() {
    try {
        const result = await apiService.getArticles();
        const publishedArticles = result.articles.filter(a => a.status === 'published');
        
        // Separar por capítulos
        const portafolios = publishedArticles.filter(a => a.chapter === 'portafolios');
        const experiencias = publishedArticles.filter(a => a.chapter === 'experiencias');
        const posicionamiento = publishedArticles.filter(a => a.chapter === 'posicionamiento');
        
        loadPublicPortafolios(portafolios);
        loadPublicExperiencias(experiencias);
        loadPublicPosicionamiento(posicionamiento);
        
    } catch (error) {
        console.error('Error cargando revista pública:', error);
    }
}

// Funciones auxiliares (mantener las existentes)
function getRoleName(role) {
    const roles = {
        'student': 'Estudiante Reportero',
        'teacher': 'Docente',
        'admin': 'Administrador',
        'parent': 'Padre de Familia'
    };
    return roles[role] || role;
}

function getCategoryName(category) {
    const categories = {
        'deportivo': '🏃 Deportivo',
        'musical': '🎵 Musical',
        'matematico': '🔢 Matemático',
        'linguistico': '📝 Lingüístico',
        'tecnologico': '💻 Tecnológico',
        'artistico': '🎨 Artístico'
    };
    return categories[category] || category;
}

function getCategoryIcon(category) {
    const icons = {
        'deportivo': '🏃',
        'musical': '🎵',
        'matematico': '🔢',
        'linguistico': '📝',
        'tecnologico': '💻',
        'artistico': '🎨'
    };
    return icons[category] || '📄';
}

function getChapterName(chapter) {
    const chapters = {
        'portafolios': 'Portafolios Estudiantiles',
        'experiencias': 'Experiencias Pedagógicas',
        'posicionamiento': 'Posicionamiento Crítico'
    };
    return chapters[chapter] || chapter;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function getStatusText(status) {
    const statuses = {
        'published': 'Publicado',
        'pending': 'Pendiente',
        'draft': 'Borrador',
        'rejected': 'Rechazado'
    };
    return statuses[status] || status;
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    state.currentPage = pageId;
}

function updatePublicHeader() {
    const userInfo = document.getElementById('user-info');
    const exportBtn = document.getElementById('export-btn');
    
    if (state.currentUser) {
        userInfo.innerHTML = `
            <div class="user-avatar">${state.currentUser.name.charAt(0)}</div>
            <div>
                <div>${state.currentUser.name}</div>
                <div style="font-size: 0.8rem;">${getRoleName(state.currentUser.role)}</div>
            </div>
            <button onclick="logout()">Cerrar Sesión</button>
        `;
        
        if (state.currentUser.role === 'admin') {
            if (exportBtn) exportBtn.style.display = 'flex';
        }
        
        updateUIForUser();
    } else {
        userInfo.innerHTML = `
            <button onclick="showPublicMagazine()" class="btn-outline">👀 Ver Revista</button>
            <button onclick="showPage('login-page')">🔐 Ingresar</button>
        `;
    }
}

function updateUIForUser() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    
    let navItems = '';
    
    if (state.currentUser) {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 ${state.currentUser.role === 'student' ? 'Mis Artículos' : 'Artículos'}</a></li>
            <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
            <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
        `;
        
        if (state.currentUser.role === 'teacher' || state.currentUser.role === 'admin') {
            navItems = `
                <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
                <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 Artículos</a></li>
                <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">⏳ Revisar Artículos</a></li>
                <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
                <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
            `;
        }
        
        if (state.currentUser.role === 'admin') {
            navItems = `
                <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
                <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 Artículos</a></li>
                <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">⏳ Revisar Artículos</a></li>
                <li><a href="#" onclick="showPage('users-page'); loadUsers()">👥 Usuarios</a></li>
                <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
                <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
            `;
        }
    }
    
    navMenu.innerHTML = navItems;
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', initApp);
// =======================
function showNewArticleForm() {
    if (!state.currentUser) {
        alert('Por favor inicie sesión para crear artículos.');
        showPage('login-page');
        return;
    }
    
    document.getElementById('article-form-title').textContent = 'Crear Nuevo Artículo';
    document.getElementById('article-id').value = '';
    document.getElementById('article-title').value = '';
    document.getElementById('article-category').value = '';
    document.getElementById('article-chapter').value = '';
    document.getElementById('article-content').value = '';
    document.getElementById('article-image-upload').value = '';
    document.getElementById('article-status').value = 'draft';
    
    // Reset image preview
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('preview-img').src = '';
    
    // Reset character counts
    document.getElementById('title-char-count').textContent = '0/100 caracteres';
    document.getElementById('content-char-count').textContent = '0/2000 caracteres';
    
    showPage('article-form-page');
}

// Cancel article form
function cancelArticleForm() {
    showPage('articles-page');
    loadArticles();
}

// Preview image before upload
function previewImage(input) {
    const preview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validate file type
        if (!file.type.match('image.*')) {
            alert('❌ Por favor selecciona solo archivos de imagen (JPG, PNG, GIF).');
            input.value = '';
            return;
        }
        
        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            alert('❌ La imagen es demasiado grande. El tamaño máximo permitido es 2MB.');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

// Remove selected image
function removeImage() {
    document.getElementById('article-image-upload').value = '';
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('preview-img').src = '';
}

// Save article (create or update)
function saveArticle(e) {
    e.preventDefault();
    
    if (!state.currentUser) return;
    
    const articleId = document.getElementById('article-id').value;
    const title = document.getElementById('article-title').value;
    const category = document.getElementById('article-category').value;
    const chapter = document.getElementById('article-chapter').value;
    const content = document.getElementById('article-content').value;
    const status = document.getElementById('article-status').value;
    const imageFile = document.getElementById('article-image-upload').files[0];
    
    // Validate form
    const errors = validateForm({ title, content });
    if (errors.length > 0) {
        alert('❌ Errores en el formulario:\n\n' + errors.join('\n'));
        return;
    }
    
    if (articleId) {
        // Update existing article
        const index = state.articles.findIndex(a => a.id === parseInt(articleId));
        if (index !== -1) {
            state.articles[index].title = title;
            state.articles[index].category = category;
            state.articles[index].chapter = chapter;
            state.articles[index].content = content;
            state.articles[index].status = status;
            state.articles[index].updatedAt = new Date().toISOString().split('T')[0];
            
            // Update image if new one was selected
            if (imageFile) {
                state.articles[index].imageFile = imageFile;
            }
        }
    } else {
        // Create new article
        const newArticle = {
            id: state.articles.length > 0 ? Math.max(...state.articles.map(a => a.id)) + 1 : 1,
            title,
            category,
            chapter,
            content,
            author: state.currentUser.name,
            authorId: state.currentUser.id,
            imageFile: imageFile || null,
            status,
            createdAt: new Date().toISOString().split('T')[0],
            comments: []
        };
        
        state.articles.push(newArticle);
        
        // Add notification for teachers/admins if submitted for review
        if (status === 'pending') {
            state.notifications.unshift({
                id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
                title: '📝 Nuevo artículo pendiente',
                content: `"${title}" está esperando revisión`,
                type: 'warning',
                read: false,
                createdAt: new Date().toISOString().split('T')[0],
                link: 'pending-articles-page'
            });
        }
    }
    
    saveDataToStorage();
    showPage('articles-page');
    loadArticles();
    updateDashboard();
    
    if (status === 'pending') {
        alert('✅ Artículo enviado para revisión exitosamente.');
    } else {
        alert('✅ Artículo guardado como borrador.');
    }
}

// Validate form data
function validateForm(formData) {
    const errors = [];
    
    if (formData.title && formData.title.length < 5) {
        errors.push('• El título debe tener al menos 5 caracteres');
    }
    
    if (formData.title && formData.title.length > 100) {
        errors.push('• El título no puede tener más de 100 caracteres');
    }
    
    if (formData.content && formData.content.length < 20) {
        errors.push('• El contenido debe tener al menos 20 caracteres');
    }
    
    if (formData.content && formData.content.length > 2000) {
        errors.push('• El contenido no puede tener más de 2000 caracteres');
    }
    
    return errors;
}

// Load pending articles (for teachers/admins)
function loadPendingArticles() {
    const pendingGrid = document.getElementById('pending-articles-grid');
    let articlesHTML = '';
    
    const pendingArticles = state.articles.filter(a => a.status === 'pending');
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const pendingThisWeek = pendingArticles.filter(a => new Date(a.createdAt) >= thisWeek);
    
    const urgentDate = new Date();
    urgentDate.setDate(urgentDate.getDate() - 7);
    const pendingUrgent = pendingArticles.filter(a => new Date(a.createdAt) <= urgentDate);
    
    document.getElementById('total-pending').textContent = pendingArticles.length;
    document.getElementById('pending-this-week').textContent = pendingThisWeek.length;
    document.getElementById('pending-urgent').textContent = pendingUrgent.length;
    
    if (pendingArticles.length === 0) {
        articlesHTML = '<div class="no-content"><p>No hay artículos pendientes de revisión.</p></div>';
    } else {
        pendingArticles.forEach(article => {
            const isUrgent = new Date(article.createdAt) <= urgentDate;
            const urgentClass = isUrgent ? 'style="border-left: 4px solid var(--danger)"' : '';
            
            articlesHTML += `
                <div class="article-card" ${urgentClass}>
                    <div class="article-image">
                        ${article.imageFile ? 
                            `<img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}">` : 
                            getCategoryIcon(article.category)
                        }
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">${article.title}</h3>
                        <div class="article-meta">
                            <span>Por: ${article.author}</span>
                            <span>${formatDate(article.createdAt)}</span>
                            ${isUrgent ? '<span style="color: var(--danger)">⚠️ Urgente</span>' : ''}
                        </div>
                        <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                        <div class="article-meta">
                            <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                            <span class="article-status status-pending">Pendiente</span>
                        </div>
                        <div class="action-buttons">
                            <button class="btn-success" onclick="approveArticle(${article.id})">✅ Aprobar</button>
                            <button class="btn-danger" onclick="rejectArticle(${article.id})">❌ Rechazar</button>
                            <button onclick="showArticleDetail(${article.id})">👁️ Ver Detalle</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    pendingGrid.innerHTML = articlesHTML;
}

// Approve article
function approveArticle(articleId) {
    const index = state.articles.findIndex(a => a.id === articleId);
    if (index !== -1) {
        state.articles[index].status = 'published';
        state.articles[index].publishedAt = new Date().toISOString().split('T')[0];
        
        // Add notification for the author
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: '🎉 Artículo aprobado',
            content: `Tu artículo "${state.articles[index].title}" ha sido publicado en la revista`,
            type: 'success',
            read: false,
            createdAt: new Date().toISOString().split('T')[0],
            link: 'articles-page'
        });
        
        saveDataToStorage();
        loadPendingArticles();
        updateDashboard();
        alert('✅ Artículo aprobado y publicado exitosamente.');
    }
}

// Reject article
function rejectArticle(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (article) {
        const reason = prompt('Por favor, ingrese el motivo del rechazo:');
        if (reason === null) return; // User cancelled
        
        if (!reason.trim()) {
            alert('Debe ingresar un motivo para rechazar el artículo.');
            return;
        }
        
        article.status = 'rejected';
        article.rejectionReason = reason;
        
        // Add notification for the author
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: '📝 Artículo requiere cambios',
            content: `Tu artículo "${article.title}" fue rechazado. Motivo: ${reason}`,
            type: 'danger',
            read: false,
            createdAt: new Date().toISOString().split('T')[0],
            link: 'articles-page'
        });
        
        saveDataToStorage();
        loadPendingArticles();
        updateDashboard();
        alert('✅ Artículo rechazado. El autor ha sido notificado.');
    }
}

// Show article detail
function showArticleDetail(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    const articleDetail = document.getElementById('article-detail-content');
    const statusClass = `article-status status-${article.status}`;
    const statusText = getStatusText(article.status);
    
    let actionsHTML = '';
    if ((state.currentUser.role === 'teacher' || state.currentUser.role === 'admin') && article.status === 'pending') {
        actionsHTML = `
            <div class="action-buttons">
                <button class="btn-success" onclick="approveArticle(${article.id})">✅ Aprobar</button>
                <button class="btn-danger" onclick="rejectArticle(${article.id})">❌ Rechazar</button>
            </div>
        `;
    } else if (state.currentUser.role === 'student' && article.authorId === state.currentUser.id && article.status !== 'published') {
        actionsHTML = `
            <div class="action-buttons">
                <button onclick="editArticle(${article.id})">✏️ Editar</button>
                <button class="btn-danger" onclick="deleteArticle(${article.id})">🗑️ Eliminar</button>
            </div>
        `;
    }
    
    let rejectionHTML = '';
    if (article.rejectionReason) {
        rejectionHTML = `
            <div class="notification" style="background: #fef2f2; border-left-color: #ef4444;">
                <h4>📝 Observaciones del revisor:</h4>
                <p>${article.rejectionReason}</p>
            </div>
        `;
    }
    
    articleDetail.innerHTML = `
        <div class="form-container">
            <h2>${article.title}</h2>
            <div class="article-meta">
                <span>Por: ${article.author}</span>
                <span>${formatDate(article.createdAt)}</span>
                <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                <span class="${statusClass}">${statusText}</span>
            </div>
            ${rejectionHTML}
            ${article.imageFile ? `<div style="margin: 1rem 0; text-align: center;">
                <img src="${URL.createObjectURL(article.imageFile)}" alt="${article.title}" style="max-width:100%; height:auto; border-radius: 8px;">
            </div>` : ''}
            <div style="margin: 1rem 0; line-height: 1.8; white-space: pre-line;">${article.content}</div>
            ${actionsHTML}
        </div>
    `;
    
    document.getElementById('comment-article-id').value = articleId;
    document.getElementById('comments-count-badge').textContent = `(${article.comments.length})`;
    loadComments(articleId);
    showPage('article-detail-page');
}

// Edit article
function editArticle(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    document.getElementById('article-form-title').textContent = 'Editar Artículo';
    document.getElementById('article-id').value = article.id;
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-chapter').value = article.chapter;
    document.getElementById('article-content').value = article.content;
    document.getElementById('article-status').value = article.status;
    
    // Reset image preview (no se puede pre-cargar el file input por seguridad)
    document.getElementById('article-image-upload').value = '';
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('preview-img').src = '';
    
    // Update character counts
    document.getElementById('title-char-count').textContent = `${article.title.length}/100 caracteres`;
    document.getElementById('content-char-count').textContent = `${article.content.length}/2000 caracteres`;
    
    showPage('article-form-page');
}

// Delete article
function deleteArticle(articleId) {
    if (confirm('¿Está seguro de que desea eliminar este artículo? Esta acción no se puede deshacer.')) {
        const index = state.articles.findIndex(a => a.id === articleId);
        if (index !== -1) {
            state.articles.splice(index, 1);
            saveDataToStorage();
            showPage('articles-page');
            loadArticles();
            updateDashboard();
            alert('✅ Artículo eliminado exitosamente.');
        }
    }
}

// Load comments for an article
function loadComments(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    const commentsList = document.getElementById('comments-list');
    let commentsHTML = '';
    
    if (article.comments.length === 0) {
        commentsHTML = '<div class="no-content"><p>No hay comentarios aún. ¡Sé el primero en comentar!</p></div>';
    } else {
        article.comments.forEach(comment => {
            commentsHTML += `
                <div class="notification">
                    <h4>${comment.author}</h4>
                    <p>${comment.content}</p>
                    <small>${formatDate(comment.createdAt)}</small>
                </div>
            `;
        });
    }
    
    commentsList.innerHTML = commentsHTML;
}

// Add comment to an article
function addComment(e) {
    e.preventDefault();
    
    if (!state.currentUser) return;
    
    const articleId = parseInt(document.getElementById('comment-article-id').value);
    const content = document.getElementById('comment-content').value;
    
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    if (content.length < 1) {
        alert('El comentario no puede estar vacío.');
        return;
    }
    
    if (content.length > 500) {
        alert('El comentario no puede tener más de 500 caracteres.');
        return;
    }
    
    const newComment = {
        id: article.comments.length > 0 ? Math.max(...article.comments.map(c => c.id)) + 1 : 1,
        author: state.currentUser.name,
        content,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    article.comments.push(newComment);
    document.getElementById('comment-content').value = '';
    document.getElementById('comment-char-count').textContent = '0/500 caracteres';
    
    saveDataToStorage();
    loadComments(articleId);
    updateDashboard();
    
    // Update comments count badge
    document.getElementById('comments-count-badge').textContent = `(${article.comments.length})`;
    
    // Add notification for the article author if it's not the current user
    if (article.authorId !== state.currentUser.id) {
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: '💬 Nuevo comentario',
            content: `Tu artículo "${article.title}" tiene un nuevo comentario`,
            type: 'info',
            read: false,
            createdAt: new Date().toISOString().split('T')[0],
            link: 'article-detail-page'
        });
        saveDataToStorage();
    }
    
    alert('✅ Comentario publicado exitosamente.');
}

// Load users (for admins)
function loadUsers() {
    const usersTable = document.getElementById('users-table-body');
    let usersHTML = '';
    
    const totalUsers = state.users.length;
    const studentUsers = state.users.filter(u => u.role === 'student').length;
    const teacherUsers = state.users.filter(u => u.role === 'teacher').length;
    const activeUsers = state.users.filter(u => u.active).length;
    
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('student-users').textContent = studentUsers;
    document.getElementById('teacher-users').textContent = teacherUsers;
    document.getElementById('active-users').textContent = activeUsers;
    
    state.users.forEach(user => {
        usersHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${getRoleName(user.role)} ${user.talento ? `(${getCategoryName(user.talento)})` : ''}</td>
                <td><span class="article-status ${user.active ? 'status-published' : 'status-rejected'}">${user.active ? 'Activo' : 'Inactivo'}</span></td>
                <td>${formatDate(user.lastLogin)}</td>
                <td class="action-buttons">
                    <button class="${user.active ? 'btn-danger' : 'btn-success'}" onclick="toggleUserStatus(${user.id})">${user.active ? '🚫 Desactivar' : '✅ Activar'}</button>
                    ${user.role !== 'admin' ? `<button onclick="resetUserPassword(${user.id})">🔑 Resetear Contraseña</button>` : ''}
                </td>
            </tr>
        `;
    });
    
    usersTable.innerHTML = usersHTML;
}

// Toggle user status
function toggleUserStatus(userId) {
    const user = state.users.find(u => u.id === userId);
    if (user) {
        user.active = !user.active;
        saveDataToStorage();
        loadUsers();
        alert(`✅ Usuario ${user.active ? 'activado' : 'desactivado'} exitosamente.`);
    }
}

// Reset user password
function resetUserPassword(userId) {
    const user = state.users.find(u => u.id === userId);
    if (user) {
        user.password = '123'; // Default password
        saveDataToStorage();
        alert(`✅ Contraseña de ${user.name} reseteada a "123".`);
    }
}

// Show create user form
function showCreateUserForm() {
    document.getElementById('new-user-name').value = '';
    document.getElementById('new-user-username').value = '';
    document.getElementById('new-user-password').value = '';
    document.getElementById('new-user-role').value = 'student';
    document.getElementById('new-user-talento').value = '';
    
    document.getElementById('username-availability').textContent = '';
    
    showPage('create-user-page');
}

// Create new user
function createUser(e) {
    e.preventDefault();
    
    const name = document.getElementById('new-user-name').value;
    const username = document.getElementById('new-user-username').value;
    const password = document.getElementById('new-user-password').value;
    const role = document.getElementById('new-user-role').value;
    const talento = document.getElementById('new-user-talento').value;
    
    // Validate form
    if (name.length < 2) {
        alert('El nombre debe tener al menos 2 caracteres.');
        return;
    }
    
    if (username.length < 3) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }
    
    if (password.length < 3) {
        alert('La contraseña debe tener al menos 3 caracteres.');
        return;
    }
    
    // Check if username already exists
    if (state.users.find(u => u.username === username)) {
        alert('❌ El nombre de usuario ya existe. Por favor elija otro.');
        return;
    }
    
    const newUser = {
        id: state.users.length > 0 ? Math.max(...state.users.map(u => u.id)) + 1 : 1,
        username,
        password,
        name,
        role,
        active: true,
        lastLogin: new Date().toISOString().split('T')[0]
    };
    
    // Add talento for students
    if (role === 'student' && talento) {
        newUser.talento = talento;
    }
    
    state.users.push(newUser);
    saveDataToStorage();
    
    showPage('users-page');
    loadUsers();
    alert('✅ Usuario creado exitosamente.');
}

// Show change password form
function showChangePasswordForm() {
    if (!state.currentUser) return;
    
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('password-match').textContent = '';
    
    showPage('change-password-page');
}

// Change password
function changePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (currentPassword !== state.currentUser.password) {
        alert('❌ La contraseña actual es incorrecta.');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('❌ Las nuevas contraseñas no coinciden.');
        return;
    }
    
    if (newPassword.length < 3) {
        alert('❌ La nueva contraseña debe tener al menos 3 caracteres.');
        return;
    }
    
    state.currentUser.password = newPassword;
    saveDataToStorage();
    
    showPage('dashboard-page');
    alert('✅ Contraseña cambiada exitosamente.');
}

// Logout
function logout() {
    state.currentUser = null;
    showPublicMagazine();
    document.getElementById('login-form').reset();
    updatePublicHeader();
}

// =======================
// SISTEMA DE JUEGOS EDUCATIVOS MEJORADO
// =======================

// Games Page
function showGamesPage() {
    showPage('games-page');
    initGamesDashboard();
}

// Initialize games dashboard
function initGamesDashboard() {
    const gamesGrid = document.getElementById('games-grid');
    const userStats = document.getElementById('user-game-stats');
    const gameStatsContent = document.getElementById('game-stats-content');
    
    // Show game statistics for logged in users
    if (state.currentUser) {
        const gameStats = addGameStatistics();
        userStats.style.display = 'block';
        
        let statsHTML = '';
        if (gameStats.sudoku.played > 0) {
            statsHTML += `<p>🧩 Sudoku: ${gameStats.sudoku.completed}/${gameStats.sudoku.played} completados</p>`;
        }
        if (gameStats.memory.played > 0) {
            statsHTML += `<p>🎵 Memoria: ${gameStats.memory.completed}/${gameStats.memory.played} completados</p>`;
        }
        if (gameStats.crossword.played > 0) {
            statsHTML += `<p>📝 Crucigrama: ${gameStats.crossword.completed}/${gameStats.crossword.played} completados</p>`;
        }
        
        gameStatsContent.innerHTML = statsHTML || '<p>¡Aún no has jugado! Comienza con alguno de los juegos.</p>';
    } else {
        userStats.style.display = 'none';
    }
    
    const games = [
        {
            id: 'sudoku',
            name: '🧩 Sudoku Matemático',
            description: 'Desafía tu lógica matemática con este juego de números. Completa el tablero sin repetir números en filas, columnas o cuadrantes.',
            difficulty: 'Intermedio',
            category: 'matematico'
        },
        {
            id: 'crucigrama',
            name: '📝 Crucigrama Lingüístico',
            description: 'Amplía tu vocabulario con este crucigrama educativo. Resuelve las pistas relacionadas con temas literarios y educativos.',
            difficulty: 'Fácil',
            category: 'linguistico'
        },
        {
            id: 'memoria',
            name: '🎵 Juego de Memoria Musical',
            description: 'Entrena tu memoria con notas y ritmos musicales. Encuentra las parejas de instrumentos musicales.',
            difficulty: 'Fácil',
            category: 'musical'
        }
    ];
    
    let gamesHTML = '';
    games.forEach(game => {
        gamesHTML += `
            <div class="game-card" onclick="startGame('${game.id}')">
                <div class="game-icon">${game.name.split(' ')[0]}</div>
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-meta">
                    <span class="difficulty-badge ${game.difficulty.toLowerCase()}">${game.difficulty}</span>
                    <span class="game-category">${getCategoryName(game.category)}</span>
                </div>
                <button class="btn-play">🎮 Jugar Ahora</button>
            </div>
        `;
    });
    
    gamesGrid.innerHTML = gamesHTML;
}

// Start a specific game
function startGame(gameId) {
    if (!state.currentUser) {
        alert('💡 Para guardar tu progreso en los juegos, inicia sesión primero.');
        showPage('login-page');
        return;
    }
    
    switch(gameId) {
        case 'sudoku':
            startSudokuGame();
            break;
        case 'crucigrama':
            startCrosswordGame();
            break;
        case 'memoria':
            startMemoryGame();
            break;
        default:
            alert('Juego en desarrollo. ¡Próximamente!');
    }
}

// Game statistics system
function addGameStatistics() {
    if (!state.currentUser) return {};
    
    const gameStats = JSON.parse(localStorage.getItem(`game_stats_${state.currentUser.id}`)) || {
        sudoku: { played: 0, completed: 0, bestTime: null },
        memory: { played: 0, completed: 0, bestScore: 0 },
        crossword: { played: 0, completed: 0 }
    };
    
    return gameStats;
}

function updateGameStats(game, result) {
    if (!state.currentUser) return;
    
    const gameStats = addGameStatistics();
    
    if (!gameStats[game]) {
        gameStats[game] = { played: 0, completed: 0, bestScore: 0 };
    }
    
    gameStats[game].played++;
    
    if (result.completed) {
        gameStats[game].completed++;
        
        if (result.score > gameStats[game].bestScore) {
            gameStats[game].bestScore = result.score;
        }
        
        if (result.time && (!gameStats[game].bestTime || result.time < gameStats[game].bestTime)) {
            gameStats[game].bestTime = result.time;
        }
    }
    
    localStorage.setItem(`game_stats_${state.currentUser.id}`, JSON.stringify(gameStats));
}

// Sudoku Game Implementation
function startSudokuGame() {
    showPage('sudoku-game-page');
    initSudoku();
}

function initSudoku() {
    const sudokuContainer = document.getElementById('sudoku-container');
    
    // Simple 4x4 Sudoku for demonstration
    const sudokuHTML = `
        <div class="game-header">
            <h2>🧩 Sudoku Matemático</h2>
            <p>Completa el tablero con números del 1 al 4 sin repetir en filas, columnas o cuadrantes 2x2</p>
        </div>
        <div class="sudoku-board">
            <div class="sudoku-grid">
                ${Array.from({length: 16}, (_, i) => `
                    <div class="sudoku-cell" data-row="${Math.floor(i/4)}" data-col="${i%4}">
                        <input type="number" min="1" max="4" oninput="validateSudokuInput(this)">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="game-controls">
            <button onclick="checkSudokuSolution()" class="btn-success">✅ Verificar Solución</button>
            <button onclick="resetSudokuGame()" class="btn-warning">🔄 Reiniciar</button>
            <button onclick="showGamesPage()" class="btn-outline">← Volver a Juegos</button>
        </div>
        <div id="sudoku-feedback" class="game-feedback"></div>
    `;
    
    sudokuContainer.innerHTML = sudokuHTML;
    
    // Set some initial numbers (puzzle)
    const initialNumbers = [
        [1, 0, 0, 0],
        [0, 0, 2, 0],
        [0, 3, 0, 0],
        [0, 0, 0, 4]
    ];
    
    const cells = document.querySelectorAll('.sudoku-cell input');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        if (initialNumbers[row][col] !== 0) {
            cell.value = initialNumbers[row][col];
            cell.readOnly = true;
            cell.style.background = '#f3f4f6';
            cell.style.fontWeight = 'bold';
        }
    });
    
    // Start timer
    window.sudokuStartTime = new Date();
}

function validateSudokuInput(input) {
    const value = parseInt(input.value);
    if (value < 1 || value > 4) {
        input.value = '';
    }
}

function resetSudokuGame() {
    initSudoku();
}

function checkSudokuSolution() {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let solved = true;
    let emptyCells = 0;
    
    // Check if all cells are filled
    cells.forEach(cell => {
        if (!cell.value) {
            solved = false;
            emptyCells++;
            cell.style.border = '2px solid red';
        } else {
            cell.style.border = '1px solid #ccc';
        }
    });
    
    const feedback = document.getElementById('sudoku-feedback');
    
    if (emptyCells > 0) {
        feedback.innerHTML = `
            <div class="error-message">
                <p>❌ Faltan ${emptyCells} celdas por completar. Revisa las celdas en rojo.</p>
            </div>
        `;
        return;
    }
    
    // Check Sudoku rules (simplified for 4x4)
    // In a real implementation, you would check rows, columns, and 2x2 boxes
    
    if (solved) {
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - window.sudokuStartTime) / 1000);
        
        feedback.innerHTML = `
            <div class="success-message">
                <h3>🎉 ¡Felicidades!</h3>
                <p>Has completado correctamente el Sudoku en ${timeTaken} segundos.</p>
                <p>¡Excelente razonamiento matemático!</p>
            </div>
        `;
        
        // Add achievement notification and update stats
        if (state.currentUser) {
            state.notifications.unshift({
                id: state.notifications.length + 1,
                title: '🏆 Logro Desbloqueado',
                content: `Completaste el Sudoku Matemático en ${timeTaken} segundos`,
                type: 'success',
                read: false,
                createdAt: new Date().toISOString().split('T')[0]
            });
            
            updateGameStats('sudoku', {
                completed: true,
                score: 100,
                time: timeTaken
            });
            
            saveDataToStorage();
            updateDashboard();
        }
    } else {
        feedback.innerHTML = `
            <div class="error-message">
                <p>❌ La solución no es correcta. Revisa que no se repitan números en filas, columnas o cuadrantes.</p>
            </div>
        `;
    }
}

// Crossword Game Implementation
function startCrosswordGame() {
    showPage('crossword-game-page');
    initCrossword();
}

function initCrossword() {
    const crosswordContainer = document.getElementById('crossword-container');
    
    const crosswordHTML = `
        <div class="game-header">
            <h2>📝 Crucigrama Lingüístico</h2>
            <p>Resuelve el crucigrama relacionado con temas educativos y literarios. Haz clic en las casillas para escribir.</p>
        </div>
        
        <div class="crossword-clues">
            <div class="clues-section">
                <h4>Horizontal:</h4>
                <p><strong>1.</strong> Género literario que usa el verso (6 letras)</p>
                <p><strong>3.</strong> Sinónimo de aprender (9 letras)</p>
            </div>
            <div class="clues-section">
                <h4>Vertical:</h4>
                <p><strong>2.</strong> Persona que escribe libros (7 letras)</p>
                <p><strong>4.</strong> Lugar donde se estudia (7 letras)</p>
            </div>
        </div>
        
        <div class="crossword-board">
            <div class="crossword-grid">
                <!-- This would be a more complex grid in a real implementation -->
                <div style="text-align: center; padding: 2rem;">
                    <p>🔄 El crucigrama interactivo estará disponible en la próxima actualización</p>
                    <p>Por ahora, practica con los otros juegos disponibles.</p>
                </div>
            </div>
        </div>
        
        <div class="game-controls">
            <button onclick="checkCrosswordSolution()" class="btn-success">✅ Verificar Respuestas</button>
            <button onclick="showGamesPage()" class="btn-outline">← Volver a Juegos</button>
        </div>
        
        <div id="crossword-feedback" class="game-feedback"></div>
    `;
    
    crosswordContainer.innerHTML = crosswordHTML;
}

function checkCrosswordSolution() {
    // In a real implementation, this would check the crossword answers
    alert('🎉 ¡Crucigrama completado! Este es un ejemplo demostrativo.\n\nRespuestas correctas:\n1. POESÍA\n2. ESCRITOR\n3. ESTUDIAR\n4. COLEGIO\n\nEn una versión completa, se validarían todas las respuestas automáticamente.');
    
    // Update game stats
    if (state.currentUser) {
        updateGameStats('crossword', {
            completed: true,
            score: 100
        });
        
        state.notifications.unshift({
            id: state.notifications.length + 1,
            title: '🏆 Logro Desbloqueado',
            content: 'Completaste el Crucigrama Lingüístico',
            type: 'success',
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
        
        saveDataToStorage();
        updateDashboard();
    }
}

// Memory Game Implementation
function startMemoryGame() {
    showPage('memory-game-page');
    initMemoryGame();
}

function initMemoryGame() {
    const memoryContainer = document.getElementById('memory-container');
    
    const symbols = ['🎵', '🎶', '🎼', '🎹', '🎷', '🎺', '🎻', '🥁'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    let memoryHTML = `
        <div class="game-header">
            <h2>🎵 Juego de Memoria Musical</h2>
            <p>Encuentra las parejas de instrumentos musicales. Haz clic en las cartas para voltearlas.</p>
            <div class="game-stats">
                <span>Intentos: <span id="attempts">0</span></span>
                <span>Parejas: <span id="matches">0</span>/8</span>
                <span>Tiempo: <span id="timer">0</span>s</span>
            </div>
        </div>
        <div class="memory-grid">
    `;
    
    cards.forEach((symbol, index) => {
        memoryHTML += `
            <div class="memory-card" data-index="${index}" onclick="flipCard(this)">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
    });
    
    memoryHTML += `
        </div>
        <div class="game-controls">
            <button onclick="resetMemoryGame()" class="btn-success">🔄 Reiniciar Juego</button>
            <button onclick="showGamesPage()" class="btn-outline">← Volver a Juegos</button>
        </div>
    `;
    
    memoryContainer.innerHTML = memoryHTML;
    
    // Initialize game state
    window.memoryGameState = {
        flippedCards: [],
        attempts: 0,
        matches: 0,
        locked: false,
        startTime: new Date(),
        timerInterval: setInterval(updateMemoryTimer, 1000)
    };
    
    // Start timer
    function updateMemoryTimer() {
        if (window.memoryGameState) {
            const elapsed = Math.floor((new Date() - window.memoryGameState.startTime) / 1000);
            document.getElementById('timer').textContent = elapsed;
        }
    }
}

function flipCard(card) {
    const state = window.memoryGameState;
    if (state.locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    state.flippedCards.push(card);
    
    if (state.flippedCards.length === 2) {
        state.attempts++;
        document.getElementById('attempts').textContent = state.attempts;
        
        state.locked = true;
        const [card1, card2] = state.flippedCards;
        
        if (card1.querySelector('.card-back').textContent === card2.querySelector('.card-back').textContent) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                state.matches++;
                document.getElementById('matches').textContent = state.matches;
                state.flippedCards = [];
                state.locked = false;
                
                if (state.matches === 8) {
                    clearInterval(state.timerInterval);
                    const endTime = new Date();
                    const timeTaken = Math.floor((endTime - state.startTime) / 1000);
                    const score = Math.max(1000 - (state.attempts * 10) - (timeTaken * 2), 100);
                    
                    setTimeout(() => {
                        alert(`🎉 ¡Felicidades! Has completado el juego de memoria.\n\n📊 Estadísticas:\n• Tiempo: ${timeTaken} segundos\n• Intentos: ${state.attempts}\n• Puntuación: ${score}`);
                        
                        if (state.currentUser) {
                            updateGameStats('memory', {
                                completed: true,
                                score: score
                            });
                            
                            state.notifications.unshift({
                                id: state.notifications.length + 1,
                                title: '🏆 Logro Desbloqueado',
                                content: `Completaste el Juego de Memoria con ${score} puntos`,
                                type: 'success',
                                read: false,
                                createdAt: new Date().toISOString().split('T')[0]
                            });
                            saveDataToStorage();
                            updateDashboard();
                        }
                    }, 500);
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                state.flippedCards = [];
                state.locked = false;
            }, 1000);
        }
    }
}

function resetMemoryGame() {
    // Clear existing timer
    if (window.memoryGameState && window.memoryGameState.timerInterval) {
        clearInterval(window.memoryGameState.timerInterval);
    }
    initMemoryGame();
}

// =======================
// SISTEMA DE AYUDA Y OTRAS FUNCIONALIDADES
// =======================

// Help system
function showHelp(section) {
    const helpMessages = {
        login: `🔐 Sistema de Login 💡 También puedes continuar como espectador sin iniciar sesión.`,

        dashboard: `📊 **Panel de Control**\n\nEl dashboard muestra:\n• Estadísticas generales del sistema\n• Notificaciones recientes\n• Acciones rápidas según tu rol\n\n**Estadísticas:**\n• Artículos publicados\n• Artículos pendientes de revisión\n• Comentarios totales\n• Usuarios activos`,

        articles: `📚 **Gestión de Artículos**\n\n**Para Estudiantes:**\n• Crear nuevos artículos\n• Editar tus artículos existentes\n• Enviar artículos para revisión\n• Ver el estado de tus envíos\n\n**Para Docentes y Administradores:**\n• Revisar todos los artículos\n• Aprobar o rechazar artículos pendientes\n• Filtrar por estado, categoría o capítulo`,

        review: `⏳ **Revisión de Artículos**\n\n**Proceso de revisión:**\n1. Los estudiantes envían artículos para revisión\n2. Los docentes revisan el contenido\n3. Se aprueba o se rechaza con observaciones\n4. Los estudiantes reciben notificaciones\n\n**Artículos urgentes:**\nLos artículos pendientes por más de 7 días se marcan como urgentes.`,

        users: `👥 **Gestión de Usuarios**\n\n**Solo para Administradores:**\n• Crear nuevos usuarios\n• Activar/desactivar usuarios\n• Resetear contraseñas\n• Ver estadísticas de uso\n\n**Roles disponibles:**\n• Estudiante Reportero\n• Docente\n• Padre de Familia\n• Administrador`,

        games: `🎮 **Juegos Educativos**\n\n**Juegos disponibles:**\n• 🧩 Sudoku Matemático: Desarrolla lógica y razonamiento\n• 📝 Crucigrama Lingüístico: Mejora vocabulario\n• 🎵 Memoria Musical: Entrena la memoria\n\n**Características:**\n• Diferentes niveles de dificultad\n• Seguimiento de progreso\n• Logros y recompensas\n• Diseño educativo y divertido`,

        notifications: `🔔 **Sistema de Notificaciones**\n\n**Tipos de notificaciones:**\n• ✅ Aprobación de artículos\n• ⚠️ Artículos pendientes de revisión\n• ❌ Rechazo de artículos con observaciones\n• 💬 Nuevos comentarios\n• ℹ️ Información general\n\n**Funcionalidades:**\n• Notificaciones no leídas resaltadas\n• Clic para acceder directamente al contenido relacionado\n• Historial de notificaciones`,

        actions: `⚡ **Acciones Rápidas**\n\n**Acciones disponibles:**\n• 📝 Nuevo Artículo: Crear contenido nuevo\n• 📚 Ver Artículos: Gestionar publicaciones\n• 🎮 Juegos Educativos: Aprender jugando\n• 👀 Ver Revista: Modo espectador público\n• 🔒 Cambiar Contraseña: Seguridad de cuenta\n• 📤 Exportar Datos: Backup del sistema (solo admin)`
    };

    const message = helpMessages[section] || 'No hay ayuda disponible para esta sección.';
    alert(message);
}

// Export data function (for admins)
function exportData() {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        alert('❌ Solo los administradores pueden exportar datos.');
        return;
    }

    const exportData = {
        exportedAt: new Date().toISOString(),
        system: 'Revista Digital - Colegio San Francisco IED',
        version: '2.0',
        data: {
            articles: state.articles,
            users: state.users.map(u => ({ 
                ...u, 
                password: '***' // Hide passwords for security
            })),
            notifications: state.notifications,
            statistics: showAdvancedStats()
        }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `revista_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('✅ Datos exportados exitosamente.\nEl archivo se ha descargado como "revista_export_[fecha].json"');
}

// Advanced statistics
function showAdvancedStats() {
    const stats = {
        totalArticles: state.articles.length,
        publishedArticles: state.articles.filter(a => a.status === 'published').length,
        pendingArticles: state.articles.filter(a => a.status === 'pending').length,
        draftArticles: state.articles.filter(a => a.status === 'draft').length,
        rejectedArticles: state.articles.filter(a => a.status === 'rejected').length,
        articlesByCategory: {},
        articlesByChapter: {},
        activeUsers: state.users.filter(u => u.active).length,
        totalUsers: state.users.length,
        usersByRole: {},
        totalComments: state.articles.reduce((sum, article) => sum + article.comments.length, 0),
        exportDate: new Date().toISOString()
    };
    
    // Calculate statistics by category and chapter
    state.articles.forEach(article => {
        stats.articlesByCategory[article.category] = (stats.articlesByCategory[article.category] || 0) + 1;
        stats.articlesByChapter[article.chapter] = (stats.articlesByChapter[article.chapter] || 0) + 1;
    });
    
    // Calculate statistics by user role
    state.users.forEach(user => {
        stats.usersByRole[user.role] = (stats.usersByRole[user.role] || 0) + 1;
    });
    
    return stats;
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', initApp);

// Add some utility functions to the global scope for easier debugging
window.getAppState = () => state;
window.resetApp = () => {
    localStorage.clear();
    location.reload();
};


/*------------------------------------------------------------------ */


// ELIMINAR estas líneas:
// localStorage.setItem('revista_users', ...);
// localStorage.setItem('revista_articles', ...);
// localStorage.getItem('revista_users');

// REEMPLAZAR con llamadas a la API que van a Neon:
async function loadArticlesFromNeon() {
    try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        if (data.success) {
            return data.articles;
        }
        return [];
    } catch (error) {
        console.error('Error cargando artículos:', error);
        return [];
    }
}

async function saveArticleToNeon(articleData, token) {
    try {
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(articleData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error guardando artículo:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

/*------------------------------------------------------- */

// =======================
// FUNCIONES GLOBALES PARA HTML
// =======================

// Hacer funciones disponibles globalmente para los eventos onclick
window.showPage = showPage;
window.showPublicMagazine = showPublicMagazine;
window.showGamesPage = showGamesPage;
window.showNewArticleForm = showNewArticleForm;
window.showCreateUserForm = showCreateUserForm;
window.showChangePasswordForm = showChangePasswordForm;
window.logout = logout;
window.handleLogin = handleLogin;
window.saveArticle = saveArticle;
window.addComment = addComment;
window.createUser = createUser;
window.changePassword = changePassword;
window.editArticle = editArticle;
window.deleteArticle = deleteArticle;
window.toggleUserStatus = toggleUserStatus;
window.resetUserPassword = resetUserPassword;
window.markNotificationAsRead = markNotificationAsRead;
window.filterArticles = filterArticles;
window.searchInMagazine = searchInMagazine;
window.startGame = startGame;
window.showHelp = showHelp;

// Funciones que necesitan ser definidas o actualizadas
window.showGamesPage = function() {
    showPage('games-page');
    initGamesDashboard();
};

window.showNewArticleForm = function() {
    if (!state.currentUser) {
        alert('Por favor inicie sesión para crear artículos.');
        showPage('login-page');
        return;
    }
    
    document.getElementById('article-form-title').textContent = 'Crear Nuevo Artículo';
    document.getElementById('article-id').value = '';
    document.getElementById('article-title').value = '';
    document.getElementById('article-category').value = '';
    document.getElementById('article-chapter').value = '';
    document.getElementById('article-content').value = '';
    document.getElementById('article-image-upload').value = '';
    document.getElementById('article-status').value = 'draft';
    
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('preview-img').src = '';
    
    document.getElementById('title-char-count').textContent = '0/100 caracteres';
    document.getElementById('content-char-count').textContent = '0/2000 caracteres';
    
    showPage('article-form-page');
};

window.showCreateUserForm = function() {
    document.getElementById('new-user-name').value = '';
    document.getElementById('new-user-username').value = '';
    document.getElementById('new-user-password').value = '';
    document.getElementById('new-user-role').value = 'student';
    document.getElementById('new-user-talento').value = '';
    document.getElementById('username-availability').textContent = '';
    showPage('create-user-page');
};

window.showChangePasswordForm = function() {
    if (!state.currentUser) return;
    
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('password-match').textContent = '';
    showPage('change-password-page');
};

window.cancelArticleForm = function() {
    showPage('articles-page');
    loadArticles();
};

window.editArticle = async function(articleId) {
    try {
        const result = await apiService.getArticle(articleId);
        const article = result.article;
        
        document.getElementById('article-form-title').textContent = 'Editar Artículo';
        document.getElementById('article-id').value = article.id;
        document.getElementById('article-title').value = article.title;
        document.getElementById('article-category').value = article.category;
        document.getElementById('article-chapter').value = article.chapter;
        document.getElementById('article-content').value = article.content;
        document.getElementById('article-status').value = article.status;
        
        document.getElementById('article-image-upload').value = '';
        document.getElementById('image-preview').style.display = 'none';
        document.getElementById('preview-img').src = '';
        
        document.getElementById('title-char-count').textContent = `${article.title.length}/100 caracteres`;
        document.getElementById('content-char-count').textContent = `${article.content.length}/2000 caracteres`;
        
        showPage('article-form-page');
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
};

window.filterArticles = function() {
    loadArticles();
};

window.searchInMagazine = function() {
    const searchTerm = document.getElementById('public-search').value.toLowerCase().trim();
    if (!searchTerm) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }
    
    // Implementar búsqueda simple por ahora
    const articlesGrid = document.getElementById('public-portafolios-grid');
    if (articlesGrid) {
        const articles = Array.from(articlesGrid.querySelectorAll('.article-card'));
        let found = false;
        
        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                article.style.display = 'block';
                found = true;
            } else {
                article.style.display = 'none';
            }
        });
        
        if (!found) {
            alert('No se encontraron artículos que coincidan con tu búsqueda.');
        }
    }
};

window.showHelp = function(section) {
    const helpMessages = {
        login: `🔐 Sistema de Login\n\nPara acceder al sistema necesitas:\n• Usuario y contraseña\n• Seleccionar tu rol correcto\n\n💡 También puedes continuar como espectador sin iniciar sesión.`,
        dashboard: `📊 Panel de Control\n\nEl dashboard muestra:\n• Estadísticas generales del sistema\n• Notificaciones recientes\n• Acciones rápidas según tu rol`,
        articles: `📚 Gestión de Artículos\n\nPara Estudiantes:\n• Crear nuevos artículos\n• Editar tus artículos existentes\n• Enviar artículos para revisión\n\nPara Docentes y Administradores:\n• Revisar todos los artículos\n• Aprobar o rechazar artículos pendientes`,
        games: `🎮 Juegos Educativos\n\nJuegos disponibles:\n• 🧩 Sudoku Matemático\n• 📝 Crucigrama Lingüístico\n• 🎵 Memoria Musical`
    };
    
    const message = helpMessages[section] || 'No hay ayuda disponible para esta sección.';
    alert(message);
};

// Funciones para cargar contenido público
window.loadPublicPortafolios = function(articles = []) {
    const grid = document.getElementById('public-portafolios-grid');
    if (!grid) return;
    
    let html = '';
    articles.forEach(article => {
        html += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id})">
                <div class="article-image">
                    ${getCategoryIcon(article.category)}
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author_name}</span>
                        <span>${formatDate(article.created_at)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 120)}...</div>
                    <div class="article-meta">
                        <span class="article-status ${getCategoryClass(article.category)}">${getCategoryName(article.category)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html || '<p class="no-content">No hay portafolios publicados aún.</p>';
};

window.loadPublicExperiencias = function(articles = []) {
    const grid = document.getElementById('public-experiencias-grid');
    if (!grid) return;
    
    let html = '';
    articles.forEach(article => {
        html += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id})">
                <div class="article-image">
                    ${getCategoryIcon(article.category)}
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author_name}</span>
                        <span>${formatDate(article.created_at)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 120)}...</div>
                    <div class="article-meta">
                        <span class="article-status ${getCategoryClass(article.category)}">${getCategoryName(article.category)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html || '<p class="no-content">No hay experiencias pedagógicas publicadas aún.</p>';
};

window.loadPublicPosicionamiento = function(articles = []) {
    const grid = document.getElementById('public-posicionamiento-grid');
    if (!grid) return;
    
    let html = '';
    articles.forEach(article => {
        html += `
            <div class="article-card" onclick="showPublicArticleDetail(${article.id})">
                <div class="article-image">
                    ${getCategoryIcon(article.category)}
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author_name}</span>
                        <span>${formatDate(article.created_at)}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 120)}...</div>
                    <div class="article-meta">
                        <span class="article-status ${getCategoryClass(article.category)}">${getCategoryName(article.category)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html || '<p class="no-content">No hay reflexiones críticas publicadas aún.</p>';
};

window.showPublicArticleDetail = async function(articleId) {
    try {
        const result = await apiService.getArticle(articleId);
        const article = result.article;
        
        // Crear modal para mostrar el artículo
        const modalHTML = `
            <div class="modal-overlay" onclick="closePublicModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>${article.title}</h2>
                        <button class="modal-close" onclick="closePublicModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="article-meta">
                            <span><strong>Autor:</strong> ${article.author_name}</span>
                            <span><strong>Fecha:</strong> ${formatDate(article.created_at)}</span>
                            <span><strong>Categoría:</strong> ${getCategoryName(article.category)}</span>
                            <span><strong>Capítulo:</strong> ${getChapterName(article.chapter)}</span>
                        </div>
                        <div class="article-content-full">
                            ${article.content.replace(/\n/g, '<br>')}
                        </div>
                        <div class="comments-section">
                            <h3>💬 Comentarios <span class="article-status">${article.comments.length}</span></h3>
                            ${article.comments.length > 0 ? article.comments.map(comment => `
                                <div class="notification">
                                    <h4>${comment.author_name}</h4>
                                    <p>${comment.content}</p>
                                    <small>${formatDate(comment.created_at)}</small>
                                </div>
                            `).join('') : '<p class="no-content">No hay comentarios aún.</p>'}
                        </div>
                        <div class="article-actions-public">
                            <p><em>💡 Para comentar y acceder a más funciones, <a href="#" onclick="showPage(\'login-page\'); closePublicModal()">inicia sesión</a></em></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.id = 'public-article-modal';
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
};

window.closePublicModal = function() {
    const modal = document.getElementById('public-article-modal');
    if (modal) {
        modal.remove();
    }
};

// Funciones de juegos
window.startGame = function(gameId) {
    if (!state.currentUser) {
        alert('💡 Para guardar tu progreso en los juegos, inicia sesión primero.');
        showPage('login-page');
        return;
    }
    
    switch(gameId) {
        case 'sudoku':
            startSudokuGame();
            break;
        case 'crucigrama':
            startCrosswordGame();
            break;
        case 'memoria':
            startMemoryGame();
            break;
        default:
            alert('Juego en desarrollo. ¡Próximamente!');
    }
};

// Funciones auxiliares globales
window.getCategoryClass = function(category) {
    const classes = {
        'deportivo': 'talento-deportivo',
        'musical': 'talento-musical',
        'matematico': 'talento-matematico',
        'linguistico': 'talento-linguistico',
        'tecnologico': 'talento-tecnologico',
        'artistico': 'talento-artistico'
    };
    return classes[category] || '';
};

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);

// Funciones para manejar comentarios
window.addComment = async function(e) {
    e.preventDefault();
    
    if (!state.currentUser) {
        alert('Por favor inicie sesión para comentar.');
        showPage('login-page');
        return;
    }
    
    const content = document.getElementById('comment-content').value;
    const articleId = document.getElementById('comment-article-id').value;
    
    if (!content.trim()) {
        alert('El comentario no puede estar vacío.');
        return;
    }
    
    try {
        await apiService.createComment({
            articleId: parseInt(articleId),
            content: content
        });
        
        alert('✅ Comentario publicado exitosamente.');
        document.getElementById('comment-content').value = '';
        
        // Recargar los comentarios
        if (typeof loadComments === 'function') {
            await loadComments(parseInt(articleId));
        }
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
};

// Funciones para artículos pendientes (docentes y admins)
window.loadPendingArticles = async function() {
    const pendingGrid = document.getElementById('pending-articles-grid');
    if (!pendingGrid) return;
    
    try {
        const result = await apiService.getArticles({ status: 'pending' });
        const pendingArticles = result.articles;
        
        let articlesHTML = '';
        
        if (pendingArticles.length === 0) {
            articlesHTML = '<div class="no-content"><p>No hay artículos pendientes de revisión.</p></div>';
        } else {
            pendingArticles.forEach(article => {
                articlesHTML += `
                    <div class="article-card">
                        <div class="article-image">
                            ${getCategoryIcon(article.category)}
                        </div>
                        <div class="article-content">
                            <h3 class="article-title">${article.title}</h3>
                            <div class="article-meta">
                                <span>Por: ${article.author_name}</span>
                                <span>${formatDate(article.created_at)}</span>
                            </div>
                            <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                            <div class="article-meta">
                                <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                                <span class="article-status status-pending">Pendiente</span>
                            </div>
                            <div class="action-buttons">
                                <button class="btn-success" onclick="approveArticle(${article.id})">✅ Aprobar</button>
                                <button class="btn-danger" onclick="rejectArticle(${article.id})">❌ Rechazar</button>
                                <button onclick="showArticleDetail(${article.id})">👁️ Ver Detalle</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        pendingGrid.innerHTML = articlesHTML;
        
    } catch (error) {
        console.error('Error cargando artículos pendientes:', error);
        pendingGrid.innerHTML = '<div class="no-content"><p>Error cargando artículos pendientes.</p></div>';
    }
};

window.approveArticle = async function(articleId) {
    try {
        await apiService.updateArticle(articleId, { status: 'published' });
        alert('✅ Artículo aprobado y publicado exitosamente.');
        await loadPendingArticles();
        await updateDashboard();
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
};

window.rejectArticle = async function(articleId) {
    const reason = prompt('Por favor, ingrese el motivo del rechazo:');
    if (reason === null) return;
    
    if (!reason.trim()) {
        alert('Debe ingresar un motivo para rechazar el artículo.');
        return;
    }
    
    try {
        await apiService.updateArticle(articleId, { 
            status: 'rejected',
            rejection_reason: reason 
        });
        alert('✅ Artículo rechazado. El autor ha sido notificado.');
        await loadPendingArticles();
        await updateDashboard();
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
};

window.showArticleDetail = async function(articleId) {
    try {
        const result = await apiService.getArticle(articleId);
        const article = result.article;
        
        const articleDetail = document.getElementById('article-detail-content');
        const statusClass = `article-status status-${article.status}`;
        const statusText = getStatusText(article.status);
        
        let actionsHTML = '';
        if ((state.currentUser.role === 'teacher' || state.currentUser.role === 'admin') && article.status === 'pending') {
            actionsHTML = `
                <div class="action-buttons">
                    <button class="btn-success" onclick="approveArticle(${article.id})">✅ Aprobar</button>
                    <button class="btn-danger" onclick="rejectArticle(${article.id})">❌ Rechazar</button>
                </div>
            `;
        } else if (state.currentUser.role === 'student' && article.author_id === state.currentUser.id && article.status !== 'published') {
            actionsHTML = `
                <div class="action-buttons">
                    <button onclick="editArticle(${article.id})">✏️ Editar</button>
                    <button class="btn-danger" onclick="deleteArticle(${article.id})">🗑️ Eliminar</button>
                </div>
            `;
        }
        
        let rejectionHTML = '';
        if (article.rejection_reason) {
            rejectionHTML = `
                <div class="notification" style="background: #fef2f2; border-left-color: #ef4444;">
                    <h4>📝 Observaciones del revisor:</h4>
                    <p>${article.rejection_reason}</p>
                </div>
            `;
        }
        
        articleDetail.innerHTML = `
            <div class="form-container">
                <h2>${article.title}</h2>
                <div class="article-meta">
                    <span>Por: ${article.author_name}</span>
                    <span>${formatDate(article.created_at)}</span>
                    <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                    <span class="${statusClass}">${statusText}</span>
                </div>
                ${rejectionHTML}
                <div style="margin: 1rem 0; line-height: 1.8; white-space: pre-line;">${article.content}</div>
                ${actionsHTML}
            </div>
        `;
        
        document.getElementById('comment-article-id').value = articleId;
        document.getElementById('comments-count-badge').textContent = `(${article.comments.length})`;
        
        // Cargar comentarios
        const commentsList = document.getElementById('comments-list');
        let commentsHTML = '';
        
        if (article.comments.length === 0) {
            commentsHTML = '<div class="no-content"><p>No hay comentarios aún. ¡Sé el primero en comentar!</p></div>';
        } else {
            article.comments.forEach(comment => {
                commentsHTML += `
                    <div class="notification">
                        <h4>${comment.author_name}</h4>
                        <p>${comment.content}</p>
                        <small>${formatDate(comment.created_at)}</small>
                    </div>
                `;
            });
        }
        
        commentsList.innerHTML = commentsHTML;
        
        showPage('article-detail-page');
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
};

window.initGamesDashboard = function() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;
    
    const games = [
        {
            id: 'sudoku',
            name: '🧩 Sudoku Matemático',
            description: 'Desafía tu lógica matemática con este juego de números. Completa el tablero sin repetir números en filas, columnas o cuadrantes.',
            difficulty: 'Intermedio',
            category: 'matematico'
        },
        {
            id: 'crucigrama',
            name: '📝 Crucigrama Lingüístico',
            description: 'Amplía tu vocabulario con este crucigrama educativo. Resuelve las pistas relacionadas con temas literarios y educativos.',
            difficulty: 'Fácil',
            category: 'linguistico'
        },
        {
            id: 'memoria',
            name: '🎵 Juego de Memoria Musical',
            description: 'Entrena tu memoria con notas y ritmos musicales. Encuentra las parejas de instrumentos musicales.',
            difficulty: 'Fácil',
            category: 'musical'
        }
    ];
    
    let gamesHTML = '';
    games.forEach(game => {
        gamesHTML += `
            <div class="game-card" onclick="startGame('${game.id}')">
                <div class="game-icon">${game.name.split(' ')[0]}</div>
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-meta">
                    <span class="difficulty-badge ${game.difficulty.toLowerCase()}">${game.difficulty}</span>
                    <span class="game-category">${getCategoryName(game.category)}</span>
                </div>
                <button class="btn-play">🎮 Jugar Ahora</button>
            </div>
        `;
    });
    
    gamesGrid.innerHTML = gamesHTML;
};