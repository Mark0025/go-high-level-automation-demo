const fs = require('fs');
const parse = require('csv-parse').parse;

const cutoffDate = new Date('2024-01-01');
const archived = [];

fs.createReadStream('data/sample_contacts.csv')
  .pipe(parse({ columns: true, trim: true }))
  .on('data', (row) => {
    const lastActivity = new Date(row['Last Activity']);
    if (lastActivity < cutoffDate) {
      archived.push({
        name: `${row['First Name']} ${row['Last Name']}`,
        email: row['Email'],
        lastActivity: row['Last Activity']
      });
    }
  })
  .on('end', () => {
    console.log(`Archived ${archived.length} contacts (Last Activity before 2024-01-01):`);
    archived.forEach(c => console.log(c));
  }); 