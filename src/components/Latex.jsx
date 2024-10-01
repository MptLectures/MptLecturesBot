import katex from "katex";

const Latex = ({ content }) => {
    console.log(content.toString());
    const latexContent = katex.renderToString(content.toString(), {
        throwOnError: false,
        output: 'mathml'
    });
    return (
        <div className="latex">
            <div dangerouslySetInnerHTML={{ __html: latexContent }} />
        </div>
    )
}

export default Latex;