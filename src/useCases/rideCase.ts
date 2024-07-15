import { RideDetails } from "../entities/ride";
import rideRepository from "../repositories/rideRepo";
import { Message, driveId, feedback, report } from "../utilities/interface";


const rideRepo=new rideRepository()

export default class rideCase{
    rideDataSave=async(rideData:RideDetails):Promise<Message | string>=>{
        try {
            console.log(rideData);
            const response :RideDetails =await rideRepo.saveRideData(rideData) as RideDetails
            if(response?.ride_id){
                return {message:"Success"}
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    getRideData=async(id:string):Promise<RideDetails| Message |string>=>{
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
            return(error as Error).message
        }
    }
    updateRideStatus=async(id:string):Promise<RideDetails| string |Message>=>{
        try {
            const response :RideDetails=await rideRepo.findByIdAndUpdate(id) as RideDetails
            if(response?.ride_id){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
        }

    }
    confirmRideStatus=async(pin:number):Promise<RideDetails| string |Message>=>{
        try {
            const response : RideDetails=await rideRepo.confirmRideStatus(pin) as RideDetails      
            if(response?.ride_id){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
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
            return (error as Error).message
        }

    }
    feedback=async(data:feedback):Promise<Message | string>=>{
        try {
            const response:Message=await rideRepo.feedback(data)  as Message        
            if(response){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
        }

    }
    report=async(data:report):Promise<Message | string>=>{
        try {
            const response:Message=await rideRepo.report(data)  as Message        
            if(response){
                return response
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
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
            return (error as Error).message
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
            return (error as Error).message
        }

    }
    rideCompleteUpdate=async(id:string,paymnetMode:string):Promise<Message | string>=>{
        try {
            const response:RideDetails=await rideRepo.rideCompleteUpdate(id,paymnetMode)  as RideDetails         
            if(response?.ride_id){
                return ({message:"Success"})
            }else{
                return {message:"something went wrong"}
            }
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
        }

    }
}