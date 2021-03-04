import mongoose from 'mongoose'
import moment from 'moment-timezone'

const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
const date= Date.now();
const acessSchema  = mongoose.Schema({
    name: String,
    surname : String,
    idno : String,
    telno : String,
    vendor : String,
    reason : String,
    accessory : String,
    approver : String,
    contactperson :String,
    selectedFile: String,
    postFile:String,
    createdAt: {
        type: Date
        
    },
    exitAt: {
        type: Date
    },
    
});

const acessInfo = mongoose.model('AcessInfo', acessSchema);

export default acessInfo;