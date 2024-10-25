import { Link, useMatch } from 'react-router-dom'

export const HeaderLink = ({ to, pathToBeActive = undefined, children }) => {
  const isRouteActive = useMatch({ path: pathToBeActive ?? to, end: false })

  return (
    <Link
      to={to}
      className={`text-white hover:text-green-300 cursor-pointer ${isRouteActive && 'text-primary'}`}
    >
      {children}
    </Link>
  )
}
