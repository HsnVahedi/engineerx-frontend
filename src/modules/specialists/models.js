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

export const SocialAccount = class {
  constructor(
    socialNetwork, url
  ) {
    this.socialNetwork = socialNetwork;
    this.url = url;
    this.blockType = "social-account";
  }
};

export const PersonalPageSkill = class {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.blockType = "personal-page-skill";
  }
};

export const Education = class {
  constructor(degree, institution, begin, end, location) {
    this.degree = degree;
    this.institution = institution;
    this.begin = begin;
    this.end = end;
    this.location = location;
    this.blockType = "personal-page-education";
  }
};

export const Experience = class {
  constructor(company, location, role, begin, end) {
    this.company = company;
    this.location = location;
    this.role = role;
    this.begin = begin;
    this.end = end;
    this.blockType = "personal-page-experience";
  }
};

export const Owner = class {
  constructor(firstname, lastname, url, id) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.url = url;
    this.id = id;
  }
};

export const PersonalInformation = class {
  constructor(
    id,
    title,
    slug,
    image,
    image16x9,
    owner,
    experiences,
    educations,
    skills,
    socialAccounts,
    firstPublishedAt,
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.image = image;
    this.image16x9 = image16x9;
    this.experiences = experiences;
    this.educations = educations;
    this.skills = skills;
    this.socialAccounts = socialAccounts;
    this.owner = owner;
    this.firstPublishedAt = firstPublishedAt;
  }
};
