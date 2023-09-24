import * as React from 'react'
import { styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import { Virtuoso } from 'react-virtuoso'
import { ReactComponent as ArrowRightIcon } from '~/assets/arrow_right.svg'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Color } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import Product from '../Product'
import { GetProductsApiResponse, ProductType } from '~/types/product.type'
import { useEffect, useMemo, useRef } from 'react'
import { useBoundStore } from '~/contexts/app.context'
import { useQuery } from 'react-query'
import { productApi } from '~/api/product.api'
import theme from '~/theme'

interface ProductCategoryProps {}
type GroupedProducts = Record<string, ProductType[]>

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  () => ({
    border: `none`,
    marginBottom: '8px',
    marginRight: '4px',
    '&:before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <SvgIcon sx={{ width: '24px', height: '24px', padding: '7.5px 9px' }} component={ArrowRightIcon} inheritViewBox />
    }
    {...props}
  />
))(({ theme }) => ({
  padding: '12px 16px',
  borderRadius: '8px',
  height: '48px',
  border: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: (theme.palette.neutral as unknown as Color)[200]
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  },
  '&:hover': {
    backgroundColor: (theme.palette.neutral as unknown as Color)[800]
  },
  '&:active': {
    backgroundColor: (theme.palette.neutral as unknown as Color)[700]
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0 0 0 32px'
}))

const ProductCategory: React.FC<ProductCategoryProps> = () => {
  const [expanded, setExpanded] = React.useState<string | false>('')
  const setList = useBoundStore((state) => state.setList)
  const productRef = useRef<boolean>(false)
  const { data, isLoading } = useQuery({
    queryKey: ['productList'],
    queryFn: () => productApi.getProduct({})
  })
  const productList = useMemo(() => {
    return data?.data.products || []
  }, [data])
  // useEffect(() => {
  //   if (!isSearchProduct) {
  //     setExpanded('')
  //   }
  // }, [isSearchProduct])
  useEffect(() => {
    if (productRef.current) return
    if (data?.data) {
      setList(data?.data as GetProductsApiResponse)
      productRef.current = true
    }
  }, [setList, productList, data?.data])

  const handleChange = (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const groupProducts: Record<string, ProductType[]> = useMemo(() => {
    return productList.reduce((result, product) => {
      const category = product.category
      if (!result[category]) {
        result[category] = []
      }
      result[category].push(product)
      return result
    }, {} as GroupedProducts)
  }, [productList])

  if (!productList) return null
  return (
    <div>
      {isLoading
        ? Array(20)
            .fill(' ')
            .map((_, index) => (
              <Skeleton
                sx={{
                  padding: '12px 16px',
                  marginBottom: '8px',
                  marginRight: '4px',
                  borderRadius: '8px',
                  height: '48px'
                }}
                key={index}
                variant='circular'
                height={48}
              />
            ))
        : Object.keys(groupProducts).map((category) => {
            return (
              <Accordion key={category} expanded={expanded === category} onChange={handleChange(category)}>
                <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                  <Typography sx={{ textTransform: 'capitalize' }} variant='h3'>
                    {category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Virtuoso
                    style={{ height: `calc(${theme.pet.productItemHeight} * ${groupProducts[category].length})` }}
                    data={groupProducts[category]}
                    itemContent={(productIndex, product) => <Product key={productIndex} product={product} />}
                  />
                </AccordionDetails>
              </Accordion>
            )
          })}
    </div>
  )
}
export default ProductCategory
