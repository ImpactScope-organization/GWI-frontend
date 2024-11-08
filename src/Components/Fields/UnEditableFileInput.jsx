import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { useFormikContext } from 'formik'

export const UnEditableFileInput = ({ name }) => {
  const formik = useFormikContext()

  const file = formik.values[name]

  return (
    <>
      <div
        className={`
        w-full bg-[#f5f4f4] 
        border 'border-[#d9d9d9]} 
        rounded-md p-4 flex items-center justify-center cursor-not-allowed
        `}
      >
        <div className="flex flex-col items-center">
          <InboxOutlined className="text-3xl mb-2 text-primary" />
          <div>
            {file && (
              <div className="text-center">
                <div className="text-primary italic">{file?.originalname}</div>
                <div className="text-xs italic">
                  (Files cannot be replaced, create a new document if you want to add one)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
