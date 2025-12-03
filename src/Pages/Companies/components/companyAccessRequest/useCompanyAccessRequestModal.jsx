import { Modal } from 'antd'
import { useCallback } from 'react'

export const useCompanyAccessRequestModal = () => {
  const [{ confirm }, modalContent] = Modal.useModal()

  const open = useCallback(() => {
    confirm({
      title: (
        <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
          Would you like access to premium companies?
        </h2>
      ),
      icon: null,
      content: <div>If you click yes, one of our representatives will get back to you soon.</div>,
      okText: 'Yes',
      cancelText: 'No'
    })
  }, [confirm])

  return { open, modalContent }
}
