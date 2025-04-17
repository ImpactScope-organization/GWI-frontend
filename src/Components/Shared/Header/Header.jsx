import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes'
import { HeaderLink } from './HeaderLink'
import { UserDropdown } from './components/UserDropdown'
import { RoleRender } from '../../Restrict/RoleRender/RoleRender'
import { ROLES } from '../../../utils/roles'

export const Header = () => {
  return (
    <div className="bg-darkBlack">
      <div className="flex justify-between items-center py-5 w-[90%] mx-auto ">
        <Link to={ROUTES.companies.index} className="flex justify-between gap-20 items-center">
          <img src="/assets/logo.png" alt="logo" />
        </Link>

        <div className="flex justify-center items-center gap-10">
          <HeaderLink to={ROUTES.companies.index} pathToBeActive={ROUTES.companies.index}>
            Companies
          </HeaderLink>
          <RoleRender role={ROLES.ADMIN}>
            <HeaderLink to={ROUTES.prompts.index}>Prompts</HeaderLink>
            <HeaderLink to={ROUTES.clients.index}>Clients</HeaderLink>
          </RoleRender>
          <UserDropdown />
        </div>
      </div>
    </div>
  )
}
