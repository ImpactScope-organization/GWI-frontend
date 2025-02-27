import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './Components/Shared/Header/Header'
import Login from './Components/Shared/Login'
import 'react-quill-new/dist/quill.snow.css'
import { ROUTES } from './routes'
import { NotFound } from './Pages/NotFound'
import { InternalReport } from './Pages/Reports/InternalReport/InternalReport'
import { RegulatorReport } from './Pages/Reports/RegulatorReport/RegulatorReport'
import CreateReport from './Pages/Reports/CreateReport/CreateReport'
import { SpecificReport } from './Pages/Reports/SpecificReport/SpecificReport'
import { Prompts } from './Pages/Prompts/Prompts'
import { CreatePrompt } from './Pages/Prompts/CreatePrompt/CreatePrompt'
import { PromptCategories } from './Pages/PromptCategories/PromptCategories'
import { EditPromptCategory } from './Pages/PromptCategories/EditPromptCategory/EditPromptCategory'
import { CreatePromptCategory } from './Pages/PromptCategories/CreatePromptCategory/CreatePromptCategory'
import { EditPromptPage } from './Pages/Prompts/EditPrompt/EditPromptPage'
import { ProcessingDetailsReport } from './Pages/Reports/ProcessingDetailsReport/ProcessingDetailsReport'
import { ProcessingReports } from './Pages/Reports/ProcessingReports/ProcessingReports'
import { EditSpecificReport } from './Pages/Reports/EditSpecificReport/EditSpecificReport'

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.reports.internal} />} />
        <Route path={ROUTES.reports.internal} element={<InternalReport />} />
        <Route path={ROUTES.reports.regulator} element={<RegulatorReport />} />
        <Route path={ROUTES.reports.processing} element={<ProcessingReports />} />
        <Route path={ROUTES.reports.processingDetails} element={<ProcessingDetailsReport />} />
        <Route path={ROUTES.reports.create} element={<CreateReport />} />
        <Route path={ROUTES.specificReport.index} element={<SpecificReport />} />
        <Route path={ROUTES.specificReport.edit} element={<EditSpecificReport />} />
        <Route path={ROUTES.prompts.index} element={<Prompts />} />
        <Route path={ROUTES.prompts.create} element={<CreatePrompt />} />
        <Route path={ROUTES.prompts.edit} element={<EditPromptPage />} />
        <Route path={ROUTES.promptCategories.index} element={<PromptCategories />} />
        <Route path={ROUTES.promptCategories.edit} element={<EditPromptCategory />} />
        <Route path={ROUTES.promptCategories.create} element={<CreatePromptCategory />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
