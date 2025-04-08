import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A custom hook to manage and monitor the hash in the URL with React Router.
 *
 * @returns {[string, function]} - A tuple containing the current hash and a function to update it.
 */
export const useHash = () => {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // To programmatically update the hash

    // Extract the hash from the current location
    const hash = location.hash.slice(1); // Remove the leading '#'

    // Function to programmatically update the hash
    const updateHash = (newHash) => {
        navigate(`${location.pathname}#${newHash}`, { replace: true }); // Update the hash in the URL
    };

    return [hash, updateHash];
};

/**
 * A React container component that monitors hash changes in the URL
 * and displays only the children whose `id` matches the current hash.
 *
 * If a child does not have an `id` prop or no children match the current hash,
 * it renders a fallback message or nothing.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to conditionally render based on the hash.
 * @returns {JSX.Element} The rendered child component(s) or a fallback message.
 *
 * @example
 * <HashContainer>
 *   <div id="tab1">Tab 1 Content</div>
 *   <div id="tab2">Tab 2 Content</div>
 * </HashContainer>
 * // If the URL hash is "#tab1", it renders "Tab 1 Content".
 */
export const HashContainer = ({ children }) => {
    const [currentHash] = useHash(); // Use custom hook to track the current hash

    // Filter children based on the current hash
    const activeChildren = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && (!child.props.id || child.props.id === currentHash)
    );

    return (
        <div>
            {activeChildren.length > 0 ? activeChildren : <p>No matching content for the current hash.</p>}
        </div>
    );
};