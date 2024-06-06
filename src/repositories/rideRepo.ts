import Ride, { RideDetails } from "../entities/ride"

export default class rideRepository{
    saveRideData=async(rideData:RideDetails)=>{
        try {
            const existingRide = await Ride.findOne({ ride_id: rideData.ride_id });

            if (existingRide) {
                console.log('Ride with this destination already exists:', existingRide);
                return; 
            }
            const newRide = new Ride(rideData);
            const response = await newRide.save();
            console.log('New ride saved:', response);
            console.log("data Saved");
            return response
            
        } catch (error) {
            console.log(error);
            
        }

    }
}