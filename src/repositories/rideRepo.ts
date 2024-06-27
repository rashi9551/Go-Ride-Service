import moment from "moment";
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
    findById=async(id:string)=>{
        try {
            const rideData = await Ride.findOne({ride_id:id});
            return rideData
            
        } catch (error) {
            console.log(error);
            
        }

    }
    findByIdAndUpdate=async(id:string)=>{
        try {
            const rideData = await Ride.findOneAndUpdate({ride_id:id},{
                $set:{
                    status:"Cancelled"
                }
            });
            return rideData
            
        } catch (error) {
            console.log(error);
            
        }

    }
    confirmRideStatus=async(pin:number)=>{
        try {
            const rideData = await Ride.findOneAndUpdate({ pin: pin},
                {
                    $set: {
                        status: "Confirmed",
                    },
                },
                {
                    new: true,
                });
            return rideData
            
        } catch (error) {
            console.log(error);
            
        }

    }
    getAllRide=async(id:string,message:string)=>{
        try {
            let rideData
            if(message==='user'){
                rideData = await Ride.find({user_id:id}).sort({ date: -1 }); 
                const formattedData = rideData.map((ride) => ({
                    ...ride.toObject(),
                    date: moment(ride.date).format("dddd, DD-MM-YYYY"),
                }));
                return formattedData      
            }else if(message==='driver'){
                rideData = await Ride.find({driver_id:id}).sort({ date: -1 });      
                const formattedData = rideData.map((ride) => ({
                    ...ride.toObject(),
                    date: moment(ride.date).format("dddd, DD-MM-YYYY"),
                }));
                return formattedData 
            }
        } catch (error) {
            console.log(error);
            
        }

    }
}