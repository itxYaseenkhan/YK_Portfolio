import mongoose from "mongoose";

const DbConnect = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "PersonalData",
    })
    .then(() =>{
        console.log("Connect to database")
    })
    .catch((error) =>{
        console.log("Not Connection to Database ")
    });

}
export default DbConnect;

