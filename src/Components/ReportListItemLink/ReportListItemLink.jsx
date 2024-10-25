import { Link } from 'react-router-dom'
export const ReportListItemLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      boxShadow: ' 0px 13px 12px -16px rgba(0, 0, 0, 0.05), 0px 0px 12px 0px rgba(0, 0, 0, 0.1)'
    }}
    className="p-4 cursor-pointer rounded-xl border border-borderLight hover:border-black"
  >
    {children}
  </Link>
)
