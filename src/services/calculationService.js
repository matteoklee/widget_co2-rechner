import axiosInstance from "@/services/axiosInstance.js";

export const calculateEmission = async (start, end, transportMedium) => {
    const endpoint = transportMedium ? 'emission' : 'emission/kids';
    const data = {
        startLocation: start,
        endLocation: end,
        transportMediumDTO: transportMedium,
    };
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
};

export const saveEmission = async (start, end, distance, transportMedium, group) => {
    const data = {
        startLocation: start,
        endLocation: end,
        distance: distance,
        transportMediumDTO: transportMedium,
        groupEmissionDTO: group,
    };
    const response = await axiosInstance.post('groupEmission', data);
    return response.data;
};

export const getTransportMediums = async () => {
    const response = await axiosInstance.get('transport');
    return response.data;
};
