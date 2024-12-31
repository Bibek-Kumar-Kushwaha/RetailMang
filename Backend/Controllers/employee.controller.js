import Handler from '../Utils/handler.js';

const employeeUpdateController = (req, res) => {
    try {

        const { salary } = req.body;

        if (!salary) {
            return Handler(
                400,
                "Provide Salary and Joining Date",
                true,
                false,
                res
            )
        }
        


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

export { employeeUpdateController };