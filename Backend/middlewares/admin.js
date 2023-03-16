module.exports=function(req,res,next){
    if(req.user.role!='admin')return res.status(403).send('Forbidden!')//Forbidden orthat ai link ta use kora tar jonno allowed na.admin middlewre k authorized er aghe call korbo.tanahole req.user pabe na.
    next()
}