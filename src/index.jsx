import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import Child1 from './Child1';
import Child2 from './Child2';

// Component Name always start with Upper case
// per component return only single element

// Props are immutable cant change props

// function App() {
//   return (
//     <>
//       <Header
//         title="Header"
//         listItem={[...new Set(['Home', 'About', 'About', 'Contact'])]}
//       />
//       <h1>Yagnesh</h1>
//       <h2>Full Stack developer</h2>
//       <input type="checkbox" />

//       <Footer />
//     </>
//   );
// }

// we can create methods in class Component
// class component we can mange state
// Life Cycle Methods

// Mounting

// 1. Constructor
// 2. getDerivedStateFromProps
// 3. render
// 4. componentDidMount

// Updating

// 1. getDerivedStateFromProps
// 2. shouldComponentUpdate
// 3. render
// 4. getSnapshotBeforeUpdate
// 5. componentDidUpdate

// Unmounting
// componentWillUnmount

// Error

// On Prop value change or state value component rerender

class App extends Component {
  // 1. Initialize State Value
  // 2. Base on Prop values derive state value
  // 3. Analytics

  // Note: Don't set State value asynchronously ✅
  // Call only 1nce
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.h1ref = createRef();
    this.h2ref = createRef();

    // console.log('constructor');
    // console.log(document.getElementById('heading'));
    // API Call and send user information

    // Api call get data and base on that data set state value ❌
  }

  // Derive new state value based on recent prop and state value
  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps');
    // console.log(document.getElementById('heading'));
    // console.log(props);
    // console.log(state);
    return {
      greet: `Hello, ${props.name}`,
    };
  }

  // Manipulate Dom element
  componentDidMount() {
    // console.log(document.getElementById('heading'));
    // O(logN)
    // document.getElementById('heading').style = 'color: red';
    // O(1)
    this.h1ref.current.style = 'color: red';
    this.h2ref.current.style = 'color: blue';
    // this.h1ref.current.style = 'color: blue';
    // this.h2Ref.current.style = 'color:yellow';
    document.addEventListener('copy', () => {
      console.log('Copied');
    });
    // On component load fetch data from server and display data
    // using api call we can set State value
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 300;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
    // prevProps
    // this.props -> new Props
    // prevState
    // this.state -> new State
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 5,
    }));
  };

  handleDecrement = () => {
    this.setState((state) => {
      if (state.counter > 0) {
        return { counter: state.counter - 5 };
      }
      return state;
    });
  };

  changeGreet = () => {
    this.setState((state, props) => ({
      greet: `Hola ${props.name}`,
    }));
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info.componentStack);
  }

  render() {
    const { counter, greet, hasError } = this.state;

    if (hasError) {
      return <h1>{hasError.message}</h1>;
    }

    return (
      <>
        <h1 id="heading" ref={this.h1ref}>
          Counter:{counter}
        </h1>
        <button type="button" onClick={this.handleClick}>
          Increment Counter
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Decrement Counter
        </button>
        <button type="button" onClick={this.changeGreet}>
          Change Greet Message
        </button>
        <h2 ref={this.h2ref}>{greet}</h2>
        {counter < 20 && <Child1 counter={counter} />}
        <Child2 />
      </>
    );
  }
}

// App.getDerivedStateFromProps = (props, state) => {
//   console.log('getDerivedStateFromProps');
//   console.log(props);
//   console.log(state);
//   return {
//     greet: `Hello, ${props.name}`,
//   };
// };

ReactDOM.render(<App name="Yagnesh" />, document.getElementById('root'));

// Mounting

// 1. Constructor -> base on prop set State value
// 2. static getDerivedStateFromProps -> calls Everytime when prop or state value change
// 3. render
// 4. componentDidMount (call only once) -> manipulate dom element

// Updating

// 1. getDerivedStateFromProps
// 2. shouldComponentUpdate
// 3. render
// 4. snapshotBeforeUpdate
// 5. componentDidUpdate -> manipulate Dom

// UnMounting
// componentWillUnmount -> remove all async functionality on component unmount

// Error
// 1. getDerivedStateFromError ->
// 2. componentDidCatch -> log error info
