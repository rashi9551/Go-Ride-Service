import amqp from 'amqplib';
import rideCases from '../useCases/rideCase';
import { RideDetails } from '../entities/ride';

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
 
};
