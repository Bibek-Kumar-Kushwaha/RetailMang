import billCounterModel from '../Models/billCounter.model.js'
const billCounterController = async (req, res) => {
    try {
        const counter = await billCounterModel.find({});

        return Handler(
            500,
            error.message || error,
            true,
            false,
            res,
            {
                counter
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
export { billCounterController };