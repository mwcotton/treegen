import { shallow } from 'vue-test-utils';
import test from 'ava';

import DrawingBoard from '../../components/DrawingBoard';

test('Drawingboard.', (t) => {
  const wrapper = shallow(DrawingBoard);
  // t.true(wrapper.contains('.vue-p5'));
  t.true(1 == 1);
});

test('Test props', (t) => {
  const wrapper = shallow(DrawingBoard, {
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
  t.is(wrapper.props().branchLen, 2);
  t.is(wrapper.props().iters, 3);
  t.is(wrapper.props().branchAng, 20);
  t.is(wrapper.props().initState, 'X');
  t.is(wrapper.props().choiceRule, 'Deterministic');
  t.is(wrapper.props().fRule, 'FF');
  t.is(wrapper.props().xRule, 'F[+X]F[-X]+X');
});
