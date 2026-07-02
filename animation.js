
// ===== بيانات صور المشاريع =====
const projectImages = {
  p1: ["image/مشروع 80/1.jpeg","image/مشروع 80/2.jpeg","image/مشروع 80/3.jpeg","image/مشروع 80/5.jpeg","image/مشروع 80/6.jpeg"],
  p2: ["image/مشروع d/10.jpeg","image/مشروع d/12.jpeg","image/مشروع d/7.jpeg","image/مشروع d/8.jpeg","image/مشروع d/9.jpeg"],
  p3: ["image/مشروع سي/21.jpeg","image/مشروع سي/22.jpeg","image/مشروع سي/24.jpeg"],
  p4: ["image/مشروع h/14.jpeg",],
  p5: ["image/مشروع i/16.jpeg","image/مشروع i/18.jpeg","image/مشروع i/19.jpeg","image/مشروع i/20.jpeg"]
};
const projectNames = {
    p1:"مشروع 80",p2:"مشروع D",p3:"مشروع سي",p4:"مشروع H",p5:"مشروع I"};
const header=document.querySelector('.site-header');
const onScroll=()=>{
    window.scrollY>40?header.classList.add('scrolled'):header.classList.remove('scrolled')};
window.addEventListener('scroll',onScroll);onScroll();
const navToggle=document.getElementById('navToggle');
const mainNav=document.getElementById('mainNav');
navToggle.addEventListener('click',()=>{navToggle.classList.toggle('open');mainNav.classList.toggle('open');});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navToggle.classList.remove('open');mainNav.classList.remove('open');}));
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const lightboxCount=document.getElementById('lightboxCount');
const lightboxClose=document.getElementById('lightboxClose');
const lightboxPrev=document.getElementById('lightboxPrev');
const lightboxNext=document.getElementById('lightboxNext');
let currentImages=[],currentIndex=0,currentProjectName="";

function openLightbox(projectKey,startIndex=0)
{currentImages=projectImages[projectKey];
currentProjectName=projectNames[projectKey];
currentIndex=startIndex;updateLightbox();
lightbox.classList.add('open');
document.body.style.overflow='hidden';}

function updateLightbox(){
lightboxImg.src=currentImages[currentIndex];
lightboxImg.alt=currentProjectName;
lightboxCount.textContent=`${currentProjectName} 
${currentIndex+1} /
 ${currentImages.length}`;}
function closeLightbox(){
lightbox.classList.remove('open');
document.body.style.overflow='';}

lightboxClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
lightboxPrev.addEventListener('click',()=>
{currentIndex=(currentIndex-1+currentImages.length)%currentImages.length;updateLightbox();});

lightboxNext.addEventListener('click',()=>{
    currentIndex=(currentIndex+1)%currentImages.length;updateLightbox();});

document.addEventListener('keydown',e=>
    {
        if(!lightbox.classList.contains('open'))return;
        if(e.key==='Escape')closeLightbox();
        if(e.key==='ArrowLeft')lightboxNext.click();
        if(e.key==='ArrowRight')lightboxPrev.click();});

document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>openLightbox(btn.dataset.open,0)));

document.querySelectorAll('.project-thumb').forEach(thumb=>
    {thumb.style.cursor='pointer';
        thumb.addEventListener('click',()=>{const key=thumb.closest('.project-card').dataset.project;
            openLightbox(key,0);});});

const contactForm=document.getElementById('contactForm');
const formNote=document.getElementById('formNote');
contactForm.addEventListener('submit',e=>
    {e.preventDefault();
        formNote.textContent='تم استلام طلبك، هيتم التواصل معاك قريبًا. (هذا الفورم تجريبي ويحتاج ربط بخدمة استقبال فعلية)';
        contactForm.reset();});

const revealEls=document.querySelectorAll('.project-card, .why-card, .about-grid, .contact-grid');
const io=new IntersectionObserver(entries=>
    {entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.style.opacity='1';
            entry.target.style.transform='translateY(0)';
            io.unobserve(entry.target);}})},{threshold:.15});
revealEls.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1)';io.observe(el);});

