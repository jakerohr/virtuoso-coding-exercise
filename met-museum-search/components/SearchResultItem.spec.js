import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import SearchResultItem from './SearchResultItem.vue'

describe('SearchResultItem', () => {
  const item = {
    primaryImageSmall: 'https://example.com/image-small.jpg',
    primaryImage: 'https://example.com/image.jpg',
    title: 'Test Title',
    objectDate: '2024',
    department: 'Taco Department',
    artistRole: 'street artist',
    artistDisplayName: 'Banksy',
    artistNationality: 'English',
    tags: [{term: 'Art'},{term: 'Painting'},{term: 'Taco'}],
    objectURL: 'http://example.com',
  };

  it('renders "Not Available" when no props are passed', () => {
    const wrapper = mount(SearchResultItem, {
      props: {
        item: {},
      },
    });
    expect(wrapper.text()).toContain('Not Available');
  });

  it('renders item details correctly', () => {
    const wrapper = mount(SearchResultItem, {
      props: { item },
    });

    expect(wrapper.find('[data-testid="item-image"]').attributes('src')).toBe(item.primaryImageSmall);
    expect(wrapper.find('[data-testid="item-title"]').text()).toBe(item.title);
    expect(wrapper.find('[data-testid="item-date"]').text()).toBe(`Date: ${item.objectDate}`);
    expect(wrapper.find('[data-testid="item-department"]').text()).toBe(`Department: ${item.department}`);
    expect(wrapper.find('[data-testid="item-artist-role"]').text()).toBe(`Artist Role: ${item.artistRole}`);
    expect(wrapper.find('[data-testid="item-artist-name"]').text()).toBe(`Artist Name: ${item.artistDisplayName}`);
    expect(wrapper.find('[data-testid="item-artist-nationality"]').text()).toBe(`Artist Nationality: ${item.artistNationality}`);
    expect(wrapper.find('[data-testid="item-tags"]').text()).toBe(`Tags:${item.tags.map(tag => tag.term).join('')}`);
  });

  it('renders a maximum of 3 tags', () => {
    const item = {
      tags: [{term: 'Art'},{term: 'Painting'},{term: 'Taco'},{term: 'Burrito'}],
    };
    const wrapper = mount(SearchResultItem, {
      props: { item },
    });
    expect(wrapper.findAll('[data-testid="item-tags"] span')).toHaveLength(3);
  });

  it('opens the URL in a new tab when clicked', () => {
    const item = {
      objectURL: 'http://example.com',
    };
    const wrapper = mount(SearchResultItem, {
      props: { item },
    });

    const searchResultItem = wrapper.find('[data-testid="search-result-item__link"]');
    expect(searchResultItem.exists()).toBe(true); 
    
    expect(searchResultItem.attributes('href')).toBe(item.objectURL);
    expect(searchResultItem.attributes('target')).toBe('_blank');
  });

  it('renders "Not Available" when no primaryImageSmall is provided', () => {
    const wrapper = mount(SearchResultItem, {
      props: {
        item: { ...item, primaryImageSmall: null },
      },
    });
    expect(wrapper.find('.image-placeholder').exists()).toBe(true);
    expect(wrapper.find('.image-placeholder').text()).toBe('Not Available');
  });

  it('opens the lightbox when the image is clicked', async () => {
    const wrapper = mount(SearchResultItem, {
      props: { item },
    });

    await wrapper.find('.search-result-item__image').trigger('click');
    expect(wrapper.find('[data-testid="lightbox"]').exists()).toBe(true);
  });

})