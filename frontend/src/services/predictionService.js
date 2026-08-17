import api from "./api";

// Get ML solar prediction
export const getMLSolarPrediction = async (siteId) => {
    const response = await api.get(`/prediction/ml/solar/${siteId}`);
    return response.data;
};

// Get prediction analytics
export const getPredictionAnalytics = async (siteId) => {
    const response = await api.get(`/prediction/analytics/${siteId}`);
    return response.data;
};

// Get site recommendation
export const getRecommendation = async (siteId) => {
    const response = await api.get(`/prediction/recommendation/${siteId}`);
    return response.data;
};

// Get prediction history
export const getPredictionHistory = async (siteId) => {
    const response = await api.get(`/prediction/history/${siteId}`);
    return response.data;
};