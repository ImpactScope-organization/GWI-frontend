import { Modal } from 'antd'
import { useCallback } from 'react'

export const useNewCompanyRequestModal = () => {
  const [{ confirm }, modalContent] = Modal.useModal()

  const open = useCallback(() => {
    confirm({
      title: (
        <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
          Request a New Company
        </h2>
      ),
      icon: null,
      content: <div></div>,
      okText: 'Submit',
      cancelText: 'Maybe later'
    })
  }, [confirm])

  return { open, modalContent }
}
