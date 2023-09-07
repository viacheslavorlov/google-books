import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Search} from './entities/search/ui/Search';
import {ErrorPage} from './pages/ErrorPage/ErrorPage';
import {MainPage} from './pages/MainPage/MainPage';
import {SingleBookPage} from './pages/SingleBookPage/SingleBookPage';
import {store} from './store/main';

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <Search/>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/single-book/:id'} element={<SingleBookPage/>}/>
                    <Route path={'*'} element={<ErrorPage/>}/>
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
