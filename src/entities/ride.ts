import mongoose, { Document, Schema } from "mongoose";

export interface RideDetails extends Document {
    ride_id: string;
    driver_id: string;
    user_id: string;
    pickupCoordinates: PickupCoordinates;
    dropoffCoordinates: DropoffCoordinates;
    pickupLocation: string;
    dropoffLocation: string;
    driverCoordinates?: {
        latitude?: number;
        longitude?: number;
    };
    distance: string;
    duration: string;
    vehicleModel: string;  // Renamed from 'model' to 'vehicleModel'
    price: number;
    date: string;
    status: string;
    pin: number;
    paymentMode: string;
    feedback?: string;
    reportReason?: string;
    rating?: number;
}

interface PickupCoordinates {
    latitude: number;
    longitude: number;
}

interface DropoffCoordinates {
    latitude: number;
    longitude: number;
}

const RideSchema: Schema = new Schema({
    ride_id: {
        type: String,
    },
    driver_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    pickupCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    dropoffCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    pickupLocation: {
        type: String,
    },
    dropoffLocation: {
        type: String,
    },
    driverCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    distance: {
        type: String,
    },
    duration: {
        type: String,
    },
    vehicleModel: {
        type: String,
    },
    price: {
        type: Number,
    },
    paymentMode: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
    },
    pin: {
        type: Number,
    },
    feedback:{
        type:String
    },
    reportReason:{
        type:String
    },
    rating:{
        type:Number
    }

});
const rideModel=mongoose.model<RideDetails>("Ride", RideSchema);
export default rideModel
