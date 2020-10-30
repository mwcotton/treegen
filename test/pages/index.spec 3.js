// test/components/ToDo.spec.js
import { shallow } from '@vue/test-utils';
import test from 'ava';

import index from '../../pages/index';

test('Does the index contain a headline.', (t) => {
  const wrapper = shallow(index);
  // t.true(wrapper.contains('.my_num'));
  t.true(wrapper.contains('.headline'));
});
test('Does the index contain a rounded-card.', (t) => {
  const wrapper = shallow(index);
  // t.true(wrapper.contains('.my_num'));
  t.true(wrapper.contains('.rounded-card'));
});
test('It should render an `<div>`.', (t) => {
  const wrapper = shallow(index);

  t.true(wrapper.is('div'));
});

