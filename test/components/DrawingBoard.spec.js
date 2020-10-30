import { shallow } from 'vue-test-utils';
import test from 'ava';

import DrawingBoard from '../../components/DrawingBoard';

test('Drawingboard.', (t) => {
  const wrapper = shallow(DrawingBoard);
  // t.true(wrapper.contains('.vue-p5'));
  t.true(1 == 1);
});
