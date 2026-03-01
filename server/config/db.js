import mongoose from "mongoose";

const connectDB = async() => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParses
            serverSelectionTimeoutMS: 5000,
            family: 4 
          });
          
        console.log('Mongoose Connected');
    
    } catch (error) {
        console.error('MongoDB connect error:', error);
        process.exit(1);
    }
}

export default connectDB;
