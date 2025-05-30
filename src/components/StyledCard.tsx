import { Paper, styled } from '@mui/material';
import type { ReactNode } from 'react';

interface StyledCardProps {
  children: ReactNode;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.03))',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#fff',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
  },
}));

export const StyledCard = ({ children }: StyledCardProps) => {
  return <StyledPaper elevation={3}>{children}</StyledPaper>;
}; 