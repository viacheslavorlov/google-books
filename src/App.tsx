import './App.css';
import {Route, Routes} from 'react-router-dom';
import {MainPage} from './pages/MainPage/MainPage';
import {SingleBookPage} from './pages/SingleBookPage/SingleBookPage';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/single-book/:id'} element={<SingleBookPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
