class PostsManager {
    constructor() {
        this.posts = [];
        this.currentPage = 1;
        this.searchTerm = '';
        this.selectedTags = new Set();
    }

    async initialize() {
        try {
            const files = await fetchGitHubContent('articles');
            const markdownFiles = files.filter(file => file.name.endsWith('.md'));
            
            this.posts = await Promise.all(
                markdownFiles.map(async file => {
                    const content = await fetchRawContent(`articles/${file.name}`);
                    const metadata = extractMetadata(content);
                    return {
                        ...metadata,
                        content,
                        slug: sanitizeSlug(metadata.title || file.name),
                        path: file.path
                    };
                })
            );

            this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    setupEventListeners() {
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.render();
        });
    }

    getFilteredPosts() {
        return this.posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(this.searchTerm) ||
                                post.description.toLowerCase().includes(this.searchTerm);
            
            const matchesTags = this.selectedTags.size === 0 ||
                              post.tags.split(',').some(tag => this.selectedTags.has(tag.trim()));
            
            return matchesSearch && matchesTags;
        });
    }

    renderPosts() {
        const filteredPosts = this.getFilteredPosts();
        const start = (this.currentPage - 1) * CONFIG.POSTS_PER_PAGE;
        const paginatedPosts = filteredPosts.slice(start, start + CONFIG.POSTS_PER_PAGE);

        const postsHTML = paginatedPosts.map(post => `
            <article class="post-card">
                <img src="${post.thumbnail}" alt="${post.title}">
                <div class="post-card-content">
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                    <div class="post-meta">
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div class="tags">
                        ${post.tags.split(',').map(tag => `
                            <span class="tag">${tag.trim()}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `).join('');

        return `
            <div class="search-container">
                <input type="search" 
                       class="search-input" 
                       placeholder="Search articles..."
                       value="${this.searchTerm}">
            </div>
            <div class="posts-container">
                ${postsHTML}
            </div>
            ${this.renderPagination(filteredPosts.length)}
        `;
    }

    renderPagination(totalPosts) {
        const totalPages = Math.ceil(totalPosts / CONFIG.POSTS_PER_PAGE);
        if (totalPages <= 1) return '';

        let buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(`
                <button 
                    ${i === this.currentPage ? 'class="active"' : ''}
                    onclick="postsManager.setPage(${i})"
                >
                    ${i}
                </button>
            `);
        }

        return `
            <div class="pagination">
                ${buttons.join('')}
            </div>
        `;
    }

    setPage(page) {
        this.currentPage = page;
        this.render();
    }

    render() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = this.renderPosts();
    }
}

// Initialize posts manager when the page loads
const postsManager = new PostsManager();
document.addEventListener('DOMContentLoaded', () => {
    postsManager.initialize();
});
