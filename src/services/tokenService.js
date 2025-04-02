import axiosInstance from "@/services/axiosInstance.js";

export const validateToken = async (token) => {
    try {
        const response = await axiosInstance.get(`/api/validate-token`, {
            params: {
                token: token,
            },
        });

        if (response.status === 200 && response.data) {
            return true;
        }
    } catch (error) {
        console.error("token validation failed:", error);
    }

    return false;
};