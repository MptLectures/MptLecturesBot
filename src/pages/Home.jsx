import {Link} from "react-router-dom";

function  Home() {
    const homeInfo = 'Сборник всех лекций. Предметы которые входят в список\nможно посмотреть ниже.'
    return (
        <>
            <div className="home-text_block">
                <p className="header_text">MPT Lectures</p>
                <p className="footer_text">Твой индивидуальный помощник</p>
            </div>
            <div className="home-mainblock">
                <div className="home-card_course">
                    <p className="home-course_number">2</p>
                    <div className="home-text_main">
                        <p className="home-course_text_main">Второй курс</p>
                        <p className="home-date_text_main">24 апреля, 2024</p>
                    </div>
                    <p className="home-info_text_main">{homeInfo}</p>
                    <Link to="/Lectures">
                        <button className="home-button_main">Открыть</button>
                    </Link>
                </div>
                <p className="footer_bottom_text">last update: 28.04.2024</p>
            </div>
        </>
    )
}

export default Home