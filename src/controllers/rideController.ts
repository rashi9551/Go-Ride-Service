import amqp from 'amqplib';
import rideCases from '../useCases/rideCase';
import { RideDetails } from '../entities/ride';
import { driveId, feedback, Message } from '../utilities/interface';

const rideCase=new rideCases()

export class rideController {
    orderCreate=async(data:RideDetails):Promise<Message |string>=>{ 
        try {
            console.log(data),"from controller";
            const response = await rideCase.rideDataSave(data);  
            console.log(response,"ride order created")
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    getRideData=async(id:string):Promise<RideDetails| Message |string>=>{ 
        try {
            const response = await rideCase.getRideData(id);  
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    updateRideStatus=async(id:string):Promise<RideDetails| string |Message>=>{ 
        try {
            const response :RideDetails |Message = await rideCase.updateRideStatus(id) as RideDetails | Message
            console.log(response,"ride data updated")
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }

    confirmRideStatus=async(pin:number):Promise<RideDetails| string |Message>=>{ 
        try {
            const response = await rideCase.confirmRideStatus(pin); 
            console.log(response,"ride data confirmed")
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    getAllRide=async(id:string,message:string)=>{ 
        try {
            const response:RideDetails = await rideCase.getAllRide(id,message) as RideDetails
            console.log(response,"all ride datas with user id")
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    rideCompleteUpdate=async(id:string,paymnetMode:string)=>{ 
        try {
            const response = await rideCase.rideCompleteUpdate(id,paymnetMode)
            console.log(response,"ride update message");
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    feedback=async(data:feedback)=>{ 
        try {
            const response = await rideCase.feedback(data)
            console.log(response,"feedback update message");
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    dashboardData=async()=>{ 
        try {
            const response = await rideCase.dashboardData()
            console.log(response,"dashbord data get");
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
    driverDashboardData=async(data:driveId)=>{ 
        try {
            const response = await rideCase.driverDashboardData(data)
            console.log(response,"driver dashbord data get");
            return response
        } catch (error) {
            console.log(error);
            return(error as Error).message
        }
    }
 
};
