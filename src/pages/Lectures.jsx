import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css"

const Lectures = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState("🎓");
    const [iconType, setIconType] = useState('emoji');
    const [header, setHeader] = useState('');
    const [pageId, setPageId] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const url = location.pathname;
        const index = url.lastIndexOf('/');
        const id = url.slice(index + 1);
        setPageId(id);
    }, [location]);

    useEffect(() => {
        const loadPage = async (id) => {
            try {
                setLoading(true);

                const data = await getResponse(id, 'blocks', '/children');
                const dataPage = await getResponse(id, 'pages', '');

                if (dataPage.properties?.Name?.title) {
                    setHeader(dataPage.properties.Name.title[0].plain_text);
                } else if (dataPage.properties?.title?.title) {
                    setHeader(dataPage.properties.title.title[0].plain_text);
                }

                if (dataPage?.icon != null) {
                    setIconType(dataPage.icon.type);
                    setIcon(dataPage.icon[dataPage.icon.type]);
                }

                const processedContent = await createListContent(data.results);
                setContent(processedContent);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        loadPage(pageId);
    }, [pageId]);

    const createListContent = async (data) => {
        const contentPage = [];

        for (const element of data) {
            const type = element.type;
            const itemContent = { type: type, content: element[element.type], id: element.id };

            if (element.has_children && type !== 'child_page') {
                const response = await getResponse(element.id, 'blocks', '/children');
                itemContent.children = await createListContent(response.results);
            }

            contentPage.push(itemContent);
        }
        return contentPage;
    };

    const renderRichText = (richTextArray) => {
        if (!Array.isArray(richTextArray)) return null;

        return richTextArray.map((text, index) => {
            const { annotations = {}, text: { content = '' } = {} } = text;
            let style = {};
            if (annotations.bold) style.fontWeight = 'bold';
            if (annotations.italic) style.fontStyle = 'italic';
            if (annotations.underline) style.textDecoration = 'underline';
            if (annotations.strikethrough) style.textDecoration = 'line-through';
            if (annotations.color && annotations.color !== 'default') style.color = annotations.color;

            const textElement = <span key={index} style={style}>{content}</span>;

            if (annotations.code) {
                return <code key={index}>{textElement}</code>;
            }

            return textElement;
        });
    };

    const tags = {
        paragraph: 'p',
        bulleted_list_item: 'li',
        numbered_list_item: 'ol',
        heading_1: 'h2',
        heading_2: 'h3',
        heading_3: 'h4',
        image: 'img',
        bulleted_list_item_content: 'li',
        numbered_list_item_content: 'li',
        child_page: 'button',
        code: 'code',
        column_list: 'columns',
        column: 'div',
        table: 'table',
        table_row: 'tr',
        callout: 'callout',
        quote: 'quote',
        divider: 'hr',
        equation: 'Latex'
    };

    const renderContent = (contents, listCounters = 0) => {
        if (!Array.isArray(contents)) return null;

        return contents.map((item, index) => {
            const ListTag = tags[item.type];
            if (!ListTag) return null;
            listCounters = item.type !== 'numbered_list_item' ? 0 : listCounters + 1;

            switch (item.type) {
                case 'numbered_list_item':
                    return (
                        <ol key={index}>
                            <li value={listCounters}>{renderRichText(item.content.rich_text)}</li>
                            {item.children && renderContent(item.children)}
                        </ol>
                    );
                case 'bulleted_list_item':
                    return (
                        <ul key={index}>
                            <li>{renderRichText(item.content.rich_text)}</li>
                            {item.children && renderContent(item.children)}
                        </ul>
                    );
                case 'code':
                    return (
                        <pre key={index}>
                            <code className={`language-${item.content.language}`}>{item.content?.rich_text[0].text.content}</code>
                        </pre>
                    );
                case 'image':
                    return <img key={index} src={item.content?.file?.url} alt={item.content?.title || 'Image'}/>;
                case 'table':
                    return (
                        <table>
                            <tbody>
                            {item.children && renderContent(item.children)}
                            </tbody>
                        </table>
                    )
                case 'table_row':
                    return (
                        <tr>
                            {item.content?.cells.map((cell, index) => {
                                return (
                                    <td key={index} className='multiline'>
                                        {renderRichText(cell)}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                case 'callout':
                    return <div className='callout'>
                        <span className='emoji'>
                            {item.content?.icon?.emoji}
                        </span>
                        <div className='callout-content'>
                            {renderRichText(item.content?.rich_text)}
                            {item.children && renderContent(item.children)}
                        </div>
                    </div>
                case 'divider':
                    return <hr/>
                case 'equation':
                    return <Latex children={item.content.expression}/>
                case 'child_page':
                    return <button key={index} onClick={() => {navigate(`${location.pathname}/${item.id}`);}} className='multiline'>
                                {item.content?.title}
                                {renderRichText(item.content?.rich_text)}
                                {item.children && renderContent(item.children)}
                            </button>
                default:
                    return <ListTag key={index} className='multiline'>
                        {item.content?.title}
                        {renderRichText(item.content?.rich_text)}
                        {item.children && renderContent(item.children)}
                    </ListTag>;
            }
        });
    };

    return (
        <div>
            {iconType === 'emoji' ? <h1 className={"logo"}>{icon}</h1> : <img src={icon.url} className={"logoImg"} />}
            <h1>{header}</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {loading ? <div>Loading...</div> : renderContent(content)}
            </div>
        </div>
    );

    async function getResponse(id, type, info) {
        const token = import.meta.env.VITE_NOTION_TOKEN;
        const response = await fetch(`/api/v1/${type}/${id}${info}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Notion-Version': '2022-06-28',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error("Bad request");
        }
    }
};

export default Lectures;