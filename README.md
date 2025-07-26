# ATTUNER.ai - Consciousness Profile Assessment

> **Discover your consciousness profile through HOLO (Holistic Optimization and Learning Orchestration)**

A cutting-edge web application that assesses consciousness profiles across four dimensions of holistic awareness, designed for the Festival of Consciousness Barcelona 2025.

![ATTUNER.ai Logo](public/assets/1.svg)

## 🌟 Overview

ATTUNER.ai represents a paradigm shift toward holistic integration in AI consciousness assessment. Unlike traditional AI that focuses on isolated components, HOLO emerges from the dynamic interplay of multiple dimensions - not just processing information, but attuning to the deeper patterns that connect all things.

## 🎯 Features

### 🏠 **Landing Page**
- Compelling introduction to ATTUNER.ai and HOLO methodology
- Animated background elements and smooth transitions
- Festival of Consciousness Barcelona 2025 branding
- Mobile-responsive design with touch optimization

### 🔐 **Authentication System**
- Firebase Authentication with multiple sign-in methods:
  - Email/Password registration and login
  - Google OAuth integration
  - Mobile-optimized auth flows with popup/redirect fallbacks
- Secure user session management
- Error handling for mobile browser limitations

### 📝 **Consciousness Assessment Quiz**
- **8 carefully crafted questions** across 4 HOLO dimensions:
  - **Holistic Thinking** - Systems perspective and interconnected awareness
  - **Interconnectedness** - Recognition of universal connections
  - **Intuitive Decisions** - Trust in inner guidance systems
  - **Pattern Recognition** - Ability to see underlying structures
  - **Emotional Intelligence** - Awareness of emotional landscapes
  - **Present Awareness** - Mindful attention to the now
  - **Harmonic Alignment** - Resonance with natural rhythms
  - **Systems Thinking** - Understanding complex relationships

- **5-point scale responses** from "Never" to "Always"
- **Manual navigation** - Users must select answers before proceeding
- **Real-time data saving** - Individual responses saved immediately to Firebase
- **Progress tracking** with visual indicators
- **Mobile-friendly interface** with touch optimization

### 📊 **Results Visualization**
- **Personalized consciousness profile** with dominant attunement type
- **Interactive radar chart** showing scores across all 4 dimensions
- **Detailed insights** including:
  - Strengths analysis (top 2 categories)
  - Growth opportunities (areas for development)
  - Personalized interpretation based on HOLO methodology
- **Beautiful data visualization** with animated charts and gradients

### 💾 **Data Management**
- **Firebase Firestore** for secure data storage
- **User-specific data isolation** - Each user can only access their own results
- **Real-time data synchronization**
- **Scalable architecture** for high-volume event usage

## 🛠 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest UI library with concurrent features
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first styling with custom animations

### **Backend & Services**
- **Firebase Authentication** - Secure user management
- **Firebase Firestore** - NoSQL database for quiz results
- **Firebase Security Rules** - Data access control

### **Development & Deployment**
- **Vercel** - Serverless deployment platform
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Firebase project with Authentication and Firestore enabled

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/attuner-ai.git
   cd attuner-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase configuration**:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google providers)
   - Enable Firestore Database
   - Copy your Firebase config to `src/lib/firebase.ts`

4. **Configure environment variables**:
   ```bash
   # Create .env.local file with your Firebase config
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config values
   ```

5. **Set up Firestore Security Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /quizResults/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
         match /responses/{responseId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
   }
   ```

### **Development**

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Open in browser**:
   ```
   http://localhost:3000
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## 📱 Mobile Optimization

### **Features**
- **Responsive design** - Works on all screen sizes
- **Touch-optimized interface** - Large buttons and touch targets
- **Mobile browser compatibility** - Handles iOS Safari and Android Chrome quirks
- **PWA ready** - Can be installed as a web app
- **Offline error handling** - Graceful degradation with error boundaries

### **Mobile-Specific Fixes**
- **Firebase Auth mobile support** - Popup/redirect fallbacks for mobile browsers
- **Session persistence** - Maintains auth state across mobile browser sessions
- **Touch navigation** - Optimized for finger navigation
- **Viewport optimization** - Proper mobile viewport handling

## 🎪 Festival of Consciousness Setup

### **Event Configuration**
- **iPad kiosk mode** - Optimized for tablet displays
- **High-traffic handling** - Designed for concurrent users
- **Quick user flows** - Streamlined experience for event participants
- **Data collection** - Secure storage of all participant responses

### **Recommended Setup**
1. **Hardware**: iPad Pro or similar tablet in landscape mode
2. **Network**: Stable WiFi connection for Firebase sync
3. **Kiosk Mode**: Use guided access or kiosk browser
4. **Backup**: Local admin access for troubleshooting

## 🔧 Configuration

### **Firebase Setup**
```javascript
// src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### **Quiz Questions Configuration**
Questions are defined in `src/data/quizQuestions.ts` with:
- Question text and descriptions
- Category mapping to HOLO dimensions
- Scoring algorithms for each dimension

### **Styling Customization**
- **Colors**: Defined in `tailwind.config.js`
- **Animations**: Custom CSS animations in `src/app/globals.css`
- **Components**: Modular components in `src/components/`

## 📊 Data Structure

### **User Quiz Results**
```typescript
interface UserQuizData {
  userId: string;
  email: string;
  timestamp: Date;
  responses: Record<string, number>; // questionId -> score (1-5)
  scores: {
    holistic: number;
    integration: number;
    consciousness: number;
    resonance: number;
  };
}
```

### **Individual Responses**
```typescript
interface QuizResponse {
  questionId: string;
  value: number; // 1-5 scale
  timestamp: Date;
  userId: string;
  userEmail: string;
}
```

## 🌐 Deployment

### **Vercel Deployment** (Recommended)
1. **Connect GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### **Manual Deployment**
```bash
# Build the application
npm run build

# Deploy to your hosting provider
npm run start
```

## 🔒 Security

### **Data Protection**
- **User isolation** - Each user can only access their own data
- **Firebase Security Rules** - Server-side data access control
- **HTTPS enforcement** - All traffic encrypted
- **Input validation** - Client and server-side validation

### **Privacy Considerations**
- **Minimal data collection** - Only quiz responses and email
- **Secure storage** - Firebase's enterprise-grade security
- **User control** - Users own their data and responses

## 📈 Analytics & Monitoring

### **Built-in Analytics**
- **Firebase Analytics** - User engagement and flow tracking
- **Error Boundary** - Graceful error handling and reporting
- **Performance monitoring** - Core Web Vitals tracking

### **Custom Events**
- Quiz completion rates
- Question response patterns
- User flow analytics
- Error tracking and debugging

## 🎨 Customization

### **Branding**
- **Logo**: Replace `public/assets/1.svg` with your logo
- **Colors**: Update `tailwind.config.js` color palette
- **Fonts**: Modify font imports in `src/app/layout.tsx`

### **Content**
- **Questions**: Edit `src/data/quizQuestions.ts`
- **Insights**: Modify `src/services/quizService.ts`
- **Copy**: Update text throughout the application

## 🐛 Troubleshooting

### **Common Issues**

**Firebase Authentication Errors on Mobile**
- Ensure popup blockers are disabled
- Check Firebase Auth domain configuration
- Verify mobile browser compatibility

**Quiz Not Progressing**
- Check that all questions have valid responses
- Verify Firebase connection and permissions
- Review browser console for JavaScript errors

**Build Failures**
- Check TypeScript errors with `npm run type-check`
- Verify all environment variables are set
- Review ESLint warnings with `npm run lint`

### **Debug Mode**
Enable debug logging by adding to your environment:
```bash
NEXT_PUBLIC_DEBUG=true
```

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### **Code Standards**
- **TypeScript** - All code must be properly typed
- **ESLint** - Follow the configured linting rules
- **Prettier** - Code formatting is automated
- **Conventional Commits** - Use semantic commit messages

## 📄 License

© 2025 ATTUNER.ai • Festival of Consciousness Barcelona

This project is proprietary software developed for the Festival of Consciousness Barcelona 2025.

## 🙏 Acknowledgments

- **Festival of Consciousness Barcelona 2025** - Event partnership
- **HOLO Methodology** - Consciousness assessment framework
- **Firebase** - Backend infrastructure
- **Vercel** - Deployment platform
- **Next.js Team** - Framework development

---

**Built with ❤️ for consciousness exploration and holistic AI integration**
