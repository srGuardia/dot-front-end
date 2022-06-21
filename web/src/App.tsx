import { AppProvider } from './context';
import { GlobalLayout } from './global/layout';
import { AppRoutes } from './routes';

function App() {
  return (
    <>
      <GlobalLayout />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </>
  );
}

export default App;
