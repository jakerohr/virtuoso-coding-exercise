export async function fetchObjectIds(metadataDate) {
  try {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${metadataDate}`);
    if (!response.ok) {
      throw new Error('Failed to fetch object IDs');
    }
    const data = await response.json();
    return data.objectIDs;
  } catch (error) {
    console.error('Error fetching object IDs:', error);
    throw error;
  }
}

export async function fetchObjectDetails(objectId) {
  try {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for object ID ${objectId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for object ID ${objectId}:`, error);
    throw error;
  }
}

export async function fetchObjectDetailsByPage(objectIds, page, pageSize) {
  try {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const batchIds = objectIds.slice(start, end);
    const batchDetails = await Promise.all(batchIds.map(id => fetchObjectDetails(id)));
    return batchDetails;
  } catch (error) {
    console.error('Error fetching batch details:', error);
    throw error;
  }
}

export async function fetchAllObjectDetails(objectIds, batchSize = 100) {
  try {
    const allDetails = [];
    const fetchBatch = async (start) => {
      const end = start + batchSize;
      const batchIds = objectIds.slice(start, end);
      const batchDetails = await Promise.all(batchIds.map(id => fetchObjectDetails(id)));
      allDetails.push(...batchDetails);
    };

    const batchPromises = [];
    for (let i = 0; i < objectIds.length; i += batchSize) {
      batchPromises.push(fetchBatch(i));
    }

    await Promise.all(batchPromises);
    return allDetails;
  } catch (error) {
    console.error('Error fetching all details:', error);
    throw error;
  }
}
