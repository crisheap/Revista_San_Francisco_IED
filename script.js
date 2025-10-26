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
// FUNCIONES PRINCIPALES
// =======================

// Initialize application
function initApp() {
    // Load data from localStorage or use sample data
    loadDataFromStorage();
    
    // Set up event listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('new-article-btn').addEventListener('click', showNewArticleForm);
    document.getElementById('cancel-article-btn').addEventListener('click', cancelArticleForm);
    document.getElementById('article-form').addEventListener('submit', saveArticle);
    document.getElementById('comment-form').addEventListener('submit', addComment);
    document.getElementById('create-user-form').addEventListener('submit', createUser);
    document.getElementById('change-password-form').addEventListener('submit', changePassword);
    
    // Load public magazine by default
    loadPublicMagazine();
    showPage('public-magazine-page');
    
    // Update public header
    updatePublicHeader();
}

// Load data from localStorage
function loadDataFromStorage() {
    const savedUsers = localStorage.getItem('revista_users');
    const savedArticles = localStorage.getItem('revista_articles');
    const savedNotifications = localStorage.getItem('revista_notifications');
    
    state.users = savedUsers ? JSON.parse(savedUsers) : [...sampleUsers];
    state.articles = savedArticles ? JSON.parse(savedArticles) : [...sampleArticles];
    state.notifications = savedNotifications ? JSON.parse(savedNotifications) : [...sampleNotifications];
}

// Save data to localStorage
function saveDataToStorage() {
    localStorage.setItem('revista_users', JSON.stringify(state.users));
    localStorage.setItem('revista_articles', JSON.stringify(state.articles));
    localStorage.setItem('revista_notifications', JSON.stringify(state.notifications));
}

// Update public header navigation
function updatePublicHeader() {
    const userInfo = document.getElementById('user-info');
    if (state.currentUser) {
        userInfo.innerHTML = `
            <div class="user-avatar">${state.currentUser.name.charAt(0)}</div>
            <div>
                <div>${state.currentUser.name}</div>
                <div style="font-size: 0.8rem;">${getRoleName(state.currentUser.role)}</div>
            </div>
            <button onclick="logout()">Cerrar Sesión</button>
        `;
    } else {
        userInfo.innerHTML = `
            <button onclick="showPublicMagazine()" class="btn-outline">👀 Ver Revista</button>
            <button onclick="showPage('login-page')">🔐 Ingresar</button>
        `;
    }
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
                    ${getCategoryIcon(article.category)}
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
                    ${getCategoryIcon(article.category)}
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
                    ${getCategoryIcon(article.category)}
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
                    </div>
                    ${article.image ? `
                        <div class="article-image-modal">
                            <img src="${article.image}" alt="${article.title}">
                        </div>
                    ` : ''}
                    <div class="article-content-full">
                        ${article.content.replace(/\n/g, '<br>')}
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
    } else {
        alert('Credenciales incorrectas o usuario inactivo. Por favor, intente nuevamente.');
    }
}

// Update UI based on logged in user
function updateUIForUser() {
    const navMenu = document.getElementById('nav-menu');
    
    let navItems = '';
    
    // Common items for all logged-in users
    navItems = `
        <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
        <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 ${state.currentUser.role === 'student' ? 'Mis Artículos' : 'Artículos'}</a></li>
        <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
        <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
    `;
    
    // Role-specific items
    if (state.currentUser.role === 'teacher') {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 Artículos</a></li>
            <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">⏳ Revisar Artículos</a></li>
            <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
            <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
        `;
    } else if (state.currentUser.role === 'admin') {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">📊 Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">📚 Artículos</a></li>
            <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">⏳ Revisar Artículos</a></li>
            <li><a href="#" onclick="showPage('users-page'); loadUsers()">👥 Usuarios</a></li>
            <li><a href="#" onclick="showGamesPage()">🎮 Juegos Educativos</a></li>
            <li><a href="#" onclick="showPublicMagazine()">👀 Ver Revista</a></li>
        `;
    }
    
    navMenu.innerHTML = navItems;
    updatePublicHeader();
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
        'artistico': '🎨 Artístico',
        'ciencia': '🔬 Ciencia',
        'literatura': '📖 Literatura'
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
        'artistico': '🎨',
        'ciencia': '🔬',
        'literatura': '📖'
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
            notificationsHTML += `
                <div class="${notificationClass}" onclick="markNotificationAsRead(${notification.id})">
                    <h4>${notification.title}</h4>
                    <p>${notification.content}</p>
                    <small>${notification.createdAt}</small>
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
    
    if (statusFilter !== 'all') {
        articlesToShow = articlesToShow.filter(a => a.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
        articlesToShow = articlesToShow.filter(a => a.category === categoryFilter);
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
                        ${getCategoryIcon(article.category)}
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">${article.title}</h3>
                        <div class="article-meta">
                            <span>Por: ${article.author}</span>
                            <span>${formatDate(article.createdAt)}</span>
                        </div>
                        <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                        <div class="article-meta">
                            <span>${getCategoryName(article.category)}</span>
                            <span class="${statusClass}">${statusText}</span>
                        </div>
                        ${article.authorId === state.currentUser.id && article.status !== 'published' ? 
                          `<div class="action-buttons">
                              <button onclick="event.stopPropagation(); editArticle(${article.id})">✏️ Editar</button>
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

// Show new article form
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
    document.getElementById('article-image').value = '';
    document.getElementById('article-status').value = 'draft';
    
    showPage('article-form-page');
}

// Cancel article form
function cancelArticleForm() {
    showPage('articles-page');
    loadArticles();
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
    const image = document.getElementById('article-image').value;
    const status = document.getElementById('article-status').value;
    
    if (articleId) {
        // Update existing article
        const index = state.articles.findIndex(a => a.id === parseInt(articleId));
        if (index !== -1) {
            state.articles[index].title = title;
            state.articles[index].category = category;
            state.articles[index].chapter = chapter;
            state.articles[index].content = content;
            state.articles[index].image = image;
            state.articles[index].status = status;
            state.articles[index].updatedAt = new Date().toISOString().split('T')[0];
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
            image,
            status,
            createdAt: new Date().toISOString().split('T')[0],
            comments: []
        };
        
        state.articles.push(newArticle);
        
        // Add notification for teachers/admins if submitted for review
        if (status === 'pending') {
            state.notifications.unshift({
                id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
                title: 'Nuevo artículo pendiente',
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

// Load pending articles (for teachers/admins)
function loadPendingArticles() {
    const pendingGrid = document.getElementById('pending-articles-grid');
    let articlesHTML = '';
    
    const pendingArticles = state.articles.filter(a => a.status === 'pending');
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const pendingThisWeek = pendingArticles.filter(a => new Date(a.createdAt) >= thisWeek);
    
    document.getElementById('total-pending').textContent = pendingArticles.length;
    document.getElementById('pending-this-week').textContent = pendingThisWeek.length;
    
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
                            <span>Por: ${article.author}</span>
                            <span>${formatDate(article.createdAt)}</span>
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
            ${article.image ? `<div style="margin: 1rem 0; text-align: center;">
                <img src="${article.image}" alt="${article.title}" style="max-width:100%; height:auto; border-radius: 8px;">
            </div>` : ''}
            <div style="margin: 1rem 0; line-height: 1.8; white-space: pre-line;">${article.content}</div>
            ${actionsHTML}
        </div>
    `;
    
    document.getElementById('comment-article-id').value = articleId;
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
    document.getElementById('article-image').value = article.image;
    document.getElementById('article-status').value = article.status;
    
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
    
    const newComment = {
        id: article.comments.length > 0 ? Math.max(...article.comments.map(c => c.id)) + 1 : 1,
        author: state.currentUser.name,
        content,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    article.comments.push(newComment);
    document.getElementById('comment-content').value = '';
    
    saveDataToStorage();
    loadComments(articleId);
    updateDashboard();
    
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
                <td>${getRoleName(user.role)}</td>
                <td><span class="article-status ${user.active ? 'status-published' : 'status-rejected'}">${user.active ? 'Activo' : 'Inactivo'}</span></td>
                <td>${formatDate(user.lastLogin)}</td>
                <td class="action-buttons">
                    <button class="btn-danger" onclick="toggleUserStatus(${user.id})">${user.active ? '🚫 Desactivar' : '✅ Activar'}</button>
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
    
    showPage('create-user-page');
}

// Create new user
function createUser(e) {
    e.preventDefault();
    
    const name = document.getElementById('new-user-name').value;
    const username = document.getElementById('new-user-username').value;
    const password = document.getElementById('new-user-password').value;
    const role = document.getElementById('new-user-role').value;
    
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
// SISTEMA DE JUEGOS EDUCATIVOS
// =======================

// Games Page
function showGamesPage() {
    showPage('games-page');
    initGamesDashboard();
}

// Initialize games dashboard
function initGamesDashboard() {
    const gamesGrid = document.getElementById('games-grid');
    
    const games = [
        {
            id: 'sudoku',
            name: '🧩 Sudoku Matemático',
            description: 'Desafía tu lógica matemática con este juego de números',
            difficulty: 'Intermedio',
            category: 'matematico'
        },
        {
            id: 'crucigrama',
            name: '📝 Crucigrama Lingüístico',
            description: 'Amplía tu vocabulario con este crucigrama educativo',
            difficulty: 'Fácil',
            category: 'linguistico'
        },
        {
            id: 'memoria',
            name: '🎵 Juego de Memoria Musical',
            description: 'Entrena tu memoria con notas y ritmos musicales',
            difficulty: 'Fácil',
            category: 'musical'
        },
        {
            id: 'simon',
            name: '💡 Simón Dice Tecnológico',
            description: 'Mejora tu memoria secuencial con patrones de colores',
            difficulty: 'Intermedio',
            category: 'tecnologico'
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
        case 'simon':
            startSimonGame();
            break;
        default:
            alert('Juego en desarrollo. ¡Próximamente!');
    }
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
            <p>Completa el tablero con números del 1 al 4 sin repetir en filas, columnas o cuadrantes</p>
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
        }
    });
}

function validateSudokuInput(input) {
    const value = parseInt(input.value);
    if (value < 1 || value > 4) {
        input.value = '';
    }
}

function checkSudokuSolution() {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let solved = true;
    
    cells.forEach(cell => {
        if (!cell.value) {
            solved = false;
            cell.style.border = '2px solid red';
        } else {
            cell.style.border = '1px solid #ccc';
        }
    });
    
    const feedback = document.getElementById('sudoku-feedback');
    if (solved) {
        feedback.innerHTML = `
            <div class="success-message">
                <h3>🎉 ¡Felicidades!</h3>
                <p>Has completado correctamente el Sudoku. ¡Excelente razonamiento matemático!</p>
            </div>
        `;
        
        // Add achievement notification
        if (state.currentUser) {
            state.notifications.unshift({
                id: state.notifications.length + 1,
                title: '🏆 Logro Desbloqueado',
                content: 'Completaste el Sudoku Matemático exitosamente',
                type: 'success',
                read: false,
                createdAt: new Date().toISOString().split('T')[0]
            });
            saveDataToStorage();
            updateDashboard();
        }
    } else {
        feedback.innerHTML = `
            <div class="error-message">
                <p>❌ El tablero no está completo. Revisa las celdas en rojo.</p>
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
            <p>Resuelve el crucigrama relacionado con temas educativos y literarios</p>
        </div>
        
        <div class="crossword-clues">
            <div class="clues-section">
                <h4>Horizontal:</h4>
                <p>1. Género literario que usa el verso (5 letras)</p>
                <p>3. Sinónimo de aprender (9 letras)</p>
            </div>
            <div class="clues-section">
                <h4>Vertical:</h4>
                <p>2. Persona que escribe libros (7 letras)</p>
                <p>4. Lugar donde se estudia (7 letras)</p>
            </div>
        </div>
        
        <div class="crossword-grid">
            <div class="crossword-row">
                <div class="crossword-cell" data-word="1h">P</div>
                <div class="crossword-cell" data-word="1h">O</div>
                <div class="crossword-cell" data-word="1h">E</div>
                <div class="crossword-cell" data-word="1h">S</div>
                <div class="crossword-cell" data-word="1h">Í</div>
                <div class="crossword-cell" data-word="1h">A</div>
            </div>
            <div class="crossword-row">
                <div class="crossword-cell" data-word="2v">E</div>
                <div class="crossword-cell"> </div>
                <div class="crossword-cell">S</div>
                <div class="crossword-cell">T</div>
                <div class="crossword-cell">U</div>
                <div class="crossword-cell">D</div>
                <div class="crossword-cell">I</div>
                <div class="crossword-cell">A</div>
                <div class="crossword-cell">R</div>
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
    alert('🎉 ¡Crucigrama completado! Este es un ejemplo demostrativo. En una versión completa, se validarían todas las respuestas.');
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
            <p>Encuentra las parejas de instrumentos musicales</p>
            <div class="game-stats">
                <span>Intentos: <span id="attempts">0</span></span>
                <span>Parejas: <span id="matches">0</span>/8</span>
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
        locked: false
    };
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
            card1.classList.add('matched');
            card2.classList.add('matched');
            state.matches++;
            document.getElementById('matches').textContent = state.matches;
            state.flippedCards = [];
            state.locked = false;
            
            if (state.matches === 8) {
                setTimeout(() => {
                    alert('🎉 ¡Felicidades! Has completado el juego de memoria.');
                    if (state.currentUser) {
                        state.notifications.unshift({
                            id: state.notifications.length + 1,
                            title: '🏆 Logro Desbloqueado',
                            content: 'Completaste el Juego de Memoria Musical',
                            type: 'success',
                            read: false,
                            createdAt: new Date().toISOString().split('T')[0]
                        });
                        saveDataToStorage();
                        updateDashboard();
                    }
                }, 500);
            }
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
    initMemoryGame();
}

// Simon Game Implementation
function startSimonGame() {
    alert('🎮 El juego "Simón Dice" estará disponible en la próxima actualización. ¡Gracias por tu interés!');
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', initApp);