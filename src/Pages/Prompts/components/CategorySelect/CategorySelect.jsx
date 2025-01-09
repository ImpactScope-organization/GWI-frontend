import { useFormikContext } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGroupedPromptCategories } from '../../../PromptCategories/api/PromptCategoryApi'
import { CaretDownOutlined } from '@ant-design/icons'
import { CategorySelectOptionItem } from './components/CategorySelectOptionItem'
import { CategorySelectGroupItem } from './components/CategorySelectGroupItem'
import { CategorySelectGroupTitle } from './components/CategorySelectGroupTitle'

export const CategorySelect = ({ name }) => {
  const formik = useFormikContext()
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdownVisible = useCallback(() => {
    setDropdownVisible(!isDropdownVisible)
  }, [isDropdownVisible])

  const hasError = formik.touched[name] && formik.errors[name]

  const { data: categoryGroups } = useQuery({
    queryKey: ['getGroupedPromptCategories'],
    queryFn: () => getGroupedPromptCategories(),
    initialData: []
  })

  const categoryIds = useMemo(() => {
    if (!categoryGroups?.qualitative || !categoryGroups?.quantitative) {
      return []
    }

    const flattenCategories = (categories) => {
      return categories.reduce((flattenedCategories, { id, name, subCategories }) => {
        flattenedCategories.push({ id, name })
        if (subCategories && subCategories.length > 0) {
          flattenedCategories = flattenedCategories.concat(flattenCategories(subCategories))
        }
        return flattenedCategories
      }, [])
    }

    return flattenCategories(categoryGroups?.qualitative).concat(
      flattenCategories(categoryGroups?.quantitative)
    )
  }, [categoryGroups])

  const value = useMemo(() => {
    return formik.values[name]
      ? categoryIds.find(({ id }) => id === formik.values[name])?.name
      : 'Select a category'
  }, [categoryIds, formik.values, name])

  const handleClick = useCallback(
    async (id) => {
      await formik.setFieldValue(name, id)
      toggleDropdownVisible()
    },
    [formik, name, toggleDropdownVisible]
  )

  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">Category</label>
      <div>
        <div
          className={`w-full bg-[#f5f4f4] border ${hasError ? 'border-[#ff0000]' : 'border-[#d9d9d9]'} rounded-md p-4 hover:border-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleDropdownVisible}
        >
          <span>{value}</span>
          <CaretDownOutlined />
        </div>
        {isDropdownVisible && (
          <div
            className="bg-black opacity-20 w-full h-full absolute top-0 left-0 z-10 cursor-pointer"
            onClick={toggleDropdownVisible}
          />
        )}
        <div className="bg-red-400 relative">
          {isDropdownVisible && (
            <div className={`w-full bg-white rounded absolute mt-2 z-20 p-4 shadow-lg border`}>
              <div>
                {categoryGroups && (
                  <>
                    <CategorySelectGroupTitle>Qualitative</CategorySelectGroupTitle>
                    {categoryGroups.qualitative.map((category) => (
                      <CategorySelectGroupItem category={category} onClick={handleClick} />
                    ))}
                    {categoryGroups.quantitative.map((category) => (
                      <CategorySelectGroupItem category={category} onClick={handleClick} />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
