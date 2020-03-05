import { getEndpoint } from '../endpoints';


export const getExpandCharResults = ( chr ) => {
    const endpoint = getEndpoint('expandChar');

    return {
        method: 'GET',
        endpoint: `${endpoint}/${chr}`
    }
};
