const { Schema, model } = require('mongoose');
const { CartItemSchema } = require('./cartItem');

module.exports.Order = model('Order', Schema({
    //1st of all ekhaner moddhe cart item jeghula ase seghula ekhane niye save korte hobe.so ekta payment successful hoar por ek jon user er cart er moddhe je item ghula ase sob ghula amra order er moddhe store korbo.  
    cartItems: [CartItemSchema],//eta ekta array karon cart e multiple item thakte pare.ekhane cartItems field tar type hobe amar CartItem je Schema ta ase(cartItem model)ai schema tar type onujayi.cartItems array tar moddhe joto ghulo item thakbe sob ghulai actually amar ekta ekta cartItem k represent kore(cartItem model).
    /*
    cartItems:[{ 
      cart item er field ghula notun kore abar declare korte pari.product thakbe,price thakbe,count thakbe.but eto jhamela na kore shortcart e cartItemSchema kei call kore ekhaner moddhe declare kore dite pari 
    }] 
    */
    /*so cartItems hosse emn ekta field jeta ekta array hold korbe jei array er 
    member ghula hosse akekta cartItem er(cartItem model) member.So ai cartItem er 
    je member ghula eghula sob ghula basically ekhaner cartItem field er moddhe 
    fit hoto.so ami prottekta alada alada property k call na kore directly sobai k 
    cartItems: [CartItemSchema] ekhaner moddhe CartItemSchemay call koresi jate bujhay
    ai je array ta ase [CartItemSchema] eta oi object ghula fold korbe jeghula cartItem
    schemar moddhe fit hoy.*/
    transaction_id: {
        type: String,
        unique: true,
    },
    address: { //ekta user er ekta ekta order er jonno address different hote pare tai address k niyechi
        //so prottekta order save korar somoy ami cartItem ghula save korbo je kon cartItem ghula ba kon product ghula s nisse seghula ave korbo,transition id set korbo ebong address ta set korbo
        phone: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: Number,
        country: String,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Complete"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sessionKey: String,//sessionkey ta pawa jay jokhn ekta session initiate hoy tokhn so sekhan theke se response theke se key ta collect kore ekhane save kore dibo  
}))
