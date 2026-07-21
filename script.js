const search=document.getElementById('search');
if(search){
search.addEventListener('input',e=>{
 const q=e.target.value.toLowerCase();
 document.querySelectorAll('.producto').forEach(p=>{
  p.style.display=p.textContent.toLowerCase().includes(q)?'inline-block':'none';
 });
});
}
document.querySelectorAll('.producto button').forEach(btn=>{
 btn.addEventListener('click',()=>alert('Producto añadido al carrito (demo).'));
});
