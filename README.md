# EventEase — React + Vite

**Every Event. One Smart Place.**

A responsive academic demo event-management app built with React, Vite and browser Local Storage.

## Requirements
- Node.js 20.19+ or 22.12+
- VS Code
- Internet connection for the first dependency installation

## Run in VS Code
1. Extract `EventEase_React_Vite.zip`.
2. Open the extracted `EventEase_React_Vite` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL printed by Vite (usually `http://localhost:5173`).

**Important:** This is a React + Vite app. Do not use the Live Server extension to launch it. Vite's development server is required.

## Production build
```bash
npm run build
npm run preview
```
The production files are created in `dist/`.

## Demo accounts
| Role | Email | Password |
|---|---|---|
| Admin | admin@eventease.com | Admin123 |
| Organizer | organizer@eventease.com | Organizer123 |
| User | user@eventease.com | User123 |

You can also create a new User or Organizer account from Sign up.

## Modules
- **User:** explore/search/filter events, register, view confirmed demo tickets.
- **Organizer:** create and publish events, view events they created.
- **Admin:** view user/event/registration statistics, block/unblock demo users, remove events.
- **Authentication:** signup/login/logout, form validation, role-based navigation.
- **Persistence:** users, events, registrations and theme are stored in Local Storage.

## Vercel deployment
1. Push this project folder to a GitHub repository.
2. In Vercel choose **Add New → Project**, import that repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click Deploy. After deployment, open the Vercel URL and test signup/login.

`vercel.json` is included for SPA routing.

## Important academic-demo limitation
Authentication and app data use browser Local Storage. This is suitable only for demonstrating the required frontend workflow; it is **not secure production authentication**. Passwords are stored in the browser and demo users/data are local to each browser. Ticket registration is a simulation: no real payment is taken, no email/SMS OTP is sent, and there is no shared cloud database. Do not use real passwords or personal data.

## Abstract
EventEase is a universal event-management web application that brings personal and professional events into one platform. Users can discover events and register, organizers can publish events, and administrators can monitor users, events and registrations. React provides reusable interface components, Vite provides the development and build environment, and Local Storage preserves demo data between refreshes.

## Problem statement
Event information and registrations are often spread across different tools, making it difficult for attendees and organizers to track details in one place.

## Proposed solution
EventEase provides a centralized interface for event discovery, event creation, role-based dashboards and registration tracking.

## Future enhancements
Firebase/Supabase authentication and database, verified email/mobile OTP, real payment gateway, QR-code check-in, email/SMS reminders, advanced analytics and organizer approval workflows.
