import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { serverUrl } from './main';
import { setOnlineUsers } from './redux/userSlice';
import { SocketContext } from './context/SocketContext';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import getCurrentUser from './customHooks/useGetCurrentUser';
import getOtherUsers from './customHooks/useGetOtherUsers';

function App() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  getCurrentUser();
  getOtherUsers();

  useEffect(() => {
    if (userData) {
      const socketInstance = io(serverUrl, {
        query: {
          userId: userData._id,
        },
      });
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => socketInstance.disconnect();
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
