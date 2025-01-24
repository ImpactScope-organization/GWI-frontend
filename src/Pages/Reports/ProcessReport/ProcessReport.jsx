import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useParams } from 'react-router-dom'

export const ProcessReport = () => {
  const { id: reportQueryId } = useParams()

  return <PageContainer>{reportQueryId}</PageContainer>
}
