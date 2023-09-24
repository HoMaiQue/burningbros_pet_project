import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MainLayout from '~/components/Layouts/MainLayout'
import ProductCategory from '~/components/ProductCategory'
import SearchBar from '~/components/SearchBar'
import theme from '~/theme'
export default function Home() {
  return (
    <MainLayout>
      <SearchBar />
      <Box sx={{ mt: '32px', height: theme.pet.titleHeight }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Typography variant='h2'>Product List</Typography>
          <Box sx={{ flex: 1, border: '1px dashed', borderColor: 'neutral.500' }}></Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: '24px',
          height: `calc(${theme.pet.mainLayoutHeight} - ${theme.pet.searchHeight} - ${
            theme.pet.titleHeight
          } - ${theme.spacing(13)} )`,
          overflow: 'auto'
        }}
      >
        <ProductCategory />
      </Box>
    </MainLayout>
  )
}
