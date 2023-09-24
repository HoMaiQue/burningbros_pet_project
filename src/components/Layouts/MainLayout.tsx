import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import theme from '~/theme'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container
      sx={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      disableGutters
      maxWidth={false}
    >
      <Box
        sx={{
          width: '528px',
          height: theme.pet.mainLayoutHeight,
          borderRadius: '24px',
          p: '24px',
          gap: '32px',
          backgroundColor: 'neutral.900',
          boxShadow: '0px 0px 4px 0px #052B611F ,2px 6px 12px 0px #0000001F'
        }}
      >
        {children}
      </Box>
    </Container>
  )
}
export default MainLayout
