import ReactHtmlParser from "react-html-parser";
import {
    makeStyles,
} from "@material-ui/core";

const useParagraphBlockStyles = makeStyles((theme) => ({
    richText: {
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

const RichText = ({ paragraph }) => {
    const classes = useParagraphBlockStyles()
    if (paragraph) {
        return <div className={classes.richText}>{ReactHtmlParser(paragraph)}</div>;
    } else {
        return null;
    }
};

export default RichText;