import { PlanType } from './entities/Plan'
import { messaging } from './config/firebase';
import { onMessage, getToken } from 'firebase/messaging';
//import { onBackgroundMessage } from 'firebase/messaging/sw';
import { useEffect } from 'react';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    /*
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
    getToken(messaging).then((currentToken) => {
      console.log(currentToken);
    });
    */
    /*
    onBackgroundMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
    */
  }, []);

  return (
    <Login />
  )
}

export default App
