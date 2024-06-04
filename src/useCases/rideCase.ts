import { RideDetails } from "../entities/ride";
import rideRepo from "../repositories/rideRepo";
export default {
    rideDataSave:async(rideData:RideDetails)=>{
        try {
            console.log(rideData);
            const response=await rideRepo.saveRideData(rideData)
            if(response?.ride_id){
                return {message:"Success"}
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            
        }

    }
}