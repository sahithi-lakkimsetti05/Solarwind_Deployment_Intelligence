import api from "./api";

// ========================================
// LOCATION INTELLIGENCE
// ========================================

export const assessLocation = async (place) => {
  const response = await api.get(
    "/location-intelligence/assess",
    {
      params: {
        place: place,
      },
    }
  );

  return response.data;
};
