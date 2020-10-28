// test/components/ToDo.spec.js
import { shallow } from '@vue/test-utils';
import test from 'ava';

import ToDo from '../../components/ToDo';

test('It should show a list of to-do items if there are any.', (t) => {
  const wrapper = shallow(ToDo, {
    data() {
      return {
        items: [
          'Hello World',
          'This is a test',
        ],
      };
    },
  });
  // t.true(wrapper.contains('.my_num'));
  t.true(wrapper.contains('.to-do__list'));
});