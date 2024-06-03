"use client";

import { pb } from "@/services/pocketbase";
import styles from "./[id].module.css";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

const LandingPage = ({ params }) => {
    useAuth();
    const [landingPageDetails, setLandingPageDetails] = useState();
    console.log("params is: ", params);

    useEffect(() => {
        const fetchLandingPage = async (id) => {
            try {
                console.log("calling");
                const record = await pb.collection("landingPages").getOne(id, {
                    expand: "relField1,relField2.subRelField",
                });
                console.log("response is: ", record);
                setLandingPageDetails(record?.data);
            } catch (error) {
                console.error("Error fetching landing page: ", error);
            }
        };

        if (params?.id) {
            fetchLandingPage(params.id);
        }
    }, [params?.id]);
    return (
        <div
            // key={key}
            className={styles.landingPageContainer}>
            {landingPageDetails?.components?.header && (
                <div className={styles.landingPageHeader}>
                    {landingPageDetails.title}
                </div>
            )}
            <div className={styles.landingPageBodyContainer}>
                {landingPageDetails?.components?.text && (
                    <div className={styles.landingPageText}>
                        {landingPageDetails.description}
                    </div>
                )}
                {landingPageDetails?.components?.image && (
                    <div className={styles.landingPageImageContainer}>
                        <img
                            className={styles.landingPageImage}
                            src={landingPageDetails.components.image}
                            alt=""
                        />
                    </div>
                )}
            </div>
            {landingPageDetails?.components?.footer && (
                <div className={styles.landingPageFooter}>Footer</div>
            )}
        </div>
    );
};

export default LandingPage;
