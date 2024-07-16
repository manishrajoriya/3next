import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?  : number;

}

const connection : ConnectionObject = {}


 async function connectDB():Promise<void>{
    if(connection.isConnected){
        console.log('using existing connection');
        return;
    }
    try {
       const db= await mongoose.connect(process.env.MONGODB_URL || "")
       console.log('connected to db');
    //    console.log(db);
       
       connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log('error connecting to db', error);
        
        process.exit(1)
    }
}

export default connectDB;






