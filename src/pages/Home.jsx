import {Link} from "react-router-dom";
import { Octokit } from 'octokit';
import { useState, useEffect } from 'react'

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
});

const OWNER = 'EtoNeAnanasbI95';
const REPO = 'Web';

function LastUpdateTime() {
    const [updateTime, setUpdateTime] = useState(null);

    useEffect(() => {
        const request = octokit.request('GET /repos/{owner}/{repo}/activity', {
        owner: OWNER,
        repo: REPO,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        });

        request.then(response => {
        const updateTime = response.data[0].timestamp;
        setUpdateTime(updateTime);
        });
    }, []);

    var date = new Date(updateTime);

    // Извлекаем день, месяц и год из объекта Date
    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому прибавляем 1
    var year = date.getUTCFullYear();

    // Форматируем день и месяц, чтобы добавить ведущий ноль, если нужно
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Формируем новую строку в формате DD.MM.YYYY
    let formattedDate = day + '.' + month + '.' + year;

    return (
        <div>
            <p className="footer_bottom_text">Last update: {formattedDate}</p>
        </div>
    );
}

function  Home() {
    const homeInfo = 'Сборник всех лекций. Предметы которые входят в список\nможно посмотреть ниже.'
    return (
        <>
            <header>
                <div className="home-header_grid">
                    <div className="home-header_button">
                        <Link className="self-links" to="/Web/Info">Информация</Link>
                        <Link className="self-links" to="/Web/Author">Стать автором</Link>
                        <a className="self-links" href="https://t.me/MptLecturesBot">Помощь</a>
                    </div>
                </div>
            </header>
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
                    <Link to="/Web/Lectures">
                        <button className="home-button_main">Открыть</button>
                    </Link>
                </div>
                <LastUpdateTime/>
            </div>
        </>
    )
}

export default Home