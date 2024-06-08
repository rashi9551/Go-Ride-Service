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
 
};
