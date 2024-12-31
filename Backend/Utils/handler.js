
const Handler = (status,message,error,success,res,data = null) => {
    return res.status(status).json({
        message: message,
        error: error,
        success: success,
        data : data
    })
}

export default Handler;