const {Schema,model}=require('mongoose')
const Joi=require('joi');

module.exports.Product=model('Product',Schema({
    name:String,
    description:String,
    price:Number,
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category', //ref er full form hosse reference.ami bolsi je ami category model k reference korsi.mane kono product je Category te ase ai ref use korate sei Category r information se niye aste parbe.
        required:true,
    },
    quantity:Number,
    photo:{
        data:Buffer,
        contentType:String,
    }
        
},{timestamps:true}));

module.exports.validate=product=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(255).required(),
        description:Joi.string().max(2000).required(),
        price:Joi.number().required(),
        quantity:Joi.number().required(),
      category:Joi.string().required()
    });
    return schema.validate(product);
}