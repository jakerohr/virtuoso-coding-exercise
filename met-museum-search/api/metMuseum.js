/**
 * Fetch object IDs from the Met Museum API based on metadata date.
 * @param {string} metadataDate - The metadata date to filter objects.
 * @returns {Promise<Array>} - A promise that resolves to an array of object IDs.
 */
export async function fetchObjectIds(metadataDate) {
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${metadataDate}`);
  const data = await response.json();
  return data.objectIDs;
}

/**
 * Fetch object details from the Met Museum API by page.
 * @param {Array} objectIds - Array of object IDs to fetch details for.
 * @param {number} page - The current page number.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<Array>} - A promise that resolves to an array of object details.
 */
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

/**
 * Filter and return relevant item data.
 * @param {Object} item - The item data from the API.
 * @returns {Object} - An object containing filtered item data.
 */
function filterItemData(item) {
  const {
    primaryImageSmall,
    primaryImage,
    title,
    objectDate,
    department,
    artistRole,
    artistDisplayName,
    artistNationality,
    tags,
    objectURL
  } = item;
  return {
    primaryImageSmall,
    primaryImage,
    title,
    objectDate,
    department,
    artistRole,
    artistDisplayName,
    artistNationality,
    tags,
    objectURL
  };
}
