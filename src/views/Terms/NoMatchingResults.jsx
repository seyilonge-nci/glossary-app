import React from 'react';

import { NO_MATCHING_TEXT, testIds } from "../../constants";

const NoMatchingResults = () => {
    return (
        <p data-testid={testIds.NO_MATCHING_RESULTS}>{NO_MATCHING_TEXT}</p>
    );
};

export default NoMatchingResults;