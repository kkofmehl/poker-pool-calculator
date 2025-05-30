import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GiEightBall, GiPokerHand } from 'react-icons/gi';
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from 'react-icons/gi';

interface FloatingElementProps {
  top: string;
  left: string;
  size: string;
  delay: number;
  rotate?: number;
  color?: string;
}

// Styled components
const BackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #105c10 0%, #1e4620 100%)',
  opacity: 0.95,
});

const PoolBall = styled(Box)<FloatingElementProps>(({ theme, size, top, left, delay }) => ({
  position: 'absolute',
  top,
  left,
  fontSize: size,
  color: theme.palette.common.white,
  animation: `float 15s infinite ease-in-out ${delay}s`,
  opacity: 0.15,
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(20px) rotate(10deg)',
    },
  },
}));

const CardSuit = styled(Box)<FloatingElementProps>(({ theme, size, top, left, delay, rotate = 0, color }) => ({
  position: 'absolute',
  top,
  left,
  fontSize: size,
  color: color === 'red' ? '#ff5555' : theme.palette.common.white,
  animation: `floatCard 20s infinite ease-in-out ${delay}s`,
  opacity: 0.15,
  transform: `rotate(${rotate}deg)`,
  '@keyframes floatCard': {
    '0%, 100%': {
      transform: `rotate(${rotate}deg) translateX(0)`,
    },
    '50%': {
      transform: `rotate(${rotate}deg) translateX(30px)`,
    },
  },
}));

export const ThemeBackground = () => {
  return (
    <BackgroundContainer>
      {/* Pool Balls */}
      <PoolBall top="5%" left="10%" size="50px" delay={0}>
        <GiEightBall />
      </PoolBall>
      <PoolBall top="75%" left="85%" size="70px" delay={2}>
        <GiEightBall />
      </PoolBall>
      <PoolBall top="40%" left="5%" size="40px" delay={4}>
        <GiEightBall />
      </PoolBall>
      <PoolBall top="25%" left="90%" size="60px" delay={1}>
        <GiEightBall />
      </PoolBall>
      
      {/* Poker Cards/Hands */}
      <PoolBall top="60%" left="20%" size="60px" delay={3}>
        <GiPokerHand />
      </PoolBall>
      <PoolBall top="10%" left="50%" size="50px" delay={5}>
        <GiPokerHand />
      </PoolBall>
      <PoolBall top="80%" left="40%" size="80px" delay={2}>
        <GiPokerHand />
      </PoolBall>
      
      {/* Card Suits */}
      <CardSuit top="15%" left="30%" size="40px" delay={1} rotate={15} color="red">
        <GiHearts />
      </CardSuit>
      <CardSuit top="70%" left="15%" size="50px" delay={3} rotate={-10}>
        <GiSpades />
      </CardSuit>
      <CardSuit top="30%" left="70%" size="45px" delay={2} rotate={5} color="red">
        <GiDiamonds />
      </CardSuit>
      <CardSuit top="85%" left="75%" size="55px" delay={4} rotate={-20}>
        <GiClubs />
      </CardSuit>
    </BackgroundContainer>
  );
}; 