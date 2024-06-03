"use client";

import React, { useEffect, useState } from "react";
import styles from "./[id].module.css";
import { currentUser, handleAnalytics, pb } from "@/services/pocketbase";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const PageEditor = ({ params }) => {
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

    const fetchLandingPage = async (id) => {
        try {
            console.log("calling");
            const record = await pb.collection("landingPages").getOne(id, {
                expand: "relField1,relField2.subRelField",
            });
            console.log("response is: ", record);
            setTitle(record.data.title);
            setDescription(record.data.description);
            setComponents(record.data.components);
        } catch (error) {
            console.error("Error fetching landing page: ", error);
        }
    };

    useEffect(() => {
        fetchLandingPage(params.id);
    }, [params.id]);

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
            data: { title, description, components },
        };
        console.log("Form Data:", data);
        const response = await pb
            .collection("landingPages")
            .update(params.id, data);
        console.log("updated: ", response);
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
            <h1>Edit Landing Page</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
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
                        analyticstitle="Edit_Cancel_Button">
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        analyticstitle="Edit_Submit_Button">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageEditor;
