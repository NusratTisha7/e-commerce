const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    let token = req.header('Authorization');//req.header e Authorization namer key te token ta ase.evabe call korle token ta collect korte parbo
    if (!token) return res.status(401).send('Access denied! No token provided!');
    // Bearer 1234abcd
    else token = token.split(" ")[1].trim();
    //ekhane try catch diyechi karon amra cassi na je central error middleware er message ti dekhak
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;//ja ja decode korese sob user object er moddhe set hoye jabe.req.user er moddhe user er infomation ghula pabo.
        next();
    } catch (err) {
        //jodi decoded korte na pare tahole decoded er value undefined hobe
        return res.status(400).send('Invalid token');//orthat decoded er value undefined hole false eturn korbe
    }
}

