// test/components/ToDo.spec.js
import { shallow } from 'vue-test-utils';
import test from 'ava';

import index from '../../pages/index';

test('Test classes in index.', (t) => {
  const wrapper = shallow(index);
  t.true(wrapper.contains('.headline'));
  t.true(wrapper.contains('.special-color'));
  t.true(wrapper.contains('.text-center'));
  t.true(wrapper.contains('.mt-12'));
  t.true(wrapper.contains('.rounded-card'));
});
