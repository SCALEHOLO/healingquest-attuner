# ATTUNER.ai Deployment Checklist

## Pre-Conference Setup (9 hours before 3 PM CET)

### 1. GitHub Repository Setup
- [ ] Create GitHub repository: `attuner-ai`
- [ ] Push code to GitHub:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/attuner-ai.git
  git branch -M main
  git push -u origin main
  ```

### 2. Firebase Configuration
- [ ] Ensure Firebase project `attuner-75d93` is active
- [ ] Enable Authentication methods:
  - [ ] Email/Password
  - [ ] Google Sign-in
- [ ] Enable Firestore Database
- [ ] Set up Firestore Security Rules:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /quizResults/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /leads/{document} {
        allow write: if request.auth != null;
        allow read: if false;
      }
      match /{document=**} {
        allow read, write: if false;
      }
    }
  }
  ```

### 3. Vercel Deployment
- [ ] Sign up/Login to [Vercel](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Add environment variables:
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDzy_rKkS1mi-XSPEf0A8ZV1uK6VJcJlVg
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=attuner-75d93.firebaseapp.com
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=attuner-75d93
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=attuner-75d93.firebasestorage.app
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=314684965444
  NEXT_PUBLIC_FIREBASE_APP_ID=1:314684965444:web:409d73db116c5139107211
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-069D49BK6E
  ```
- [ ] Deploy and get live URL

### 4. Domain Setup (Optional)
- [ ] Purchase domain: `attuner.ai` or similar
- [ ] Configure DNS in Vercel
- [ ] Test SSL certificate

### 5. iPad Configuration
- [ ] Test app on iPad Safari
- [ ] Add to Home Screen for full-screen experience
- [ ] Test offline functionality
- [ ] Ensure touch interactions work smoothly
- [ ] Verify logo displays correctly on all screen sizes

### 6. QR Code Generation
- [ ] Generate QR code pointing to live URL
- [ ] Test QR code scanning
- [ ] Print QR codes for business cards

## Pre-Conference Testing (2 hours before)

### Functionality Tests
- [ ] Landing page loads correctly with logo
- [ ] Firebase authentication works (email + Google)
- [ ] Quiz flows smoothly through all 8 questions
- [ ] Progress bar updates correctly
- [ ] Results page displays with visualization
- [ ] Data saves to Firestore correctly
- [ ] Responsive design works on mobile/tablet
- [ ] Logo displays properly across all pages

### Performance Tests
- [ ] Page load times < 3 seconds
- [ ] Quiz transitions are smooth
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] Logo images load quickly

### Backup Plans
- [ ] Local development server ready
- [ ] Mobile hotspot available
- [ ] Alternative device prepared
- [ ] Contact info for technical support

## During Conference

### Monitoring
- [ ] Check Vercel deployment status
- [ ] Monitor Firebase usage quotas
- [ ] Track user engagement in real-time
- [ ] Watch for any errors in logs

### User Support
- [ ] Be ready to help with technical issues
- [ ] Have backup authentication methods
- [ ] Monitor quiz completion rates
- [ ] Collect feedback for improvements

## Post-Conference

### Data Collection
- [ ] Export quiz results from Firestore
- [ ] Analyze user engagement metrics
- [ ] Review Firebase Analytics data
- [ ] Compile lead generation report

### Follow-up
- [ ] Send thank you emails to participants
- [ ] Share results with interested users
- [ ] Plan next steps for product development

## Emergency Contacts

- **Technical Support**: [Your contact info]
- **Firebase Support**: [Firebase console]
- **Vercel Support**: [Vercel dashboard]

## Live URLs

- **Production**: [Your Vercel URL]
- **GitHub**: [Your GitHub repo]
- **Firebase Console**: https://console.firebase.google.com/project/attuner-75d93

---

**Conference**: Festival of Consciousness Barcelona 2025
**Date**: Today, 3 PM - 10 PM CET
**Location**: Barcelona, Spain 