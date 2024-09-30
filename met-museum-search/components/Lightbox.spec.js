import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Lightbox from './Lightbox.vue';

describe('Lightbox.vue', () => {
  it('renders the image when imageSrc is provided', () => {
    const wrapper = mount(Lightbox, {
      props: {
        imageSrc: 'https://example.com/image.jpg',
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://example.com/image.jpg');
    expect(wrapper.find('.image-placeholder').exists()).toBe(false);
  });

  it('renders "Not Available" when imageSrc is null', () => {
    const wrapper = mount(Lightbox, {
      props: {
        imageSrc: null,
      },
    });

    const placeholder = wrapper.find('.image-placeholder');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe('Not Available');
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(Lightbox, {
      props: {
        imageSrc: 'https://example.com/image.jpg',
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
