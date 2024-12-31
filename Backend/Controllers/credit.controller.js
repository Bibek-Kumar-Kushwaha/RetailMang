import creditModel from "../Models/credit.model.js";
import Handler from "../Utils/handler.js";

const getCreditDataController = async (req, res) => {
    try {
        const creditDetails = await creditModel.find({})
        return Handler(
            200,
            "Fetched Your Credit Data",
            false,
            true,
            res, 
            {
                creditDetails
            }
        )
        
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }
}

export { getCreditDataController };