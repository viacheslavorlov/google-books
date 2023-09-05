import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Search} from './entities/search/ui/Search';
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
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
