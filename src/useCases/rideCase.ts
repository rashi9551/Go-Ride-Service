import { RideDetails } from "../entities/ride";
import rideRepository from "../repositories/rideRepo";
import { Message, driveId, feedback } from "../utilities/interface";


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
            const response=await rideRepo.findById(id) as RideDetails
            console.log(response.ride_id),"ithu ride datteteteety";
            if(response){
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
    feedback=async(data:feedback)=>{
        try {
            const response:Message|undefined=await rideRepo.feedback(data)  as Message        
            if(response){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    dashboardData=async()=>{
        try {
            const response=await rideRepo.dashboardData()          
            if(response){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    driverDashboardData=async(data:driveId)=>{
        try {
            const response=await rideRepo.driverDashboardData(data)          
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