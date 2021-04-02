import {
    makeStyles,
    Box,
} from "@material-ui/core";
import Image from "next/image";
import { getBackendUrl } from "../../../modules/urls";
import { ParagraphBlock } from "./ParagraphBlock"

const useImageBlockStyles = makeStyles((theme) => ({
    paragraphBox: {
        width: "40%",
    },
    paragraph: {
        textAlign: "center",
    },
}));

export const ImageBlock = ({ block }) => {
    const backendUrl = getBackendUrl();
    const classes = useImageBlockStyles();

    if (block) {
        const image = block.image;
        if (image) {
            return (
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexGrow={1}
                        p={1}
                    >
                        <Image
                            src={`${backendUrl}${image.url}`}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                        />
                    </Box>
                    <Box
                        className={classes.paragraphBox}
                        display="flex"
                        flexGrow={1}
                        flexDirection="column"
                        justifyContent="center"
                        p={1}
                    >
                        <Box className={classes.paragraph}>
                            <ParagraphBlock block={block}></ParagraphBlock>
                        </Box>
                    </Box>
                </Box>
            );
        } else {
            return null;
        }

    } else {
        return null;
    }
};