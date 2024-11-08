import { useQuery } from '@tanstack/react-query'
import { getAllPrompts } from './api/PromptApi'

export const usePrompts = () => {
  const { data: prompts } = useQuery({
    queryKey: ['getAllPrompts'],
    queryFn: () => getAllPrompts(),
    initialData: []
  })

  return {
    prompts
  }
}
