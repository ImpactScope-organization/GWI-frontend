import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import React from 'react'
import { Divider } from 'antd'
import { EditClientForm } from './components/EditClientForm/EditClientForm'
import { CreateClientUserForm } from './components/CreateClientUserForm/CreateClientUserForm'
import { ClientUserList } from './components/ClientUserList/ClientUserList'

export const EditClient = () => {
  return (
    <TitleWithBackButton to={ROUTES.clients.index}>
      <div className="flex flex-col items-center">
        <div className="lg:w-2/3 2xl:w-1/2">
          <EditClientForm />
          <Divider className="my-8" />
          <CreateClientUserForm />
          <Divider className="my-8" />
          <ClientUserList />
        </div>
      </div>
    </TitleWithBackButton>
  )
}
