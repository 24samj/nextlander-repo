"use client";

import React, { useState } from "react";
import styles from "./page-editor.module.css";
import { currentUser, handleAnalytics, pb } from "@/services/pocketbase";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const PageEditor = () => {
    useAuth();
    const router = useRouter(); // Initialize the router
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [components, setComponents] = useState({
        header: true,
        text: false,
        image: "",
        footer: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "description") {
            setDescription(value);
        }
    };

    const handleImageUrlChange = (event) => {
        setComponents({
            ...components,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setComponents((prevComponents) => ({
            ...prevComponents,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleAnalytics(event);
        const data = {
            user: currentUser.id,
            data: { title, description, components, views: 0 },
        };
        console.log("Form Data:", data);
        const response = await pb.collection("landingPages").create(data);
        console.log("created: ", response);
        router.push(`/dashboard`);
    };

    const handleCancel = (event) => {
        event.stopPropagation();
        handleAnalytics(event);
        console.log("cancelling");
        router.push("/dashboard");
    };

    return (
        <div className={styles.editorPageContainer}>
            <h1>Create New Landing Page</h1>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit}
                analyticstitle="New_Page_Submit_Button">
                <div className={styles.formInputsContainer}>
                    <div className={styles.textInputsContainer}>
                        <label className={styles.groupHeader}>Basic</label>
                        <div className={styles.inputFormGroup}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputFormGroup}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className={styles.checkboxInputsContainer}>
                        <label className={styles.groupHeader}>Components</label>
                        <div className={styles.checkboxFormGroup}>
                            <div>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="header"
                                    name="header"
                                    checked={components.header}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="header">Header (Title)</label>
                            </div>
                            <div>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="text"
                                    name="text"
                                    checked={components.text}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="text">Text (Description)</label>
                            </div>
                            <div>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="image"
                                    name="image"
                                    checked={components.image}
                                    readOnly
                                />
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="image"
                                    value={components.image}
                                    onChange={handleImageUrlChange}
                                    placeholder="Paste an image URL address"
                                />
                            </div>
                            <div>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    id="footer"
                                    name="footer"
                                    checked={components.footer}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="footer">Footer</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonsContainer}>
                    <button
                        type="reset"
                        onClick={handleCancel}
                        className={styles.cancelButton}
                        analyticstitle="New_Page_Cancel_Button">
                        Cancel
                    </button>

                    <button type="submit" className={styles.submitButton}>
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageEditor;
