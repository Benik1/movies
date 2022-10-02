import './App.css';
import store from './store';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, MoviePage, NotFoundPage } from './components';
import { routes } from './constants';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<Navigate to={routes.movies} replace />} />
          <Route path={routes.movies} element={<Dashboard />} />
          <Route path={routes.movie} element={<MoviePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
