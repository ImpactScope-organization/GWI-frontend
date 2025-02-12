import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { useFormikContext } from 'formik'
import { Upload } from 'antd'

export const ExistingFileInput = ({ name, updateName }) => {
  const formik = useFormikContext()

  const file = formik.values[name]
  const [fileList, setFileList] = useState([])
  const hasError = formik.touched[name] && formik.errors[name]

  const hasUpdateFile = fileList.length > 0

  return (
    <>
      <Upload
        accept=".txt,.xlsx,.xls,.csv,.json"
        className={`
        w-full bg-[#f5f4f4] 
        border ${hasError ? 'border-[#ff0000]' : 'border-[#d9d9d9]'} 
        rounded-md p-4 flex items-center justify-center hover:border-primary cursor-pointer
        `}
        onRemove={(file) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          setFileList(newFileList)
        }}
        beforeUpload={(file) => {
          setFileList([file])
          formik.setFieldValue(updateName, file)
          return false
        }}
        fileList={fileList}
        showUploadList={false}
      >
        <div className="flex flex-col items-center">
          <InboxOutlined className="text-3xl mb-2 text-primary" />
          <div>
            {hasUpdateFile && (
              <div className="text-center">
                <div className="text-primary italic">{fileList[0].name}</div>
                <div className="text-xs italic">
                  Drag and drop a file here or click to replace a file
                </div>
              </div>
            )}

            {!hasUpdateFile && file?.originalname && (
              <div className="text-center">
                <div className="text-primary italic">{file?.originalname}</div>
                <div className="text-xs italic">Drag and drop a file here to change this file</div>
                <div className="text-xs font-bold text-red-600">
                  ❗if you change the file, the old will be deleted❗
                </div>
              </div>
            )}
          </div>
        </div>
      </Upload>
      <>
        {hasUpdateFile && (
          <div className="bg-amber-100 p-4 rounded italic text-sm">
            <div>A new file have been updated, which replaces the old one.</div>
            <div>If you save this prompt the old file will be deleted.</div>
            <div>You need to save the prompt to run a test on the new file.</div>
          </div>
        )}
      </>
    </>
  )
}
