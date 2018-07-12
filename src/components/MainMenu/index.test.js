import React from 'react';
// import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom';
import { shallow } from 'enzyme';

import { MainMenu } from './index';

describe('<MainMenu />', () => {
  const createComponent = (isAuthenticated = false) => {
    // const store = configureStore({}, browserHistory);
    // const renderedComponent = shallow(
    //   <Provider store={store}>
    //     <MainMenu isAuthenticated={isAuthenticated} />
    //   </Provider>
    // ).dive();
    const renderedComponent = shallow(<MainMenu isAuthenticated={isAuthenticated} />);
    return renderedComponent;
  };

  beforeEach(() => {
  });

  it('should render correctly', () => {
    const renderedComponent = createComponent();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render render 2 NavLink components when not authenticated', () => {
    const renderedComponent = createComponent();
    expect(renderedComponent.find('NavLink').length).toEqual(2);
  });

  it('should render render 3 NavLink components when authenticated', () => {
    const isAuthenticated = true;
    const renderedComponent = createComponent(isAuthenticated);
    expect(renderedComponent.find('NavLink').length).toEqual(3);
  });
});
