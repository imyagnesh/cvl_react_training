import React, { createContext, PureComponent } from 'react';

export const ThemeContext = createContext();

export class ThemeProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };
  }

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'dark' ? 'light' : 'dark',
    }));
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <ThemeContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}
