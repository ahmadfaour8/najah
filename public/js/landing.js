let body = document.querySelector('body');
let NavBar = document.querySelector('.navbar');
let Links = document.querySelectorAll('.head a');
let UpBtn = document.querySelector('.up');
/* sections */
let Head = document.querySelector('.head');
let About = document.querySelector('.about');
let Services = document.querySelector('.services');
let Work = document.querySelector('.work');
let Blog = document.querySelector('.blog');
let Contact = document.querySelector('.contact');
/* all section */
let sec = document.querySelectorAll('.section');
/* navbar */
let Bars = document.querySelector('.bars');
let lista = document.querySelector('.head .links ul');


Bars.onclick = function(){
   console.log("opeeeen");
   lista.classList.toggle('open');
   Links.forEach((justOne) => {
      justOne.addEventListener('click' , (ev) => {
         lista.classList.remove('open');
      });
   });
}

/* for class active */
Links.forEach((oneLink) => {
   oneLink.addEventListener('click' , (event) => {
      Links.forEach((one) => {
         one.classList.remove('active');
      });
      oneLink.classList.add('active');
   });
});

/* scroll window */
window.onscroll = function(){
   if(scrollY >  40 ){
      NavBar.style.backgroundColor = '#999';
      NavBar.style.boxShadow = '0px 0px 3px #333';
   }else{
      NavBar.style.backgroundColor = 'transparent';
      NavBar.style.boxShadow ='none';
   }
   if(scrollY > 500){
      UpBtn.style.display = 'block'; 
   }else{
      UpBtn.style.display = 'none'; 
   }
}

/* click up button */
UpBtn.onclick = function(){
   window.scrollTo({
      top:2,
      behavior:"smooth"
   });
}

/* nav bar متعقب للون */
function go(){
   let len = sec.length;
   console.log(len);
   while(--len && (window.scrollY - 25 ) < sec[len].offsetTop){
      Links.forEach((link) => {
         link.classList.remove('active');
      });
      Links[len].classList.add('active');
   }

}
go();
window.addEventListener('scroll' , go);

/* slider */
let imgs = ['bg-1.jpg' , 'bg-2.jpg' , 'bg-3.jpg'];
Head;
let i = 0;
 function next(){
   console.log('next');
   if(i <= 0) i = imgs.length;
   i--;
   return sett();
 }

 function prev(){
   if(i >= imgs.length - 1 ) i = -1;
   i++;
   return sett();
 }
 function sett(){
   Head.style.backgroundImage = `url('./images/${imgs[i]}')`;
 }




 
