import RichText from "../../richtext";

export const ParagraphBlock = ({ block }) => {
    if (block) {
        return <RichText paragraph={block.paragraph} />
    } else {
        return null;
    }
};

