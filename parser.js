import { createWriteStream } from 'fs';
import jsdom from "jsdom";
import { stringify } from "csv-stringify";

export default class Parser {
    PATH = './data.csv';

    /**
     * Fetches the HTML content of a given URL asynchronously.
     *
     * @param {string} [url] - The URL to fetch the HTML content from. If not provided, the value of process.env.INITIAL_PAGE will be used.
     * @return {Promise<Document>} A Promise that resolves to the parsed HTML document.
     */
    async fetchURL(url) {
        const resp = await fetch(url || process.env.INITIAL_PAGE);
        const html = await resp.text();

        const dom = new jsdom.JSDOM(html);
        return dom.window.document;
    }

    /**
     * Writes the given rows of data to a file or a specified path.
     *
     * @param {Array} rows - The rows of data to be written.
     * @param {Array} columns - The columns of the data.
     * @param {string} path - The path to the file. If not provided, the default path is used.
     */
    writeData(rows, columns, path) {
        const writableStream = createWriteStream(path || this.PATH);

        const stringifier = stringify({ header: true, columns: columns });
        rows.forEach((row) => {
            stringifier.write(row);
        });
        stringifier.pipe(writableStream);
    }
}


