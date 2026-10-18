exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode:405, body:'POST only' };
  try{
    const {type, number} = JSON.parse(event.body||'{}');
    const UserID = process.env.CK_USERID;
    const APIKey = process.env.CK_APIKEY;
    let RequestType = type === 'dstv' || type === 'gotv' ? 'VerifyCable' : 'VerifyMeter';
    const url = `https://www.nellobytesystems.com/APIVerify.asp?UserID=${UserID}&APIKey=${APIKey}&RequestType=${RequestType}&Network=${type}&PhoneNo=${number}`;
    const res = await fetch(url);
    const text = await res.text();
    return {statusCode:200, body: JSON.stringify({result: text})};
  }catch(e){ return {statusCode:500, body: JSON.stringify({error:e.message})}; }
};
