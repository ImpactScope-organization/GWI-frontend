import { useEditPromptCategory } from './useEditPromptCategory'
import { ROUTES } from '../../../routes'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'

export const EditPromptCategory = () => {
  const { promptCategory } = useEditPromptCategory()

  return (
    <div>
      <TitleWithBackButton
        title={promptCategory.name}
        to={ROUTES.promptCategories.index}
      ></TitleWithBackButton>
    </div>
  )
}
