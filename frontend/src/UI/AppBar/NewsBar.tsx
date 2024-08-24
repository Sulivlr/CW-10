import {AppBar, styled, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit',
  }
});

const NewsBar = () => {
  return (
    <AppBar color="info" position="sticky" sx={{mb: 2}} >
      <Toolbar sx={{ justifyContent: 'left' }}>
        <Typography variant="h6" component="div">
          <StyledLink to="/">News</StyledLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NewsBar;