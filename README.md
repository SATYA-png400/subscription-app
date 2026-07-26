# Location-Based Subscription App

This project is a full-stack React application built as an internship assignment. It detects a user's location, retrieves localized subscription pricing, and stores the user's selection in Firebase.

## Setup & Firebase Configuration Instructions
1. Clone this repository to your local machine.
2. Open the terminal and run `npm install` to install dependencies.
3. Create a Firebase project in the Firebase Console.
4. Enable **Firestore Database** and **Anonymous Authentication**.
5. Replace the configuration object in `firebase.js` with your own Firebase project credentials.
6. Run `npm run dev` to start the local development server.

*(Note: Please refer to the attached screenshots/demo video for a visual walkthrough of the UI).*

## Database Structure
The Firestore database uses a two-collection structure to separate global pricing from individual user data:

```text
subscriptionPricing (Collection)
  ├── US (Document) - Contains pricing plans for the United States
  ├── IN (Document) - Contains pricing plans for India
  └── DEFAULT (Document) - Fallback pricing plans

users (Collection)
  └── {firebaseUserId} (Document)
        ├── location: { countryCode, city, lat, lng }
        └── activeSubscription: { planId, price, currency, countryCode, subscribedAt }