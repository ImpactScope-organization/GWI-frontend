import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './Components/Shared/Header/Header'
import { Login } from './Pages/Login/Login'
import 'react-quill-new/dist/quill.snow.css'
import { ROUTES } from './routes'
import { NotFound } from './Pages/NotFound'
import { InternalReport } from './Pages/Companies/Reports/InternalReport/InternalReport'
import { RegulatorReport } from './Pages/Companies/Reports/RegulatorReport/RegulatorReport'
import { CreateManualReport } from './Pages/Companies/Reports/CreateReport/CreateManualReport/CreateManualReport'
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
import { EditCompany } from './Pages/Companies/EditCompany/EditCompany'
import { Clients } from './Pages/Clients/Clients'
import { CreateClient } from './Pages/Clients/CreateClient/CreateClient'
import { EditClient } from './Pages/Clients/EditClient/EditClient'
import { RoleRoute } from './Components/Restrict/RoleRoute/RoleRoute'
import { ROLES } from './utils/roles'
import { AuthRoute } from './Components/Restrict/AuthRoute/AuthRoute'
import { CreateDocumentReport } from './Pages/Companies/Reports/CreateReport/CreateDocumentReport/CreateDocumentReport'
import { Register } from './Pages/B2C/Register/Register'
import { ForgotPassword } from './Pages/ForgotPassword/ForgotPassword'
import { SetNewPassword } from './Pages/SetNewPassword/SetNewPassword'
import { VerifyEmail } from './Pages/VerifyEmail/VerifyEmail'
import { ConfirmPayment } from './Pages/ConfirmPayment/ConfirmPayment'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route element={<AuthRoute />}>
          <Route path={ROUTES.home} element={<Navigate to={ROUTES.companies.index} />} />
          <Route path={ROUTES.companies.index} element={<Companies />} />

          <Route element={<RoleRoute role={ROLES.ADMIN} />}>
            <Route path={ROUTES.companies.create} element={<CreateCompany />} />
            <Route path={ROUTES.companies.edit} element={<EditCompany />} />
          </Route>

          <Route element={<RoleRoute role={ROLES.ADMIN} />}>
            <Route path={ROUTES.companies.reports.create.manual} element={<CreateManualReport />} />
            <Route
              path={ROUTES.companies.reports.create.document}
              element={<CreateDocumentReport />}
            />
            <Route path={ROUTES.companies.reports.internal} element={<InternalReport />} />
            <Route path={ROUTES.companies.reports.processing} element={<ProcessingReports />} />
          </Route>

          <Route path={ROUTES.companies.reports.regulator} element={<RegulatorReport />} />

          <Route element={<RoleRoute role={ROLES.ADMIN} />}>
            <Route
              path={ROUTES.companies.reports.processingDetails}
              element={<ProcessingDetailsReport />}
            />
            <Route path={ROUTES.companies.reports.report.edit} element={<SpecificReportEdit />} />
          </Route>
          <Route path={ROUTES.companies.reports.report.index} element={<SpecificReportIndex />} />

          <Route element={<RoleRoute role={ROLES.ADMIN} />}>
            <Route path={ROUTES.clients.index} element={<Clients />} />
            <Route path={ROUTES.clients.create} element={<CreateClient />} />
            <Route path={ROUTES.clients.edit} element={<EditClient />} />
            <Route path={ROUTES.prompts.index} element={<Prompts />} />
            <Route path={ROUTES.prompts.create} element={<CreatePrompt />} />
            <Route path={ROUTES.prompts.edit} element={<EditPromptPage />} />
            <Route path={ROUTES.promptCategories.index} element={<PromptCategories />} />
            <Route path={ROUTES.promptCategories.edit} element={<EditPromptCategory />} />
            <Route path={ROUTES.promptCategories.create} element={<CreatePromptCategory />} />
          </Route>
        </Route>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.b2c.register} element={<Register />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
        <Route path={ROUTES.setNewPassword} element={<SetNewPassword />} />
        <Route path={ROUTES.verifyEmail} element={<VerifyEmail />} />
        <Route path={ROUTES.confirmPayment} element={<ConfirmPayment />} />
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </div>
  )
}
