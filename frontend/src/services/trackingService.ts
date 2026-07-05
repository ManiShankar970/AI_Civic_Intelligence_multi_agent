import api, { delay } from "./api";
import { Complaint } from "../types";

export const trackingService = {
  /**
   * Fetch a single complaint by its tracking ID.
   */
  async trackComplaint(id: string): Promise<Complaint | null> {
    await delay(1000); // Simulate network roundtrip
    
    // In production:
    // try {
    //   const response = await api.get(`/complaints/${id}`);
    //   return response.data;
    // } catch (e) {
    //   return null;
    // }
    
    // Local fallback will be handled inside context, but this is the structure
    return null;
  },

  /**
   * Submit citizen satisfaction feedback on resolved complaints.
   */
  async submitFeedback(id: string, rating: number, comment: string): Promise<boolean> {
    await delay(1000);
    // Real Axios call: await api.post(`/complaints/${id}/feedback`, { rating, comment });
    return true;
  }
};
