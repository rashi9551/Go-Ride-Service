import { RideDetails } from "../entities/ride";
import rideRepository from "../repositories/rideRepo";
import { Message } from "../utilities/interface";


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
    getAllRide=async(id:string,message:string)=>{
        try {
            const response:RideDetails|undefined=await rideRepo.getAllRide(id,message)  as RideDetails|undefined         
            if(response){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    rideCompleteUpdate=async(id:string,paymnetMode:string):Promise<Message>=>{
        try {
            const response:RideDetails=await rideRepo.rideCompleteUpdate(id,paymnetMode)  as RideDetails         
            if(response?.ride_id){
                return ({message:"Success"})
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return {message:"something went wrong"}

        }

    }
}