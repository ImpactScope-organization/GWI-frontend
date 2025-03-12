import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './Components/Shared/Header/Header'
import Login from './Components/Shared/Login'
import 'react-quill-new/dist/quill.snow.css'
import { ROUTES } from './routes'
import { NotFound } from './Pages/NotFound'
import { InternalReport } from './Pages/Companies/Reports/InternalReport/InternalReport'
import { RegulatorReport } from './Pages/Companies/Reports/RegulatorReport/RegulatorReport'
import CreateReport from './Pages/Companies/Reports/CreateReport/CreateReport'
import { SpecificReportIndex } from './Pages/Companies/Reports/SpecificReport/SpecificReportIndex/SpecificReportIndex'
import { Prompts } from './Pages/Prompts/Prompts'
import { CreatePrompt } from './Pages/Prompts/CreatePrompt/CreatePrompt'
import { PromptCategories } from './Pages/PromptCategories/PromptCategories'
import { EditPromptCategory } from './Pages/PromptCategories/EditPromptCategory/EditPromptCategory'
import { CreatePromptCategory } from './Pages/PromptCategories/CreatePromptCategory/CreatePromptCategory'
import { EditPromptPage } from './Pages/Prompts/EditPrompt/EditPromptPage'
import { ProcessingDetailsReport } from './Pages/Companies/Reports/ProcessingDetailsReport/ProcessingDetailsReport'
import { ProcessingReports } from './Pages/Companies/Reports/ProcessingReports/ProcessingReports'
import { SpecificReportEdit } from './Pages/Companies/Reports/SpecificReport/SpecificReportEdit/SpecificReportEdit'
import { Companies } from './Pages/Companies/Companies'
import { CreateCompany } from './Pages/Companies/CreateCompany/CreateCompany'
import { CompanyDetails } from './Pages/Companies/CompanyDetails/CompanyDetails'

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.companies.index} />} />
        <Route path={ROUTES.companies.reports.create} element={<CreateReport />} />
        <Route path={ROUTES.companies.index} element={<Companies />} />
        <Route path={ROUTES.companies.details} element={<CompanyDetails />} />
        <Route path={ROUTES.companies.create} element={<CreateCompany />} />
        <Route path={ROUTES.companies.reports.internal} element={<InternalReport />} />
        <Route path={ROUTES.companies.reports.regulator} element={<RegulatorReport />} />
        <Route path={ROUTES.companies.reports.processing} element={<ProcessingReports />} />
        <Route
          path={ROUTES.companies.reports.processingDetails}
          element={<ProcessingDetailsReport />}
        />
        <Route path={ROUTES.companies.reports.report.index} element={<SpecificReportIndex />} />
        <Route path={ROUTES.companies.reports.report.edit} element={<SpecificReportEdit />} />
        <Route path={ROUTES.specificReport.index} element={<SpecificReportIndex />} />
        <Route path={ROUTES.specificReport.edit} element={<SpecificReportEdit />} />
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
