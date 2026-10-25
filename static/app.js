// Không chấp thuận lưu khi nội dung đổi sau lần kiểm tra.
document.addEventListener('DOMContentLoaded',()=>{
 const editor=document.querySelector('#editor'), textarea=document.querySelector('#content');
 if(!editor||!textarea)return;
 const original=textarea.value;
 function invalidate(){const review=document.querySelector('.review');if(review)review.remove();}
 textarea.addEventListener('input',()=>{if(textarea.value!==original)invalidate();});
 for(const btn of document.querySelectorAll('.apply-suggestion')){
  btn.addEventListener('click',()=>{
   const a=Number(btn.dataset.start),b=Number(btn.dataset.end),value=btn.dataset.after;
   textarea.value=textarea.value.slice(0,a)+value+textarea.value.slice(b);
   invalidate();textarea.focus();
  });
 }
});
