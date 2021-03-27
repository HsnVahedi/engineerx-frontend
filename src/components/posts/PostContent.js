import {
  Box,
  Container,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Fragment } from "react";
import Tag from "./Tag";
import { ImageBlock } from "./blocks/ImageBlock";
import { ParagraphBlock } from "./blocks/ParagraphBlock";

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
      <Grid item xs={12} md={12} lg={10} role="tags-section">
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
      <Box mt={10} mb={1}>
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
