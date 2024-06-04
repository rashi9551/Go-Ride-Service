import amqp from 'amqplib';
import rideData from '../useCases/rideCase';


export class rideController {
    orderCreate=async(data:any)=>{ 
        try {
            console.log(data),"from controller";
            const response = await rideData.rideDataSave(data);  
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
 
};
