import amqp from 'amqplib';
import rideCases from '../useCases/rideCase';

const rideCase=new rideCases()

export class rideController {
    orderCreate=async(data:any)=>{ 
        try {
            console.log(data),"from controller";
            const response = await rideCase.rideDataSave(data);  
            return response
        } catch (error) {
            console.log(error);
            
        }
    }
 
};
