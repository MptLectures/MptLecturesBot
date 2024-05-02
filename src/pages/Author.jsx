import '../App.css'
import {Link} from 'react-router-dom'

function Author() {
    return (
        <>
            <div className="home-header_button">
                <Link to='/Web' className="self-links">Вернуться в главное меню</Link>
            </div>
            <div className="autor-block">
                <p className="autor-block_h">Как стать автором?</p>
                <p className="autor-block_text">Если у вас есть материал, который хотели бы добавить на сайт, чтобы помочь студентам, присылайте его без стеснения! Но, пожалуйста, помните, что мы не покупаем лекции и не оплачиваем материалы, предоставленные в рамках помощи проекту.</p>
                <br/>
                <p className="autor-block_text">Если у вас есть какие-то вопросы или предложения относительно материалов на сайте, не стесняйтесь связаться с нами. Мы всегда открыты к обратной связи и готовы рассмотреть любые идеи по улучшению нашего ресурса. Благодарим вас за ваш интерес и поддержку проекта!</p>
                <div className="autor-button_send">
                    <button>Отправить</button>
                </div>
            </div>
        </>
    )
}

export default Author