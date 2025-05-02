const fs = require('fs');
const parse = require('csv-parse').parse;
const { parsePhoneNumberFromString } = require('libphonenumber-js');

fs.createReadStream('data/sample_contacts.csv')
  .pipe(parse({ columns: true, trim: true }))
  .on('data', (row) => {
    const results = [];
    for (let i = 1; i <= 3; i++) {
      const phone = row[`Phone ${i}`];
      if (phone) {
        const phoneNumber = parsePhoneNumberFromString(phone, 'US');
        if (phoneNumber && phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE') {
          results.push(`Phone ${i}: Mobile Valid`);
        } else if (phoneNumber && phoneNumber.isValid()) {
          results.push(`Phone ${i}: Valid but not mobile`);
        } else {
          results.push(`Phone ${i}: Invalid`);
        }
      }
    }
    console.log(`${row['First Name']} ${row['Last Name']}:`, results.length ? results.join(', ') : 'No phones');
  }); 