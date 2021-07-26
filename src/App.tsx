import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { resourceLimits } from 'worker_threads';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { firebase, auth } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);

    if (res.user) {
      const { displayName, photoURL, uid } = res.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  return (
    <Router>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
