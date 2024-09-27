export async function fetchObjectIds(metadataDate) {
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${metadataDate}`);
  const data = await response.json();
  return data.objectIDs;
}

export async function fetchObjectDetailsByPage(objectIds, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const ids = objectIds.slice(start, end);

  const details = await Promise.all(ids.map(async id => {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    const data = await response.json();
    return filterItemData(data);
  }));

  return details;
}

function filterItemData(item) {
  const { primaryImageSmall, primaryImage, title, objectDate, department, artistRole, artistDisplayName, artistNationality, tags } = item;
  return { primaryImageSmall, primaryImage, title, objectDate, department, artistRole, artistDisplayName, artistNationality, tags };
}
