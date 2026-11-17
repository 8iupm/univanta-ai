exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return {statusCode:405,body:JSON.stringify({error:'Method not allowed'})};
  const key = process.env.OPENAI_API_KEY;
  if (!key) return {statusCode:503,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:'لم يتم إعداد مفتاح الذكاء الاصطناعي في Netlify بعد.'})};
  try {
    const {message,history=[]}=JSON.parse(event.body||'{}');
    if(typeof message!=='string'||!message.trim()||message.length>3000) return {statusCode:400,body:JSON.stringify({error:'سؤال غير صالح'})};
    const safeHistory=Array.isArray(history)?history.slice(-10).filter(m=>['user','assistant'].includes(m.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,3000)})):[];
    const response=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4o-mini',temperature:0.5,max_tokens:850,messages:[{role:'system',content:'أنت Univanta AI مساعد تعليمي تجريبي لطلاب جامعة حائل. أجب بالعربية الواضحة أو بلغة المستخدم، واشرح المواد والأمثلة خطوة بخطوة. لا تدّع الوصول لبيانات الجامعة أو الطلاب أو الخطط الرسمية أو المواعيد. عندما يتعلق السؤال بلوائح الجامعة أو خططها أو التسجيل، صرّح بأن المعلومات تحتاج التحقق من مصدر رسمي. لا تطلب بيانات شخصية حساسة.'},...safeHistory,{role:'user',content:message}]})});
    const data=await response.json();
    if(!response.ok) return {statusCode:502,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:'خدمة الذكاء الاصطناعي غير متاحة حاليًا. تحقق من المفتاح والرصيد.'})};
    return {statusCode:200,headers:{'Content-Type':'application/json'},body:JSON.stringify({reply:data.choices?.[0]?.message?.content||'لم يصل رد، حاول مرة أخرى.'})};
  }catch(e){return {statusCode:500,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:'حدث خطأ أثناء معالجة الطلب.'})}}
};
