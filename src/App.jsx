import { useState, useEffect } from 'react';

const NotionPage = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState();
    const [icon, setIcon] = useState("🎓");
    const [iconType, setIconType] = useState('emoji');
    const [header, setHeader] = useState();
    const [pageId, setPageId] = useState("928228ff6e9844a59f20445dae52401d");

    useEffect(() => {
        const loadPage = async (id) => {
            try {
                setLoading(true);

                const data = await getResponse(id, 'blocks', '/children');
                const dataPage = await getResponse(id, 'pages', '');

                if (dataPage.properties?.Name?.title) {
                    setHeader(dataPage.properties.Name.title[0].plain_text);
                    console.log(header)
                } else if (dataPage.properties?.title?.title) {
                    setHeader(dataPage.properties.title.title[0].plain_text);
                    console.log(header)
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

            if (element.has_children && type != 'child_page') {
                const response = await getResponse(element.id, 'blocks', '/children');
                itemContent.children = await createListContent(response.results);
            }

            contentPage.push(itemContent);
        }

        console.log('contentPage', contentPage);
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

            return <span key={index} style={style}>{content}</span>;
        });
    };

    const tags = {
        paragraph: 'p',
        bulleted_list_item: 'ul',
        numbered_list_item: 'ol',
        heading_1: 'h2',
        heading_2: 'h3',
        heading_3: 'h4',
        image: 'img',
        bulleted_list_item_content: 'li',
        numbered_list_item_content: 'li',
        child_page: 'button',
    };

    const renderContent = (contents) => {
        if (!Array.isArray(contents)) return null;
        let count = 1;
        return contents.map((item, index) => {
            const ListTag = tags[item.type];
            count++;
            if (!ListTag) return null;

            if (ListTag === 'ul' || ListTag === 'ol') {
                return (
                    <ListTag key={index} span={count}>
                        {item.content.rich_text && (
                            <li>{renderRichText(item.content.rich_text)}</li>
                        )}
                        {item.children && renderContent(item.children)}
                    </ListTag>
                );
            } else if (ListTag === 'img') {
                return <ListTag key={index} src={item.content?.file?.url} alt="" />;
            } else if (ListTag === 'button') {
                return <ListTag key={index} onClick={() => setPageId(item.id)}>{item.content?.title}</ListTag>
            }
            {
                return <ListTag key={index}>{renderRichText(item.content?.rich_text)}</ListTag>;
            }
        });
    };

    return (
        <div>
            {iconType === 'emoji' ? <h1 className={"logo"}>{icon}</h1>: <img src={icon.url} className={"logoImg"} />}
            <h1>{header}</h1>
            {loading ? <div>Loading...</div> : renderContent(content)}
        </div>
    );

    async function getResponse(id, type, info) {
        const response = await fetch(`/api/v1/${type}/${id}${info}`, {
            method: 'GET',
            headers: {
                'Authorization': import.meta.env.VITE_NOTION_TOKEN,
                'Notion-Version': '2022-06-28',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            return data;
        } else {
            throw new Error("Bad request");
        }
    }
};

export default NotionPage;