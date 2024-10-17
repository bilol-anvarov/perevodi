'use client'
import Link from 'next/link';
import './header.css'
import { useTranslation } from 'next-i18next';
import '../../../i18n';
import BtnsChangeLng from './Buttons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const LinkLayout = ({name, src, img, onClickFunc})=>{
  return ( 
    <li className='link'>
      <Link onClick={onClickFunc} href={src}>
        <img className='nav-icon' src={img} alt={'icon'} />
        {name}
      </Link>
    </li>
)}





// for header with green background 
export default function Header() {
  const router = useRouter();

  const [ifOpenBar, setIfOpenBar] = useState(false)


  useEffect(()=>{
    if(ifOpenBar){
      document.querySelector('body').classList.add('overflow-y-hidden')
    } else{
      document.querySelector('body').classList.remove('overflow-y-hidden')
    }
  },[ifOpenBar])


   // Add and Remove Class on scroll
   const [scrolltopdata, setscrolltopdata] = useState('');

   useEffect(() => {
       window.addEventListener('scroll', () => {
           if (window.scrollY < 15) {
               setscrolltopdata('');
           } else {
               setscrolltopdata('scrolled');
           }
       });
   }, [])



  useEffect(() => {
    // Close the bar when the location changes
    setIfOpenBar(false);
  }, [router.events]);


  

  function closeNavBar(){
    setIfOpenBar(false)
  }



  const { t } = useTranslation();


    return (
      <header className={scrolltopdata}>
          <div className={`header_inside`}>
            <Link onClick={closeNavBar} href={'/'} className="logo">
              <img src="/logo.svg" alt="/logo.svg" />
            </Link>
            <nav className={`nav desktop`}>
                {/* links */}
                <ul className="links desktop">
                  {/* account */}
                  
                  <LinkLayout onClickFunc={closeNavBar} img={'/Cart 4.svg'} name={t('header.getToys')} src='/#getToys'/>
                  <LinkLayout onClickFunc={closeNavBar}  img={'/loyality.svg'} name={t('header.history')} src='/#history'/>
                  <LinkLayout onClickFunc={closeNavBar} img={'/Ticket Sale mini.svg'} name={t('header.conditions')} src='/#questions'/>
                  <LinkLayout onClickFunc={closeNavBar} img={'/Book Bookmark Minimalistic mini.svg'} name={t('header.contacts')} src='/#shops'/>
                </ul>
                {/* burger menu */}
                <div className="menu" onClick={()=>{setIfOpenBar(item=> item = !ifOpenBar)}}>

                  <div className={`iconMenu humburger${ifOpenBar ? ' active' : ''}`}>
                      <div className="bar bar--1"></div>
                      <div className="bar bar--2"></div>
                      <div className="bar bar--3"></div>
                  </div>
              </div>
                {/* change language */}
                <BtnsChangeLng />
            </nav>
          </div>
            <nav className={`nav${ifOpenBar ? ' active' : ''} mobile`}>
              <ul className="links desktop">
                    {/* account */}
                    
                    <LinkLayout onClickFunc={closeNavBar} img={'/Cat.svg'} name={t('header.getToys')} src='/#getToys'/>
                    <LinkLayout onClickFunc={closeNavBar}  img={'/Notebook.svg'} name={t('header.history')} src='/#history'/>
                    <LinkLayout onClickFunc={closeNavBar} img={'/Dialog.svg'} name={t('header.conditions')} src='/#questions'/>
                    <LinkLayout onClickFunc={closeNavBar} img={'/Map Point.svg'} name={t('header.contacts')} src='/#shops'/>
                  </ul>
            </nav>
      </header>
    )
  }