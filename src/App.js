import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Shared/Header'
import Settings from './Pages/Settings'
import Login from './Components/Shared/Login'
import 'react-quill-new/dist/quill.snow.css'
import { ROUTES } from './routes'
import { NotFound } from './Pages/NotFound'
import { InternalReport } from './Pages/Reports/InternalReport/InternalReport'
import { RegulatorReport } from './Pages/Reports/RegulatorReport/RegulatorReport'
import CreateReport from './Pages/Reports/CreateReport'
import SpecificReport from './Pages/Reports/SpecificReport'

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path={ROUTES.reports.internal} element={<InternalReport />} />
        <Route path={ROUTES.reports.regulator} element={<RegulatorReport />} />
        <Route path={ROUTES.create} element={<CreateReport />} />
        <Route path={ROUTES.specificReport.index} element={<SpecificReport />} />
        <Route path={ROUTES.settings} element={<Settings />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
