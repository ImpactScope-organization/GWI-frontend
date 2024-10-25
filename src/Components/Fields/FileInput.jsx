import React, { useState } from 'react'
import { Upload } from 'antd'

export const FileInput = ({ formik, name }) => {
  const [fileList, setFileList] = useState([])
  const hasError = formik.touched[name] && formik.errors[name]

  return (
    <>
      <Upload
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
          console.log(file)
          formik.setFieldValue(name, file)
          return false
        }}
        fileList={fileList}
        showUploadList={false}
      >
        <div>
          {fileList.length > 0 ? (
            <div className="text-center">
              <div className="text-primary italic">{fileList[0].name}</div>
              <div>(Drag and drop a file here or click to replace a file)</div>
            </div>
          ) : (
            <div>Drag and drop a file here or click to select a file</div>
          )}
        </div>
      </Upload>
      {hasError ? <div className="text-[#ff0000]">{formik.errors[name]}</div> : null}
    </>
  )
}
