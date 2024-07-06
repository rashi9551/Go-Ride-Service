import moment from "moment";
import Ride, { RideDetails } from "../entities/ride"
import { Message, driveId, feedback } from "../utilities/interface";

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
            const rideData = await Ride.findOne({ride_id:id}) as RideDetails
            const formattedDate = moment(rideData.date).format('MMM/ddd/YY');
            const updatedRideData = {

                ...rideData.toObject(),
                date: formattedDate
            };  
            console.log(updatedRideData,"hghfhfgh");
            
            return updatedRideData 
            
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

    rideCompleteUpdate=async(id:string,paymentMode:string):Promise<RideDetails|Message>=>{
        try {
            const rideData:RideDetails = await Ride.findOneAndUpdate(
                { ride_id: id },
                {
                    paymentMode: paymentMode,
                    status: "Completed",
                }
            ) as RideDetails
            return rideData
        } catch (error) {
            console.log(error);
            return ({message:"something went wrong in database save"})
        }

    }
    dashboardData=async()=>{
        try {
            
            const rideData = await Ride
                .aggregate([
                    {
                        $match: {
                            status: { $nin: ["Cancelled", "Pending"] },
                        },
                    },
                    {
                        $group: {
                            _id: "$paymentMode",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: "$_id",
                            value: "$count",
                        },
                    },
                ])
                .exec()
                const totalRides=await Ride.find().count()
            console.log(rideData,"djhvshjbjks"); 
            return ({rideData,totalRides})
        } catch (error) {
            console.log(error);
            return ({message:"something went wrong in database save"})
        }

    }
    driverDashboardData=async(datas:driveId)=>{
        try {
            const {driver_id}=datas
            console.log(driver_id);
            
            const data = await Ride
                .aggregate([
                    {
                        $match: {
                            status: { $nin: ["Cancelled", "Pending"] },
                            driver_id: driver_id,
                        },
                    },
                    {
                        $group: {
                            _id: { $month: "$date" },
                            totalAmount: { $sum: "$price" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            month: "$_id",
                            totalAmount: 1,
                        },
                    },
                    {
                        $sort: { month: 1 },
                    },
                ])
                .exec();

            const pieChartData = await Ride
                .aggregate([
                    {
                        $match: {
                            status: { $nin: ["Cancelled", "Pending"] },
                            driver_id: driver_id,
                        },
                    },
                    {
                        $group: {
                            _id: "$paymentMode",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            name: "$_id",
                            value: "$count",
                        },
                    },
                ])
                .exec();

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;

            const count = await Ride
                .aggregate([
                    {
                        $match: {
                            status: "Completed",
                            date: {
                                $gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Start of current month
                                $lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Start of next month
                            },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalCount: { $sum: 1 },
                        },
                    },
                ])
                .exec();                
                return {count,pieChartData,data}
            
        } catch (error) {
            console.log(error);
            return ({message:"something went wrong in database save"})
        }

    }
    feedback=async(data:feedback):Promise<Message>=>{
        try {
            const { rating, feedback ,_id} = data;

            const rideData = await Ride.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        rating: rating,
                        feedback: feedback,
                    },
                },
                { new: true }
            ) as RideDetails

            if(rideData){
                return({message:"Success"})
            }else{
                return({message:"something went wrong in data base saving"})
            }
        } catch (error) {
            console.log(error );
            return ({message:"something went wrong in database save"})
        }

    }
}