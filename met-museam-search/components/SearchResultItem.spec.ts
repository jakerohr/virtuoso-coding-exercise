import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import SearchResultItem from './SearchResultItem.vue'

describe('SearchResultItem', () => {
  it('renders "Not Available" when no props are passed', () => {
    const wrapper = mount(SearchResultItem, {
      props: {
        item: {},
      },
    });
    expect(wrapper.text()).toContain('Not Available');
  });

  it('renders item details correctly', () => {
    const item = {
      primaryImageSmall: 'https://example.com/image.jpg',
      title: 'Test Title',
      objectDate: '2024',
      department: 'Taco Department',
      artistRole: 'street artist',
      artistDisplayName: 'Banksy',
      artistNationality: 'English',
      tags: ['Art','Painting','Taco'],
      objectURL: 'http://example.com',
    };
    const wrapper = mount(SearchResultItem, {
      props: { item },
    });

    expect(wrapper.find('[data-testid="item-image"]').attributes('src')).toBe(item.primaryImageSmall);
    expect(wrapper.find('[data-testid="item-title"]').text()).toBe(item.title);
    expect(wrapper.find('[data-testid="item-date"]').text()).toBe(item.objectDate);
    expect(wrapper.find('[data-testid="item-department"]').text()).toBe(item.department);
    expect(wrapper.find('[data-testid="item-artist-role"]').text()).toBe(item.artistRole);
    expect(wrapper.find('[data-testid="item-artist-name"]').text()).toBe(item.artistDisplayName);
    expect(wrapper.find('[data-testid="item-artist-nationality"]').text()).toBe(item.artistNationality);
    expect(wrapper.find('[data-testid="item-tags"]').text()).toContain(item.tags[0]);
  });

  it('renders a maximum of 3 tags', () => {
    const item = {
      tags: ['Art','Painting','Taco','Burrito'],
    };
    const wrapper = mount(SearchResultItem, {
      props: { item },
    });
    expect(wrapper.findAll('[data-testid="item-tags"] span')).toHaveLength(3);
  });
})