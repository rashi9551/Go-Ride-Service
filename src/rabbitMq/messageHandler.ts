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
        break;

      case "update-ride-status":
        response=await rideControll.updateRideStatus(data.ride_id)
        break;

      case "ride-confirm":
        response=await rideControll.confirmRideStatus(data)
        break;

      case "get-all-ride":
        response=await rideControll.getAllRide(data.id,data.message)
        break;

      case "ride-complete-update":
        response=await rideControll.rideCompleteUpdate(data.rideId,data.paymentMode)
        break;

      case "update-feedback":
        response=await rideControll.feedback(data)
        break;

      case "update-report":
        response=await rideControll.report(data)
        break;

      case "get-dashboardData":
        response=await rideControll.dashboardData()
        break;

      case "driver-get-dashboardData":
        response=await rideControll.driverDashboardData(data)
        break;

      default:
        response = "Request-key notfound";
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
