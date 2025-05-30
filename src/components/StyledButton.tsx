import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material';

const StyledButtonRoot = styled(Button)(() => ({
  borderRadius: '50px',
  padding: '10px 24px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
  transition: 'all 0.2s',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.4s',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 6px 12px rgba(0, 0, 0, 0.25)`,
    '&::after': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const StyledButton = (props: ButtonProps) => {
  return <StyledButtonRoot {...props} />;
}; 