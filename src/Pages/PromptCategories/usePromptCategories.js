import { useQuery } from '@tanstack/react-query'
import { getPromptCategories } from './api/PromptCategoryApi'

export const usePromptCategories = () => {
  const { data: promptCategories } = useQuery({
    queryKey: ['getPromptCategories'],
    queryFn: () => getPromptCategories(),
    initialData: []
  })

  return {
    promptCategories
  }
}
