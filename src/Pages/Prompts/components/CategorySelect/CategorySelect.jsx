import { useFormikContext } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGroupedPromptCategories } from '../../../PromptCategories/api/PromptCategoryApi'
import { CaretDownOutlined } from '@ant-design/icons'

export const CategorySelect = ({ name }) => {
  const formik = useFormikContext()
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdownVisible = useCallback(() => {
    setDropdownVisible(!isDropdownVisible)
  }, [isDropdownVisible])

  const hasError = formik.touched[name] && formik.errors[name]

  const { data: categoryItems } = useQuery({
    queryKey: ['getGroupedPromptCategories'],
    queryFn: () => getGroupedPromptCategories(),
    initialData: []
  })

  const value = useMemo(() => {
    return formik.values[name]
      ? categoryItems.find(({ id }) => id === formik.values[name])?.name
      : 'Select a category'
  }, [categoryItems, formik.values, name])

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
                {categoryItems &&
                  categoryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className="w-full hover:bg-primary hover:text-white p-2 rounded cursor-pointer"
                    >
                      <div>{item.name}</div>
                    </div>
                  ))}
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
