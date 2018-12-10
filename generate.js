/*eslint-env node, es6*/
const {AllShapes} = require('@clr/icons/shapes/all-shapes');
const cheerio = require('cheerio');
const fs = require('fs');
const camelCase = require('camelcase');

const prefixes = ['outline', 'solid'];
const suffixes = ['', '--badged', '--alerted'];

let master = [];
Object.keys(AllShapes).map((shapeName) => {
  let $ = cheerio.load(AllShapes[shapeName], {xmlMode: true});
  let out = cheerio.load(AllShapes[shapeName], {xmlMode: true});
  let svg = out('svg'); // output svg

  // clean up output svg attribute and make tsx friendly
  delete svg[0].attribs.class;
  svg[0].attribs['xmlnsXlink'] = svg[0].attribs['xmlns:xlink'];
  delete svg[0].attribs['xmlns:xlink'];

  prefixes.forEach((start) => {
    suffixes.forEach((end) => {
      // reset the output svg
      svg.empty();

      // see if there are matching paths
      let $$ = $(`.clr-i-${start}${end}`);
      if ($$.length > 0) {
        // copy matching paths into output svg.
        $$.each((_, el) => {
          let element = cheerio.load(el);
          element('*').each((_, x) => {
            delete x.attribs.class;
          });
          svg.append(element.html().replace());
        });
        let jsxNameRaw = `clr-${shapeName}-${start == 'outline' ? '' : start}${end}`;
        let jsxName = camelCase(jsxNameRaw, {pascalCase: true});

        // generate output and create file
        let text = `import * as React from 'react'\n\n`;
        text += `const ${jsxName}: React.SFC = () => ${out.html()}\n`;
        text += `export default ${jsxName}\n`;
        fs.writeFileSync(`src/${jsxName}.tsx`, text);
        master.push(`export { default as ${jsxName} } from './${jsxName}';`);
      }
    });
  });
});

fs.writeFileSync(`src/AllIcons.tsx`, master.join('\n'));
