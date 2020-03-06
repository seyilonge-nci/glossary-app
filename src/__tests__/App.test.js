import { act, cleanup, render } from "@testing-library/react";
import React from "react";
import { MemoryRouter, useLocation } from "react-router";
import track from "react-tracking";

import App from "../App";
import { useAppPaths } from "../hooks/routing";
import { useStateValue } from "../store/store.js";

jest.mock("../store/store.js");

let location;
let wrapper;

describe("App component", () => {

  const {
    HomePath,
    DefinitionPath,
    ExpandPath,
    ExpandPathNoParam
  } = useAppPaths();

  function AppWithLocation() {
    location = useLocation();
    return <App tracking={ track({page: "app_load"}) } />;
  }

  beforeEach( async () => {
    const dictionaryName = "Cancer.gov";
    const dictionaryTitle = "NCI Dictionary of Cancer Terms";
    const language = "en";
    const searchBoxTitle = "Search NCI's Dictionary of Cancer Terms";

    useStateValue.mockReturnValue([
      {
        appId: "mockAppId",
        basePath: "/",
        dictionaryName,
        dictionaryTitle,
        language,
        searchBoxTitle
      }
    ]);

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={["/"]}>
            <AppWithLocation />
          </MemoryRouter>
      );
    });
  });

  afterEach(cleanup);

  test("loads", async () => {
    // Asserts that the routes do exist and have the proper base paths.
    // This should not test rendering.

    const expectedLocationObject = {
      pathname: HomePath(),
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });

});
