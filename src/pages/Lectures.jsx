import '../App.css'
import {Link} from 'react-router-dom'

function Lectures() {
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
                    <div className="choose-block" >
                        <div className="background_block">
                            <p>КОМП</p>
                        </div>
                        <div className="block_text">
                            <p className="block_text_top">Компьютерные сети</p>
                            <p className="block_text_bottom">Даниил Владимирович Серяк</p>
                        </div>
                    </div>
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

export default Lectures