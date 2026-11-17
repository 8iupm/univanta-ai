# Univanta AI — جامعة حائل (نموذج تجريبي)

## النشر على Netlify
1. ارفع **كل الملفات والمجلدات** إلى مستودع GitHub (أو اربط المستودع بـ Netlify).
2. في Netlify اختر Add new project → Import an existing project → GitHub ثم اختر المستودع.
3. اترك Build command فارغًا وPublish directory كـ `.`.
4. من Site configuration → Environment variables أضف متغير `OPENAI_API_KEY` بقيمة مفتاح API الخاص بك. اختياريًا أضف `OPENAI_MODEL`.
5. أعد النشر (Deploy) لتفعيل الدالة. مفتاح API لا تضعه داخل index.html أو GitHub.

**مهم:** الذكاء الاصطناعي يعمل فقط بعد إعداد مفتاح API صالح مع رصيد مناسب. قد تترتب تكاليف API. لا تعمل الدالة عند فتح index.html محليًا أو على GitHub Pages فقط.

**التواصل مع الموظفين:** نموذج عرض فقط، ولا يرسل أي بيانات إلى الجامعة. يلزم ربطه بخدمة تذاكر معتمدة قبل الاستخدام الحقيقي. الموقع غير رسمي ولا يستخدم بيانات جامعية خاصة.
