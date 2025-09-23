import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useAuthContext } from '../../../../Context/AuthContext'
import { Divider } from 'antd'

export const UserDropdown = () => {
  const { logout, userInfo } = useAuthContext()
  const [userDropdownVisible, setUserDropdownVisible] = useState(false)

  return (
    <div className="relative z-10">
      <button
        onClick={() => {
          setUserDropdownVisible(!userDropdownVisible)
        }}
        type="button"
        className={`${userDropdownVisible ? 'text-darkGreen' : 'text-white'} cursor-pointer hover:text-darkGreen`}
      >
        <UserOutlined />
      </button>
      {userDropdownVisible && (
        <>
          <div
            className="w-full h-full fixed top-0 left-0"
            onClick={() => setUserDropdownVisible(false)}
          ></div>
          <div className="absolute -right-4 top-16 bg-white p-2 text-right rounded-lg shadow-gray-400 shadow-md">
            <div className="p-2">{userInfo.email}</div>
            <Divider className="m-1" />
            <button
              className="hover:bg-gray-200 w-full text-right p-2 rounded"
              onClick={() => {
                setUserDropdownVisible(false)
                logout()
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
