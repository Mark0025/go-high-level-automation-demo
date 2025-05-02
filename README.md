# Go High Level Automation Demo (Node.js)

This project demonstrates core skills for the Go High Level Automation & CRM Specialist role. It simulates data import, validation, workflow automation, and integration tasks using Node.js scripts and sample data.

## Features
- **CSV Header Validation & Normalization**
- **Bulk Contact Import & Data Hygiene**
- **Phone Validation Workflow**
- **AI-SMS Workflow Cloning & Adaptation**
- **Zapier Webhook Simulation**
- **Quarterly Data Purge**

## Project Structure
```
Go-High-Level-Automation/
  data/
    sample_contacts.csv
  scripts/
    validate_csv.js
    import_contacts.js
    phone_validation.js
    clone_sms_workflow.js
    zapier_webhook.js
    data_purge.js
  workflows/
    sms_sequence.json
  README.md
  package.json
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run scripts using npm or node, e.g.:
   ```bash
   node scripts/validate_csv.js
   node scripts/import_contacts.js
   node scripts/phone_validation.js
   node scripts/clone_sms_workflow.js
   node scripts/zapier_webhook.js
   node scripts/data_purge.js
   ```

## Description of Scripts
- **validate_csv.js**: Checks if a CSV matches the canonical header, outputs mismatches.
- **import_contacts.js**: Reads CSV, normalizes data, simulates import, maps custom fields/tags.
- **phone_validation.js**: Validates phone numbers (using libphonenumber-js), tags contacts, outputs results.
- **clone_sms_workflow.js**: Reads a JSON workflow, clones/adapts for a new campaign, tracks replies.
- **zapier_webhook.js**: Simulates sending a webhook with dynamic variables for direct-mail integration.
- **data_purge.js**: Filters contacts by last activity, simulates archiving/deleting.

## Sample Data
- **data/sample_contacts.csv**: Example contacts with multiple phone fields, custom fields, and last activity dates.

## Workflows
- **workflows/sms_sequence.json**: Example 10-step AI-SMS sequence with reply tracking.

## Diagrams
See [WORKFLOWS_AND_DIAGRAMS.md](WORKFLOWS_AND_DIAGRAMS.md) for process and data flow diagrams.

## Presentation
See [PRESENTATION.html](PRESENTATION.html) for a visual walkthrough of the demo project.

---
This demo is for portfolio and interview purposes only. 