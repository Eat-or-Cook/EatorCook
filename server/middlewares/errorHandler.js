module.exports = function (err, req, res, next) {
    let code = err.statusCode || 500
    let message = err.message || 'Internal server error'
    
    res.status(code).json(message)
}

// Error Template:
    //  {
    //      statusCode: 404,
    //      message: 'Recipe not found'
    //  }