import React, { memo } from 'react';

const Child2 = () => {
  console.log('Child 2 render');
  return <div>Child2 Component</div>;
};

export default memo(Child2, (prevProp, nextProps) => {
  return false;
});
