import api from "./api";

export interface ComplaintRequest {
  image: File;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  landmark: string;
}

export const complaintService = {
  async submitComplaint(data: ComplaintRequest) {
    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("description", data.description);
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append("address", data.address);
    formData.append("landmark", data.landmark);
    console.log(formData);

    const response = await api.post(
      "/generate-complaint",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};

