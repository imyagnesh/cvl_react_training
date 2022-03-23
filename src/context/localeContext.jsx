import React, { createContext, PureComponent } from 'react';

export const LocaleContext = createContext();

export class LocaleProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locale: 'en',
    };
  }

  toggleLocale = () => {
    this.setState(({ locale }) => ({
      locale: locale === 'en' ? 'fr' : 'en',
    }));
  };

  render() {
    const { children } = this.props;
    const { locale } = this.state;
    return (
      <LocaleContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ locale, toggleLocale: this.toggleLocale }}
      >
        {children}
      </LocaleContext.Provider>
    );
  }
}
