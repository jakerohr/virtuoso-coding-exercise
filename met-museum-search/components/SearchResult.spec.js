import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchResult from './SearchResult.vue';

describe('SearchResult.vue', () => {
  const searchResults = [
    {
      department: "Arms and Armor"
    },
    {
      department: "Paintings"
    },
    {
      department: "Sculpture"
    },
    {
      department: "Arms and Armor"
    },
    {
      department: "Sculpture"
    },
    {
      department: "Arms and Armor"
    }
  ];

  it('renders the total count of search result items', () => {
    const wrapper = mount(SearchResult, {
      props: { items: searchResults, totalResults: searchResults.length },
    });

    const totalCount = wrapper.find('[data-testid="total-count"]');
    expect(totalCount.text()).toContain(`Total Results: ${searchResults.length} of ${searchResults.length}`);
  });

  it('renders a list of search result items in a vertical layout', () => {
    const wrapper = mount(SearchResult, {
      props: { items: searchResults, totalResults: searchResults.length },
    });

    const items = wrapper.findAll('.search-result-item');
    expect(items.length).toBe(searchResults.length);
  });

  it('shows the top 3 departments in the results', () => {
    const wrapper = mount(SearchResult, {
      props: { items: searchResults, totalResults: searchResults.length },
    });

    const topDepartments = wrapper.find('.top-departments');
    expect(topDepartments.exists()).toBe(true);
    const departmentList = topDepartments.findAll('li');
    expect(departmentList.length).toBe(3);
    expect(departmentList[0].text()).toContain('Arms and Armor');
    expect(departmentList[1].text()).toContain('Sculpture');
    expect(departmentList[2].text()).toContain('Paintings');
  });
});
