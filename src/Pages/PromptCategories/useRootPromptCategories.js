import { useQuery } from '@tanstack/react-query'
import { getRootPromptCategories } from './api/PromptCategoryApi'

export const useRootPromptCategories = () => {
  const { data: rootPromptCategories } = useQuery({
    queryKey: ['getRootPromptCategories'],
    queryFn: () => getRootPromptCategories(),
    initialData: []
  })

  return {
    rootPromptCategories
  }
}
