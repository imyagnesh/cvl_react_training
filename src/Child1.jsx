import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';

class Chil1 extends PureComponent {
  //   static getDerivedStateFromProps(props, state) {
  //     console.log('Child 1 derived state');
  //     return null;
  //   }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     //   if any thing change in props or state then it will return true
  //     // else return false
  //     console.log('Child 1 shouldComponentUpdate');
  //     return shallowCompare(this, nextProps, nextState);
  //   }

  mouseMove = () => {
    console.log('Mouse move');
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.mouseMove);
    this.interval = setInterval(() => {
      console.log('hello');
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    clearInterval(this.interval);
  }

  render() {
    console.log('Child 1 Component render');
    const { counter } = this.props;
    if (counter > 10) {
      throw new Error('Something went wrong...');
    }
    return (
      <div>
        Child 1 Component
        <h2>Counter is {counter}</h2>
      </div>
    );
  }
}

export default Chil1;
