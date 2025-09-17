import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { ROUTES } from '../../../routes'
import { CompanyListItemPaywall } from '../components/CompanyListItemPaywall/CompanyListItemPaywall'
import { PageHeaderWithBackButton } from '../../../Components/Page/PageHeaderWithBackButton/PageHeaderWithBackButton'
import { useGetCompany } from '../api/CompanyApiQuery'

export const CompanyPaywall = () => {
  const { company } = useGetCompany()

  return (
    <PageContainer>
      <PageHeaderWithBackButton
        title={`Unlock ${company?.name}`}
        subTitle="Get instant access to in-depth ESG reports that reveal the true impact of each company."
        to={ROUTES.companies.index}
      />
      <div className="flex justify-center w-full">
        <div className="w-2/3 mt-12">
          <CompanyListItemPaywall company={company} disabled />
          <div>
            hello here comes the card payment and the billing info :) billing later you know it is
            hard..
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
