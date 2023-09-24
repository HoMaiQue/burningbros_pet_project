import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import SvgIcon from '@mui/material/SvgIcon'
import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { productApi } from '~/api/product.api'
import { ReactComponent as SearchIcon } from '~/assets/ic_search_18.svg'
import { useBoundStore } from '~/contexts/app.context'
import theme from '~/theme'
import ButtonGhost from '../ButtonGhost'
import ButtonSearch from '../ButtonSearch'

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | undefined>(undefined)
  const isSearchProduct = useBoundStore((state) => state.isSearchProduct)
  const setIsSearchProduct = useBoundStore((state) => state.setIsSearchProduct)
  const setProductListSearch = useBoundStore((state) => state.setProductListSearch)

  const allProductList = useBoundStore((state) => state.productList)
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['productSearch', value],
    queryFn: () => productApi.searchProduct({ query: value }),
    enabled: Boolean(isSearchProduct)
  })

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault()
        setIsSearchProduct(true)
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
  }, [setIsSearchProduct])

  useEffect(() => {
    if (data?.data && isSearchProduct && value) {
      queryClient.setQueryData('productList', (oldData: unknown) => {
        if (oldData) {
          return { ...oldData, data: data?.data }
        }
      })
      setProductListSearch(data?.data)
    }
  }, [data?.data, isSearchProduct, queryClient, setProductListSearch, value])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleClickDelete = () => {
    setValue('')
  }

  const handleClickCancel = () => {
    setIsSearchProduct(false)
    queryClient.setQueryData('productList', (oldData: unknown) => {
      if (oldData) {
        return { ...oldData, data: allProductList }
      }
    })
    setValue('')
  }

  return (
    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <OutlinedInput
        inputRef={inputRef}
        sx={{
          fontSize: '14px',
          lineHeight: '16.71px',
          width: '280px',
          height: theme.pet.searchHeight,
          border: '1px',
          p: '12px 16px 12px 16px',
          gap: '8px',
          borderRadius: '50px',
          backgroundColor: 'neutral.800',
          color: 'textColor.100',
          '& .css-1b5efw0-MuiSvgIcon-root': { color: value ? 'neutral.200' : 'neutral.400' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: value ? 'neutral.200' : 'neutral.500'
          },
          '&:hover': {
            backgroundColor: 'neutral.900',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.200'
            }
          },
          '&.Mui-focused': {
            backgroundColor: 'neutral.900',
            ".css-1b5efw0-MuiSvgIcon-root'": { color: 'neutral.200' }
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: 'primary.900'
          }
        }}
        placeholder='Search'
        id='outlined-adornment-weight'
        startAdornment={<SvgIcon sx={{ width: '18px', height: '18px' }} component={SearchIcon} inheritViewBox />}
        endAdornment={value ? <ButtonSearch onClick={handleClickDelete} /> : null}
        aria-describedby='outlined-weight-helper-text'
        inputProps={{
          'aria-label': 'weight'
        }}
        value={value}
        onChange={handleChangeInput}
      />
      {isSearchProduct && <ButtonGhost onClick={handleClickCancel} />}
    </Box>
  )
}

export default SearchBar
