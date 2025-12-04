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
        <div>
          If you click Yes, one of our representatives will get back to you soon via email to{' '}
          <span className="font-semibold">{userInfo.email}</span>.
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
          Modal.error({
            title: 'Submission Failed',
            content: 'You have submitted a request before'
          })
        }
      },
      okText: 'Yes',
      cancelText: 'No'
    })
  }, [confirm, userInfo.email])

  return { open, modalContent }
}
