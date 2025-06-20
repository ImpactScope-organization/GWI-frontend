import React, { useCallback } from 'react'
import { signS3Path } from '../../../../../api/S3Api'

export const ReportDocumentEditItem = ({ name, s3Path }) => {
  const handleDownload = useCallback(async () => {
    if (s3Path) {
      const {
        data: { result }
      } = await signS3Path(s3Path)
      window.location.href = result
    }
  }, [s3Path])

  return (
    <div
      className={`flex flex-row flex-nowrap justify-start items-center gap-2 rounded-2xl p-2 bg-gray-100 ${s3Path ? 'cursor-pointer hover:bg-gray-200' : ''}`}
      onClick={handleDownload}
    >
      <img src="/assets/xls-icon.svg" alt="xls-icon" />
      <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">{name}</h2>
    </div>
  )
}
