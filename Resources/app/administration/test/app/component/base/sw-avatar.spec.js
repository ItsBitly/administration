import { shallowMount } from '@vue/test-utils';
import 'src/app/component/base/sw-avatar';

describe('components/base/sw-avatar', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Shopware.Component.build('sw-avatar'), {
            provide: {},
            mocks: {},
            stubs: {}
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should be a Vue.js component', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should be a circle in default', () => {
        expect(wrapper.classes()).toContain('sw-avatar__circle');
    });

    it('should change the variant to a square', () => {
        wrapper.setProps({
            variant: 'square'
        });

        expect(wrapper.classes()).toContain('sw-avatar__square');
    });
});
