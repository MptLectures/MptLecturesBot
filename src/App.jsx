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
                        <Link className="self-links" to="/">Главная страница</Link>
                        <Link className="self-links" to="/Info">Информация</Link>
                        <Link className="self-links" to="/Author">Стать автором</Link>
                        <a className="self-links" href="https://t.me/idLavr0v13">Помощь</a>
                    </div>
                </div>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Lectures" element={<Lectures />} />
                <Route path="/Info" element={<Info />} />
                <Route path="/Author" element={<Author />} />
            </Routes>
        </>
    )
}

export default App
