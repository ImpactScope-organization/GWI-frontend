import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import html2canvas from 'html2canvas'
import { toast } from 'react-toastify'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { getApi } from '../../../../../../../../../utils/api'
import { getRouteWithParams, ROUTES } from '../../../../../../../../../routes'
import { captureScreen } from '../../../../../../../../../utils/helpers'

export const useQuantitativeReportNavigation = () => {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const { getCurrentCompanyReport, currentCompanyReport, reportId } = useCurrentCompanyReport()

  const [isSendToBlockchainInProgress, setIsSendToBlockchainInProgress] = useState(false)

  const storedOnBlockchain =
    currentCompanyReport?.blockchainFileURL && currentCompanyReport?.blockchainTransactionURL

  const handleSendToBlockchain = useCallback(async () => {
    setIsSendToBlockchainInProgress(true)
    try {
      const element = document.querySelector('#report-container')

      const canvas = await html2canvas(element)
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'))

      const file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('file', file)

      await (
        await getApi()
      ).post(`/api/blockchain/create/${reportId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
        }
      })
      await getCurrentCompanyReport()
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      } else {
        toast(error.message)
      }
    } finally {
      setIsSendToBlockchainInProgress(false)
    }
  }, [getCurrentCompanyReport, reportId])

  const deleteCompanyHandler = useCallback(async () => {
    if (
      window.confirm(
        `Are you sure you want to delete this Report? \n${currentCompanyReport?.companyName}`
      )
    ) {
      const response = await (
        await getApi()
      ).delete(`/api/report/delete/${currentCompanyReport?.id}`)
      const { data } = response
      if (data?.status === 'success') {
        toast.success(data?.message)
        navigate(
          getRouteWithParams(ROUTES.companies.reports.internal, {
            companyId
          })
        )
      } else {
        toast.error('something went wrong while deleting the report')
      }
    }
  }, [companyId, currentCompanyReport, navigate])

  const dropdownConfiguration = useMemo(() => {
    return {
      items: [
        {
          label: 'Modify Report',
          onClick: () => {
            navigate(
              getRouteWithParams(ROUTES.companies.reports.report.edit, {
                companyId,
                reportId
              })
            )
          }
        },
        {
          label: 'Save as PDF',
          onClick: () => {
            captureScreen('report-container', currentCompanyReport?.companyName)
          }
        },
        { label: 'Remove from DB', onClick: deleteCompanyHandler }
      ]
    }
  }, [companyId, currentCompanyReport?.companyName, deleteCompanyHandler, navigate, reportId])

  return {
    handleSendToBlockchain,
    isSendToBlockchainInProgress,
    deleteCompanyHandler,
    dropdownConfiguration,
    storedOnBlockchain
  }
}
