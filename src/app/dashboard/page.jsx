"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for navigation
import styles from "./dashboard.module.css";
import { currentUser, handleAnalytics, pb } from "@/services/pocketbase";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoPersonSharp } from "react-icons/io5";
import useAuth from "@/hooks/useAuth";
import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiYoutubemusic } from "react-icons/si";

const LandingPageCard = ({
    landingPageDetails,
    id,
    linkedUser,
    fetchLandingPages,
}) => {
    console.log("linked user:", linkedUser, "currUser: ", currentUser);
    const router = useRouter(); // Initialize the router

    const handleLandingPageClick = async (event) => {
        event.stopPropagation();
        handleAnalytics(event);

        const updatedLandingPageDetails = {
            ...landingPageDetails,
            views: (landingPageDetails.views || 0) + 1,
        };
        const data = {
            // user: currentUser.id,
            data: { ...updatedLandingPageDetails },
        };
        await pb.collection("landingPages").update(id, data);
        router.push(`/landing-page/${id}`);
    };

    const handleEdit = (event) => {
        event.stopPropagation();
        handleAnalytics(event);
        try {
            router.push(`/page-editor/${id}`);
        } catch (error) {
            console.error("Error navigating to page editor:", error);
        }
    };

    const handleDelete = async (event) => {
        event.stopPropagation();
        handleAnalytics(event);
        try {
            const response = await pb.collection("landingPages").delete(id);
            console.log("Successfully deleted:", response);
            fetchLandingPages();
        } catch (error) {
            console.error("Error deleting landing page:", error);
        }
    };

    return (
        <div className={styles.landingPageDisplayContainer}>
            <div
                className={styles.landingPageCardContainer}
                onClick={handleLandingPageClick}
                analyticstitle={`Landing_page_${id}`}>
                {landingPageDetails.components.header && (
                    <div className={styles.landingPageCardHeader}>
                        {landingPageDetails.title}
                    </div>
                )}
                <div className={styles.landingPageCardBodyContainer}>
                    {landingPageDetails.components.text && (
                        <div className={styles.landingPageCardText}>
                            {landingPageDetails.description}
                        </div>
                    )}
                    {landingPageDetails.components.image && (
                        <div className={styles.landingPageCardImageContainer}>
                            <img
                                className={styles.landingPageCardImage}
                                src={landingPageDetails.components.image}
                                alt=""
                            />
                        </div>
                    )}
                </div>
                {landingPageDetails.components.footer && (
                    <div className={styles.landingPageCardFooter}>
                        <FaFacebook size={12} />
                        <TiSocialInstagramCircular size={16} />
                        <AiFillTwitterCircle size={14} />
                        <SiYoutubemusic size={12} />
                    </div>
                )}
                {linkedUser.id === currentUser.id && (
                    <div className={styles.controlsOverlay}>
                        <AiFillEdit
                            color="white"
                            size={20}
                            onClick={handleEdit}
                            analyticstitle={`Edit_Button_${id}`}
                        />
                        <AiFillDelete
                            color="white"
                            size={20}
                            onClick={handleDelete}
                            analyticstitle={`Delete_Button_${id}`}
                        />
                    </div>
                )}
            </div>
            <div className={styles.landingPageDisplayFooter}>
                <h4>{id}</h4>
                <h4>
                    <IoPersonSharp /> {linkedUser.username}
                </h4>
            </div>
        </div>
    );
};

const Dashboard = () => {
    useAuth();
    const [landingPages, setLandingPages] = useState([]);
    const [pagesLoading, setPagesLoading] = useState(false);
    const router = useRouter(); // Initialize the router

    const fetchLandingPages = async () => {
        try {
            setPagesLoading(true);
            const records = await pb.collection("landingPages").getFullList({
                sort: "-created",
                expand: "user",
            });
            console.log("currUser: ", currentUser);
            console.log("user is: ", records);
            setLandingPages(records);
        } catch (error) {
            console.error("Error fetching landing pages: ", error);
        } finally {
            setPagesLoading(false);
        }
    };

    useEffect(() => {
        fetchLandingPages();
    }, []);

    // Handler for the New button click
    const handleAddPageClick = (event) => {
        handleAnalytics(event);
        router.push("/page-editor");
    };

    const handleLogout = async (event) => {
        handleAnalytics(event);
        pb.authStore.clear();
        router.push("/login");
    };

    useEffect(() => {
        console.log("ladingPages: ", landingPages);
    }, [landingPages]);

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardNavbarContainer}>
                <h1>NextLander</h1>
                <div className={styles.navbarButtonsContainer}>
                    {currentUser?.username && (
                        <h4 style={{ marginRight: "10px" }}>
                            Welcome, {currentUser?.username}
                        </h4>
                    )}
                    <button
                        className={styles.addPageButton}
                        onClick={handleAddPageClick}
                        analyticstitle="Add_new_landing_page">
                        New
                    </button>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                        analyticstitle="Logout_Button">
                        Logout
                    </button>
                </div>
            </div>
            <div className={styles.dashboardDataContainer}>
                {pagesLoading ? (
                    <div>Loading...</div>
                ) : landingPages.length === 0 ? (
                    <button
                        className={styles.addPageButton}
                        onClick={handleAddPageClick}
                        analyticstitle="Get_Started_Button">
                        Create a page to get started
                    </button>
                ) : (
                    <>
                        {landingPages.map((landingPage, index) => (
                            <LandingPageCard
                                key={index}
                                landingPageDetails={landingPage.data}
                                id={landingPage.id}
                                linkedUser={landingPage.expand.user[0]}
                                fetchLandingPages={fetchLandingPages}
                            />
                        ))}
                    </>
                )}
            </div>
            <div className={styles.dashboardAnalyticsContainer}>
                <h3>Analytics</h3>
                <table className={styles.tableContainer}>
                    <thead className={styles.tableHeadContainer}>
                        <tr className={styles.tableRowContainer}>
                            <th className={styles.tableHead}>ID</th>
                            <th className={styles.tableHead}>Views</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBodyContainer}>
                        {pagesLoading ? (
                            <tr className={styles.tableRowContainer}>
                                <td className={styles.tableData}>Loading...</td>
                                <td className={styles.tableData}>Loading...</td>
                            </tr>
                        ) : landingPages.length > 0 ? (
                            landingPages.map((landingPage, index) => (
                                <tr
                                    className={styles.tableRowContainer}
                                    key={landingPage.id}>
                                    <td className={styles.tableData}>
                                        {landingPage.id}
                                    </td>
                                    <td className={styles.tableData}>
                                        {landingPage.data.views}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.tableRowContainer}>
                                <td className={styles.tableData}>No data</td>
                                <td className={styles.tableData}>No data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
