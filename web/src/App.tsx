import { Header } from './components/Header';
import { AppProvider } from './context';
import { GlobalLayout } from './global/layout';
import { AppRoutes } from './routes';

function App() {
  return (
    <>
      <GlobalLayout />
      <AppProvider>
        <Header />
        <AppRoutes />
      </AppProvider>
    </>
  );
}

export default App;
