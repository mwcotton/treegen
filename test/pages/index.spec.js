import { shallow } from 'vue-test-utils';
import { mount } from '@vue/test-utils';
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

test('test default values', (t2) => {
  const wrapper = shallow(index, {
    propsData: {
      branchLen: 2,
      iters: 3,
      branchAng: 20,
      initState: 'X',
      choiceRule: 'Deterministic',
      fRule: 'FF',
      xRule: 'F[+X]F[-X]+X',
    },
  });
  t2.is(wrapper.props().branchLen, 2);
  t2.is(wrapper.props().iters, 3);
  t2.is(wrapper.props().branchAng, 20);
  t2.is(wrapper.props().initState, 'X');
  t2.is(wrapper.props().choiceRule, 'Deterministic');
  t2.is(wrapper.props().fRule, 'FF');
  t2.is(wrapper.props().xRule, 'F[+X]F[-X]+X');
});
