import {act, cleanup, render} from '@testing-library/react';
import React from 'react';
import { ClientContextProvider } from "react-fetching-library";
import { MemoryRouter } from 'react-router';

import { NO_MATCHING_TEXT, testIds } from "../../../constants";
import Home from '../Home';
import { useStateValue } from "../../../store/store.js";
import { fixtures } from "../../../utils";

jest.mock("../../../store/store.js");

let wrapper;
const dictionaryName = 'Cancer.gov';
const dictionaryTitle = 'NCI Dictionary of Cancer Terms';
const language = "en";

const expandChar = 'A';
const queryFile = `${expandChar}.json`;
const { getFixture } = fixtures;
const fixturePath = `/Terms/expand/Cancer.gov/Patient`;
const termList = getFixture(`${fixturePath}/${language}/${queryFile}`);
const termListCount = termList.meta.totalResults;

useStateValue.mockReturnValue([
  {
    appId: "mockAppId",
    basePath: '/',
    dictionaryName,
    dictionaryTitle,
    language
  }
]);

const client = {
  query: async () => ({
    error: false,
    status: 200,
    payload: termList
  })
};

describe('Home component', () => {

  beforeEach( async () => {

    await act(async () => {
      wrapper = render(
          <MemoryRouter initialEntries={["/"]}>
            <ClientContextProvider client={client}>
              <Home />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });
  });

  afterEach(cleanup);

  test('Match dictionary title name for Home', () => {
    const { getByText } = wrapper;
    expect( getByText(dictionaryTitle) ).toBeTruthy();
  });

  test('Results for expand char "A" are displayed on home page by default', () => {
    const { getByText, getAllByRole } = wrapper;
    expect(getByText(`${termListCount} results found for: ${expandChar}`)).toBeInTheDocument();
    expect(getAllByRole('term').length).toEqual(termListCount);
  });

  describe('Load Home component using expand path with no params', () => {
    beforeEach(async () => {
      cleanup();
      await act(async () => {
        wrapper = render(
            <MemoryRouter initialEntries={["/expand"]}>
              <ClientContextProvider client={client}>
                <Home />
              </ClientContextProvider>
            </MemoryRouter>
        );
      });
    });
    afterEach(cleanup);

    test('NoMatchingResults component is rendered for expand path with no params', () => {
      const { getByTestId } = wrapper;
      expect(getByTestId(testIds.NO_MATCHING_RESULTS).textContent).toBe(NO_MATCHING_TEXT);
    });

  });

});
