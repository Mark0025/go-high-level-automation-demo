# Workflows and Diagrams

This document provides workflow and data flow diagrams for the Go High Level Automation Demo project.

---

## 1. CSV Header Validation

```mermaid
graph TD
    A[Start: Read CSV Header] --> B{Header matches canonical?}
    B -- Yes --> C[Log: Header matches]
    B -- No --> D[Log: Mismatches]
    D --> E[End]
    C --> E
```

---

## 2. Bulk Contact Import & Normalization

```mermaid
graph TD
    A[Read CSV Rows] --> B[Normalize Data]
    B --> C[Map Custom Fields/Tags]
    C --> D[Simulate Import]
    D --> E[Log Imported Contact]
```

---

## 3. Phone Validation Workflow

```mermaid
graph TD
    A[Read Contact Row] --> B[Check Phone 1-3]
    B --> C{Valid Mobile?}
    C -- Yes --> D[Tag: Mobile Valid]
    C -- No --> E[Tag: Invalid or Not Mobile]
    D --> F[Log Result]
    E --> F
```

---

## 4. AI-SMS Workflow Cloning & Adaptation

```mermaid
graph TD
    A[Read Campaign A Workflow] --> B[Clone Workflow]
    B --> C[Adapt Messages for Campaign B]
    C --> D[Track Replies at Master Level]
    D --> E[Output New Workflow]
```

---

## 5. Zapier Webhook Simulation

```mermaid
graph TD
    A[Contact Reaches Offer Sent Stage] --> B[Prepare Webhook Payload]
    B --> C[Send to Direct-Mail Platform]
    C --> D[Log Payload]
```

---

## 6. Quarterly Data Purge

```mermaid
graph TD
    A[Read Contacts] --> B[Check Last Activity]
    B --> C{Inactive Before Cutoff?}
    C -- Yes --> D[Archive/Delete Contact]
    C -- No --> E[Keep Contact]
    D --> F[Log Archived]
    E --> F
```

---

## Data Flow Overview

```mermaid
graph LR
    A[CSV File] --> B[Validation]
    B --> C[Import & Normalization]
    C --> D[Phone Validation]
    D --> E[Workflows (SMS, Zapier, Purge)]
    E --> F[Logs/Reports]
``` 