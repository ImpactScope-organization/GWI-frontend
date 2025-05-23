import { CloseCircleOutlined } from '@ant-design/icons'

export const TagWithClose = ({ tag, onClose }) => {
  return (
    <div className="w-full flex items-center justify-center bg-darkGreen text-white rounded-md p-4 relative">
      <span>{tag}</span>
      <button
        className="absolute -right-2 -top-2 text-red-400 bg-white text-xl leading-4 w-6 h-6 rounded-full hover:text-red-600"
        onClick={onClose}
        type="button"
      >
        <CloseCircleOutlined />
      </button>
    </div>
  )
}
