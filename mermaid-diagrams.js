// Mermaid diagrams for Go High Level Automation Demo

// Main Workflow Diagram
const workflowDiagram = `
flowchart LR
    A[CSV File] --> B[Validation]
    B --> C[Import & Normalization]
    C --> D[Phone Validation]
    D --> E[Workflows]
    E --> F[Reports]
    
    subgraph Workflows
      SMS[SMS Workflow]
      Zapier[Zapier Webhook]
      Purge[Data Purge]
    end
`;

// Detailed Architecture Diagram
const detailedArchitecture = `
flowchart TD
    CSV[CSV Files] --> Parser[CSV Parser]
    Parser --> Validator[Data Validator]
    Validator --> Normalizer[Data Normalizer]
    Normalizer --> PhoneValidation[Phone Number Validation]
    PhoneValidation --> SMSWorkflow[SMS Workflow Engine]
    PhoneValidation --> WebhookSystem[Webhook System]
    PhoneValidation --> PurgeModule[Data Purge Module]
    
    SMSWorkflow -- "Cloned Workflows" --> OutputData[Processed Data]
    WebhookSystem -- "API Payloads" --> OutputData
    PurgeModule -- "Archive Lists" --> OutputData
    
    style Parser fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
    style Validator fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
    style Normalizer fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
    style PhoneValidation fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
    style SMSWorkflow fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
    style WebhookSystem fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
    style PurgeModule fill:#f9f9f9,stroke:#2a4d7a,stroke-width:2px
`;

// ROI Diagram
const roiDiagram = `
pie
    title "Time Savings by Automation Type"
    "Data Entry" : 45
    "Data Validation" : 20
    "Workflow Management" : 25
    "Reporting" : 10
`;

// Sample data 
const samplePO = `First Name,Last Name,Email,Phone 1,Phone 2,Phone 3,Custom Field 1,Custom Field 2,Last Activity
John,Doe,john.doe@example.com,+15551234567,+15557654321,,VIP,Tag1,2024-01-10
Jane,Smith,jane.smith@example.com,+15559876543,,+15553456789,Regular,Tag2,2024-03-15
Bob,Johnson,bob.j@example.com,,+15552345678,+15554567890,VIP,Tag3,2023-12-01
Alice,Williams,alice.w@example.com,+15551239876,,,+1555,Tag4,2024-04-20
Tom,Brown,tom.brown@example.com,+15558765432,+15557651234,,Regular,Tag5,2023-11-05
`; 