import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth'
import { initPayment } from '../../api/apiOrder';

const Payment = () => {
    /*ekhane amra ekta state maintain korbo jeta check korbe je successfully ami session ta create korte peresi kina.sslcommerz e amader first kaj hosse ekta payment session create kora.jate payment er je gateway ta ase ba je checkout page ta ase seta jate amra open korte pari.so seta amra ekta session diye maintain korbo*/
    const [sessionSuccess, setSessionSuccess] = useState(false)//jokhn amra successfully ekta payment session create korte parbo tokhn etar value amra true kore dibo.
    const [failed, setFailed] = useState(false);//somehow jodi sslcommerz er sathe connect na hoy se khtre amra etake true kore dibo
    //session success hok ba fail hok sslcommerz sob somoy ekta response pathayso setar upor depend kore sessionSuccess ta handle korbo.ar jodi responsi na pathay tokhn failed ta diye handle korbo

    const [redirectUrl, setRedirectUrl] = useState('');

    useEffect(() => {
        initPayment(userInfo().token)
            .then(response => {
                if (response.data.status === 'SUCCESS') { //sslcommerz er documentation e amra dekhesi, amar je response data ta ashbe sekhane success anme ekta property thakbe.ar failure thakle failed namer ekta property thakbe.
                    setSessionSuccess(true);
                    setRedirectUrl(response.data.GatewayPageURL)
                    setFailed(false)
                }
            })
            .catch(err => {
                setFailed(true);
                setSessionSuccess(false);
            })
    },[])
    return (
        <div>
            {sessionSuccess ? window.location = redirectUrl : "Payment is processing.."}
            {failed ? (<><p>Failed to start payment session....</p><Link to="/cart">Go to Cart</Link></>) : ""}
        </div>
    )
}

export default Payment;
