import rabbitClient from "./client";
import { rideController } from "../controllers/rideController";

const rideControll=new rideController()

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log("The operation is", operation, data);

    switch (operation) {
      
      case "ride-create":
        response=await rideControll.orderCreate(data)
        break;

      case "get-current-ride":
        response=await rideControll.getRideData(data.rideId)
        console.log(response); 
        break;

      default:
        response = "Request-key notfound";
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
