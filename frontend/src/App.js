import './App.css';
import store from './store';
import { Provider } from 'react-redux'
import { AppBar } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { routes } from 'constants';
import { Dashboard, MoviePage, NotFoundPage, SingInPage } from 'components';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
