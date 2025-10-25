// Application State
const state = {
    currentUser: null,
    currentPage: 'login-page',
    articles: [],
    users: [],
    notifications: []
};

// Sample data
const sampleUsers = [
    { id: 1, username: 'estudiante1', password: '123', name: 'Juan Pérez', role: 'student', active: true },
    { id: 2, username: 'docente1', password: '123', name: 'María González', role: 'teacher', active: true },
    { id: 3, username: 'admin', password: 'admin', name: 'Administrador', role: 'admin', active: true },
    { id: 4, username: 'padre1', password: '123', name: 'Carlos Rodríguez', role: 'parent', active: true }
];

const sampleArticles = [
    {
        id: 1,
        title: 'Nuestro equipo de fútbol gana el torneo regional',
        category: 'deportivo',
        content: 'El equipo de fútbol del Colegio San Francisco IED ha logrado una victoria histórica en el torneo regional...',
        author: 'Juan Pérez',
        authorId: 1,
        image: '',
        status: 'published',
        createdAt: '2025-03-15',
        comments: [
            { id: 1, author: 'Carlos Rodríguez', content: '¡Felicidades a todo el equipo!', createdAt: '2025-03-16' },
            { id: 2, author: 'María González', content: 'Estoy muy orgullosa de nuestros estudiantes.', createdAt: '2025-03-16' }
        ]
    },
    {
        id: 2,
        title: 'Concierto de primavera del coro estudiantil',
        category: 'musical',
        content: 'El coro estudiantil presentó un emotivo concierto de primavera con canciones tradicionales...',
        author: 'Ana López',
        authorId: 5,
        image: '',
        status: 'published',
        createdAt: '2025-03-10',
        comments: []
    },
    {
        id: 3,
        title: 'Proyecto de robótica gana reconocimiento nacional',
        category: 'tecnologico',
        content: 'Nuestro equipo de robótica ha desarrollado un innovador proyecto que ha recibido reconocimiento a nivel nacional...',
        author: 'Pedro Ramírez',
        authorId: 6,
        image: '',
        status: 'pending',
        createdAt: '2025-03-20',
        comments: []
    }
];

const sampleNotifications = [
    { id: 1, title: 'Nuevo artículo pendiente', content: 'Hay un nuevo artículo esperando revisión', type: 'warning', read: false, createdAt: '2025-03-21' },
    { id: 2, title: 'Artículo publicado', content: 'Tu artículo "Concierto de primavera" ha sido publicado', type: 'success', read: true, createdAt: '2025-03-18' },
    { id: 3, title: 'Recordatorio de reunión', content: 'Reunión de padres el próximo viernes a las 3:00 PM', type: 'info', read: false, createdAt: '2025-03-20' }
];

// Initialize application
function initApp() {
    // Load sample data
    state.users = [...sampleUsers];
    state.articles = [...sampleArticles];
    state.notifications = [...sampleNotifications];
    
    // Set up event listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('new-article-btn').addEventListener('click', showNewArticleForm);
    document.getElementById('cancel-article-btn').addEventListener('click', cancelArticleForm);
    document.getElementById('article-form').addEventListener('submit', saveArticle);
    document.getElementById('comment-form').addEventListener('submit', addComment);
    
    // Show login page by default
    showPage('login-page');
}

// Handle user login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // In a real app, this would be a server request
    const user = state.users.find(u => 
        u.username === username && u.password === password && u.role === role
    );
    
    if (user) {
        state.currentUser = user;
        updateUIForUser();
        showPage('dashboard-page');
        updateDashboard();
    } else {
        alert('Credenciales incorrectas. Por favor, intente nuevamente.');
    }
}

// Update UI based on logged in user
function updateUIForUser() {
    const userInfo = document.getElementById('user-info');
    const navMenu = document.getElementById('nav-menu');
    
    // Update user info
    userInfo.innerHTML = `
        <div class="user-avatar">${state.currentUser.name.charAt(0)}</div>
        <div>
            <div>${state.currentUser.name}</div>
            <div style="font-size: 0.8rem;">${getRoleName(state.currentUser.role)}</div>
        </div>
        <button onclick="logout()">Cerrar Sesión</button>
    `;
    
    // Update navigation based on user role
    let navItems = '';
    
    if (state.currentUser.role === 'student') {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">Artículos</a></li>
            <li><a href="#" onclick="showNewArticleForm()">Nuevo Artículo</a></li>
        `;
    } else if (state.currentUser.role === 'teacher') {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">Artículos</a></li>
            <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">Revisar Artículos</a></li>
        `;
    } else if (state.currentUser.role === 'admin') {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">Artículos</a></li>
            <li><a href="#" onclick="showPage('pending-articles-page'); loadPendingArticles()">Revisar Artículos</a></li>
            <li><a href="#" onclick="showPage('users-page'); loadUsers()">Usuarios</a></li>
        `;
    } else if (state.currentUser.role === 'parent') {
        navItems = `
            <li><a href="#" onclick="showPage('dashboard-page'); updateDashboard()">Dashboard</a></li>
            <li><a href="#" onclick="showPage('articles-page'); loadArticles()">Artículos</a></li>
        `;
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

// Show a specific page
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    document.getElementById(pageId).classList.add('active');
    state.currentPage = pageId;
}

// Update dashboard with current data
function updateDashboard() {
    const publishedCount = state.articles.filter(a => a.status === 'published').length;
    const pendingCount = state.articles.filter(a => a.status === 'pending').length;
    const commentsCount = state.articles.reduce((total, article) => total + article.comments.length, 0);
    const usersCount = state.users.filter(u => u.active).length;
    
    document.getElementById('published-count').textContent = publishedCount;
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('comments-count').textContent = commentsCount;
    document.getElementById('users-count').textContent = usersCount;
    
    // Load notifications
    loadNotifications();
}

// Load notifications
function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    let notificationsHTML = '';
    
    state.notifications.forEach(notification => {
        const notificationClass = notification.read ? 'notification' : 'notification unread';
        notificationsHTML += `
            <div class="${notificationClass}">
                <h4>${notification.title}</h4>
                <p>${notification.content}</p>
                <small>${notification.createdAt}</small>
            </div>
        `;
    });
    
    notificationsList.innerHTML = notificationsHTML;
}

// Load articles
function loadArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    let articlesHTML = '';
    
    // Filter articles based on user role
    let articlesToShow = [...state.articles];
    
    if (state.currentUser.role === 'student') {
        // Students see their own articles and published articles
        articlesToShow = articlesToShow.filter(a => 
            a.authorId === state.currentUser.id || a.status === 'published'
        );
    } else if (state.currentUser.role === 'parent') {
        // Parents only see published articles
        articlesToShow = articlesToShow.filter(a => a.status === 'published');
    }
    
    articlesToShow.forEach(article => {
        const statusClass = `article-status status-${article.status}`;
        const statusText = article.status === 'published' ? 'Publicado' : 
                            article.status === 'pending' ? 'Pendiente' : 'Rechazado';
        
        articlesHTML += `
            <div class="article-card" onclick="showArticleDetail(${article.id})">
                <div class="article-image">
                    ${article.image ? `<img src="${article.image}" alt="${article.title}" style="width:100%; height:100%; object-fit:cover;">` : '📄'}
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author}</span>
                        <span>${article.createdAt}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                    <div class="article-meta">
                        <span>${getCategoryName(article.category)}</span>
                        <span class="${statusClass}">${statusText}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    articlesGrid.innerHTML = articlesHTML;
}

// Get category name for display
function getCategoryName(category) {
    const categories = {
        'deportivo': 'Deportivo',
        'musical': 'Musical',
        'matematico': 'Matemático',
        'linguistico': 'Lingüístico',
        'tecnologico': 'Tecnológico',
        'artistico': 'Artístico',
        'ciencia': 'Ciencia',
        'literatura': 'Literatura'
    };
    return categories[category] || category;
}

// Show new article form
function showNewArticleForm() {
    document.getElementById('article-form-title').textContent = 'Crear Nuevo Artículo';
    document.getElementById('article-id').value = '';
    document.getElementById('article-title').value = '';
    document.getElementById('article-category').value = '';
    document.getElementById('article-content').value = '';
    document.getElementById('article-image').value = '';
    
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
    
    const articleId = document.getElementById('article-id').value;
    const title = document.getElementById('article-title').value;
    const category = document.getElementById('article-category').value;
    const content = document.getElementById('article-content').value;
    const image = document.getElementById('article-image').value;
    
    if (articleId) {
        // Update existing article
        const index = state.articles.findIndex(a => a.id === parseInt(articleId));
        if (index !== -1) {
            state.articles[index].title = title;
            state.articles[index].category = category;
            state.articles[index].content = content;
            state.articles[index].image = image;
        }
    } else {
        // Create new article
        const newArticle = {
            id: state.articles.length > 0 ? Math.max(...state.articles.map(a => a.id)) + 1 : 1,
            title,
            category,
            content,
            author: state.currentUser.name,
            authorId: state.currentUser.id,
            image,
            status: 'pending',
            createdAt: new Date().toISOString().split('T')[0],
            comments: []
        };
        
        state.articles.push(newArticle);
        
        // Add notification for teachers/admins
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: 'Nuevo artículo pendiente',
            content: `"${title}" está esperando revisión`,
            type: 'warning',
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
    }
    
    showPage('articles-page');
    loadArticles();
    updateDashboard();
}

// Load pending articles (for teachers/admins)
function loadPendingArticles() {
    const pendingGrid = document.getElementById('pending-articles-grid');
    let articlesHTML = '';
    
    const pendingArticles = state.articles.filter(a => a.status === 'pending');
    
    pendingArticles.forEach(article => {
        articlesHTML += `
            <div class="article-card">
                <div class="article-image">
                    ${article.image ? `<img src="${article.image}" alt="${article.title}" style="width:100%; height:100%; object-fit:cover;">` : '📄'}
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span>Por: ${article.author}</span>
                        <span>${article.createdAt}</span>
                    </div>
                    <div class="article-excerpt">${article.content.substring(0, 100)}...</div>
                    <div class="article-meta">
                        <span>${getCategoryName(article.category)}</span>
                        <span class="article-status status-pending">Pendiente</span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-success" onclick="approveArticle(${article.id})">Aprobar</button>
                        <button class="btn-danger" onclick="rejectArticle(${article.id})">Rechazar</button>
                        <button onclick="showArticleDetail(${article.id})">Ver Detalle</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    pendingGrid.innerHTML = articlesHTML;
}

// Approve article
function approveArticle(articleId) {
    const index = state.articles.findIndex(a => a.id === articleId);
    if (index !== -1) {
        state.articles[index].status = 'published';
        
        // Add notification for the author
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: 'Artículo aprobado',
            content: `Tu artículo "${state.articles[index].title}" ha sido publicado`,
            type: 'success',
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
        
        loadPendingArticles();
        updateDashboard();
    }
}

// Reject article
function rejectArticle(articleId) {
    const index = state.articles.findIndex(a => a.id === articleId);
    if (index !== -1) {
        state.articles[index].status = 'rejected';
        
        // Add notification for the author
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: 'Artículo rechazado',
            content: `Tu artículo "${state.articles[index].title}" ha sido rechazado`,
            type: 'danger',
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
        
        loadPendingArticles();
        updateDashboard();
    }
}

// Show article detail
function showArticleDetail(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    const articleDetail = document.getElementById('article-detail-content');
    const statusClass = `article-status status-${article.status}`;
    const statusText = article.status === 'published' ? 'Publicado' : 
                        article.status === 'pending' ? 'Pendiente' : 'Rechazado';
    
    let actionsHTML = '';
    if ((state.currentUser.role === 'teacher' || state.currentUser.role === 'admin') && article.status === 'pending') {
        actionsHTML = `
            <div class="action-buttons">
                <button class="btn-success" onclick="approveArticle(${article.id})">Aprobar</button>
                <button class="btn-danger" onclick="rejectArticle(${article.id})">Rechazar</button>
            </div>
        `;
    } else if (state.currentUser.role === 'student' && article.authorId === state.currentUser.id && article.status !== 'published') {
        actionsHTML = `
            <div class="action-buttons">
                <button onclick="editArticle(${article.id})">Editar</button>
            </div>
        `;
    }
    
    articleDetail.innerHTML = `
        <div class="form-container">
            <h2>${article.title}</h2>
            <div class="article-meta">
                <span>Por: ${article.author}</span>
                <span>${article.createdAt}</span>
                <span>${getCategoryName(article.category)}</span>
                <span class="${statusClass}">${statusText}</span>
            </div>
            ${article.image ? `<div style="margin: 1rem 0;"><img src="${article.image}" alt="${article.title}" style="max-width:100%; height:auto;"></div>` : ''}
            <div style="margin: 1rem 0; line-height: 1.8;">${article.content}</div>
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
    document.getElementById('article-content').value = article.content;
    document.getElementById('article-image').value = article.image;
    
    showPage('article-form-page');
}

// Load comments for an article
function loadComments(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    const commentsList = document.getElementById('comments-list');
    let commentsHTML = '';
    
    if (article.comments.length === 0) {
        commentsHTML = '<p>No hay comentarios aún. ¡Sé el primero en comentar!</p>';
    } else {
        article.comments.forEach(comment => {
            commentsHTML += `
                <div class="notification">
                    <h4>${comment.author}</h4>
                    <p>${comment.content}</p>
                    <small>${comment.createdAt}</small>
                </div>
            `;
        });
    }
    
    commentsList.innerHTML = commentsHTML;
}

// Add comment to an article
function addComment(e) {
    e.preventDefault();
    
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
    
    loadComments(articleId);
    updateDashboard();
    
    // Add notification for the article author if it's not the current user
    if (article.authorId !== state.currentUser.id) {
        state.notifications.unshift({
            id: state.notifications.length > 0 ? Math.max(...state.notifications.map(n => n.id)) + 1 : 1,
            title: 'Nuevo comentario',
            content: `Tu artículo "${article.title}" tiene un nuevo comentario`,
            type: 'info',
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        });
    }
}

// Load users (for admins)
function loadUsers() {
    const usersTable = document.getElementById('users-table-body');
    let usersHTML = '';
    
    state.users.forEach(user => {
        usersHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${getRoleName(user.role)}</td>
                <td>${user.active ? 'Activo' : 'Inactivo'}</td>
                <td class="action-buttons">
                    <button class="btn-danger" onclick="toggleUserStatus(${user.id})">${user.active ? 'Desactivar' : 'Activar'}</button>
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
        loadUsers();
    }
}

// Logout
function logout() {
    state.currentUser = null;
    showPage('login-page');
    document.getElementById('login-form').reset();
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', initApp);