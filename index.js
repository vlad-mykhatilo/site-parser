import Parser from './parser.js';
import Getter from './getter.js';

const COLUMNS = [
    'title',
    'date',
    'author',
    'categories',
    'content',
    'excerpt',
    'minutes',
    'slug',
];

//selector for each post item on archive page
const POST_SELECTOR = 'article.et_pb_post .entry-title a'; 
//selector for next page
const NEXT_PAGE = '.pagination .alignleft a';
const rows = [];
const parser = new Parser();

/**
 * Parses a blog page and extracts data from each post. If there are more pages, it recursively calls itself.
 *
 * @param {string} url - The URL of the blog page to parse. If not provided, the value of process.env.INITIAL_PAGE will be used.
 */
async function parseBlogPage(url = '') {
    //just show proccess
    console.log('blog page', url || process.env.INITIAL_PAGE);

    const html = await parser.fetchURL(url);

    const posts = html.querySelectorAll(POST_SELECTOR);

    await Promise.all([...posts].map(async(post) => {
        const url = post.href;
        const html = await parser.fetchURL(url);
        const getter = new Getter(html, url);
        rows.push(getter.getRow());

        return post;
    }));

    const nextPage = html.querySelector(NEXT_PAGE);

    if (nextPage) {
        const url = nextPage.href;
        return parseBlogPage(url);
    } else {
        parser.writeData(rows, COLUMNS);
    }
}

parseBlogPage();