import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';

import Navbar from '../Navigation/Navbar';
import Footer from '../Partials/Footer';
import Routes from './Routes';
import { queryClient } from '../../react-query/queryClient';
import store from './store';
import { ShoppingCartContextProvider } from '../../context/ShoppingCartContext';
import { WishlistContextProvider } from '../../context/WishlistContext';
// import DescriptionBtn from '../Description/DescriptionBtn';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ShoppingCartContextProvider>
          <WishlistContextProvider>
            <div className='w-full max-w-full min-w-full min-h-screen overflow-hidden'>
              <Navbar />
              <Routes />
              {/* <DescriptionBtn /> */}
              <Footer />
              <ToastContainer rtl />
              <ReactQueryDevtools />
            </div>
          </WishlistContextProvider>
        </ShoppingCartContextProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
