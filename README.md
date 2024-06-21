# Site Parser

This parser can help you retrieve data from your client's old website.
It generates a CSV file, that you can use with any plugins for import into Wordpress.

## index.js

1. In COLUMNS you have to set up a list of headings for columns in CSV file.
2. POST_SELECTOR - set the selector for `<a>` of single post on archive page. The parser can get a URL to single page of post and fetch data from.
3. NEXT_PAGE - set the selector for next page link. The parser can go to next page recursively.
4. You can set the initial page diretly to `parsePage()` at the end of file or as .env variable.

## getter.js

1. SELECTORS - you can set here a list of selectors of elements, from which we only need their textual content.
2. POST_CONTENT_SELECTOR - here should be a selector for wrapper of general post content. It is used in `getContent()` to get HTML of general content. In my case I also needed the exerpt and minutes ( reading time ). But you can edit this method for your case, what you need get else form general content.
3. WPM - is used to calculate the reading time.

## parser.js
You don't have to do anything here. Everything should work fine. But if you need to customize a little bit, you can do that.

## how to run
First you need to install all modules

```sh
npm install
```

To start parsing you need to run command in terminal 

```sh
node index.js
```

If you want to use your .env variables
```sh
node --env-file=.env index.js
```

It should start parsing and show progress in terminal. After finish you will see the result in `data.csv` file.