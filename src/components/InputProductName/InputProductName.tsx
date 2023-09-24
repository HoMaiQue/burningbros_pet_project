import OutlinedInput from '@mui/material/OutlinedInput'
import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import { useBoundStore } from '~/contexts/app.context'
interface InputProductNameProps {
  productName: string
  id: number
}

const InputProductName: React.FC<InputProductNameProps> = ({ productName, id }) => {
  const [value, setValue] = useState(productName)
  const updateProductName = useBoundStore((state) => state.updateProductName)
  const productList = useBoundStore((state) => state.productList)
  const productListSearch = useBoundStore((state) => state.productListSearch)
  const isSearchProduct = useBoundStore((state) => state.isSearchProduct)
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (value) {
          updateProductName({ id, name: value })
          if (isSearchProduct) {
            queryClient.setQueryData('productList', (oldData: unknown) => {
              if (oldData) {
                return { ...oldData, data: { ...productListSearch } }
              }
            })
          } else {
            queryClient.setQueryData('productList', (oldData: unknown) => {
              if (oldData) {
                return { ...oldData, data: { ...productList } }
              }
            })
          }

          ;(inputRef.current as HTMLInputElement).blur()
        }
      }
    }
    if (inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (inputRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [id, isSearchProduct, productList, productListSearch, queryClient, updateProductName, value])

  useEffect(() => {
    const containerElement = inputRef.current
    const fieldSetEl = containerElement?.querySelector('.MuiOutlinedInput-notchedOutline') as Element

    const handleStyle = (childEl: Element) => {
      childEl.setAttribute('style', 'border: 2px solid; border-color: #d1b8fa;')
    }

    function handleClickOutSide(e: MouseEvent) {
      if (containerElement && !containerElement.contains(e.target as Node)) {
        if (fieldSetEl) {
          fieldSetEl.setAttribute('style', 'border: none')
          containerElement.addEventListener('focusin', () => handleStyle(fieldSetEl))
        }
      }
    }
    document.addEventListener('click', handleClickOutSide)
    return () => {
      document.removeEventListener('click', handleClickOutSide)
      containerElement?.removeEventListener('focusin', () => handleStyle(fieldSetEl))
    }
  }, [])

  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const containerElement = inputRef.current
    setValue(e.target.value)

    if (containerElement) {
      const fieldSetEl = containerElement.querySelector('.MuiOutlinedInput-notchedOutline')
      if (fieldSetEl) {
        fieldSetEl.setAttribute('style', `border: 1px solid #6713EF;   `)
      }
    }
  }

  return (
    <OutlinedInput
      inputRef={inputRef}
      fullWidth
      sx={{
        zIndex: 1,
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '20px',
        p: '4.5px 8px 4.5px 8px',
        gap: '8px',
        borderRadius: '8px',
        color: 'textColor.100',
        border: 'none',
        '& .MuiInputBase-input': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '& input': { p: 0 },
        '&:hover': {
          backgroundColor: 'neutral.800'
        },
        '&:active': {
          backgroundColor: 'neutral.700'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '2px solid',
          borderColor: 'primary.200'
        }
      }}
      id='outlined-adornment-weight'
      aria-describedby='outlined-weight-helper-text'
      inputProps={{
        'aria-label': 'weight'
      }}
      value={value}
      onChange={handleChangeInputName}
    />
  )
}

export default InputProductName
