import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Chip } from "@material-ui/core";
import Link from "next/link";

const Tag = ({ tagname, ...rest }) => {
  if (tagname) {
    return (
      // <Link href={`tags/${tagname}`}>
      <Link href={`/posts/tags/${tagname}`}>
        <a>
          <Chip
            style={{ margin: "2px" }}
            color="primary"
            label={tagname}
            variant="outlined"
            clickable={true}
            icon={<LocalOfferIcon />}
            {...rest}
          />
        </a>
      </Link>
    );
  } else {
    return null;
  }
};

export default Tag;
