'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TestFirebase() {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const testFirebaseWrite = async () => {
    if (!user) {
      setTestResult('❌ No user logged in');
      return;
    }

    setLoading(true);
    setTestResult('🔄 Testing Firebase connection...');

    try {
      // Test write
      const testData = {
        userId: user.uid,
        email: user.email,
        testMessage: 'Hello from test page!',
        timestamp: new Date(),
        randomNumber: Math.random()
      };

      console.log('🔥 Testing write to Firebase...');
      console.log('User ID:', user.uid);
      console.log('Test data:', testData);

      await setDoc(doc(db, 'test', user.uid), testData);
      console.log('✅ Write successful!');

      // Test read
      const docRef = doc(db, 'test', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log('✅ Read successful!');
        console.log('Retrieved data:', docSnap.data());
        setTestResult('✅ Firebase read/write test successful! Check console for details.');
      } else {
        setTestResult('❌ Could not read back the written data');
      }

    } catch (error) {
      console.error('❌ Firebase test error:', error);
      setTestResult(`❌ Firebase error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Firebase Test</h1>
          <p>Please log in to test Firebase connectivity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Firebase Test Page</h1>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Info</h2>
          <p><strong>UID:</strong> {user.uid}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
          <h2 className="text-xl font-semibold mb-4">Firebase Test</h2>
          <button
            onClick={testFirebaseWrite}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold py-2 px-4 rounded-lg hover:from-cyan-300 hover:to-purple-300 transition-all disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Firebase Write/Read'}
          </button>
          
          {testResult && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}
        </div>

        <div className="text-center">
          <a href="/quiz" className="text-cyan-400 hover:text-cyan-300 underline">
            Back to Quiz
          </a>
        </div>
      </div>
    </div>
  );
} 