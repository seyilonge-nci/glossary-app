import { act, cleanup, render } from "@testing-library/react";
import React from "react";
import { ClientContextProvider } from "react-fetching-library";
import { MemoryRouter, useLocation } from "react-router";

import { useAppPaths } from "../hooks/routing";
import { getAxiosClient } from "../services/api/axios-client";
import { useStateValue } from "../store/store.js";
import Definition from "../views/Definition";
import Home from "../views/Home";

jest.mock("../store/store.js");

let wrapper;

describe("App component", () => {
  let location;

  function ComponentWithLocation({ RenderComponent }) {
    location = useLocation();
    return <RenderComponent />;
  }

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

  afterEach(cleanup);

  test("DefinitionPath route exists and matches expected route", async () => {
    const { DefinitionPath } = useAppPaths();
    const idOrName = 'metastatic';
    const initialState = {
      dictionaryName,
      dictionaryTitle,
      language,
      searchBoxTitle
    };

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={[DefinitionPath({ idOrName })]}>
            <ClientContextProvider client={getAxiosClient(initialState)}>
              <ComponentWithLocation RenderComponent={ Definition } />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });

    const expectedLocationObject = {
      pathname: `/def/${idOrName}`,
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });

  test("ExpandPath route exists and matches expected route", async () => {
    const { ExpandPath } = useAppPaths();
    const expandChar = 'A';
    const initialState = {
      dictionaryName,
      dictionaryTitle,
      language,
      searchBoxTitle
    };

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={[ExpandPath({ expandChar })]}>
            <ClientContextProvider client={getAxiosClient(initialState)}>
              <ComponentWithLocation RenderComponent={ Home } />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });

    const expectedLocationObject = {
      pathname: `/expand/${expandChar}`,
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });

  test("ExpandPathNoParam route exists and matches expected route", async () => {
    const { ExpandPathNoParam } = useAppPaths();
    const initialState = {
      dictionaryName,
      dictionaryTitle,
      language,
      searchBoxTitle
    };

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={[ExpandPathNoParam()]}>
            <ClientContextProvider client={getAxiosClient(initialState)}>
              <ComponentWithLocation RenderComponent={ Home } />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });

    const expectedLocationObject = {
      pathname: '/expand',
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });

  test("ExpandPathSpanish route exists and matches expected route", async () => {
    const { ExpandPathSpanish } = useAppPaths();
    const expandChar = 'A';
    const initialState = {
      dictionaryName,
      dictionaryTitle,
      language,
      searchBoxTitle
    };

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={[ExpandPathSpanish({ expandChar })]}>
            <ClientContextProvider client={getAxiosClient(initialState)}>
              <ComponentWithLocation RenderComponent={ Home } />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });

    const expectedLocationObject = {
      pathname: `/expandir/${expandChar}`,
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });

  test("ExpandPathNoParamSpanish route exists and matches expected route", async () => {
    const { ExpandPathNoParamSpanish } = useAppPaths();
    const initialState = {
      dictionaryName,
      dictionaryTitle,
      language,
      searchBoxTitle
    };

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={[ExpandPathNoParamSpanish()]}>
            <ClientContextProvider client={getAxiosClient(initialState)}>
              <ComponentWithLocation RenderComponent={ Home } />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });

    const expectedLocationObject = {
      pathname: '/expandir',
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });

  test("HomePath route exists and matches expected route", async () => {
    const { HomePath } = useAppPaths();
    const initialState = {
      dictionaryName,
      dictionaryTitle,
      language,
      searchBoxTitle
    };

    await act( async () => {
      wrapper = render(
          <MemoryRouter initialEntries={[HomePath()]}>
            <ClientContextProvider client={getAxiosClient(initialState)}>
              <ComponentWithLocation RenderComponent={ Home } />
            </ClientContextProvider>
          </MemoryRouter>
      );
    });

    const expectedLocationObject = {
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: expect.any(String)
    };

    expect(location).toMatchObject(expectedLocationObject);
  });
});
