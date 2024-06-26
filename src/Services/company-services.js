import axios from "axios";
import apiUrl from "../utils/baseURL";

class CompanyService {
  /**
   * saveCompanyAndData
   * @returns
   */
  async saveCompanyAndData(body) {
    try {
      const res = await axios.post(`${apiUrl}/api/company/save`, body);
      return res;
    } catch (e) {
      return e?.message || "something went wrong while saving company";
    }
  }

  /**
   * deleteCompany
   * @returns
   */
  async deleteCompany(id) {
    try {
      const res = await axios.delete(`${apiUrl}/api/company/delete?id=${id}`);
      return res;
    } catch (error) {
      return error.message || "something went wrong while deleting company";
    }
  }
}

export default new CompanyService();
