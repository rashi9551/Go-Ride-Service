import amqp from 'amqplib';
import rideCases from '../useCases/rideCase';
import { RideDetails } from '../entities/ride';
import { feedback } from '../utilities/interface';

const rideCase=new rideCases()

export class rideController {
    orderCreate=async(data:RideDetails)=>{ 
        try {
            console.log(data),"from controller";
            const response = await rideCase.rideDataSave(data);  
            console.log(response,"ride order created")
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
    getRideData=async(id:string)=>{ 
        try {
            const response = await rideCase.getRideData(id);  
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
    updateRideStatus=async(id:string)=>{ 
        try {
            const response = await rideCase.updateRideStatus(id);  
            console.log(response,"ride data updated")
            return response
        } catch (error) {
            console.log(error);
            
        }
    }

    confirmRideStatus=async(pin:number)=>{ 
        try {
            const response = await rideCase.confirmRideStatus(pin); 
            console.log(response,"ride data confirmed")
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
    getAllRide=async(id:string,message:string)=>{ 
        try {
            const response:RideDetails = await rideCase.getAllRide(id,message) as RideDetails
            console.log(response,"all ride datas with user id")
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
    rideCompleteUpdate=async(id:string,paymnetMode:string)=>{ 
        try {
            const response = await rideCase.rideCompleteUpdate(id,paymnetMode)
            console.log(response,"ride update message");
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
    feedback=async(data:feedback)=>{ 
        try {
            const response = await rideCase.feedback(data)
            console.log(response,"feedback update message");
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
 
};
