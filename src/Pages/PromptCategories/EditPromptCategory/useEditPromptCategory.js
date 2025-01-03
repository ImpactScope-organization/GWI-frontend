import { useQuery } from '@tanstack/react-query'
import { getPromptCategory } from '../api/PromptCategoryApi'
import { useParams } from 'react-router-dom'

export const useEditPromptCategory = () => {
  const { id } = useParams()

  const {
    data: { result: promptCategory }
  } = useQuery({
    queryKey: ['getPromptCategory', id],
    queryFn: () => getPromptCategory(id),
    initialData: {
      result: {
        name: '',
        isNumeric: false,
        children: []
      }
    }
  })

  return {
    promptCategory
  }
}
