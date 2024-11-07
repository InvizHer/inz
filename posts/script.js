// Constants
const ARTICLES_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = '';
let articles = [];

// DOM Elements
const articlesGrid = document.querySelector('.articles-grid');
const searchForm = document.querySelector('.search-form');
const categoryButtons = document.querySelectorAll('.category-btn');
const pagination = document.querySelector('.pagination');

// Mock Articles Data (Replace with your actual articles)
const mockArticles = [
  {
    id: 1,
    title: 'How to Started with Web Development',
    description: 'Learn the basics of web dev and with dev with this and hduhd dye degbd yueh dhbdb uyge ug this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['html', 'css', 'javascript'],
    url: 'article-one.html',
    date: '2024-04-15' // Added date field
  },
  {
    id: 2,
    title: 'two Started with Web Development',
    description: 'Learn the basics of web dev with this and hduhd dye degbd yueh dhbdb uyge ug comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['html', 'css', 'javascript'],
    url: 'article-two.html',
    date: '2024-02-20'
  },
  {
    id: 3,
    title: 'three Started with Web Development',
    description: 'Learn the basics of web yeah with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['html', 'css', 'javascript'],
    url: 'article-one.html',
    date: '2024-02-25'
  },
  {
    id: 4,
    title: 'four Started with Web Development',
    description: 'Learn the basics of web jiji with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'project',
    tags: ['html', 'css', 'javascript'],
    url: 'article-one.html',
    date: '2024-03-01'
  },
  {
    id: 5,
    title: 'five Started with Web Development',
    description: 'Learn the basics of web development with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'project',
    tags: ['html'],
    url: 'article-one.html',
    date: '2024-03-05'
  },
  {
    id: 6,
    title: 'six Started with Web Development',
    description: 'Learn the basics of web development with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['webs'],
    url: 'article-one.html',
    date: '2024-03-10'
  },
  {
    id: 7,
    title: 'Getting Started with Web Development',
    description: 'Learn the basics of web development with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['html', 'css', 'javascript'],
    url: 'article-one.html',
    date: '2024-03-15'
  },
  {
    id: 8,
    title: 'Getting Started with Web Development',
    description: 'Learn the basics of web development with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['html', 'css', 'javascript'],
    url: 'article-one.html',
    date: '2024-03-20'
  },
  {
    id: 9,
    title: 'Getting Started with Web Development',
    description: 'Learn the basics of web development with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    category: 'webdev',
    tags: ['html', 'css', 'javascript'],
    url: 'article-one.html',
    date: '2024-03-25'
  }
];


// Initialize the blog
async function initBlog() {
  articles = await fetchArticles();
  
  // Check if we're on the home page
  const isHomePage = document.querySelector('.home');
  if (isHomePage) {
    renderHomePagePosts();
    renderHomePageProjects();
    return; // Exit early if we're on home page
  }

  // Check if we're on the blog/posts page
  const isBlogPage = articlesGrid !== null;
  if (isBlogPage) {
    const urlParams = new URLSearchParams(window.location.search);
    currentPage = parseInt(urlParams.get('page')) || 1;
    currentCategory = urlParams.get('category') || '';
    
    if (currentCategory) {
      categoryButtons.forEach(button => {
        if (button.dataset.category === currentCategory) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
    
    renderArticles();
    updatePagination();
    initializeEventListeners();
  }

  // Check if we're on an article page
  const isArticlePage = document.querySelector('.article');
  if (isArticlePage) {
    initializeArticlePage();
  }
}

// helper function to format the date
function formatDate(dateString) {   
  const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
  };   
  return new Date(dateString).toLocaleDateString('en-US', options); 
}

// Fetch articles (Replace with actual API call)
async function fetchArticles() {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => resolve(mockArticles), 500);
  });
}

// Render articles with loading animation
function renderArticles(filteredArticles = null) {
  if (!articlesGrid) return; // Early return if articlesGrid doesn't exist
  
  const articlesToRender = filteredArticles || filterArticles();
  articlesGrid.style.opacity = '0';
  
  const html = articlesToRender
    .slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE)
    .map(article => `
      <article class="article-card">
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <div class="article-content">
          <h2><a href="${article.url}" class="article-title">${article.title}</a></h2>
          <div class="article-meta">
            <span class="article-date">${formatDate(article.date)}</span>
            <span class="article-category">${article.category}</span>
          </div>
          <p class="article-description">${article.description}</p>
        </div>
      </article>
    `).join('');

  articlesGrid.innerHTML = html;
  
  // Trigger fade in animation
  requestAnimationFrame(() => {
    articlesGrid.style.opacity = '1';
  });
}

// Filter articles based on current category and search query
function filterArticles(searchQuery = '') {
  let filtered = [...articles];
  
  if (currentCategory) {
    filtered = filtered.filter(article => article.category === currentCategory);
  }
  
  if (searchQuery) {
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
}

// Update pagination
function updatePagination() {
  if (!pagination) return; // Early return if pagination doesn't exist
    
  const totalArticles = filterArticles().length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  
  let paginationHtml = '';
  
  // Calculate page range to show
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);
  
  // Always show first page
  if (startPage > 1) {
    paginationHtml += `<button class="pagination-btn" data-page="1">1</button>`;
    if (startPage > 2) {
      paginationHtml += `<span>...</span>`;
    }
  }
  
  // Show current page and surrounding pages
  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `
      <button class="pagination-btn ${i === currentPage ? 'active' : ''}"
              data-page="${i}">
        ${i}
      </button>
    `;
  }
  
  // Always show last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHtml += `<span>...</span>`;
    }
    paginationHtml += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
  }
  
  pagination.innerHTML = paginationHtml;
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger show animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize event listeners
function initializeEventListeners() {
  // Only add event listeners if elements exist
  if (searchForm) {
    // Search form submission
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchQuery = e.target.querySelector('input').value;
      const filteredArticles = filterArticles(searchQuery);
      
      if (filteredArticles.length === 0) {
        showToast('No posts found, Try another search.', 'error');
      } else {
        showToast(`Found ${filteredArticles.length} search reasults..`, 'success');
      }
      
      currentPage = 1;
      renderArticles(filteredArticles);
      updatePagination();
      updateURL();
    });
  }
  
  if (categoryButtons.length > 0) {
    // Category buttons
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentCategory = button.dataset.category;
        currentPage = 1;
        
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        renderArticles();
        updatePagination();
        updateURL();
      });
    });
  }
  
  if (pagination) {
    // Pagination buttons
    pagination.addEventListener('click', (e) => {
      if (e.target.classList.contains('pagination-btn')) {
        currentPage = parseInt(e.target.dataset.page);
        renderArticles();
        updatePagination();
        updateURL();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// Update URL with current page and category
function updateURL() {
  const params = new URLSearchParams();
  
  if (currentPage > 1) {
    params.set('page', currentPage);
  }
  
  if (currentCategory) {
    params.set('category', currentCategory);
  }
  
  const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  history.pushState({}, '', newURL);
}

// Article Page Functions
function initializeArticlePage() {
  initializeShareButtons();
  initializeCopyLink();
  loadRelatedPosts();
}

function initializeShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      const text = encodeURIComponent("Check out this awesome article!");
      
      let shareUrl;
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
          break;
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
          break;
        case 'telegram':
          shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${title}&body=Check%20out%20this%20article:%20${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

function initializeCopyLink() {
  const copyLinkContainer = document.querySelector('.copy-link-container');
  if (!copyLinkContainer) return;

  const urlInput = copyLinkContainer.querySelector('.url-input');
  const copyButton = copyLinkContainer.querySelector('.copy-btn');

  // Set current URL in input
  urlInput.value = window.location.href;

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(urlInput.value);
      copyButton.classList.add('copied');
      copyButton.querySelector('.copy-icon').style.display = 'none';
      copyButton.querySelector('.check-icon').style.display = 'inline-block';
      
      setTimeout(() => {
        copyButton.classList.remove('copied');
        copyButton.querySelector('.copy-icon').style.display = 'inline-block';
        copyButton.querySelector('.check-icon').style.display = 'none';
      }, 2000);
      
      showToast('Link copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy link.', 'error');
    }
  });
}

async function loadRelatedPosts() {
  const relatedPosts = document.querySelector('.related-posts');
  if (!relatedPosts) return;
  
  // Get current article URL and clean it
  const currentPath = window.location.pathname.split('/').pop();
  const allArticles = await fetchArticles();
  
  // Find current article by matching the URL's filename
  const currentArticleIndex = allArticles.findIndex(article => 
      article.url.split('/').pop() === currentPath
  );
  
  if (currentArticleIndex === -1) return;
  
  const currentArticle = allArticles[currentArticleIndex];
  
  // Update post navigation
  const prevPost = currentArticleIndex > 0 ? allArticles[currentArticleIndex - 1] : null;
  const nextPost = currentArticleIndex < allArticles.length - 1 ? allArticles[currentArticleIndex + 1] : null;
  
  // Update previous post navigation
  const prevPostElement = document.querySelector('.prev-post');
  if (prevPostElement) {
      prevPostElement.innerHTML = prevPost 
          ? `
              <span class="nav-label">Previous Post</span>
              <a href="${prevPost.url}" class="nav-title">${prevPost.title}</a>
            `
          : `
              <span class="nav-label">Previous Post</span>
              <span class="nav-title">No previous post</span>
            `;
      prevPostElement.className = `nav-post prev-post${!prevPost ? ' empty' : ''}`;
  }
  
  // Update next post navigation
  const nextPostElement = document.querySelector('.next-post');
  if (nextPostElement) {
      nextPostElement.innerHTML = nextPost
          ? `
              <span class="nav-label">Next Post</span>
              <a href="${nextPost.url}" class="nav-title">${nextPost.title}</a>
            `
          : `
              <span class="nav-label">Next Post</span>
              <span class="nav-title">No next post</span>
            `;
      nextPostElement.className = `nav-post next-post${!nextPost ? ' empty' : ''}`;
  }
  
  // Get current article tags
  const currentTags = currentArticle.tags || [];
  
  // Find related articles based on tags
  const relatedArticles = allArticles
      .filter(article => 
          article.url !== currentArticle.url && // Don't include current article
          article.tags.some(tag => currentTags.includes(tag)) // Must share at least one tag
      )
      .slice(0, 3); // Limit to 3 related articles
  
  // Render related articles
  const relatedArticlesGrid = relatedPosts.querySelector('.articles-grid');
  if (relatedArticlesGrid) {
      const relatedHtml = relatedArticles.map(article => `
          <article class="article-card">
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <div class="article-content">
          <h2><a href="${article.url}" class="article-title">${article.title}</a></h2>
          <div class="article-meta">
            <span class="article-date">${formatDate(article.date)}</span>
          </div>
          <p class="article-description">${article.description}</p>
        </div>
      </article>
      `).join('');
      
      relatedArticlesGrid.innerHTML = relatedHtml || '<p>No related articles found.</p>';
  }
}

// ================================ FUNCTIONS FOR HOME PAGE ===============================================//

// Function to sort articles by date
function sortArticlesByDate(articles) {
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to get latest posts
function getLatestPosts(count = 3) {
  const sortedArticles = sortArticlesByDate([...mockArticles]);
  return sortedArticles.slice(0, count);
}

// Function to get project posts
function getProjectPosts(count = 3) {
  return mockArticles
    .filter(article => article.category === 'project')
    .slice(0, count);
}

// Function to render posts for home page
function renderHomePagePosts() {
  const postsContainer = document.querySelector('.posts-container');
  if (!postsContainer) return;

  const latestPosts = getLatestPosts();
  const postsHTML = latestPosts
    .map(post => `
      <article class="home-post-card">
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">
          <h2><a href="posts/${post.url}" class="post-title">${post.title}</a></h2>
          <div class="post-meta">
            <span class="post-date">${formatDate(post.date)}</span>
          </div>
          <p class="post-description">${post.description}</p>
        </div>
      </article>
    `)
    .join('');
    postsContainer.innerHTML = postsHTML;
}

// Function to render projects for home page
function renderHomePageProjects() {
  const projectsContainer = document.querySelector('.projects-container');
  if (!projectsContainer) return;

  const projectPosts = getProjectPosts();
  const projectsHTML = projectPosts
    .map(project => `
      <article class="home-post-card">
        <img src="${project.image}" alt="${project.title}" class="post-image">
        <div class="post-content">
          <h2><a href="posts/${project.url}" class="post-title">${project.title}</a></h2>
          <div class="post-meta">
            <span class="post-date">${formatDate(project.date)}</span>
            <!-- <span class="post-category">${project.category}</span> -->
          </div>
          <p class="post-description">${project.description}</p>
        </div>
      </article>
    `)
    .join('');

  projectsContainer.innerHTML = projectsHTML;
}

// Initialize blog on load
document.addEventListener('DOMContentLoaded', initBlog);
