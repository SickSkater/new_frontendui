import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

/**
 * BreadcrumbNavigation component to track and navigate to previously visited pages.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {number} props.maxHistory - Maximum number of pages to keep in the history.
 *
 * @returns {JSX.Element} The rendered BreadcrumbNavigation component.
 */
const BreadcrumbNavigation = ({ maxHistory = 5 }) => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    const predefinedOrder = ["user", "admission", "evaluation", "exam", "student", "paymentinfo"];

    const getDisplayName = (path) => {
        const predefinedLabels = {
            "user": "Uživatel",
            "admission": "Přihláška",
            "evaluation": "Výsledek",
            "exam": "Zkouška",
            "student": "Student",
            "paymentinfo": "Platba",
        };

        for (const [key, label] of Object.entries(predefinedLabels)) {
            if (path.includes(key)) {
                return label;
            }
        }
        return path; // Fallback to the raw path if no match is found
    };

    useEffect(() => {
        const handleNavigation = () => {
            const currentPath = window.location.pathname + window.location.hash;
            setHistory((prevHistory) => {
                // Remove outdated instances if navigating back to a parent
                const filteredHistory = prevHistory.filter((path, index, self) => {
                    const currentIndex = predefinedOrder.findIndex((segment) => currentPath.includes(segment));
                    const pathIndex = predefinedOrder.findIndex((segment) => path.includes(segment));

                    // Ensure no duplicates exist in the history
                    return pathIndex <= currentIndex && path !== currentPath;
                });

                const updatedHistory = [...filteredHistory, currentPath]
                    .filter((path, index, self) => predefinedOrder.some((segment) => path.includes(segment)) && self.indexOf(path) === index) // Keep only valid segments and remove duplicates
                    .sort((a, b) => {
                        const indexA = predefinedOrder.findIndex((segment) => a.includes(segment));
                        const indexB = predefinedOrder.findIndex((segment) => b.includes(segment));
                        return indexA - indexB;
                    });

                localStorage.setItem('breadcrumbHistory', JSON.stringify(updatedHistory.slice(-maxHistory)));
                return updatedHistory.slice(-maxHistory);
            });
        };

        // Load history from localStorage on initial render
        const savedHistory = localStorage.getItem('breadcrumbHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }

        // Add event listener for navigation changes
        window.addEventListener('popstate', handleNavigation);

        // Initial load
        handleNavigation();

        return () => {
            window.removeEventListener('popstate', handleNavigation);
        };
    }, [maxHistory]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            {history.some((path) => path.includes("user")) && history.length === 1 ? null : (
                <Nav className="breadcrumb-navigation">
                    {history.map((path, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link onClick={() => handleNavigate(path)}>{getDisplayName(path)}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            )}
        </>
    );
};

export default BreadcrumbNavigation;