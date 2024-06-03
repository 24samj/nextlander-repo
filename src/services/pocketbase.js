import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");
export var currentUser = pb.authStore.model;

pb.authStore.onChange((auth) => {
    console.log("Auth changed: ", auth);

    currentUser = pb.authStore.model;
});

export const handleAnalytics = async (event) => {
    if (!currentUser?.id) return;
    const title = event.currentTarget.getAttribute("analyticstitle");
    const data = {
        user: currentUser.id,
        data: { title },
    };
    console.log("analytics Data:", data);
    const response = await pb.collection("analytics").create(data);
    console.log("analytics: ", response);
};
