import React from 'react';
import { useQuery } from "react-fetching-library";

// Local imports first
import NoMatchingResults from "./NoMatchingResults";
import Term from "./Term";
import Spinner from "../../components/atomic/spinner";
import { getExpandCharResults } from "../../services/api/actions";

const TermList = ({ query }) => {
    const { loading, payload, error } = useQuery( getExpandCharResults( query ) );
    if (payload) {
        // console.log('TermList:', query, payload.results.length, payload.results.length > 0,  payload);
    }

    return (
        <>
            { loading && <Spinner /> }
            { !loading && !error && payload &&
                <div className="dictionary-list-container results" data-dict-type="term">
                    { payload.results && payload.results.length > 0
                        ?
                            <>
                                <h4>{ payload.meta.totalResults } results found for: {query} </h4>
                                <dl className="dictionary-list">
                                { payload.results.map( ( result, index ) => {
                                    return (
                                        <>
                                            <Term payload={result} />
                                        </>
                                    )
                                })}
                                </dl>
                            </>
                        :   <NoMatchingResults />
                    }

                </div>
            }
        </>
    )
};

export default TermList;
