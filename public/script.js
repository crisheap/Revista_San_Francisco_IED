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
    
    localStorage.setItem('revista_users', JSON.stringify(state.users));
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
}

/*-------------------------------------------------------------------------------- */
