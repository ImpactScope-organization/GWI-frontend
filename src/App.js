import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Shared/Header'
import Settings from './Pages/Settings'
import { useStepsContext } from './Context/StateContext'
import { useEffect } from 'react'
import Login from './Components/Shared/Login'
import { ROUTES } from './routes'
import Create from './Pages/Create/Create'
import AllReports from './Pages/AllReports/AllReports'
import SpecificReport from './Pages/SpecificReport/SpecificReport'

function App() {
  const { openLoginModal, setOpenLoginModal } = useStepsContext()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    if (!userInfo) {
      setOpenLoginModal(!openLoginModal)
    }
  }, [])

  return (
    <div className="App">
      {openLoginModal && <Login />}
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path={ROUTES.reports} element={<AllReports />} />
        <Route path={ROUTES.create} element={<Create />} />
        <Route path={ROUTES.settings} element={<Settings />} />
        <Route path={ROUTES.specificReport} element={<SpecificReport />} />
      </Routes>
    </div>
  )
}

export default App
