import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./EditButton.module.css";


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
            {isEdit ? "Zobrazit" : "Upravit"}
        </Button>
    );
};