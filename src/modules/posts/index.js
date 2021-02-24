import { getPaginatedObjects, getPageObjects } from "../pagination";
import {
  Image,
  ParagraphBlock,
  ImageBlock,
  Section,
  Post,
  Owner,
} from "./models";
import { getBackendUrl } from "../urls";

const backendUrl = getBackendUrl();
const apiUrl = `${backendUrl}/api`;
const pagesUrl = `${apiUrl}/pages`;
const imagesUrl = `${apiUrl}/images`;
const pagesListUrl = `${pagesUrl}?type=home.PostPage&order=first_published_at`;

const getImage = async (id) => {
  const imageUrl = `${imagesUrl}/${id}`;
  let res = await fetch(imageUrl, { method: "GET" });
  let data = await res.json();
  return new Image(
    data.meta.download_url,
    data.width,
    data.height,
    data.title,
    data.meta.is_landscape,
    data.meta.is_portrait
  );
};

const getImageBlock = async (block) => {
  const id = block.value.image;
  const paragraph = block.value.caption;
  const image = await getImage(id);
  return new ImageBlock(image, paragraph);
};

const getPragraphBlock = async (block) => {
  return new ParagraphBlock(block.value);
};

const getBlock = async (row) => {
  if (row.type === "paragraph") {
    return await getPragraphBlock(row);
  } else if (row.type === "image") {
    return await getImageBlock(row);
  }
};

const getSection = async (sectionItem) => {
  const value = sectionItem.value;
  const title = value.title;
  const rows = value.rows;
  let blocks = [];
  for (let i = 0; i < rows.length; i++) {
    let block = await getBlock(rows[i]);
    blocks.push(block);
  }
  return new Section(title, blocks);
};

const getSections = async (sectionItems) => {
  let sections = [];
  for (let i = 0; i < sectionItems.length; i++) {
    sections.push(await getSection(sectionItems[i]));
  }
  return sections;
};

export const getPost = async (id) => {
  let pageUrl = `${pagesUrl}/${id}`;
  let res = await fetch(pageUrl, { method: "GET" });
  if (res.status === 404) {
    return null;
  }
  let data = await res.json();
  let slug = data.meta.slug;
  let title = data.title;
  let image = null;
  let image16x9 = null;
  if (data.image) {
    image = new Image(
      data.image.url,
      data.image.width,
      data.image.height,
      data.image.alt
    );
  }

  if (data.image_16x9) {
    image16x9 = new Image(
      data.image_16x9.url,
      data.image_16x9.width,
      data.image_16x9.height,
      data.image_16x9.alt
    );
  }

  let sections = await getSections(data.sections);
  const owner_info = data.owner_info;
  let owner = new Owner(
    owner_info.firstname,
    owner_info.lastname,
    owner_info.image
  );
  const firstPublishedAt = data.meta.first_published_at;
  return new Post(
    id,
    title,
    slug,
    image,
    image16x9,
    sections,
    owner,
    data.tags,
    firstPublishedAt
  );
};

export const getPostId = async (slug) => {
  const url = `${pagesListUrl}&slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  if (data.meta.total_count > 0) {
    return data.items[0].id;
  } else {
    return null;
  }
};

export const getPostBySlug = async (slug) => {
  const id = await getPostId(slug);
  if (id) {
    return await getPost(id);
  } else {
    return null;
  }
};

const convertItemsToPosts = async (items) => {
  let posts = [];
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let id = item.id;
    let post = await getPost(id);
    posts.push(post);
  }
  return posts;
};

export const getPosts = async () => {
  const items = await getPaginatedObjects(pagesListUrl);
  return await convertItemsToPosts(items);
};

const appendUrlQuery = (url, parameter, value) => {
  return `${url}&${parameter}=${value}`;
};

export const getPagePosts = async (page, tag = null) => {
  const url = tag ? appendUrlQuery(pagesListUrl, "tags", tag) : pagesListUrl;
  const items = await getPageObjects(url, page);
  return await convertItemsToPosts(items);
};

export const getPostSlugs = async () => {
  const items = await getPaginatedObjects(pagesListUrl);
  const slugs = items.map((item) => item.meta.slug);
  return slugs;
};

export const getPostsTotalCount = async (tag = null) => {
  const url = tag ? appendUrlQuery(pagesListUrl, "tags", tag) : pagesListUrl;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  return data.meta.total_count;
};

export const getPostsPaginationSize = async (tag = null) => {
  const totalCount = await getPostsTotalCount(tag);
  return Math.ceil(totalCount / 20);
};
