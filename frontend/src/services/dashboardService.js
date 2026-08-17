import api from "./api";

// Get complete dashboard data
export const getDashboardHome = async () => {
    const response = await api.get("/dashboard/home");
    return response.data;
};

// Get dashboard statistics
export const getDashboardStats = async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
};

// Get top renewable site
export const getTopSite = async () => {
    const response = await api.get("/dashboard/top-site");
    return response.data;
};