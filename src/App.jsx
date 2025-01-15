import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import ForgotPassword from "./pages/ForgetPassword";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Assets from "./pages/Assets";
import ChangePassword from "./pages/ChangePassword";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermOfService";
import Referral from "./pages/Referral";
import Rewards from "./pages/Rewards";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/forget-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
              {/* <Route path="/assets" element={<Assets />} /> */}
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/rewards" element={<Rewards />} />
            </Routes>
          </Layout>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
