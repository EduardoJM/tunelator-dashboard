import { PlanItem } from './components/plans/PlanItem/PlanItem'
import { PlanType } from './entities/Plan'
import { messaging } from './config/firebase';
import { onMessage, getToken } from 'firebase/messaging';
//import { onBackgroundMessage } from 'firebase/messaging/sw';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
    getToken(messaging).then((currentToken) => {
      console.log(currentToken);
    });
    /*
    onBackgroundMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
    */
  }, []);

  return (
    <div>
      <PlanItem
        item={{
          description: 'Para conhecer a ferramenta.',
          display_features: [
            {
              enabled: true,
              name: 'Um e-mail'
            }
          ],
          id: 1,
          monthly_price: 0,
          name: 'Gratuíto',
          plan_type: PlanType.Free,
        }}
      />
    </div>
  )
}

export default App
