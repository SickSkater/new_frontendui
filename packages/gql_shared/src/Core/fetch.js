/**
 * Wrapper function for `fetch` that provides an intermediary layer for server communication.
 * Allows customization of headers, body processing, and response handling with built-in support for default fetch parameters.
 *
 * @param {string} path - The API endpoint path to fetch from. Ignored if `overridenPath` is provided.
 * @param {Object} [params={}] - Fetch parameters, including headers and body. These are merged with global fetch parameters.
 * @param {Object} [options={}] - Additional configuration options for the fetch request.
 * @param {boolean} [options.replaceUUID=false] - If true, replaces all instances of "UUID" in the request body with "ID".
 * @param {boolean} [options.replaceID=false] - If true, replaces all instances of ": ID" in the request body with ": UUID".
 * @param {Object} [options.globalFetchParams={}] - Default fetch parameters applied globally.
 * @param {string} [options.globalFetchParams.method='POST'] - HTTP method for the fetch request (e.g., 'GET', 'POST').
 * @param {Object} [options.globalFetchParams.headers={'Content-Type': 'application/json'}] - Default headers for the fetch request.
 * @param {string} [options.globalFetchParams.cache='no-cache'] - Cache behavior (e.g., 'no-cache', 'reload').
 * @param {string} [options.globalFetchParams.redirect='error'] - Redirect behavior (e.g., 'manual', 'follow', 'error').
 * @param {string} [options.overridenPath='/api/gql'] - Path to use for the request instead of the provided `path`.
 *
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON response or rejects with an error.
 *
 * @throws {Error} If the fetch response status is not in the 2xx range.
 * @throws {Error} If the response contains a redirect (302) and the `location` header is missing.
 *
 * @example
 * authorizedFetch2('/api/users', {
 *   headers: { Authorization: 'Bearer token' },
 *   body: JSON.stringify({ query: '{ users { id, name } }' })
 * }, {
 *   replaceUUID: true,
 *   overridenPath: '/api/custom'
 * }).then(data => console.log(data))
 *   .catch(err => console.error(err));
 */
export const authorizedFetch2 = async (path, params = {}, options = {}) => {
    // Destructure options with default values
    const {
        replaceUUID = false,
        replaceID = false,
        globalFetchParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache', // Cache control: no-cache, reload, force-cache, etc.
            redirect: 'error', // Redirect behavior: manual, follow, error.
        },
        overridenPath = '/api/gql', // Default to `/api/gql` unless overridden
    } = options;

    // Merge global fetch parameters with specific request parameters
    const headers = { ...globalFetchParams.headers, ...params.headers };
    const fetchParams = { ...globalFetchParams, ...params, headers };

    // Safely handle body replacements
    if (typeof fetchParams.body === 'string') {
        if (replaceUUID) {
            fetchParams.body = fetchParams.body.replaceAll('UUID', 'ID');
        }
        if (replaceID) {
            fetchParams.body = fetchParams.body.replaceAll(': ID', ': UUID');
        }
    }

    // Perform the fetch request
    let fetchResponse = null
    let jsonResponse = null
    try {
        fetchResponse = await fetch(overridenPath, fetchParams)
        jsonResponse = await fetchResponse.json()
    } catch (error) {
        console.log("fetch got error ", error)
        throw error
    }
    return jsonResponse
    // return 
    //     .then((response) => {
    //         const 
    //         // Handle 302 redirects explicitly if running in a browser environment
    //         if (response.status === 302 && typeof window !== 'undefined') {
    //             const location = response.headers.get('location');
    //             if (location) {
    //                 const redirectLocation = new URL(location, window.location.origin);
    //                 window.location.assign(redirectLocation.toString());
    //             } else {
    //                 throw new Error(`HTTP error: ${response.status} - ${response.statusText}`)
    //                 // return Promise.reject(
    //                 //     new Error('Redirect detected (302) but no location header found.')
    //                 // );
    //             }
    //         }

    //         // Reject non-2xx responses
    //         if (!response.ok) {
    //             throw new Error(`HTTP error: ${response.status} - ${response.statusText}`)
    //             // return Promise.reject(
    //             //     new Error(`HTTP error: ${response.status} - ${response.statusText}`)
    //             // );
    //         }

    //         // Parse and return the JSON response
    //         return response.json();
    //     })
    //     .catch((error) => {
    //         console.error('Error during fetch operation:', error);
    //         throw error
    //         // return Promise.reject(new Error(`Fetch failed: ${error.message || error}`));
    //     });
};
