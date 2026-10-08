# IDEABOARD – Collaboration & Idea Management Platform

IDEABOARD is a full-stack web application that allows employees to submit, manage, review, discuss, and track ideas within an organization.

The application implements secure authentication, Role-Based Access Control (RBAC), idea workflow management, comments, dashboard analytics, Docker containerization, and AWS EC2 deployment.

## 🚀 Features

- User Signup and Login
- JWT-based Authentication
- Role-Based Access Control (RBAC)
- Employee, Manager, and Admin roles
- Create, view, update, and manage ideas
- Idea review and status management
- Comments on ideas
- Dashboard with idea statistics
- Protected frontend routes
- RESTful APIs using Django REST Framework
- MySQL database
- Dockerized frontend and backend
- AWS EC2 deployment

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| Employee | Create ideas, edit own ideas, view ideas, add comments |
| Manager | Review ideas and update idea status |
| Admin | Full access, including deleting ideas |

## 🔄 Idea Workflow

```text
Submitted
    ↓
Under Review
    ↓
Approved / Rejected
    ↓
Implemented