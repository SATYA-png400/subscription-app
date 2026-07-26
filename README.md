# Location-Based Subscription App

This project is a full-stack React application built as an internship assignment. It features a location-aware subscription UI that captures a user's geographic coordinates and saves their subscription choice directly to a cloud database.

## Features
* **Geolocation:** Automatically detects the user's latitude and longitude using the native browser Geolocation API.
* **Authentication:** Utilizes Firebase Anonymous Authentication to silently generate and track unique user sessions without requiring a manual login.
* **Cloud Database:** Integrates with Firebase Firestore to store subscription records, logging the chosen plan, price, user ID, location coordinates, and a server timestamp.
* **Interactive UI:** Clean, responsive pricing cards built with React state management.

## Tech Stack
* **Frontend:** React.js (built with Vite)
* **Backend as a Service:** Firebase (Auth & Firestore)
* **Version Control:** Git & GitHub

## How to Run Locally
1. Clone the repository to your local machine.
2. Open the terminal and navigate to the project folder.
3. Run `npm install` to install all required dependencies.
4. Run `npm run dev` to start the local development server.