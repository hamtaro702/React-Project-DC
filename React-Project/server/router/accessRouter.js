import express from 'express';
import { getInfo,createInfo,updateInfo,getInfoAll,AD,updateApprover } from '../controller/Acessroom.js';
const router = express.Router();

router.get("/",getInfo);
router.post("/",createInfo);
router.get("/getALL",getInfoAll);

router.patch("/:id",updateInfo);
router.patch("/approve/:id",updateApprover);
router.post("/authen",AD);




export default router;