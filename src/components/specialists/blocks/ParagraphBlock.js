import ReactHtmlParser from "react-html-parser";
import {
    makeStyles,
} from "@material-ui/core";

const useParagraphBlockStyles = makeStyles((theme) => ({
    paragraphBlock: {
        "& ol": {
            padding: '4%',
            marginLeft: '3%',
            "& li": {
                marginBottom: "3%"
            }
        },
        "& ul": {
            padding: '4%',
            marginLeft: '3%',
            "& li": {
                marginBottom: "3%"
            }
        }
    }
}));

export const ParagraphBlock = ({ block }) => {
    const classes = useParagraphBlockStyles()
    if (block) {
        return <div className={classes.paragraphBlock}>{ReactHtmlParser(block.paragraph)}</div>;
    } else {
        return null;
    }
};

