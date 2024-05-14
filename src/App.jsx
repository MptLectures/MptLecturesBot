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
                <Route path="/MptLecturesBot" element={<Home />} />
                <Route path="/MptLecturesBot/Lectures" element={<Lectures />} />
                <Route path="/MptLecturesBot/Info" element={<Info />} />
                <Route path="/MptLecturesBot/Author" element={<Author />} />
            </Routes>
        </>
    )
}

export default App
