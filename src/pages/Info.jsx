import "../App.css";

function Info() {
    return (
        <>
            <div className="info-block">
                <div className="info-admin_project">
                    <p className="info-card_display">Авторы проекта</p>
                    <div className="info-card">
                        <img src="blob:https://web.telegram.org/ab20141d-da91-477b-b12a-d7aca5217e79"/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Максим Лавров Дмитриевич</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg" href="https://t.me/idLavr0v13">@idLavr0v13</a></p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="blob:https://web.telegram.org/4e6fe6c0-4d54-41be-8d64-eab5351f3f58"/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Дмитрий Кирилов Сергеевич</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg" href="https://t.me/BIG_zh0pa">@BIG_zh0pa</a></p>
                        </div>
                    </div>
                </div>
                <div className="info-admin_project">
                    <p className="info-card_display">Авторы контента</p>
                    <div className="info-card">
                        <img src="../../public/pos1.png"/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Леонид Турунцев Сергеевич</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg" href="https://t.me/bro_gideon">@bro_gideon</a></p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="../../public/pos2.png"/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Илья Пушкин Александрович</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg" href="https://t.me/pushechkin">@pushechkin</a></p>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="../../public/pos3.png"/>
                        <div className="info-card_text">
                            <p className="info-card_text_name">Скорогудаева София Алексеевна</p>
                            <p className="info-card_text_tg">Telegram: <a className="linktg" href="https://t.me/SafikaFifika">@SafikaFifika❤️</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info