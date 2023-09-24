import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputProductName from '../InputProductName'
import { ProductType } from '~/types/product.type'
import theme from '~/theme'

interface ProductProps {
  product: ProductType
}
const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Box
      sx={{
        minWidth: '252px',
        height: theme.pet.productItemHeight,
        borderRadius: '8px',
        display: 'flex',
        gap: '24px',
        p: '12px 16px 12px 16px',
        alignItems: 'center',
        backgroundColor: 'neutral.900',
        position: 'relative',
        transition: 'all 10s linear',
        '&:hover::after': {
          display: 'block'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          border: '1px solid',
          borderColor: 'primary.200',
          display: 'none',
          borderRadius: '8px'
        }
      }}
    >
      <Box
        sx={{
          width: '72px',
          height: '72px',
          borderRadius: '8px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ width: '72px', height: '72px', position: 'relative', pt: '100%' }}>
          <Box
            src={product.thumbnail}
            component='img'
            sx={{
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          ></Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <InputProductName id={product.id} productName={product.title} />
        <Typography sx={{ color: 'textColor.200', px: '8px' }} variant='body2'>
          $ {product.price}
        </Typography>
      </Box>
    </Box>
  )
}
export default Product
