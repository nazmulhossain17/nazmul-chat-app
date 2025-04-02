import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import LoginPage from "./pages/login/loginPage"
import SignupPage from "./pages/signup/SignupPage"
import SettingsPage from "./pages/settings/SettingsPage"
import ProfilePage from "./pages/profile/ProfilePage"
import HomePage from "./pages/home/HomePage"
import { Toaster } from 'react-hot-toast';


function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log({ onlineUsers })

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log({ checkAuth })

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    )
  }
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
