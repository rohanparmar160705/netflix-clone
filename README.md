# Netflix Clone

A modern Vite React.js + Firebase project that replicates the core features and UI of Netflix's streaming platform. Built with performance and modern development practices in mind.

## 🌐 Live Demo
Check out the live demo: [Netflix Clone](https://netflix-clone-eed7b.web.app/)

## 📦 Repository
[https://github.com/rohanparmar160705/netflix-clone](https://github.com/rohanparmar160705/netflix-clone)

## 🎥 Tutorial Video

https://raw.githubusercontent.com/rohanparmar160705/netflix-clone/main/netflix-clone-tutorial.mp4

*Watch the complete walkthrough of the Netflix Clone application*

## 📸 Application Flow Screenshots

### 1. Base Page (Landing)
![Base Page](https://raw.githubusercontent.com/rohanparmar160705/netflix-clone/main/src/images/screenshots/BasePage.png)
*Initial landing page with email signup form*

### 2. Login & Signup
![Authentication](https://raw.githubusercontent.com/rohanparmar160705/netflix-clone/main/src/images/screenshots/Login&Signup.png)
*User authentication screen with login/signup options*

### 3. Profile Screen
![Profile](https://raw.githubusercontent.com/rohanparmar160705/netflix-clone/main/src/images/screenshots/Profile.png)
*User profile management and settings*

### 4. Plans Selection
![Subscription Plans](https://raw.githubusercontent.com/rohanparmar160705/netflix-clone/main/src/images/screenshots/Plans.png)
*Subscription plans with Razorpay integration*

### 5. Home Screen
![Home Screen](https://raw.githubusercontent.com/rohanparmar160705/netflix-clone/main/src/images/screenshots/HomeScreen.png)
*Main dashboard with movie categories and recommendations*



## 🚀 Features

- **User Authentication**
  - Sign up functionality
  - Sign in functionality
  - Email validation
  - User session management

- **Landing Page**
  - Animated welcome screen
  - Netflix-style hero section
  - Email capture for sign-up
  - Responsive design
  - Smooth animations on content load

- **User Interface**
  - Netflix-inspired design
  - Responsive layout
  - Modern UI components
  - Seamless transitions between screens
  - Professional styling with CSS

## 🛠️ Technologies Used

- **Frontend Framework & Build Tools**
  - Vite.js - Next Generation Frontend Tooling
  - React.js 18
  - React Hooks (useState, useRef)
  - React Router Dom v6
  - CSS3 for styling

- **Backend & Authentication**
  - Firebase Authentication
  - Firebase Cloud Functions
  - Firebase Hosting
  - Firestore Database

- **Payment Integration**
  - Razorpay Payment Gateway
  - Stripe (planned)

- **API Integration**
  - TMDB (The Movie Database) API
  - Axios for HTTP requests
  - YouTube API for trailers

- **State Management**
  - Redux Toolkit
  - Context API
  - Redux Persist

- **Assets & Styling**
  - Custom Netflix logo
  - CSS animations
  - Responsive design elements
  - CSS Grid and Flexbox
  - Material UI Icons

## 🎥 Core Functionality

- **Movie Browsing**
  - Dynamic movie rows by category
  - Trending Now section
  - Netflix Originals showcase
  - Genre-based categorization

- **User Experience**
  - Smooth scrolling movie rows
  - Trailer playback on movie hover
  - Dynamic banner with featured content
  - Loading states and animations

- **Profile Management**
  - User profile creation
  - Subscription management
  - Watch history tracking
  - Account settings

## 📁 Detailed Project Structure

```
src/
├── app/
│   └── store.js                  # Redux store configuration
│
├── components/
│   └── ProtectedRoute.jsx        # Route protection for authenticated users
│
├── contexts/
│   └── SubscriptionContext.jsx   # Context for managing subscription state
│
├── features/
│   ├── counter/                  # Redux counter feature example
│   │   ├── Counter.js
│   │   ├── Counter.module.css
│   │   ├── counterAPI.js
│   │   └── counterSlice.spec.js
│   └── userSlice.js             # Redux slice for user management
│
├── images/
│   ├── background_login.jpg      # Login page background
│   ├── netflix-logo.png         # Netflix brand logo
│   ├── nficon2016.ico          # Favicon
│   └── user.svg                # User profile icon
│
├── screens/
│   ├── HomeScreen.jsx           # Main dashboard screen
│   ├── HomeScreen.css
│   ├── LoginScreen.jsx          # Authentication screen
│   ├── LoginScreen.css
│   ├── ProfileScreen.jsx        # User profile management
│   ├── ProfileScreen.css
│   ├── PlansScreen.jsx         # Subscription plans
│   ├── PlansScreen.css
│   ├── SignUpOrSignInScreen.jsx # Sign up/Sign in flow
│   ├── SignUpOrSignInScreen.css
│   ├── Loader.jsx              # Full-page loading component
│   ├── Loader.css
│   ├── MiniLoader.jsx          # Smaller loading component
│   ├── MiniLoader.css
│   ├── YTFrameContainer.jsx    # YouTube video container
│   └── YTFrameContainer.css
│
├── App.jsx                     # Main application component
├── App.css
├── axios.js                    # Axios configuration for API calls
├── Banner.jsx                  # Netflix banner component
├── Banner.css
├── firebase.js                 # Firebase configuration and setup
├── Footer.jsx                  # Application footer
├── Footer.css
├── index.css                   # Global styles
├── main.jsx                    # Application entry point
├── Nav.jsx                     # Navigation component
├── Nav.css
├── Requests.js                 # API endpoints configuration
├── Row.jsx                     # Movie/Show row component
├── Row.css
└── serviceWorker.js            # Progressive Web App service worker
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/rohanparmar160705/netflix-clone.git
cd netflix-clone
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project
   - Enable Authentication
   - Add your Firebase configuration to `firebase.js`

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop screens
- Tablets
- Mobile devices

## 🔒 Authentication Flow

1. Users can enter their email on the landing page
2. Choose between sign-up or sign-in
3. Complete the authentication process
4. Access the main application

## 🎯 Future Enhancements

- Integration with backend services
- Movie/TV show catalog
- User profile management
- Payment integration
- Content streaming functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](issues).

## 👨‍💻 Author

Rohan Parmar
- GitHub: [@rohanparmar160705](https://github.com/rohanparmar160705)

---

⭐️ If you found this project helpful, please give it a star!

## 💻 Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js >= 14.0.0
- npm >= 6.14.0
- A Firebase account
- TMDB API key
- Modern web browser

## 📦 Dependencies

Key dependencies used in this project:
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "firebase": "^9.x",
  "axios": "^1.x",
  "redux": "^4.x",
  "@reduxjs/toolkit": "^1.x",
  "redux-persist": "^6.x",
  "@mui/icons-material": "^5.x",
  "@mui/material": "^5.x",
  "razorpay": "^2.x",
  "react-youtube": "^10.x",
  "movie-trailer": "^3.x"
}
```

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- This is a clone project for educational purposes only
- Not affiliated with Netflix
- Uses TMDB API for movie data

## 🔥 Key Features

- **Payment Integration**
  - Razorpay payment gateway integration
  - Multiple subscription plans
  - Secure payment processing
  - Payment history tracking

- **Movie Features**
  - Movie search functionality
  - Genre filtering
  - Trailer playback
  - Movie recommendations
  - Watch later list

- **User Features**
  - Profile management
  - Subscription management
  - Watch history
  - Custom playlists
  - Multiple profiles (planned)

## 🚧 Known Issues

- YouTube trailer playback might not work for some movies
- Payment gateway in test mode
- Some UI elements might need adjustment on specific screen sizes

## 📱 Progressive Web App

This application is PWA-ready with:
- Offline functionality
- Install prompt
- Fast loading
- App-like experience

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🔥 Firebase Setup & Deployment

### Firebase Project Setup

1. Create a Firebase Project
   ```bash
   # Install Firebase CLI globally
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   ```

2. Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Enter project name
   - Disable Google Analytics (optional)
   - Click "Create Project"

3. Register Your App
   - Click on the web icon (</>)
   - Register app with a nickname
   - Copy the Firebase config object

4. Create `firebase.js` in your `src` directory
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app);

   export { auth, db };
   ```

### Enable Authentication

1. In Firebase Console:
   - Go to "Authentication" → "Get Started"
   - Enable "Email/Password" sign-in method
   - Save changes

### Setup Firestore Database

1. Create Database
   - Go to "Firestore Database" → "Create Database"
   - Choose "Start in production mode"
   - Select your preferred region
   - Click "Enable"

2. Set up Firestore Rules
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /products/{productId} {
         allow read: if request.auth != null;
       }
       match /customers/{customerId} {
         allow read: if request.auth != null && request.auth.uid == customerId;
       }
     }
   }
   ```

### Deploy to Firebase Hosting

1. Initialize Firebase in your project
   ```bash
   # Initialize Firebase in your project directory
   firebase init
   
   # Select these options:
   # - Hosting: Configure files for Firebase Hosting
   # - Use an existing project
   # - Select your project
   # - Use "dist" as public directory
   # - Configure as single-page app: Yes
   # - Set up automatic builds: No
   ```

2. Build and Deploy
   ```bash
   # Build your project
   npm run build
   
   # Deploy to Firebase
   firebase deploy
   ```

3. After deployment, you'll receive a hosting URL like:
   `https://your-project-id.web.app`

### Important Notes

- **Environment Variables**: Create `.env` file in project root:
  ```env
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  ```

- **Firebase Config**: Never commit your Firebase config directly to version control
- **Firestore Rules**: Adjust the rules according to your security needs
- **Deployment**: Always build before deploying
- **Testing**: Test authentication and database operations locally before deploying
