import axios from 'axios'
import apiUrl from '../utils/baseURL'

class ReportService {
  async getCompanyReport(companyId) {
    const { data } = await axios.get(`${apiUrl}/api/company/${companyId}`)
    return data?.result
  }
  async getReportByReportQueueId(reportQueueId) {
    const { data } = await axios.get(
      `${apiUrl}/api/report/getReportByReportQueueId/${reportQueueId}`
    )
    return data?.result
  }

  async getAllInitializedReport() {
    const { data } = await axios.get(`${apiUrl}/api/company/all`)
    return data?.results
  }

  /**
   * getAllReportsSentToRegulators
   * @returns
   */
  async getAllReportsSentToRegulators() {
    const { data } = await axios.get(`${apiUrl}/api/report/getAllReportsSentToRegulators`)
    return data?.results
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService()
