import { axiosInstance } from '../utils/axios'

class ReportService {
  /**
   * getChangeStatusToReview
   * @returns
   */
  async updateReportAgePriority(reportData) {
    const res = await axiosInstance.put(`/report/updateReportAgePriority`, reportData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res
  }

  /**
   * getAllPendingReports
   * @returns
   */
  async getAllPendingReports() {
    const { data } = await axiosInstance.get(`/report/getUpdateSendToRegulators`)
    return data
  }

  /**
   * getAllReportsSentToRegulators
   * @returns
   */
  async getAllReportsSentToRegulators() {
    const { data } = await axiosInstance.get(`/report/getAllReportsSentToRegulators`)
    return data?.results
  }

  /**
   * getSingleReportDetail
   * @returns
   */
  async getSpecificReport(id) {
    const { data } = await axiosInstance.get(`/report/getSingleReportDetail/${id}`)
    return data
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService()
