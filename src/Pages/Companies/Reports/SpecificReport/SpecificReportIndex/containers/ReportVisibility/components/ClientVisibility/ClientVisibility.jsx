import React from 'react'
import { ClientItem } from './components/ClientItem/ClientItem'
import { useClientVisibility } from './useClientVisibility'

export const ClientVisibility = () => {
  const { clientToggleList } = useClientVisibility()

  return (
    <div>
      <h2 className="text-[18px] leading-[24px] font-[600] mb-4">Specific clients</h2>
      <div className="flex flex-col gap-4 w-full justify-between">
        {clientToggleList?.map((client) => (
          <ClientItem key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}
