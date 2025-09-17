import { Link } from 'react-router-dom'
export const CategorizedListItemLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      boxShadow: ' 0px 13px 12px -16px rgba(0, 0, 0, 0.05), 0px 0px 12px 0px rgba(0, 0, 0, 0.1)'
    }}
    className={`p-4 rounded-xl border border-borderLight ${to ? 'hover:border-black cursor-pointer' : 'cursor-auto'} w-full block`}
  >
    {children}
  </Link>
)
