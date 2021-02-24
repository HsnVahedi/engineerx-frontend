export const Image = class {
  constructor(
    url,
    width,
    height,
    alt,
    isLandscape = false,
    isPortrait = false
  ) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.alt = alt;
    this.isLandscape = isLandscape;
    this.isPortrait = isPortrait;
  }
};

export const ParagraphBlock = class {
  constructor(paragraph) {
    this.paragraph = paragraph;
    this.blockType = "paragraph";
  }
};

export const ImageBlock = class {
  constructor(image, paragraph) {
    this.image = image;
    this.paragraph = paragraph;
    this.blockType = "image";
  }
};

export const Section = class {
  constructor(title, blocks) {
    this.title = title;
    this.blocks = blocks;
  }
};

export const Owner = class {
  constructor(firstname, lastname, url) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.url = url;
  }
};

export const Post = class {
  constructor(
    id,
    title,
    slug,
    image,
    image16x9,
    sections,
    owner,
    tags,
    firstPublishedAt
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.image = image;
    this.image16x9 = image16x9;
    this.sections = sections;
    this.owner = owner;
    this.tags = tags;
    this.firstPublishedAt = firstPublishedAt;
  }
};
