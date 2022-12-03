import './App.css';
import store from './store';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import theme from '../src/theme';
import { routes } from 'constants';
import { Dashboard, MoviePage, NotFoundPage, SingInPage } from 'components';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Provider store={store}>
            <Routes>
              <Route index element={<Navigate to={routes.movies} replace />} />
              <Route path={routes.movies} element={<Dashboard />} />
              <Route path={routes.movie} element={<MoviePage />} />
              <Route path={routes.singIn} element={<SingInPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
