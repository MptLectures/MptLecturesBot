import {Link, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Lectures from "./pages/Lectures.jsx";
import Info from "./pages/Info.jsx";
import Author from "./pages/Author.jsx";

function App() {
    return (
        <>
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
