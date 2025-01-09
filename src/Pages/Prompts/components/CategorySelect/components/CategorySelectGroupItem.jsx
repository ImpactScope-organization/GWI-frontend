import React from 'react'
import { CategorySelectOptionItem } from './CategorySelectOptionItem'
import { CategorySelectGroupTitle } from './CategorySelectGroupTitle'

export const CategorySelectGroupItem = ({ category, onClick }) => (
  <div>
    {category.isQuantitative && category.subCategories.length > 0 && (
      <div>
        <CategorySelectGroupTitle>{category.name}</CategorySelectGroupTitle>
        {category.subCategories.map((subCategory) => (
          <CategorySelectOptionItem key={subCategory.id} category={subCategory} onClick={onClick} />
        ))}
      </div>
    )}
    {(!category.isQuantitative || category.subCategories.length === 0) && (
      <CategorySelectOptionItem category={category} onClick={onClick} />
    )}
  </div>
)
