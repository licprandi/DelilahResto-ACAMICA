exports.success = function (req, res, user, status) {
    let statusCode = status || 200;
    let statusUser = user || '';

    res.status(status).send({
        error: false,
        status: status,
        body: user,
    });
}

exports.error = function (req, res, user, status) {
    let statusCode = status || 500;
    let statusUser = user || 'Internal server error';


    res.status(statusCode).send({
        error: false,
        status: status,
        body: user,
    });
}