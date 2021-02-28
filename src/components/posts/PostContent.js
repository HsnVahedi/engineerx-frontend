import {
  Box,
  Container,
  Divider,
  makeStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";
import { Fragment } from "react";
import Tag from "./Tag";
import { getBackendUrl } from "../../modules/urls";

export const ParagraphBlock = ({ block }) => {
  if (block) {
    return <div>{ReactHtmlParser(block.paragraph)}</div>;
  } else {
    return null;
  }
};

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
	    unoptimized={true}
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
            {ReactHtmlParser(block.paragraph)}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export const SectionBlock = ({ block }) => {
  if (block) {
    if (block.blockType === "paragraph") {
      return <ParagraphBlock block={block}></ParagraphBlock>;
    } else if (block.blockType === "image") {
      return <ImageBlock block={block}></ImageBlock>;
    }
  } else {
    return null;
  }
};

export const Section = ({ section }) => {
  if (section) {
    return (
      <Grid item xs={12} md={12} lg={10}>
        <Card>
          {section.title && (
            <>
              <CardHeader
                title={<Typography variant="h2">{section.title}</Typography>}
              />
              <Divider />
            </>
          )}
          <CardContent>
            {section.blocks.map((block, index) => {
              return (
                <Fragment key={index}>
                  <Box m={2}>
                    <SectionBlock block={block} />
                  </Box>
                  {index < section.blocks.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    );
  } else {
    return null;
  }
};

export const Tags = ({ tags }) => {
  if (tags) {
    return (
      <Grid item xs={12} md={12} lg={10}>
        <Card>
          <CardContent>
            <Box display="flex" flexWrap="wrap">
              {tags.map((tagname, index) => {
                return <Tag key={index} tagname={tagname} />;
              })}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  } else {
    return null;
  }
};

const PostContent = ({ post }) => {
  return (
    <Container maxWidth="lg">
      <Box mt={3} mb={1}>
        <Typography variant="h1" color="textPrimary">
          {post.title}
        </Typography>
      </Box>
      <Divider />
      <Box py={3} pb={6}>
        <Grid container spacing={3}>
          {post.sections.map((section, index) => {
            return <Section key={index} section={section} />;
          })}
          <Tags tags={post.tags} />
        </Grid>
      </Box>
    </Container>
  );
};

export default PostContent;
