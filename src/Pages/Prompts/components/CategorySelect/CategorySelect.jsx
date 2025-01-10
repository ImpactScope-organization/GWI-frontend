import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import { CategorySelectGroupItem } from './components/CategorySelectGroupItem'
import { CategorySelectGroupTitle } from './components/CategorySelectGroupTitle'
import { useCategorySelect } from '../useCategorySelect'

export const CategorySelect = ({ name }) => {
  const {
    hasError,
    errorMessage,
    toggleDropdownVisible,
    value,
    isDropdownVisible,
    groupedPromptCategories,
    handleSelectCategory
  } = useCategorySelect(name)

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
                {groupedPromptCategories && (
                  <>
                    <CategorySelectGroupTitle>Qualitative</CategorySelectGroupTitle>
                    {groupedPromptCategories.qualitative.map((category) => (
                      <CategorySelectGroupItem
                        key={category.id}
                        category={category}
                        onClick={handleSelectCategory}
                      />
                    ))}
                    {groupedPromptCategories.quantitative.map((category) => (
                      <CategorySelectGroupItem
                        key={category.id}
                        category={category}
                        onClick={handleSelectCategory}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="ml-1">
        {hasError ? <div className="text-[#ff0000]">{errorMessage}</div> : null}
      </div>
    </div>
  )
}
