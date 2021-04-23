import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import StyledRadio from 'components/UI/StyledRadio';

describe('StyledRadio', () => {
  const getComponent = props => render(<StyledRadio {...props} />);

  it('renders without crash', async () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders with expected functionality', async () => {
    const onClick = jest.fn();
    const props = {
      onClick,
      "data-testid": "check",
      checked: false,
      value: 1
    };
    const { getByTestId } = getComponent(props);
    const styledRadio = getByTestId('check');
    fireEvent.click(styledRadio, { target: { checked: true }});
    expect(styledRadio).toHaveProperty('checked', true);
  });

});