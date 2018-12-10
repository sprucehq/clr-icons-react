/*eslint-env node, es6*/
const {AllShapes} = require('@clr/icons/shapes/all-shapes');
const cheerio = require('cheerio');
const fs = require('fs');
const camelCase = require('camelcase');

let master = [];
Object.keys(AllShapes).map((shapeName) => {
  let $ = cheerio.load(AllShapes[shapeName], {xmlMode: true});
  let out = cheerio.load(AllShapes[shapeName], {xmlMode: true});
  let svg = out('svg');
  delete svg[0].attribs.class;
  svg[0].attribs['xmlnsXlink'] = svg[0].attribs['xmlns:xlink'];
  delete svg[0].attribs['xmlns:xlink'];
  ['outline', 'solid'].forEach((start) => {
    ['', '--badged', '--alerted'].forEach((end) => {
      svg.empty();
      let klass = `.clr-i-${start}${end}`;
      let $$ = $(klass);
      if ($$.length > 0) {
        $$.each((_, el) => {
          let element = cheerio.load(el);
          element('*').each((_, x) => {
            // x.attribs.className = x.attribs.class;
            delete x.attribs.class;
          });
          svg.append(element.html().replace());
        });
        let jsxName = camelCase(`clr-${shapeName}-${start == 'outline' ? '' : start}${end}`, {
          pascalCase: true,
        });
        let text = `import * as React from 'react'\n\n`;
        text += `const ${jsxName}: React.SFC = () => ${out.html()}\n`;
        text += `export default ${jsxName}\n`;
        fs.writeFileSync(`src/${jsxName}.tsx`, text);
        master.push(`export { default as ${jsxName} } from './${jsxName}.tsx';`);
      }
    });
  });
});

fs.writeFileSync(`src/AllIcons.js`, master.join('\n'));
