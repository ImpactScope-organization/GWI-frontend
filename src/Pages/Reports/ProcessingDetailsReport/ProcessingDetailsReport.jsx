import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'

import { useProcessingDetailsReport } from './useProcessingDetailsReport'
import { Progress } from 'antd'
import { PageHeader } from '../../../Components/Page/PageHeader/PageHeader'

export const ProcessingDetailsReport = () => {
  const { percentage, processText } = useProcessingDetailsReport()

  return (
    <PageContainer>
      <PageHeader title="Processing companyName" subTitle={processText} />
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Progress percent={percentage} format={(percent) => `${percent}%`} />
      </div>
    </PageContainer>
  )
}
