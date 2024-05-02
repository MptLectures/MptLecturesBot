import {Link, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Lectures from "./pages/Lectures.jsx";
import Info from "./pages/Info.jsx";
import Author from "./pages/Author.jsx";

function App() {
    return (
        <>
            <header>
                <div className="home-header_grid">
                    <div className="home-header_button">
                        <Link className="self-links" to="/Web/Info">Информация</Link>
                        <Link className="self-links" to="/Web/Author">Стать автором</Link>
                        <a className="self-links" href="https://t.me/MptLecturesBot">Помощь</a>
                    </div>
                </div>
            </header>
            <Routes>
                <Route path="/Web" element={<Home />} />
                <Route path="/Web/Lectures" element={<Lectures />} />
                <Route path="/Web/Info" element={<Info />} />
                <Route path="/Web/Author" element={<Author />} />
            </Routes>
        </>
    )
}

export default App
