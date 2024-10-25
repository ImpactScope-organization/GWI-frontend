import { ConnectWallet } from '@thirdweb-dev/react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes'
import { HeaderLink } from './HeaderLink'

const Header = () => {
  return (
    <div className="bg-darkBlack">
      <div className="flex justify-between items-center py-5 w-[90%] mx-auto ">
        {/* Left */}
        <Link to={ROUTES.reports.internal} className="flex justify-between gap-20 items-center">
          <img src="/assets/logo.png" alt="logo" />
        </Link>

        <div className="flex justify-center items-center gap-10">
          <HeaderLink to={ROUTES.reports.internal} pathToBeActive={ROUTES.reports.index}>
            Reports
          </HeaderLink>
          <HeaderLink to={ROUTES.prompts.index}>Prompts</HeaderLink>
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
