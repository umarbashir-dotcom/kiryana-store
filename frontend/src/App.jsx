import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"
import { ProductsProvider } from "./context/ProductsContext"
import { CategoriesProvider } from "./context/CategoriesContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"


import ProtectedRoutes from './routes/ProtectedRoutes'
import PublicRoutes from "./routes/PublicRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import MainLayout from "./layouts/MainLayout"

import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

import CategoryPage from "./pages/CategoryPage"
import SearchResultsPage from "./pages/SearchResultsPage"
import ShopPage from "./pages/ShopPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import CheckoutPage from "./pages/CheckoutPage"
import AccountPage from "./pages/AccountPage"
import OTPPage from "./pages/OTPPage"
import ProfilePage from "./pages/ProfilePage"
import OrdersPage from "./pages/OrdersPage"

import CheckoutSuccessPage from "./pages/CheckoutSuccessPage"
import CheckoutCancelPage from "./pages/CheckoutCancelPage"
import BankTransferPage from "./pages/BankTransferPage"

import AdminLayout from "./layouts/AdminLayout"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import AdminProductsPage from "./pages/AdminProductsPage"
import AdminOrdersPage from "./pages/AdminOrdersPage"
import AdminCategoriesPage from "./pages/AdminCategoriesPage"
import AdminCustomersPage from "./pages/AdminCustomersPage"

import { Toaster } from "sonner"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      // protected routes
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<CategoryPage />} />
          <Route path="/search/product/" element={<SearchResultsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/checkout-success/:orderId" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/checkout-cancel/:orderId" element={<CheckoutCancelPage />} />
          <Route path="/checkout/bank-transfer/:orderId" element={<BankTransferPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>
      </Route>

      // admin routes
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminLayout  />} >
          <Route index element={<AdminDashboardPage />}/>
          <Route path="/admin/products" element={<AdminProductsPage />}/>
          <Route path="/admin/orders" element={<AdminOrdersPage />}/>
          <Route path="/admin/categories" element={<AdminCategoriesPage />}/>
          <Route path="/admin/customers" element={<AdminCustomersPage />}/>
        </Route>
      </Route>

      // public routes
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/OTP" element={<OTPPage />} />
      </Route>

      <Route path="/register" element={<RegisterPage />} />
      
    </Route>
  )
)
const App = () => {
  return (
      <>
        <Toaster
        position="bottom-right"
        richColors
        closeButton
        duration={3000}
        expand={false}
        />
        <AuthProvider>
          <ProductsProvider>
            <CategoriesProvider>
              <CartProvider>
                <WishlistProvider>
                  <OrderProvider>
                    <RouterProvider router={router} />
                  </OrderProvider>
                </WishlistProvider>
              </CartProvider>
            </CategoriesProvider>
          </ProductsProvider>
        </AuthProvider>
    </>
  )
}

export default App