1) What is the difference between null and undefined?
ANSWER: null হলো এক প্রকার অবজেক্ট যা আমরা নিজেরা সেট করি। অপর দিকে undefined হলো জাভাস্ক্রিপ্ট দ্বারা সেট করা মান যেটা কিনা নিজে নিজে সেট হয় যখন কোনো মান এটি না পায়।

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
ANSWER: map() একটা array এর উপর চলার পর নতুন array রির্টান করে। কিন্তু forEach() কোনো কিচু রির্টান করে না।

3) What is the difference between == and ===?
ANSWER: == দিয়ে খালি টাইপ যাচাই করা হয় কিন্তু === দিয়ে টাইপ এবং মান দুইটায় যাচাই করা হয়।

4) What is the significance of async/await in fetching API data?
ANSWER: জাভাস্ক্রিপ্ট সবসময় কোড পর্যায় ক্রমে রান করে কিন্তু আমরা যখন API নিয়ে কাজ করি তখন অনেক সময় Data আসার জন্য কিছু সময় অপেক্ষা করে তারপরে data আসার পর তা পরের লাইনে যায়। এই data আসার জন্য অপেক্ষা করার সময় async / await ব্যবহার হয়।

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
ANSWER: Scope: যেইসব জায়গা থেকে variable access করা যায় সেই জায়গাটি হলো scope. তিন প্রকারের scope আছেঃ

Global Scope: যেই ভ্যালুকে আমরা কোডের সবখানে ব্যবহার করতে পারি তাকে global scope বলে।

Function: কোনো ভ্যালুকে যদি একটা নির্দিষ্ট ফাংশন এর ভিতরে declare করা হয় তাহলে ওই ভ্যালুকে অন্য কোনো জায়গায় আর ব্যবহার করা যায় না এমন সব ভ্যালুকে বলা হয় functino scope।

Block: কোনো একটি নির্দিষ্ট ব্লক যেমন লুপ এর {} এই ব্র্যাকেটের ভিতরে যদি কোনো মান declare করা হয় তখন তাকে block scope হিসাবে বিবেচনা করা হয়।