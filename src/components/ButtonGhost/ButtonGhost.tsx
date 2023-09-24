import Button from '@mui/material/Button'
interface ButtonGhostProps {
  onClick: () => void
}
const ButtonGhost: React.FC<ButtonGhostProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: '76px',
        height: '42px',
        borderRadius: '8px',
        padding: '12px 16px 12px 16px',
        color: 'neutral.200',
        backgroundColor: 'neutral.900',
        transition: 'none',
        border: 'none',
        '&.Mui-disabled': {
          color: 'textColor.500'
        },
        '&:hover': {
          backgroundColor: 'neutral.800'
        },
        '&:active': {
          backgroundColor: 'neutral.700'
        },
        '&.Mui-focused': {
          border: '2px solid transparent',
          borderColor: 'primary.200'
        },
        '&:focus': {
          backgroundColor: 'neutral.700',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'primary.200'
        }
      }}
    >
      Cancel
    </Button>
  )
}

export default ButtonGhost
