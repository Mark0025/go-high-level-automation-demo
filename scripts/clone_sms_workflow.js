const fs = require('fs');

const workflowA = JSON.parse(fs.readFileSync('workflows/sms_sequence.json', 'utf8'));

// Clone and adapt for Campaign B
const workflowB = JSON.parse(JSON.stringify(workflowA));
workflowB.campaign = 'B';
workflowB.steps = workflowB.steps.map(step => ({
  ...step,
  message: step.message.replace('offer', 'promotion').replace('deal', 'opportunity')
}));

console.log('Original Campaign A Workflow:');
console.log(JSON.stringify(workflowA, null, 2));
console.log('\nCloned & Adapted Campaign B Workflow:');
console.log(JSON.stringify(workflowB, null, 2)); 