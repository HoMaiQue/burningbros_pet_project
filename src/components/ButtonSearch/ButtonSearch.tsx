import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as SearchButton } from '~/assets/Button_Search.svg'
interface ButtonSearchProps {
  onClick: () => void
}
const ButtonSearch: React.FC<ButtonSearchProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: '24px',
        height: '24px',
        color: 'neutral.300',
        '& rect': { color: 'neutral.900' },
        '&:hover rect': { color: 'neutral.800' },
        '&:active rect': { color: 'neutral.700' },
        '&:focus rect': { color: 'neutral.900' },
        '&:focus .MuiTouchRipple-root': { color: 'neutral.900', border: '2px solid', borderColor: 'primary.200' },
        '&.Mui-disabled': {
          color: 'neutral.500',
          rect: { color: 'neutral.700' }
        }
      }}
      aria-label='delete'
    >
      <SvgIcon sx={{ cursor: 'pointer' }} component={SearchButton} inheritViewBox />
    </IconButton>
  )
}

export default ButtonSearch
