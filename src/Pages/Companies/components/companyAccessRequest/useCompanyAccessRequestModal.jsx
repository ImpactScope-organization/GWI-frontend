import { Modal } from 'antd'
import { useCallback } from 'react'
import { useAuthContext } from '../../../../Context/AuthContext'
import { getApi } from '../../../../utils/api'

export const useCompanyAccessRequestModal = () => {
  const [{ confirm }, modalContent] = Modal.useModal()
  const { userInfo } = useAuthContext()

  const open = useCallback(() => {
    confirm({
      title: (
        <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
          Would you like access to premium companies?
        </h2>
      ),
      icon: null,
      content: (
        <div className="mb-4">
          If you click Yes, one of our representatives will get back to you soon via email to{' '}
          <span className="font-semibold">{userInfo.email}</span>
        </div>
      ),
      onOk: async () => {
        try {
          const api = await getApi()
          await api.post('/api/enquiry')

          Modal.success({
            title: 'Request Submitted',
            content: 'Thank you! We will get back to you soon via email.'
          })
        } catch (error) {
          console.debug('error when making request', error)
          // 1. Try to get the specific message from the server
          const serverErrorMessage = error.response?.data?.error
          console.debug(serverErrorMessage)
          // 2. Fallback message if server is unreachable or sends a different format
          const defaultMessage = 'An error occurred while submitting your request.'
          Modal.error({
            title: 'Submission Failed',
            content: serverErrorMessage || defaultMessage
          })
        }
      },
      okButtonProps: { className: 'w-[80px]' },
      okText: 'Yes',
      cancelText: 'Maybe later'
    })
  }, [confirm, userInfo.email])

  return { open, modalContent }
}
