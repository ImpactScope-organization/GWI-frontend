import { useAccessContext } from '../../../../Context/AccessContext'

export const CompanySubscriptionHero = () => {
  const { isFreeB2CTier } = useAccessContext()
  return <>{isFreeB2CTier && <div>CompanySubscriptionHero</div>}</>
}
