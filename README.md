# 🩸 BloodCare – Blood Donation Application

## 📌 Project Overview

**BloodCare** is a full-stack Blood Donation Management System developed to connect blood donors with recipients in need. The platform streamlines blood donation requests, donor search, funding support, and role-based management through a clean and responsive user interface.

---

## 🎯 Purpose of the Project

The main objectives of this application are:

* To create a user-friendly blood donation platform
* To manage blood donation requests efficiently
* To support role-based access control (Admin, Donor, Volunteer)
* To provide a secure and responsive dashboard experience

---

## 🌐 Live Website

* **Front-end Live Link:** 👉 https://vitalflow-9b72a.web.app/.app
* **Back-end Live Link:** 👉 https://blood-care-server-ten.vercel.app

---

## 👤 User Roles & Permissions

### 🩸 Donor

* Register and login
* Create blood donation requests
* View, edit, and delete own donation requests
* View recent donation requests on dashboard
* Give funding support

### 🤝 Volunteer

* View all blood donation requests
* Filter donation requests
* Update donation status only
* View funding summary on dashboard

### 🌐 Admin

* Full system access
* Manage all users (block / unblock / role change)
* Manage all blood donation requests
* View system statistics (users, requests, funding)
* View all funding records

---

## 📊 Key Features

### 🔐 Authentication

* Email & password based authentication using Firebase
* Role-based route protection
* Private dashboard routes

### 🏠 Home Page (Public)

* Responsive Navbar & Footer
* Banner with call-to-action buttons
* Featured section
* Contact section

### 🔍 Search Page (Public)

* Search donors by:

  * Blood Group
  * District
  * Upazila
* Displays results only after search submission

### 🩸 Blood Donation Requests (Public)

* Shows only **pending** donation requests
* View button redirects to private details page

### 📄 Donation Request Details (Private)

* Displays full donation request information
* Donate button opens confirmation modal
* Updates donation status from `pending` → `inprogress`

---

## 📋 Dashboard (Private 🔒)

* Fully responsive sidebar layout
* Role-specific dashboard views

### 👤 Profile Page

* View and update:

  * Name
  * Avatar
  * Blood Group
  * District & Upazila
* Email is read-only
* Edit & Save functionality implemented

### 🏠 Dashboard Home

* Welcome message with user name
* Donor: Recent 3 donation requests
* Admin & Volunteer: Statistics cards

---

## 💰 Funding Page (Private 🔒)

* Users can give funding support
* Admin & Volunteer can view:

  * Donor name
  * Funding amount
  * Funding date
* Success message shown after funding submission

---

## 🛠️ Technologies Used

### Frontend

* React
* React Router DOM
* Tailwind CSS
* Axios
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Vercel (Deployment)

---

## 📦 NPM Packages Used

* react-router-dom
* axios
* firebase
* express
* mongodb
* cors
* dotenv

---

## 🔐 Environment Security

* Firebase configuration secured using environment variables
* MongoDB credentials secured using `.env`
* No sensitive keys exposed in the client or server repositories

---

## 🚀 Deployment

* Frontend deployed on **Netlify**
* Backend deployed on **Vercel**

---




