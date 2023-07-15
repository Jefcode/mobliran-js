import { Routes as DRoutes, Route } from 'react-router-dom';

import HomeScreen from '../../screens/HomeScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import CartScreen from '../../screens/CartScreen';
import WishListScreen from '../../screens/WishListScreen';
import NotFoundScreen from '../../screens/NotFoundScreen';
import AccountScreen from '../../screens/Account/AccountScreen';
import Dashboard from '../../screens/Account/Dashboard';
import Orders from '../../screens/Account/Orders';
import AccountDetails from '../../screens/Account/AccountDetails';
import EditAddress from '../../screens/Account/EditAddress';
import CheckoutScreen from '../../screens/CheckoutScreen';
import ShopScreen from '../../screens/ShopScreen';
import AboutUsScreen from '../../screens/Pages/AboutUsScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import UnauthorizedUserRoutes from '../utils/UnauthorizedUserRoutes';
import OrderDetail from '../../screens/Account/OrderDetail';
import AssureLoggedIn from '../utils/AssureLoggedIn';
import SearchScreen from '../../screens/SearchScreen';

const Routes = () => {
  return (
    <DRoutes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<SearchScreen />} />
      <Route path='/shop' element={<ShopScreen />} />
      <Route path='/product/:id' element={<ProductDetailScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/wishlist' element={<WishListScreen />} />
      <Route
        path='/checkout'
        element={
          <AssureLoggedIn>
            <CheckoutScreen />
          </AssureLoggedIn>
        }
      />

      <Route path='/auth' element={<UnauthorizedUserRoutes />}>
        <Route path='' element={<NotFoundScreen />} />
        <Route path='login' element={<LoginScreen />} />
        <Route path='register' element={<RegisterScreen />} />
      </Route>

      {/* Pages */}
      <Route path='/about-us' element={<AboutUsScreen />} />

      <Route path='/my-account' element={<AccountScreen />}>
        <Route path='' element={<Dashboard />} />
        <Route path='orders' element={<Orders />} />
        <Route path='orders/:id' element={<OrderDetail />} />
        <Route path='edit-account' element={<AccountDetails />} />
        <Route path='edit-address' element={<EditAddress />} />
      </Route>

      <Route path='/*' element={<NotFoundScreen />} />
    </DRoutes>
  );
};

export default Routes;
