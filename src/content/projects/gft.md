---
name: 'Wealth Management System'
description: 'Wealth Management System for GFT Wealth'
tags: ['Java', 'Spring Boot', 'Keycloak', 'gRPC', 'Microservices', 'PostgreSQL', 'Redis', 'Amazon S3', 'AWS', 'Kubernetes']
image: 'https://images.unsplash.com/photo-1592495989226-03f88104f8cc?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
startDate: '2025-02-02'
endDate: '2025-11-05'
---
# Wealth Management System

**Duration: 6-12 Months** 

**Role: Software Engineer**

**Domain / Industry: Investments/ Wealth Management**

---

## Project Overview

Project aims to solve the problem with investors having multiple investment portfolios to manage their portfolios and get insights on their investments. With data visualizations and reports. System aims to handle securities and transactions providing insights such as Realized/Unrealized capital gains, portfolio valuations and security insights for current market value.

---

## Technologies Used

| Category | Technologies |
| --- | --- |
| **Frontend** | React (Vite), Redux Toolkit, Shadcn UI, Tailwind CSS |
| **Backend** | Java Spring Boot, Keycloak Authentication, gRPC Microservices (Spring), DBT and Airflow for data wearhouse |
| **Database & Storage** | PostgreSQL, Redis, Amazon S3 |
| **DevOps & Infrastructure** | AWS, Kubernetes |

---

## System Architecture

The application uses a microservice-based architecture where the frontend interacts with backend services through REST APIs. Authentication is managed via a centralized identity provider, and services are deployed using containerization environments.

![gft-diagram.png](/static/gft-diagram.png)

---

## Workflow & Development Process

- Worked in an agile method with a collaborative approach with multiple teams, including business analysts and Quality Assurance.
- Sprint planning and retrospectives were done acordingly and **Jira** was used as the project management tool

---

## Key Features Implemented

- User authentication and role-based access control using KeyCloak
- Portfolio Management
- Securities and Transactions Management
- End of the day investment portfolio value calculation
- Reporting and Analytics of the portfolio, including Capital Gains, Portfolio Valuations, and security insights
- Graphs showcasing investment categories and investment gains.
- Multi-format CSV imports for feeding data into the system.

---

## Responsibilities & Contributions

- Front-end for Reporting and analytics, including complex graph views for security insights.
- Led the front-end architecture and layout strategy, taking full ownership of UI structure, scalability, and all front-end integrations.
- Integrated authentication and authorization mechanisms with KeyCloak.
- Security and Transaction management using Manual forms and full back-end integration.
- Reviewed code and ensured best practices and design patterns.

---

## Challenges & Solutions

- **Handled multi-market security symbol complexity** by designing back-end logic to support the same security being traded across multiple stock markets, ensuring accurate mapping, selection, and data consistency.
- **Optimized large-scale, data-heavy forms and dashboards** by implementing memoization and lazy loading to improve rendering performance under high data and graph loads. Built dynamic, type-safe form schemas using advanced **Zod** features to manage complex security and transaction workflows.
- **Modernized report generation and visualization** by replacing traditional Jasper charting with a headless browser–based solution. Integrated **Google Charts** with HTML templates rendered server-side, enabling the generation of visually modern, interactive, and high-quality reports
- **Improved inter-service communication performance by ~50%** by replacing REST-based Feign clients with **gRPC**, taking full ownership of the design and implementation across services.

---

## Impact & Results

- Improved application performance for both client and server.
- Enabled centralized authorization.
- Increased system compatibility with multiple vendors and custodians.

---

## Learnings & Takeaways

- Deep understanding of system design and architecture.
- Experience and domain knowledge about wealth management.
- Improved collaboration and communication skills.