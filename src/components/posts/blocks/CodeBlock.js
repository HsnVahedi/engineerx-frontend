import Highlight from 'react-highlight.js';

export const CodeBlock = ({ block }) => {
    return <Highlight language={block.language}>
        {block.content}
    </Highlight>
}
