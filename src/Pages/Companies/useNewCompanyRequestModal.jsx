import { Modal } from 'antd'
import { useCallback } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { Input, Button } from 'antd'
import * as Yup from 'yup'
import { getApi } from '../../utils/api' // placeholder for your API
import { toast } from 'react-toastify'

const RequestSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  companyWebsite: Yup.string().url('Must be a valid URL').required('Website is required'),
  comment: Yup.string().max(300).required('Please tell us more about your request')
})

export const NewCompanyRequestForm = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        companyName: '',
        companyWebsite: '',
        comment: ''
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

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Comment <span className="opacity-70 font-normal">(Tell us more)</span>
            </label>
            <Input.TextArea
              name="comment"
              rows={3}
              placeholder="Anything else you want to tell us about this company or anything that you'd like us to look at?"
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.comment && errors.comment ? 'error' : ''}
            />
            <ErrorMessage name="comment" component="div" className="text-red-500 text-xs mt-1" />
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
        <>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
            Request a New Company
          </h2>
          <p className="opacity-70 font-normal">
            (Provide us the full name, including the legal form)
          </p>
        </>
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

              toast.success('Company request submitted!')
              modalInstance.destroy()
            } catch (error) {
              console.error(error)
              const errMessage = 'Something went wrong'
              const serverErrMessage = error?.response?.data?.error
              const serverErrMessage2 = error?.response?.data?.message
              toast.error(serverErrMessage || serverErrMessage2 || errMessage)
              if (!serverErrMessage.includes('fields are required')) {
                modalInstance.destroy()
              }
              // Rethrow error so Formik knows to stop the loading spinner
              throw error
            }
          }}
        />
      )
    })
  }, [confirm])

  return { open, modalContent }
}
