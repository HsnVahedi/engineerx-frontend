import { getPaginatedObjects, getPageObjects } from "../pagination";
import {
  Image,
  SocialAccount,
  PersonalPageSkill,
  Education,
  Experience,
  PersonalInformation,
  Owner,
} from "./models";
import { getBackendUrl } from "../urls";
import moment from "moment";

const backendUrl = getBackendUrl();
const apiUrl = `${backendUrl}/api`;
const pagesUrl = `${apiUrl}/pages`;
const imagesUrl = `${apiUrl}/images`;
const pagesListUrl = `${pagesUrl}?type=accounts.PersonalPage&order=first_published_at&fields=owner`;

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

const getSocialAccount = async (record) => {
  const socialNetwork = record.social_media;
  const url = record.url;
  return new SocialAccount(socialNetwork, url);
}

const getPersonalPageSkill = async (record) => {
  const name = record.name;
  const description = record.description;
  return new PersonalPageSkill(name, description);
}

const getEducation = async (record) => {
  const degree = record.degree;
  const institution = record.institution;
  const begin = moment(record.begin);
  const end = moment(record.end);
  const location = record.location;
  return new Education(degree, institution, begin, end, location);
}

const getExperience = async (record) => {
  const company = record.company;
  const location = record.location;
  const role = record.role;
  const begin = moment(record.begin);
  const end = moment(record.end);
  return new Experience(company, location, role, begin, end);
}

const getItems = async (items, getItem) => {
  let itemsList = [];
  for (let i = 0; i < items.length; i++) {
    itemsList.push(await getItem(items[i]));
  }
  return itemsList;
}

const getSocialAccounts = async (accountItems) => {
  return getItems(accountItems, getSocialAccount);
};

const getPersonalPageSkills = async (skillItems) => {
  return getItems(skillItems, getPersonalPageSkill);
}

const getEducations = async (educationItems) => {
  return getItems(educationItems, getEducation);
}

const getExperiences = async (experienceItems) => {
  return getItems(experienceItems, getExperience);
}

export const getPersonalPage = async (id) => {
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

  let socialAccounts = await getSocialAccounts(data.related_accounts);
  let skills = await getPersonalPageSkills(data.related_skills);
  let educations = await getEducations(data.related_educations);
  let experiences = await getExperiences(data.related_experiences);
  const owner_info = data.owner_info;
  let owner = new Owner(
    owner_info.firstname,
    owner_info.lastname,
    owner_info.image,
    owner_info.id,
  );
  const firstPublishedAt = data.meta.first_published_at;
  return new PersonalInformation(
    id,
    title,
    slug,
    image,
    image16x9,
    owner,
    experiences,
    educations,
    skills, socialAccounts, firstPublishedAt
  );
};

export const getPersonalPageId = async (slug) => {
  const url = `${pagesListUrl}&slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  if (data.meta.total_count > 0) {
    return data.items[0].id;
  } else {
    return null;
  }
};

export const getPersonalPageBySlug = async (slug) => {
  const id = await getPersonalPageId(slug);
  if (id) {
    return await getPersonalPage(id);
  } else {
    return null;
  }
};

const convertItemsToPersonalPages = async (items) => {
  let personalPages = [];
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let id = item.id;
    let personalPage = await getPersonalPage(id);
    personalPages.push(personalPage);
  }
  return personalPages;
};

export const getPersonalPages = async () => {
  const items = await getPaginatedObjects(pagesListUrl);
  return await convertItemsToPersonalPages(items);
};

const appendUrlQuery = (url, parameter, value) => {
  return `${url}&${parameter}=${value}`;
};

export const getPagePersonalPages = async (page) => {
  const items = await getPageObjects(pagesListUrl, page);
  return await convertItemsToPersonalPages(items);
};

export const getPersonalPagesSlugs = async () => {
  const items = await getPaginatedObjects(pagesListUrl);
  const slugs = items.map((item) => `${item.owner.id}`);
  return slugs;
};

export const getPersonalPagesTotalCount = async () => {
  const res = await fetch(pagesListUrl, { method: "GET" });
  const data = await res.json();
  return data.meta.total_count;
};

export const getPersonalPagesPaginationSize = async () => {
  const totalCount = await getPersonalPagesTotalCount();
  return Math.ceil(totalCount / 20);
};
