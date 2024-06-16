function verifyProperties(properties){   

    return function(req,res,next){

        for(let index=0;index<properties.length;index++){

            const element=properties[index];

            if(!(element in req.body)){             

                return res.send({"data":"Required data is not found"});

            }
        }
        next();
    }
}
module.exports=verifyProperties;