import {Link, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Semesters from "./pages/Semesters.jsx";
import Info from "./pages/Info.jsx";
import Author from "./pages/Author.jsx";
import Lectures from "./pages/Lectures.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/MptLecturesBot" element={<Home />} />
                <Route path="/MptLecturesBot/Semesters" element={<Semesters />} />
                <Route path="/MptLecturesBot/Info" element={<Info />} />
                <Route path="/MptLecturesBot/Author" element={<Author />} />
                <Route path="*" element={<Lectures />} />
            </Routes>
        </>
    )
}

export default App
