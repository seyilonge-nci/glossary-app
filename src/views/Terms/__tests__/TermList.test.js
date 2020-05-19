import { act, cleanup, render } from "@testing-library/react";
import React from 'react';
import { ClientContextProvider } from "react-fetching-library";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";

import { testIds } from "../../../constants";
import { TermList } from "../index";
import { useStateValue } from "../../../store/store";
import fixtures from "../../../utils/fixtures";

jest.mock("../../../store/store");

// const mockNavigatePush = jest.fn();

// jest.mock("react-router-dom", () => ({
//     useNavigate: () => ({
//         navigate: mockNavigatePush
//     })
// }));


let client;
let location;
let termList;
let wrapper;

const query = "A";
const queryFile = `${query}.json`;
const { getFixture } = fixtures;
const fixturePath = `/Terms/expand/Cancer.gov/Patient`;

function ComponentWithLocation({ RenderComponent, query }) {
    location = useLocation();
    return <RenderComponent query={query} />;
}

describe('TermList component rendered with English', () => {
    const language = "en";
    const searchBoxTitle = "Search NCI's Dictionary of Cancer Terms";

    termList = getFixture(`${fixturePath}/${language}/${queryFile}`);
    const termListCount = termList.meta.totalResults;

    client = {
        query: async () => ({
            error: false,
            status: 200,
            payload: termList
        })
    };

    beforeEach(async () => {
        const dictionaryName = "Cancer.gov";
        const dictionaryTitle = "NCI Dictionary of Cancer Terms";

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

        await act(async () => {
            wrapper = render(
                <MemoryRouter initialEntries={["/"]}>
                    <ClientContextProvider client={client}>
                        <TermList query={query} />
                    </ClientContextProvider>
                </MemoryRouter>
            );
        });
    });

    afterEach(() => {
        cleanup();
    });
    test(`"${termListCount} results found for: ${query}" should be present `, () => {
        const { getByText } = wrapper;
        expect(getByText(`${termListCount} results found for: ${query}`)).toBeInTheDocument();
    });

    describe(`Tests using "${query}" as query parameter for term`, () => {
        beforeEach(cleanup);
        afterEach(cleanup);
        const query = "5";

        test(`NoMatchingResults component is rendered for query "${query}" without results`, async () => {

            const client = {
                query: async () => ({
                    error: false,
                    status: 200,
                    payload: {
                        meta: {
                            totalResults: 0,
                            from: 0
                        },
                        results: [],
                        links: null
                    }
                })
            };
            const dictionaryName = "Cancer.gov";
            const dictionaryTitle = "NCI Dictionary of Cancer Terms";
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

            await act(async () => {
                wrapper = render(
                    <MemoryRouter initialEntries={["/"]}>
                        <ClientContextProvider client={client}>
                            <TermList query={query} />
                        </ClientContextProvider>
                    </MemoryRouter>
                );
            });
            const { queryByTestId } = wrapper;
            expect(queryByTestId(testIds.NO_MATCHING_RESULTS)).toBeTruthy();
        });
    });
    describe(`Tests using "${query}" as query parameter for term`, () => {
        beforeEach(cleanup);
        afterEach(cleanup);
        const query = "lung cancer";

        test(`Redirected to definition page for query "${query}" with one term result`, async () => {

            const client = {
                query: async () => ({
                    error: false,
                    status: 200,
                    payload: {
                        meta: {
                            totalResults: 1,
                            from: 0
                        },
                        results: [
                            {
                                termId: 445043,
                                language: "en",
                                dictionary: "Cancer.gov",
                                audience: "Patient",
                                termName: "lung cancer",
                                firstLetter: "l",
                                prettyUrlName: "lung-cancer",
                                pronunciation: {
                                    key: "(lung KAN-ser)",
                                    audio: "https://nci-media.cancer.gov/pdq/media/audio/714622.mp3"
                                },
                                definition: {
                                    html: "Cancer that forms in tissues of the lung, usually in the cells lining air passages. The two main types are small cell lung cancer and non-small cell lung cancer. These types are diagnosed based on how the cells look under a microscope.",
                                    text: "Cancer that forms in tissues of the lung, usually in the cells lining air passages. The two main types are small cell lung cancer and non-small cell lung cancer. These types are diagnosed based on how the cells look under a microscope."
                                },
                                otherLanguages: [],
                                relatedResources: [],
                                media: []
                            }
                        ],
                        links: null
                    },
                    loading: false
                })
            };

            const expectedLocationObject = {
                pathname: '/def/lung-cancer',
                search: '',
                hash: '',
                state: null,
                key: expect.any(String)
            };

            await act( async () => {
                wrapper = await render(
                    <MemoryRouter initialEntries={['/']}>
                        <ClientContextProvider client={client}>
                            <ComponentWithLocation RenderComponent={TermList} />
                        </ClientContextProvider>
                    </MemoryRouter>
                );
            });
            expect(location).toMatchObject(expectedLocationObject);
        });
    });
});
