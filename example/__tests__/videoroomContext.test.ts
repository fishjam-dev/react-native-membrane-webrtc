import { renderHook, act } from '@testing-library/react-hooks';

import { useVideoroomState } from '../src/VideoroomContext';

test('videorromContext roomName updated', () => {
  let context;
  renderHook(() => {
    context = useVideoroomState();
  });

  act(() => {
    console.log(context.roomName);
  });
});
