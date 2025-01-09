import { useQuery } from '@tanstack/react-query'
import { getRootPromptCategories } from './api/PromptCategoryApi'

export const usePromptCategories = () => {
  const { data: promptCategories } = useQuery({
    queryKey: ['getRootPromptCategories'],
    queryFn: () => getRootPromptCategories(),
    initialData: []
  })

  return {
    promptCategories
  }
}
