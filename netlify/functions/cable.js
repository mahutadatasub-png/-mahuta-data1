exports.handler = async (event) => {
  if(event.httpMethod !== 'POST') return {statusCode:405, body:'POST only'};
  try{
    const {network, plan, iuc} = JSON.parse(event.body||'{}');
    const UserID = process.env.CK_USERID;
    const APIKey = process.env.CK_APIKEY;
    const url = `https://www.nellobytesystems.com/APIBuy.asp?UserID=${UserID}&APIKey=${APIKey}&RequestType=Cable&Network=${network}&DataPlan=${plan}&PhoneNo=${iuc}`;
    const res = await fetch(url);
    const text = await res.text();
    return {statusCode:200, body: JSON.stringify({success:true, provider_response:text})};
  }catch(e){ return {statusCode:500, body: JSON.stringify({error:e.message})}; }
};
