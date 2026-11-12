import api from "./api";

// ========================================
// ML SOLAR PREDICTION
// ========================================

export const getMLSolarPrediction = async (siteId) => {
  const response = await api.get(
    `/prediction/ml/solar/${siteId}`
  );

  return response.data;
};


// ========================================
// PREDICTION ANALYTICS
// ========================================

export const getPredictionAnalytics = async (siteId) => {
  const response = await api.get(
    `/prediction/analytics/${siteId}`
  );

  return response.data;
};


// ========================================
// SITE RECOMMENDATION
// ========================================

export const getRecommendation = async (siteId) => {
  const response = await api.get(
    `/prediction/recommendation/${siteId}`
  );

  return response.data;
};


// ========================================
// PREDICTION HISTORY
// ========================================

export const getPredictionHistory = async (siteId) => {
  const response = await api.get(
    `/prediction/history/${siteId}`
  );

  return response.data;
};


// ========================================
// WIND RESOURCE ASSESSMENT
// ========================================

export const getWindResourceAssessment = async (siteId) => {
  const response = await api.get(
    `/prediction/wind-resource/${siteId}`
  );

  return response.data;
};


// ========================================
// DEPLOYMENT OPTIMIZATION
// ========================================

export const getDeploymentOptimization = async (siteId) => {
  const response = await api.get(
    `/prediction/deployment-optimization/${siteId}`
  );

  return response.data;
};


// ========================================
// SOLAR POWER FORECAST
// ========================================

export const getSolarForecast = async (siteId) => {
  const response = await api.get(
    `/prediction/forecast/${siteId}`
  );

  return response.data;
};