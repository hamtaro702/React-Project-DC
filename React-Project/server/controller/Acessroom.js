import AcessInfo from "../models/Acessroom.js"
import moment from 'moment-timezone'
import mongoose from 'mongoose'
import ActiveDirectory from 'activedirectory'


const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");


export const getInfo = async (req,res) => {
    try {
        const acessInfo = await AcessInfo.find({ exitAt: '' }).sort({createdAt: -1});
        res.status(200).json(acessInfo);
    } catch (error) {
        res.status(404).json({ message: error.acessInfo});
    }
}

export const getInfoAll = async (req,res) => {
    try {
        const acessInfo = await AcessInfo.find().sort({createdAt: -1});
        res.status(200).json(acessInfo);
    } catch (error) {
        res.status(404).json({ message: error.acessInfo});
    }
}

export const createInfo = async (req,res) => {
    const acessInfo = req.body
    
    const newAcessInfo = new AcessInfo(acessInfo);
    try {
        await newAcessInfo.save();

        res.status(201).json(newAcessInfo);
    } catch (error) {
         
        res.status(409).json({message : error.message});
    }
}

export const updateInfo = async (req,res) =>  {

    const {id :_id} = req.params;
    const postFile = req.body.selectedFile;
    const date= Date.now();
    if(!mongoose.Types.ObjectId.isValid(_id)) return  res.status(404).send("No posts with that id");

    
    
    const updateInfo = await AcessInfo.findByIdAndUpdate(_id,{exitAt:moment(date),postFile:postFile},{new:true});
    
    res.json(updateInfo);
}

export const updateApprover = async (req,res) =>  {

    const {id :_id} = req.params;    
    const approver = req.body.approve;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return  res.status(404).send("No posts with that id");

   
    
    const updateInfo = await AcessInfo.findByIdAndUpdate(_id,{approver:approver},{new:true});
    
    res.json(updateInfo);
}




export const AD = async (req,res) =>  {

    var config = { url: 'ldap://192.168.77.2',
                   baseDN: 'dc=haadthip,dc=com',
                   username: 'mssql@haadthip.com',
                   password: 'h@@dth1p@!db2020' }

    var ad = new ActiveDirectory(config);

    const {username} = req.body;
    const {password} = req.body;
   
    ad.authenticate(username, password, function(err, auth) {
    if (err) {
        res.json('ERROR: '+JSON.stringify(err));
        return;
    }
    
    if (auth) {
        res.send({
            token: 'username',
            username : username
          });
    }
    else {
        res.json('Authentication failed!');
    }
});








}




