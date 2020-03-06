import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import Home from '../Home';
import { useStateValue } from "../../../store/store.js";

jest.mock("../../../store/store.js");

test('Match dictionary name for Home', () => {
  const dictionaryName = 'Cancer.gov';
  const dictionaryTitle = 'NCI Dictionary of Cancer Terms';
  const language = "en";

  useStateValue.mockReturnValue([
    {
      appId: "mockAppId",
      basePath: '/testbase',
      dictionaryName,
      dictionaryTitle,
      language
    }
  ]);

  const { getByText } = render(
    <MemoryRouter initialEntries={["/testbase"]}>
      <Home />
    </MemoryRouter>
  );

  expect( getByText(dictionaryTitle) ).toBeTruthy();
});