const fs = require('fs');
const parse = require('csv-parse').parse;

const canonicalHeader = [
  'First Name', 'Last Name', 'Email', 'Phone 1', 'Phone 2', 'Phone 3',
  'Custom Field 1', 'Custom Field 2', 'Last Activity'
];

fs.createReadStream('data/sample_contacts.csv')
  .pipe(parse({ to_line: 1 }))
  .on('data', (header) => {
    const mismatches = header.filter((h, i) => h !== canonicalHeader[i]);
    if (mismatches.length === 0) {
      console.log('Header matches canonical header.');
    } else {
      console.log('Header mismatches found:');
      header.forEach((h, i) => {
        if (h !== canonicalHeader[i]) {
          console.log(`Column ${i + 1}: Found '${h}', expected '${canonicalHeader[i]}'`);
        }
      });
    }
  }); 