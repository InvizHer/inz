async function fetchGitHubContent(path) {
    const response = await fetch(`${CONFIG.GITHUB_API_BASE}/${CONFIG.GITHUB_USERNAME}/${CONFIG.GITHUB_REPO}/contents/${path}`);
    return await response.json();
}

async function fetchRawContent(path) {
    const response = await fetch(`${CONFIG.RAW_CONTENT_BASE}/${CONFIG.GITHUB_USERNAME}/${CONFIG.GITHUB_REPO}/main/${path}`);
    return await response.text();
}

function extractMetadata(markdown) {
    const metadataRegex = /---\n([\s\S]*?)\n---/;
    const match = markdown.match(metadataRegex);
    if (!match) return {};

    const metadata = {};
    const lines = match[1].split('\n');
    lines.forEach(line => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            metadata[key.trim()] = values.join(':').trim();
        }
    });

    return metadata;
}

function sanitizeSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
