import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const md = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true
});

export function renderSafeMarkdown(markdown: string): string {
    const html = md.render(markdown);

    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'ul', 'ol', 'li',
            'pre', 'code', 'strong', 'em',
            'blockquote', 'hr',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'a'
        ],
        ALLOWED_ATTR: ['href', 'title']
    });
}
