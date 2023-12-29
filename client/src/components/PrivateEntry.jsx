import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateEntry({ children }) {
  const [user, setUser] = useState(false);

  const verifyUser = () => {
    const storedUser = localStorage.getItem('user');
    const userId = JSON.parse(storedUser)?._id;
    
    if (userId) {
      setUser(true);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (user) {
    return children;
  } else {
    return <Navigate to={'/login'} replace />;
  }
}
