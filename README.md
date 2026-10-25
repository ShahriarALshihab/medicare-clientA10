# 🏥 MediCare Connect

**A full-stack hospital appointment and healthcare management platform.**
Patients book trusted doctors and pay online, doctors manage schedules and issue digital prescriptions, and admins oversee the whole system, all from one secure place.

[![Live Site](https://img.shields.io/badge/Live-medicare--client--a10.vercel.app-0f766e?style=for-the-badge&logo=vercel&logoColor=white)](https://medicare-client-a10.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 🔗 Quick Link

| Resource       | Link                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| 🌐 Live Client | [medicare-client-a10.vercel.app](https://medicare-client-a10.vercel.app/) |

> **Note:** The server runs on Render's free tier, so the first request after a period of inactivity can take up to a minute while the service wakes up.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [NPM Packages](#-npm-packages)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 📖 About the Project

MediCare Connect removes the waiting room from healthcare. Patients can discover verified doctors by specialization, book an available time slot, pay securely online, and receive digital prescriptions in their dashboard. Doctors control their own availability and manage appointment requests, while administrators verify doctors, monitor payments, and view platform-wide analytics.

The client is built with **Next.js (App Router)** and talks to a separate **Express.js + MongoDB** REST API. Authentication is handled by **Firebase**, and every protected API request is secured with a **JWT**.

---

## ✨ Key Features

### 🌐 Public Experience

- Animated hero slideshow with a blurred background and clear calls to action
- Clickable **medical specialization cards**: selecting one opens Find Doctors already filtered to that specialty
- Featured top-rated doctors, platform statistics, patient success stories, and a "How it works" guide
- **Find Doctors** page with search by name, specialization filter, maximum fee filter, sorting (rating, experience, fee), and pagination
- Detailed doctor profile pages with qualifications, hospital, fee, availability, and patient reviews
- 🌙 **Light / Dark theme** toggle that remembers your choice
- Fully responsive layout for mobile, tablet, and desktop
- Custom 404 page and loading states

### 🔐 Authentication

- Email and password registration with password validation (minimum 6 characters, one number, one special character)
- Google sign-in
- Show / hide password toggle on login and register forms
- Forgot password flow with a Firebase reset email
- Profile photo upload during registration
- Role-based route protection that keeps logged-in users signed in across page reloads

### 🧑‍⚕️ Patient Features

- Book appointments by choosing a day and time slot and describing symptoms
- Secure online payment with **Stripe** and a full payment history
- Reschedule or cancel pending appointments
- View digital prescriptions issued by doctors
- Leave star ratings and written reviews after completed appointments
- Personal analytics dashboard with charts
- Profile management

### 👨‍⚕️ Doctor Features

- Create, edit, and remove weekly availability slots
- Accept, reject, and complete appointment requests
- Write and manage digital prescriptions
- Edit professional profile (specialization, fee, qualifications, hospital)
- Doctor profiles appear publicly only after admin verification

### 🛡️ Admin Features

- Manage all users and their roles
- Verify or reject doctor registrations
- Monitor every appointment and payment record
- Platform-wide analytics overview

---

## 👥 User Roles

| Role        | Access                                                                   |
| ----------- | ------------------------------------------------------------------------ |
| **Patient** | Book appointments, pay, review doctors, view prescriptions and analytics |
| **Doctor**  | Manage schedule, handle appointment requests, issue prescriptions        |
| **Admin**   | Manage users and doctors, monitor appointments and payments              |

Each role gets its own dashboard menu, and routes are guarded so users can only open pages that belong to their role.

---

## 🛠️ Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 14 (App Router) with JavaScript             |
| Styling        | Tailwind CSS and DaisyUI                            |
| Animation      | Framer Motion                                       |
| Authentication | Firebase Authentication (Email/Password and Google) |
| HTTP Client    | Axios with secured and public instances             |
| Payments       | Stripe                                              |
| Charts         | Recharts                                            |
| Notifications  | React Hot Toast and SweetAlert2                     |
| Backend        | Express.js, MongoDB (Mongoose), JWT, Firebase Admin |
| Hosting        | Vercel (client) and Render (server)                 |

---

## 📦 NPM Packages

| Package                                         | Purpose                                 |
| ----------------------------------------------- | --------------------------------------- |
| `next`                                          | React framework with App Router         |
| `react` / `react-dom`                           | UI library                              |
| `tailwindcss` / `daisyui`                       | Utility-first styling and UI components |
| `firebase`                                      | Authentication                          |
| `axios`                                         | API requests                            |
| `framer-motion`                                 | Page and section animations             |
| `react-icons`                                   | Icon library                            |
| `react-hot-toast`                               | Toast notifications                     |
| `sweetalert2`                                   | Confirmation dialogs                    |
| `recharts`                                      | Analytics charts                        |
| `@stripe/stripe-js` / `@stripe/react-stripe-js` | Stripe payment form                     |

---

## 📂 Project Structure

```
medicare-client/
├── app/
│   ├── (auth)/              # Login and register pages
│   ├── (main)/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── doctors/[id]/    # Doctor details and booking
│   │   ├── find-doctors/    # Search, filter, and pagination
│   │   ├── forgot-password/
│   │   └── dashboard/       # Role-based dashboard pages
│   ├── layout.js
│   ├── loading.js
│   └── not-found.js
├── components/
│   ├── Dashboard/           # Sidebar, overviews, charts, modals
│   ├── Doctors/             # Doctor card and search filter
│   ├── Home/                # Banner, specializations, stats, and more
│   ├── Routes/              # Role-based route guards
│   └── Shared/              # Navbar, footer, spinner, theme toggle
├── context/                 # Theme context
├── firebase/                # Firebase configuration
├── hooks/                   # useAuth, useAxiosSecure, usePageTitle
├── lib/                     # axiosPublic and axiosSecure instances
├── providers/               # Auth provider
└── public/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- A Firebase project with Email/Password and Google sign-in enabled
- The [MediCare Connect server](https://github.com/ShahriarALshihab/medicareConnect-serverA10) running locally or deployed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ShahriarALshihab/medicare-clientA10.git

# 2. Move into the project folder
cd medicare-clientA10


# 3. Install dependencies
npm install

# 4. Create your environment file
cp .env.example .env.local
# then fill in the values (see the section below)

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm start`     | Run the production build             |
| `npm run lint`  | Run ESLint                           |

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Image upload (imgbb)
NEXT_PUBLIC_IMGBB_API_KEY=

# Stripe (publishable key only)
NEXT_PUBLIC_STRIPE_PK=
```

> 🔒 Never commit `.env.local`. It is already listed in `.gitignore`.

---

## ☁️ Deployment

| Part   | Platform   | Notes                                                                                                                  |
| ------ | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Client | **Vercel** | Add every environment variable above in the project settings, then push to `main` to auto-deploy                       |
| Server | **Render** | Allow your Vercel URL in the server's CORS configuration and set the database, JWT, Firebase Admin, and Stripe secrets |

After deploying, add your Vercel domain to **Firebase Console → Authentication → Settings → Authorized domains** so Google sign-in works on the live site.

---

## 👤 Author

**Shahriar Al Shihab**

- GitHub: [@ShahriarALshihab](https://github.com/ShahriarALshihab)

---

<p align="center">Made with ❤️ for better healthcare access.</p>
