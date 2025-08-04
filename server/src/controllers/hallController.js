import Banquet from "../models/BanquetModel.js";

export const AddHall = async (req, res, next) => {
    
  const { hallName, managerName, contactNumber, capacity, rent } = req.body;

  try {
    const newhall = Banquet.create({
      hallName,
      managerName,
      contactNumber,
      capacity,
      rent,
    });

    res.status(200).json({message : "Hall Added successfully"})
  } catch (error) {
    next(error);
  }
};


export const getHall = (res , req , next) =>{
    try{
        const hall = Banquet.find({})
        res.status(200).json({message: "All Hall here" , data: hall});

    }
    catch(error){
       next(error)
    }
}