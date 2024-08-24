import {Container, Typography} from '@mui/material';
import NewsBar from './UI/AppBar/NewsBar';
import {Route, Routes} from 'react-router-dom';
import News from './features/News/components/News';
import NewPost from './features/News/components/NewPost';
import OnePost from './features/News/components/OnePost';

const App = () => {
    return (
        <>
            <header>
              <NewsBar />
            </header>
          <Container maxWidth="xl" component="main">
            <Routes>
              <Route path="/" element={<News />} />
              <Route path="/news/new" element={<NewPost />} />
              <Route path="/news/:id" element={<OnePost />} />
              <Route path="*" element={<Typography variant="h1">Not Found</Typography>} />
            </Routes>
          </Container>
        </>
    );
};

export default App;
