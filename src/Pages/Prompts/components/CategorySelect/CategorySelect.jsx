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
    handleSelectCategory,
    isDisabled
  } = useCategorySelect(name)

  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">Category</label>
      <div>
        <div
          className={`
            w-full border rounded-md p-4 cursor-pointer flex items-center justify-between
            ${isDisabled ? `text-black/25 bg-black/5 border-[#d9d9d9]` : 'bg-[#f5f4f4] hover:border-primary'}
            ${hasError ? 'border-[#ff0000]' : 'border-[#d9d9d9]'} 
          `}
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
        <div className="relative">
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
