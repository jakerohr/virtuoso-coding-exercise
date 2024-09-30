import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchObjectIds, fetchObjectDetailsByPage } from './metMuseum';

global.fetch = vi.fn();

describe('metMuseum API', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetchObjectIds should return object IDs', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ objectIDs: [1, 2, 3, 4, 5] }),
      })
    );

    const metadataDate = '2024-09-01';
    const objectIDs = await fetchObjectIds(metadataDate);

    expect(fetch).toHaveBeenCalledWith(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${metadataDate}`);
    expect(objectIDs).toEqual([1, 2, 3, 4, 5]);
  });

  it('fetchObjectDetailsByPage should return object details for the specified page', async () => {
    const objectIds = [1, 2, 3, 4, 5];
    const page = 1;
    const pageSize = 2;

    const mockResponse = {
      json: () => Promise.resolve({
        primaryImageSmall: 'small.jpg',
        primaryImage: 'large.jpg',
        title: 'Art Title',
        objectDate: '2023',
        department: 'Art',
        artistRole: 'Artist',
        artistDisplayName: 'Artist Name',
        artistNationality: 'Nationality',
        tags: ['tag1', 'tag2'],
        objectURL: 'http://example.com',
      }),
    };

    fetch
      .mockImplementationOnce(() => Promise.resolve(mockResponse))
      .mockImplementationOnce(() => Promise.resolve(mockResponse));

    const details = await fetchObjectDetailsByPage(objectIds, page, pageSize);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(details).toEqual([
      {
        primaryImageSmall: 'small.jpg',
        primaryImage: 'large.jpg',
        title: 'Art Title',
        objectDate: '2023',
        department: 'Art',
        artistRole: 'Artist',
        artistDisplayName: 'Artist Name',
        artistNationality: 'Nationality',
        tags: ['tag1', 'tag2'],
        objectURL: 'http://example.com',
      },
      {
        primaryImageSmall: 'small.jpg',
        primaryImage: 'large.jpg',
        title: 'Art Title',
        objectDate: '2023',
        department: 'Art',
        artistRole: 'Artist',
        artistDisplayName: 'Artist Name',
        artistNationality: 'Nationality',
        tags: ['tag1', 'tag2'],
        objectURL: 'http://example.com',
      },
    ]);
  });
});