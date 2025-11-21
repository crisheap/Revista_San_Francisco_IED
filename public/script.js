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
    if (!title || title.length < 5) {
        alert('❌ El título debe tener al menos 5 caracteres');
        return;
    }
    
    if (!content || content.length < 20) {
        alert('❌ El contenido debe tener al menos 20 caracteres');
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
    }
    
    saveDataToStorage();
    showPage('articles-page');
    loadArticles();
    updateDashboard();
    
    alert('✅ Artículo guardado exitosamente.');
}

// Load pending articles (for teachers/admins)
function loadPendingArticles() {
    const pendingGrid = document.getElementById('pending-articles-grid');
    let articlesHTML = '';
    
    const pendingArticles = state.articles.filter(a => a.status === 'pending');
    
    document.getElementById('total-pending').textContent = pendingArticles.length;
    
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
        saveDataToStorage();
        loadPendingArticles();
        updateDashboard();
        alert('✅ Artículo rechazado.');
    }
}

// Show article detail
function showArticleDetail(articleId) {
    const article = state.articles.find(a => a.id === articleId);
    if (!article) return;
    
    const articleDetail = document.getElementById('article-detail-content');
    const statusClass = `article-status status-${article.status}`;
    const statusText = getStatusText(article.status);
    
    articleDetail.innerHTML = `
        <div class="form-container">
            <h2>${article.title}</h2>
            <div class="article-meta">
                <span>Por: ${article.author}</span>
                <span>${formatDate(article.createdAt)}</span>
                <span>${getCategoryName(article.category)} • ${getChapterName(article.chapter)}</span>
                <span class="${statusClass}">${statusText}</span>
            </div>
            <div style="margin: 1rem 0; line-height: 1.8; white-space: pre-line;">${article.content}</div>
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
    
    if (!content.trim()) {
        alert('El comentario no puede estar vacío.');
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
    
    document.getElementById('comments-count-badge').textContent = `(${article.comments.length})`;
    alert('✅ Comentario publicado exitosamente.');
}

// Show games page
function showGamesPage() {
    showPage('games-page');
    initGamesDashboard();
}

// Initialize games dashboard
function initGamesDashboard() {
    console.log('🎮 Inicializando juegos...');
    // Lógica básica de juegos aquí
}

// Show users page (for admins)
function showUsersPage() {
    showPage('users-page');
    loadUsers();
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
                <td>${getRoleName(user.role)} ${user.talento ? `(${getCategoryName(user.talento)})` : ''}</td>
                <td><span class="article-status ${user.active ? 'status-published' : 'status-rejected'}">${user.active ? 'Activo' : 'Inactivo'}</span></td>
                <td>${formatDate(user.lastLogin)}</td>
                <td class="action-buttons">
                    <button onclick="toggleUserStatus(${user.id})">${user.active ? '🚫 Desactivar' : '✅ Activar'}</button>
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

// Show create user form
function showCreateUserForm() {
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
    
    if (!name || !username || !password || !role) {
        alert('Todos los campos son requeridos.');
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

// Help system
function showHelp(section) {
    alert(`Ayuda para: ${section}\n\nEsta función estará disponible pronto.`);
}

// Export data function (for admins)
function exportData() {
    const exportData = {
        exportedAt: new Date().toISOString(),
        system: 'Revista Digital - Colegio San Francisco IED',
        data: {
            articles: state.articles,
            users: state.users,
            notifications: state.notifications
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
    
    alert('✅ Datos exportados exitosamente.');
}

// =======================
// INICIALIZACIÓN
// =======================

// Make functions globally available
window.showPage = showPage;
window.showPublicMagazine = showPublicMagazine;
window.showGamesPage = showGamesPage;
window.showNewArticleForm = showNewArticleForm;
window.showUsersPage = showUsersPage;
window.showCreateUserForm = showCreateUserForm;
window.showChangePasswordForm = showChangePasswordForm;
window.showHelp = showHelp;
window.logout = logout;
window.exportData = exportData;
window.previewImage = previewImage;
window.removeImage = removeImage;

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', initApp);

/*-------------------------------------------------------------------------------- */
