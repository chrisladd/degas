
const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs');

let s = `![Degas](https://s3.amazonaws.com/cgldemo/degas/degas-logo.jpg)

# Degas

Degas is an SVG drawing library.

## Installation

\`npm i @cgl2/degas --save\`


## Usage
`

let docs = jsdoc2md.renderSync({ files: 'index.js' })

s += docs;

docs = jsdoc2md.renderSync({ files: 'lib/svg_ref/index.js' })
s += docs;

fs.writeFileSync('README.md', s);


