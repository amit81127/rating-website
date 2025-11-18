const {model}=require("mongoose");

const {participantsModels, participantsSchema}=require('../schemas/participantsSchema');

const ParticipantsModel=new model("participants",participantsSchema);

module.exports={ParticipantsModel};