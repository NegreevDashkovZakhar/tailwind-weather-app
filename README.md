# Weather forecast app
This is a weather forecast app built as a pet project.

## Technologies
Used technologies are
1. HTML, CSS, Javascript
2. Tailwindcss
3. Gulp

## How to run
In order to run project you need to save to your machine and from project root folder run commands `npm install` and `gulp`
This will load needed dependencies and start a default gulp build

## Possible issues
`gulp deploy` command might be not working due to error in gulp-gh-pages package script.
Solution: change 102 line in node_modules/gift/commit.js to `if (!/[a-f0-9]{40}$/.test(id)) {`
