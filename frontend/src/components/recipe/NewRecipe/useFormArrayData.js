import { useState } from 'react'

export const useFormArrayData = (initialValues) => {
  const [ingredientValues, setIngredientValues] = useState(initialValues)

  const handleIngredientInputChange = (e) => {

    const { name, value } = e.target

    console.log(`${name} ${value}`)

    if (name.startsWith('ingredients_')) {
      const [table, row, type ] = name.split('_')
      console.log(table)
      const newData = ingredientValues.find(f => f.id.toString() === row.toString())
      const newRow = { ...newData, [type]: value }
      const newArray = ingredientValues.map(i => i.id.toString() === row.toString() ? newRow : i)
      setIngredientValues(newArray)

      console.log(newArray)

    }

  }


  const originalValues = initialValues
  const resetIngredients = () => {
    setIngredientValues(originalValues)
  }
  return {
    ingredientValues,
    setIngredientValues,
    handleIngredientInputChange,
    resetIngredients
  }
}