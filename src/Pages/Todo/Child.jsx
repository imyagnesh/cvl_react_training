import React, { useEffect } from 'react';

function Child() {
  // Component Did mount
  useEffect(() => {
    const mouseMove = () => {
      console.log('Mouse Moved');
    };

    document.addEventListener('mousemove', mouseMove);

    // ComponentWillUnmount
    return () => {
      document.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return <div>Child</div>;
}

export default Child;
