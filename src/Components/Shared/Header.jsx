import { ConnectWallet } from '@thirdweb-dev/react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../routes'

const Header = () => {
  const location = useLocation()

  return (
    <div className="bg-darkBlack">
      <div className="flex justify-between items-center py-5 w-[90%] mx-auto ">
        {/* Left */}
        <div className="flex justify-between gap-20 items-center">
          <Link to={ROUTES.reports}>
            <img src="/assets/logo.png" alt="logo" />
          </Link>

          {/* <div className="space-x-5 ">
            <Link
              to={"/"}
              className={` ${
                location.pathname === "/" ? "text-[#fff]" : "text-[#fefefe7f]"
              } `}
            >
              pages
            </Link>
            <Link
              to={"/settings"}
              className={` ${
                location.pathname === "/settings"
                  ? "text-[#fff]"
                  : "text-[#fefefe7f]"
              } `}
            >
              Settings
            </Link>
          </div> */}
        </div>

        <div className="flex justify-center items-center gap-10">
          <ConnectWallet
            accentColor="#f213a4"
            colorMode="dark"
            width={{ base: '150px', md: 'unset' }}
            style={{ background: '#4DC601', color: 'white' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
