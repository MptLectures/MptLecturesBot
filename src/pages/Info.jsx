import "../App.css"
import {Link} from "react-router-dom";


function Info() {
    return (
        <>
            <div className="home-header_button">
                <Link to='/MptLecturesBot' className="self-links">Вернуться в главное меню</Link>
            </div>
            <div className="info-block">
                <div className="info-admin_project">
                    <p className="info-card_display">Авторы проекта</p>
                    <div className="info-card">
                        <img src='./lavr0v13-avatar.png' alt=''/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Максим Лавров Дмитриевич</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg"
                                                                          href="https://t.me/idLavr0v13">@idLavr0v13</a>
                            </p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="./dimkaavatar.png" alt=''/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Дмитрий Кирилов Сергеевич</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg"
                                                                          href="https://t.me/BIG_zh0pa">@BIG_zh0pa</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="info-admin_project">
                    <p className="info-card_display">Авторы контента</p>
                    <div className="info-card">
                        <img src="./pos1.png" alt=''/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Леонид Турунцев Сергеевич</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg"
                                                                          href="https://t.me/bro_gideon">@bro_gideon</a>
                            </p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="./pos2.png" alt=''/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Илья Пушкин Александрович</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg"
                                                                          href="https://t.me/pushechkin">@pushechkin</a>
                            </p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="./pos3.png" alt=''/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Скорогудаева София Алексеевна</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg"
                                                                          href="https://t.me/SafikaFifika">@SafikaFifika❤️</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info