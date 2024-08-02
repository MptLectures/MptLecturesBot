import '../App.css'
import {Link} from 'react-router-dom'
import {useNavigate, useLocation} from "react-router-dom";

function Semesters() {
    const navigate = useNavigate();
    const location = useLocation();
    const onRedirectSemester = (id) => {
        return navigate(location.pathname + '/928228ff6e9844a59f20445dae52401d');
    }
    return (
        <>
            <header>
                <div className="home-header_button">
                    <Link className="self-links" to="/MptLecturesBot">Вернуться в главное меню</Link>
                </div>
            </header>
            <div className="choose-mainblock">
                <div className="choose-text_block">
                    <p className="choose-top_text">Второй курс</p>
                    <p className="choose-bottom_text">24 апреля, 2024</p>
                </div>
                <div className="choose-grid">
                    <button className="choose-block" onClick={onRedirectSemester}>
                        <div className="background_block">
                            <p>2</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Второй семестр</p>
                            <p className="block_text_bottom">Какой-то хуй</p>
                        </div>
                    </button>
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>PYTHON</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Python</p>
                            <p className="block_text_bottom">Татьяна Дмитриевна Артамонова</p>
                        </div>
                    </div>
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>ОПБД</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">База данных</p>
                            <p className="block_text_bottom">Елизавета Михайловна Парамонова</p>
                        </div>
                    </div>
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>ENGL</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Английский</p>
                            <p className="block_text_bottom">Анна Львовна Лосикова</p>
                        </div>
                    </div>
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>JAVA</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Разработка мобильных приложений</p>
                            <p className="block_text_bottom">Ксения Сергевна Образцова</p>
                        </div>
                    </div>
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>ТЕСТИРОВКА</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Поддержка и тестирование модулей</p>
                            <p className="block_text_bottom">Мария Александровна Горбунова</p>
                        </div>
                    </div>
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>ИСТОРИЯ</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">История</p>
                            <p className="block_text_bottom">Вероника Вадимовна Волкова</p>
                        </div>
                    </div>
                    <div className="choose-block">
                        <div className="background_block">
                            <p>МАТЕМАТИКА</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Высшая математика</p>
                            <p className="block_text_bottom">Марина Владимировна Черемных</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Semesters