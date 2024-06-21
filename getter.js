export default class Getter {
    SELECTORS = [
        'h1.entry-title',
        '.et_pb_title_meta_container .published',
        '.et_pb_title_meta_container .author a',
        '.et_pb_title_meta_container a[rel="category tag"]',
    ];

    POST_CONTENT_SELECTOR = '.et_pb_post_content';

    WPM = 225; //words per minute

    html = '';
    row = [];
    origin = '';

    constructor(html, url) {
        this.html = html;

        const slug = this.parseUrl(url);

        this.SELECTORS.forEach((selector) => {
            this.row.push(this.html.querySelector(selector).textContent);
        });

        const contentData = this.getContent();
        this.row = [ ...this.row, ...contentData ];

        this.row.push(slug);
    }

    getRow() {
        return this.row;
    }

    /**
     * Retrieves the content from the HTML element specified by the `POST_CONTENT_SELECTOR` property,
     * modifies the links within the content to remove the `origin` URL, and calculates the content text,
     * an excerpt, the number of words, and the estimated reading time (in minutes) based on the WPM (words per minute) property.
     *
     * @return {Object} An object containing the modified content as HTML, the excerpt, and the estimated reading time.
     */

    getContent() {
        const content = this.html.querySelector(this.POST_CONTENT_SELECTOR);
        content.querySelectorAll('a')?.forEach((link) => {
            link.href = link.href.replace(this.origin, '');
        });

        const contentText = content.textContent;
        const exerpt = contentText.slice(0, contentText.indexOf('.') + 1);
        const words = content.textContent.split(' ').length;
        const minutes = Math.ceil(words / this.WPM);

        return [
            content.innerHTML,
            exerpt,
            minutes,
        ];
    }

    /**
     * Parses the provided URL to extract and return the second-to-last segment of the path.
     *
     * @param {string} url - The URL to be parsed.
     * @return {string} The second-to-last segment of the URL path.
     */

    parseUrl(url) {
        const urlObj = new URL(url);
        this.origin = urlObj.origin;

        return urlObj.pathname.split('/').at(-2);
    }
}