const fs = require('fs');
const parse = require('csv-parse').parse;

fs.createReadStream('data/sample_contacts.csv')
  .pipe(parse({ columns: true, trim: true }))
  .on('data', (row) => {
    // Normalize data
    row['Email'] = row['Email'].trim().toLowerCase();
    row['First Name'] = row['First Name'].trim();
    row['Last Name'] = row['Last Name'].trim();
    // Simulate mapping to custom fields and tags
    const contact = {
      firstName: row['First Name'],
      lastName: row['Last Name'],
      email: row['Email'],
      phones: [row['Phone 1'], row['Phone 2'], row['Phone 3']].filter(Boolean),
      customFields: {
        field1: row['Custom Field 1'],
        field2: row['Custom Field 2']
      },
      lastActivity: row['Last Activity']
    };
    console.log('Imported contact:', contact);
  })
  .on('end', () => {
    console.log('All contacts imported and normalized.');
  }); 