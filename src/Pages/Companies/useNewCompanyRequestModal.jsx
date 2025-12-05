import { Modal } from 'antd'
import { useCallback } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { Input, Button } from 'antd'
import * as Yup from 'yup'
import { getApi } from '../../utils/api' // placeholder for your API
import { toast } from 'react-toastify'

const RequestSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  companySector: Yup.string().required('Sector is required'),
  companyWebsite: Yup.string().url('Must be a valid URL').required('Website is required'),
  reason: Yup.string().required('Please provide a reason')
})

export const NewCompanyRequestForm = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        companyName: '',
        companySector: '',
        companyWebsite: '',
        reason: ''
      }}
      validationSchema={RequestSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values)
        } catch (error) {
          setSubmitting(false)
        }
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form className="flex flex-col gap-4 mt-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <Input
              name="companyName"
              placeholder="e.g. Acme Corp"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.companyName && errors.companyName ? 'error' : ''}
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Company Sector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sector</label>
            <Input
              name="companySector"
              placeholder="e.g. Technology"
              value={values.companySector}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.companySector && errors.companySector ? 'error' : ''}
            />
            <ErrorMessage
              name="companySector"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
            <Input
              name="companyWebsite"
              placeholder="https://..."
              value={values.companyWebsite}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.companyWebsite && errors.companyWebsite ? 'error' : ''}
            />
            <ErrorMessage
              name="companyWebsite"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason for Request
            </label>
            <Input.TextArea
              name="reason"
              rows={3}
              placeholder="Why do we need this company?"
              value={values.reason}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.reason && errors.reason ? 'error' : ''}
            />
            <ErrorMessage name="reason" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 mt-4 pt-4">
            <Button onClick={onCancel} disabled={isSubmitting}>
              Maybe later
            </Button>
            <Button
              htmlType="submit"
              loading={isSubmitting}
              className="flex justify-center items-center text-white bg-primary border-primary hover:!bg-white font-bold"
            >
              Submit Request
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export const useNewCompanyRequestModal = () => {
  const [{ confirm }, modalContent] = Modal.useModal()

  const open = useCallback(() => {
    const modalInstance = confirm({
      title: (
        <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
          Request a New Company
        </h2>
      ),
      icon: null,

      // Hide the default AntD buttons because your Form has its own
      footer: null,

      width: 600, // Optional: make it a bit wider for the form

      content: (
        <NewCompanyRequestForm
          onCancel={() => {
            modalInstance.destroy()
          }}
          onSubmit={async (values) => {
            try {
              const api = await getApi()
              await api.post('/api/company/request', values)

              console.log('Submitted:', values)
              toast.success('Company request submitted!')
            } catch (error) {
              console.error(error)
              const errMessage = 'Something went wrong'
              const serverErrMessage = error.response.data.message
              toast.error(serverErrMessage || errMessage)
              // Rethrow error so Formik knows to stop the loading spinner
              throw error
            } finally {
              // Close the modal on success
              modalInstance.destroy()
            }
          }}
        />
      )
    })
  }, [confirm])

  return { open, modalContent }
}
