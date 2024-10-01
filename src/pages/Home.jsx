import {Link} from "react-router-dom";
import { Octokit } from 'octokit';
import { useState, useEffect } from 'react'

const octokit = new Octokit();

const OWNER = 'MptLectures';
const REPO = 'MptLecturesBot';

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

    const date = new Date(updateTime).toLocaleDateString()
    return (
        <div>
            <p className="footer_bottom_text">Last update: {date}</p>
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
                        <Link className="self-links" to="/MptLecturesBot/Info">Информация</Link>
                        <Link className="self-links" to="/MptLecturesBot/Author">Стать автором</Link>
                        <a className="self-links" href="https://t.me/MptLecturesBot">Помощь</a>
                    </div>
                </div>
            </header>
            <div className="home-text_block">
                <p className="header_text">MPT Semesters</p>
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
                    <Link to="/MptLecturesBot/928228ff6e9844a59f20445dae52401d">
                        <button className="home-button_main">Открыть</button>
                    </Link>
                </div>
                <LastUpdateTime/>
            </div>
        </>
    )
}

export default Home