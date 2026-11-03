# Project Review 2 — Quick Explanation

## 1. Technology
React, Vite, JavaScript, CSS, HTML and browser Local Storage.

## 2. Modules
- User module: signup/login, explore events, search/filter, register and view tickets.
- Organizer module: role-based dashboard and create/publish events.
- Admin module: overview statistics, block/unblock users and delete events.

## 3. Authentication flow
Signup validates required fields, email, 10-digit mobile and matching passwords. Login checks the saved Local Storage user list. A session is saved in Local Storage and the interface changes based on the role.

## 4. Viva points
- React: JavaScript library used to build reusable UI components.
- Vite: frontend build tool and development server.
- useState: manages component state.
- useEffect: synchronizes app data/theme with browser storage.
- Local Storage: stores key/value data in the browser and keeps it after refresh.
- Components: `App`, `LoginForm`, `SignupForm`, `CreateForm`, `Stat`, and `Modal`.
- Role-based rendering: the dashboard changes according to User, Organizer or Admin role.

## 5. Demonstration order
1. Open home page and explore event cards.
2. Search and filter events.
3. Sign up as a new user.
4. Register for an event and show the ticket confirmation.
5. Open My Tickets and refresh to show persistence.
6. Log out.
7. Log in as Organizer and create an event.
8. Log out and log in as Admin.
9. Show user/event management.
10. Toggle dark mode and refresh.

## 6. Important
This is a frontend academic prototype. Local Storage credentials are not production-grade authentication. Payment is not processed; no real money is collected.
