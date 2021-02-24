const limit = 20;

export const getPaginatedObjects = async (url) => {
  let objects = [];
  let offset = 0;
  let finished = false;
  while (!finished) {
    let pageUrl = `${url}&offset=${offset}&limit=${limit}`;
    let res = await fetch(pageUrl, { method: "GET" });
    let data = await res.json();
    let totalCount = data.meta.total_count;
    let items = data.items;
    offset += items.length;
    if (offset >= totalCount) {
      finished = true;
    }
    objects = objects.concat(items);
  }
  return objects;
};

export const getPageObjects = async (url, page) => {
  const offset = 20 * (page - 1);
  const pagesUrl = `${url}&offset=${offset}&limit=${limit}`;
  const res = await fetch(pagesUrl, { method: "GET" });
  const data = await res.json();
  return data.items;
};
