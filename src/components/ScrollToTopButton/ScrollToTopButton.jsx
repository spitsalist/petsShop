import { IconButton, styled } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  zIndex: 1000,
  backgroundColor: theme.palette.primary.light,
  color: '#fff',
 
}));

const ScrollToTopButton = () => {
  const theme = useTheme();
  const showButton = useMediaQuery(theme.breakpoints.between(0, 620));
  const hideButton = useMediaQuery(theme.breakpoints.up(620));

//   console.log('ScrollToTopButton rendered');
//   console.log('showButton:', showButton);
//   console.log('hideButton:', hideButton);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showButton && !hideButton ? (
    <ScrollButton onClick={handleScrollToTop}>
      <ArrowUpwardIcon />
    </ScrollButton>
  ) : null;
};

export default ScrollToTopButton;