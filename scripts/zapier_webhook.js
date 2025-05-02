// Simulate a contact reaching the 'Offer Sent' pipeline stage
const contact = {
  firstName: 'John',
  lastName: 'Doe',
  parcelId: 'P12345',
  acreage: 2.5,
  email: 'john.doe@example.com'
};

const webhookPayload = {
  event: 'Offer Sent',
  name: `${contact.firstName} ${contact.lastName}`,
  parcelId: contact.parcelId,
  acreage: contact.acreage,
  email: contact.email
};

console.log('Simulating Zapier webhook to direct-mail platform...');
console.log('Payload:', JSON.stringify(webhookPayload, null, 2));
// Here you would use fetch/axios to POST to a webhook URL in a real integration 