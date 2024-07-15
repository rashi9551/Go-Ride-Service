export interface Message {
    message: string ;
  }
  export interface driveId{
    driver_id:string
  }


  export interface feedback{
    ride_id:string,
    _id:string,
    rating:string,
    feedback:string,
    driver_id:string,
}

export interface report{
  ride_id:string,
  _id:string,
  reason:string,
  driver_id:string,
}
