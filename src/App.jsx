import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Home from './components/Home';
import SearchApk from './components/Search';
import AnimeDetail from './components/AnimeDetail';
import Category from './components/Category';
function App() {
  return<BrowserRouter>
    <Routes>
      <Route path='/'element={<Home/>}></Route>
      <Route path='/search/:qAnime'element={<SearchApk/>}></Route>
      <Route path='/animeDetail/:animeID'element={<AnimeDetail/>}></Route>
      <Route path='/category'element={<Category/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App
