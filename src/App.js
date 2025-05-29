import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import AuthInitializer from './util/AuthInitializer';

const App = () => {
  return (
    <>
      <AuthInitializer />
      <RouterProvider router={root} />
    </>
  );
};

export default App;