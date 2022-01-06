const express = require('express');
const { typeOf} = require('mathjs');
const ClothesServices = require('../services/clothe');
const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
  } = require('../utils/time');

  
function ClotheApi(app){
    const router = express.Router();
    app.use('/api/clothes',router);
    const clothesServices = new ClothesServices();
    router.get('/', async function (req, res, next) {
      
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
       
        try {
          const Clothes = await clothesServices.geClothes(/*{ tags }*/);
         
          // throw new Error("Error getting movies");
          res.status(200).json({
            data: Clothes,
            message: 'movies listed',
          });
        } catch (error) {
          next(error);
        }
        
      });
      
      
     

      router.get("/gender",async function(req,res,next){
        cacheResponse(res.FIVE_MINUTES_IN_SECONDS);
         console.log("DDDDDDDDDDDDDDDDD")
        try {
          const clothes=await clothesServices.getClohtebyGender();
          res.status(200).json({
            data:clothes,
            message:'categorias encontrada'
          });
        } catch (error) {
          next(error)
        }
      })

   
   
}

module.exports =  ClotheApi;