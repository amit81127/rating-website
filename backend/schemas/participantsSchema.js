const {Schema}=require("mongoose");

const participantsSchema=new Schema({
    name: String,
    department: String,
    email: String,
    description: String,
    image: String,
    teamNo:Number,
     votes: { type: Number, default: 0 }, // <-- new field
});

module.exports={participantsSchema};
