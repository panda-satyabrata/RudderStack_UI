import axios from 'axios'

export class TrackingPlanService {

    async getAllTrackingPlans() {
        try{
            const response = await axios.get(`http://localhost:8081/api/v1/trackingplan/all`)
            const {data} = response
            return data
        } catch (e) {
            throw e
        }
    }

    async saveTrackingDetails(data) {
        try{
            const response = await axios.post(`http://localhost:8081/api/v1/trackingplan`, data)
            const {data} = response
            return data;
        } catch (e) {
            throw e
        }
    }
}

export const trackingPlanService = new TrackingPlanService()