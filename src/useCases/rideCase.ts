import { RideDetails } from "../entities/ride";
import rideRepository from "../repositories/rideRepo";

const rideRepo=new rideRepository()

export default class rideCase{
    rideDataSave=async(rideData:RideDetails)=>{
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
    getRideData=async(id:string)=>{
        try {
            const response=await rideRepo.findById(id)
            if(response?.ride_id){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    updateRideStatus=async(id:string)=>{
        try {
            const response=await rideRepo.findByIdAndUpdate(id)
            if(response?.ride_id){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    confirmRideStatus=async(pin:number)=>{
        try {
            const response=await rideRepo.confirmRideStatus(pin)            
            if(response?.ride_id){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}