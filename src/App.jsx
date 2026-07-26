import React, { useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

function App() {
  const [userId, setUserId] = useState(null);
  const [locationStatus, setLocationStatus] = useState('Waiting for permission...');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    // 1. Authenticate
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else signInAnonymously(auth).catch((err) => console.error(err));
    });

    // 2. Get Location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLocationStatus('Location successfully detected!');
        },
        (error) => setLocationStatus('Location denied. Using default settings.')
      );
    }

    return () => unsubscribe();
  }, []);

  // 3. Save to Database
  const handleSubscribe = async (planName, price) => {
    if (!userId) {
      alert("Please wait for authentication to finish.");
      return;
    }

    try {
      // This sends the data to your Firebase Firestore database
      await addDoc(collection(db, "subscriptions"), {
        userId: userId,
        plan: planName,
        price: price,
        location: coordinates || "Not provided",
        timestamp: serverTimestamp()
      });
      alert(`Success! You have subscribed to the ${planName} Plan.`);
    } catch (error) {
      console.error("Error saving to database:", error);
      alert("There was an error saving your subscription.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Choose Your Subscription</h1>
      
      <div style={{ padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '30px', fontSize: '14px' }}>
        <p><strong>User ID:</strong> {userId ? userId : 'Loading...'}</p>
        <p><strong>Location:</strong> {locationStatus}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {/* Basic Card */}
        <div style={cardStyle}>
          <h2>Basic</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$9.99 / mo</p>
          <ul style={listStyle}>
            <li>Access to core features</li>
            <li>Standard support</li>
            <li>1 User limit</li>
          </ul>
          <button onClick={() => handleSubscribe('Basic', 9.99)} style={buttonStyle}>Subscribe</button>
        </div>

        {/* Standard Card */}
        <div style={{ ...cardStyle, border: '2px solid #3b82f6', transform: 'scale(1.05)' }}>
          <h2>Standard</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>$19.99 / mo</p>
          <ul style={listStyle}>
            <li>All Basic features</li>
            <li>Priority support</li>
            <li>Up to 5 Users</li>
          </ul>
          <button onClick={() => handleSubscribe('Standard', 19.99)} style={{ ...buttonStyle, backgroundColor: '#3b82f6' }}>Subscribe</button>
        </div>

        {/* Premium Card */}
        <div style={cardStyle}>
          <h2>Premium</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$29.99 / mo</p>
          <ul style={listStyle}>
            <li>All Standard features</li>
            <li>24/7 Dedicated support</li>
            <li>Unlimited Users</li>
          </ul>
          <button onClick={() => handleSubscribe('Premium', 29.99)} style={buttonStyle}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

// Simple styling objects to keep the code clean
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  width: '250px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column'
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  textAlign: 'left',
  flexGrow: 1,
  lineHeight: '1.8'
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 15px',
  backgroundColor: '#1f2937',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default App;