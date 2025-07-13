import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./EditButton.module.css";

/**
 * EditButton Component
 * 
 * This component renders a button that toggles between "Edit" and "View" modes
 * based on the current URL path. It uses React Router's `useNavigate`, `useLocation`,
 * and `useParams` hooks to determine the current state and navigate to the appropriate
 * route when clicked.
 * 
 * @component
 * 
 * @returns {JSX.Element} A button that toggles between "Edit" and "View" modes.
 * 
 * @example
 * // Usage in a React component
 * import { EditButton } from './EditButton';
 * 
 * const MyComponent = () => (
 *   <div>
 *     <EditButton />
 *   </div>
 * );
 * 
 * @remarks
 * - The button text changes dynamically based on the current URL path.
 * - The button navigates to `/applicant/user/view/:id` or `/applicant/user/edit/:id` 
 *   depending on the current mode.
 */
export const EditButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const isEdit = location.pathname.includes("/edit/");
    const handleClick = () => {
        if (isEdit) {
            navigate(`/applicant/user/view/${id}`);
        } else {
            navigate(`/applicant/user/edit/${id}`);
        }
    };

    return (
        <Button className={styles.editButton} onClick={handleClick}>
            {isEdit ? "read-only mode" : "edit mode"}
        </Button>
    );
};