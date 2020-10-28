// test/components/ToDo.spec.js
import { shallow } from 'vue-test-utils';
import test from 'ava';

import index from '../../pages/index';

test('It should show a list of to-do items if there are any.', (t) => {
  const wrapper = shallow(index);
  // t.true(wrapper.contains('.my_num'));
  t.true(wrapper.contains('.headline'));
});

