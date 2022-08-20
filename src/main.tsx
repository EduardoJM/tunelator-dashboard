import ReactDOM from 'react-dom';
import { QueryClient } from 'react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.render(
  <App queryClient={queryClient} />,
  document.getElementById('root')
);
