// admin-script.js

let contentBlocks = [];
let relatedNews = [];

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    setCurrentDate();
});

// Establecer fecha actual
function setCurrentDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('articleDate').value = today;
}

// Generar slug automáticamente desde el título
document.getElementById('articleTitle').addEventListener('input', function() {
    const title = this.value;
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    document.getElementById('articleSlug').value = slug;
});

// Agregar bloques de contenido
function addParagraph() {
    const id = 'block_' + Date.now();
    contentBlocks.push({
        id: id,
        type: 'paragraph',
        content: ''
    });
    renderContentBlocks();
}

function addSubtitle() {
    const id = 'block_' + Date.now();
    contentBlocks.push({
        id: id,
        type: 'subtitle',
        content: ''
    });
    renderContentBlocks();
}

function addQuote() {
    const id = 'block_' + Date.now();
    contentBlocks.push({
        id: id,
        type: 'quote',
        content: '',
        author: ''
    });
    renderContentBlocks();
}

function addYoutube() {
    const id = 'block_' + Date.now();
    contentBlocks.push({
        id: id,
        type: 'youtube',
        videoId: '',
        title: ''
    });
    renderContentBlocks();
}

// Renderizar bloques de contenido
function renderContentBlocks() {
    const container = document.getElementById('contentBlocks');
    container.innerHTML = '';
    
    contentBlocks.forEach((block, index) => {
        const blockElement = document.createElement('div');
        blockElement.className = 'content-block';
        
        let contentHTML = '';
        
        switch(block.type) {
            case 'paragraph':
                contentHTML = `
                    <div class="block-header">
                        <strong>Párrafo</strong>
                        <div class="block-actions">
                            <button type="button" class="btn-small" onclick="moveBlockUp(${index})">↑</button>
                            <button type="button" class="btn-small" onclick="moveBlockDown(${index})">↓</button>
                            <button type="button" class="btn-small btn-remove" onclick="removeBlock(${index})">×</button>
                        </div>
                    </div>
                    <textarea oninput="updateBlockContent(${index}, this.value)" 
                              placeholder="Escribe el contenido del párrafo...">${block.content}</textarea>
                `;
                break;
                
            case 'subtitle':
                contentHTML = `
                    <div class="block-header">
                        <strong>Subtítulo H2</strong>
                        <div class="block-actions">
                            <button type="button" class="btn-small" onclick="moveBlockUp(${index})">↑</button>
                            <button type="button" class="btn-small" onclick="moveBlockDown(${index})">↓</button>
                            <button type="button" class="btn-small btn-remove" onclick="removeBlock(${index})">×</button>
                        </div>
                    </div>
                    <input type="text" oninput="updateBlockContent(${index}, this.value)" 
                           value="${block.content}" placeholder="Título del subtítulo...">
                `;
                break;
                
            case 'quote':
                contentHTML = `
                    <div class="block-header">
                        <strong>Cita Destacada</strong>
                        <div class="block-actions">
                            <button type="button" class="btn-small" onclick="moveBlockUp(${index})">↑</button>
                            <button type="button" class="btn-small" onclick="moveBlockDown(${index})">↓</button>
                            <button type="button" class="btn-small btn-remove" onclick="removeBlock(${index})">×</button>
                        </div>
                    </div>
                    <textarea oninput="updateBlockContent(${index}, this.value)" 
                              placeholder="Texto de la cita...">${block.content}</textarea>
                    <input type="text" oninput="updateBlockAuthor(${index}, this.value)" 
                           value="${block.author}" placeholder="Autor de la cita..." style="margin-top: 10px;">
                `;
                break;
                
            case 'youtube':
                contentHTML = `
                    <div class="block-header">
                        <strong>Video de YouTube</strong>
                        <div class="block-actions">
                            <button type="button" class="btn-small" onclick="moveBlockUp(${index})">↑</button>
                            <button type="button" class="btn-small" onclick="moveBlockDown(${index})">↓</button>
                            <button type="button" class="btn-small btn-remove" onclick="removeBlock(${index})">×</button>
                        </div>
                    </div>
                    <input type="text" oninput="updateYoutubeId(${index}, this.value)" 
                           value="${block.videoId}" placeholder="ID del video de YouTube...">
                    <input type="text" oninput="updateYoutubeTitle(${index}, this.value)" 
                           value="${block.title}" placeholder="Título del video..." style="margin-top: 10px;">
                `;
                break;
        }
        
        blockElement.innerHTML = contentHTML;
        container.appendChild(blockElement);
    });
}

// Funciones para manipular bloques
function updateBlockContent(index, content) {
    contentBlocks[index].content = content;
}

function updateBlockAuthor(index, author) {
    contentBlocks[index].author = author;
}

function updateYoutubeId(index, videoId) {
    contentBlocks[index].videoId = videoId;
}

function updateYoutubeTitle(index, title) {
    contentBlocks[index].title = title;
}

function removeBlock(index) {
    contentBlocks.splice(index, 1);
    renderContentBlocks();
}

function moveBlockUp(index) {
    if (index > 0) {
        const temp = contentBlocks[index];
        contentBlocks[index] = contentBlocks[index - 1];
        contentBlocks[index - 1] = temp;
        renderContentBlocks();
    }
}

function moveBlockDown(index) {
    if (index < contentBlocks.length - 1) {
        const temp = contentBlocks[index];
        contentBlocks[index] = contentBlocks[index + 1];
        contentBlocks[index + 1] = temp;
        renderContentBlocks();
    }
}

// Noticias relacionadas
function addRelatedNews() {
    const id = 'related_' + Date.now();
    relatedNews.push({
        id: id,
        title: '',
        image: '',
        link: '',
        date: ''
    });
    renderRelatedNews();
}

function renderRelatedNews() {
    const container = document.getElementById('relatedNews');
    container.innerHTML = '<h4>Noticias Relacionadas</h4>';
    
    relatedNews.forEach((news, index) => {
        const newsElement = document.createElement('div');
        newsElement.className = 'content-block';
        newsElement.innerHTML = `
            <div class="block-header">
                <strong>Noticia Relacionada</strong>
                <div class="block-actions">
                    <button type="button" class="btn-small btn-remove" onclick="removeRelatedNews(${index})">×</button>
                </div>
            </div>
            <input type="text" value="${news.title}" oninput="updateRelatedTitle(${index}, this.value)" 
                   placeholder="Título de la noticia..." style="margin-bottom: 10px;">
            <input type="url" value="${news.image}" oninput="updateRelatedImage(${index}, this.value)" 
                   placeholder="URL de la imagen..." style="margin-bottom: 10px;">
            <input type="text" value="${news.link}" oninput="updateRelatedLink(${index}, this.value)" 
                   placeholder="Enlace (ej: noticia1.html)" style="margin-bottom: 10px;">
            <input type="text" value="${news.date}" oninput="updateRelatedDate(${index}, this.value)" 
                   placeholder="Fecha (ej: 15 Nov 2023)">
        `;
        container.appendChild(newsElement);
    });
}

function updateRelatedTitle(index, title) {
    relatedNews[index].title = title;
}

function updateRelatedImage(index, image) {
    relatedNews[index].image = image;
}

function updateRelatedLink(index, link) {
    relatedNews[index].link = link;
}

function updateRelatedDate(index, date) {
    relatedNews[index].date = date;
}

function removeRelatedNews(index) {
    relatedNews.splice(index, 1);
    renderRelatedNews();
}

// Guardar artículo
document.getElementById('articleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const article = {
        id: 'article_' + Date.now(),
        title: document.getElementById('articleTitle').value,
        date: document.getElementById('articleDate').value,
        author: document.getElementById('articleAuthor').value,
        category: document.getElementById('articleCategory').value,
        image: document.getElementById('articleImage').value,
        description: document.getElementById('articleDescription').value,
        intro: document.getElementById('articleIntro').value,
        content: contentBlocks,
        related: relatedNews,
        slug: document.getElementById('articleSlug').value,
        status: document.getElementById('articleStatus').value,
        createdAt: new Date().toISOString()
    };
    
    saveArticle(article);
    generateHTML(article);
    
    alert('Noticia guardada correctamente!');
    resetForm();
    loadArticles();
});

function saveArticle(article) {
    let articles = JSON.parse(localStorage.getItem('ml_articles') || '[]');
    articles.push(article);
    localStorage.setItem('ml_articles', JSON.stringify(articles));
}

function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('ml_articles') || '[]');
    const container = document.getElementById('articlesList');
    
    container.innerHTML = '';
    
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-item';
        articleElement.innerHTML = `
            <div class="article-info">
                <h4>${article.title}</h4>
                <div class="article-meta">
                    ${article.date} | ${article.author} | ${article.category}
                </div>
            </div>
            <div class="article-actions">
                <a href="${article.slug}.html" target="_blank" class="admin-btn secondary">
                    <i class="fas fa-eye"></i> Ver
                </a>
                <button class="admin-btn" onclick="editArticle('${article.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="admin-btn secondary" onclick="deleteArticle('${article.id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        container.appendChild(articleElement);
    });
}

function resetForm() {
    document.getElementById('articleForm').reset();
    contentBlocks = [];
    relatedNews = [];
    renderContentBlocks();
    renderRelatedNews();
    setCurrentDate();
}

// Vista previa
function previewArticle() {
    const article = {
        title: document.getElementById('articleTitle').value || 'Título de ejemplo',
        intro: document.getElementById('articleIntro').value || 'Introducción de ejemplo...',
        content: contentBlocks
    };
    
    alert('Vista previa generada en la consola (F12)');
    console.log('Vista Previa del Artículo:', article);
}

// Generar HTML final
function generateHTML(article) {
    let htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - MASTER LEAGUES</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="noticia-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo-container">
                    <a href="index.html" class="logo-link">
                        <img src="logo.png" alt="MASTER LEAGUES" class="logo-imagen">
                        <div class="logo-text">MASTER LEAGUES</div>
                    </a>
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">INICIO</a></li>
                    <li><a href="#">CAMPEONES</a></li>
                    <li>
                        <a href="#">LIGAS <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">STREET</a></li>
                            <li><a href="#">SPARTAN</a></li>
                            <li><a href="#">PERSIAN</a></li>
                            <li><a href="#">GANGS</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">COPAS <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Pharaoh's</a></li>
                            <li><a href="#">EMPEROR</a></li>
                            <li><a href="#">LATAM</a></li>
                            <li><a href="#">CHAMPIONS LEAGUE</a></li>
                            <li><a href="#">Internazional</a></li>
                        </ul>
                    </li>
                    <li><a href="#">BIOGRAFIAS</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Contenido de la Noticia -->
    <section class="noticia-hero">
        <div class="container">
            <div class="breadcrumb">
                <a href="index.html">Inicio</a> / <span>${article.category}</span>
            </div>
            
            <article class="articulo-completo">
                <div class="articulo-cabecera">
                    <h1>${article.title}</h1>
                    <div class="articulo-meta">
                        <span class="fecha"><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
                        <span class="autor"><i class="far fa-user"></i> Por ${article.author}</span>
                        <span class="categoria"><i class="far fa-folder"></i> ${article.category}</span>
                    </div>
                </div>

                <div class="articulo-imagen-principal">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="imagen-leyenda">${article.description}</div>
                </div>

                <div class="articulo-contenido">
                    <div class="contenido-principal">
                        <p class="intro">${article.intro}</p>
                        ${generateContentHTML(article.content)}
                        <div class="articulo-acciones">
                            <div class="compartir">
                                <span>Compartir:</span>
                                <a href="#" class="social-share facebook"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="social-share twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-share whatsapp"><i class="fab fa-whatsapp"></i></a>
                            </div>
                        </div>
                    </div>

                    <aside class="sidebar">
                        <div class="widget">
                            <h3>Noticias Relacionadas</h3>
                            ${generateRelatedHTML(article.related)}
                        </div>

                        <div class="widget">
                            <h3>Categorías</h3>
                            <ul class="categorias">
                                <li><a href="#">Competencias <span>12</span></a></li>
                                <li><a href="#">Entrevistas <span>8</span></a></li>
                                <li><a href="#">Tutoriales <span>15</span></a></li>
                                <li><a href="#">Comunidad <span>6</span></a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </article>
        </div>
    </section>

    <!-- Iconos flotantes y Footer -->
    <div class="social-floating">
        <div class="social-main">
            <i class="fab fa-youtube"></i>
        </div>
        <div class="social-icons">
            <a href="#" class="social-icon instagram">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-icon tiktok">
                <i class="fab fa-tiktok"></i>
            </a>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="logo.png" alt="MASTER LEAGUES" class="logo-imagen">
                    <div class="logo-text">MASTER LEAGUES</div>
                </div>
                <div class="footer-links">
                    <a href="index.html">INICIO</a>
                    <a href="#">CAMPEONES</a>
                    <a href="#">LIGAS</a>
                    <a href="#">COPAS</a>
                    <a href="#">BIOGRAFIAS</a>
                </div>
                <p class="copyright">&copy; 2023 MASTER LEAGUES. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

    // Crear archivo descargable
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.slug}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

function generateContentHTML(content) {
    let html = '';
    content.forEach(block => {
        switch(block.type) {
            case 'paragraph':
                html += `<p>${block.content}</p>`;
                break;
            case 'subtitle':
                html += `<h2>${block.content}</h2>`;
                break;
            case 'quote':
                html += `
                    <div class="destacado">
                        <blockquote>${block.content}</blockquote>
                        <cite>- ${block.author}</cite>
                    </div>
                `;
                break;
            case 'youtube':
                html += `
                    <div class="red-social-embed">
                        <iframe width="100%" height="400" 
                                src="https://www.youtube.com/embed/${block.videoId}" 
                                title="${block.title}"
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                    </div>
                `;
                break;
        }
    });
    return html;
}

function generateRelatedHTML(related) {
    if (!related.length) return '<p>No hay noticias relacionadas</p>';
    
    let html = '';
    related.forEach(news => {
        html += `
            <div class="noticia-relacionada">
                <img src="${news.image}" alt="${news.title}">
                <div class="info">
                    <h4><a href="${news.link}">${news.title}</a></h4>
                    <span class="fecha">${news.date}</span>
                </div>
            </div>
        `;
    });
    return html;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}