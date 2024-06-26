import amqp from 'amqplib';
import rideCases from '../useCases/rideCase';
import { RideDetails } from '../entities/ride';

const rideCase=new rideCases()

export class rideController {
    orderCreate=async(data:RideDetails)=>{ 
        try {
            console.log(data),"from controller";
            const response = await rideCase.rideDataSave(data);  
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
            return response
        } catch (error) {
            console.log(error);
            
        }
    }

    confirmRideStatus=async(pin:number)=>{ 
        try {
            const response = await rideCase.confirmRideStatus(pin); 
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
 
};
