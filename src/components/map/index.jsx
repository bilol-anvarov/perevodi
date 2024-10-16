'use client'
import React, { useState, useEffect } from 'react'
import Map, { BranchCard } from './map'
import "./map.css"
import { useTranslation } from 'react-i18next';
import api from '@/utils/api';
import { useMainContext } from '@/context/MainContext';


function getHourMinutes(open, close, activeLan){
  if(activeLan == 'ru' ){
    return `с ${open.slice(0, 5)} до ${close.slice(0, 5)}`;
  } 
  if(activeLan == 'uz'){
    return `${open.slice(0, 5)} dan ${close.slice(0, 5)} gacha`;
  }
}


async function fetchBranch(regionId, dtrId, activeLan) {
  const response = await api.get(`location-list/?region=${regionId}&district=${dtrId}`,  {
    headers: {
        "Accept-Language": activeLan,
    },
  })
  return response.data;
}

const BranchComponent = ({ item, district, activeLan, location, close }) => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchBranch(item.id, district.id, activeLan).then(data => {
      setLocationData(data);
    });
  }, [item.id, district.id, activeLan]);

  return (
    <div>
      {locationData.length > 0 && locationData.map((branch, index) => (
        <div key={index} className="branch cursor-pointer" onClick={()=>{location(branch); close(false)}}>
          {branch.title}
        </div>
      ))}
    </div>
  );
};




export default function MapIndex() {
  const {activeLan} = useMainContext()
  const { t, i18n } = useTranslation()
  const [markers, setMarkers] = useState([]);
  const [ifOpenCities, setIfOpenCities] = useState(false)
  const [search, setSearch] = useState('')

  const [center, setCenter] = useState({ lat: 41.311081, lng: 69.240562 });
  const [zoom, setZoom] = useState(10);
  
  const [currentAdress, setCurrentAdress] = useState(null)
  
  const [data, setData] = useState([])
  const [locations, setLocations] = useState([])

  const [dtrId, setDtrId] = useState('')
  const [regoinId, setRegoinId] = useState('1')
  const [openCities, setOpenCities] = useState({});
  const [openBranches, setOpenBranches] = useState({});





  const toggleDistricts = (index) => {
    setOpenCities(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const toggleBranches = (index, districtId) => {
    setOpenBranches(prevState => ({
      ...prevState,
      [districtId]: !prevState[districtId], // Использование идентификатора района в качестве ключа
    }));
  };

  function getZoom(obj){
    if(obj.address){
      setCurrentAdress(obj)
      setZoom(15)
    } else{
      setZoom(12)
    }
    if(obj.latitude && obj.longitude){
      setCenter({ lat: Number(obj.latitude), lng: Number(obj.longitude)})
    }
  }
  

  useEffect(() => {
    async function fetchLocationList() {
      try{
        if(!dtrId){
          const response = await api.get(`location-list/?region=${regoinId}`,  {
            headers: {
                "Accept-Language": activeLan,
            },
          })
          setLocations(response.data);
          // маркеры магазинов
          const coordinates = response.data.map(item => ({
            lat: Number(item.latitude),
            lng: Number(item.longitude),
          }));
          setMarkers(coordinates);


          // Calculate the average latitude and longitude
          const averageLocation = coordinates.reduce((acc, coord) => {
            acc.latitude += coord.lat;
            acc.longitude += coord.lng;
            return acc;
          }, { latitude: 0, longitude: 0 });

          averageLocation.latitude /= coordinates.length;
          averageLocation.longitude /= coordinates.length;

          // Pass the average location to getZoom function
          getZoom(averageLocation);
        } else{
          const response = await api.get(`location-list/?district=${dtrId}&?region=${regoinId}`, {
            headers: {
                "Accept-Language": activeLan,
            },
          })
          setLocations(response.data);
          // маркеры магазинов
          const coordinates = response.data.map(item => ({
            lat: Number(item.latitude),
            lng: Number(item.longitude),
          }));
          setMarkers(coordinates);

          // приблежение 


          // Calculate the average latitude and longitude
          const averageLocation = coordinates.reduce((acc, coord) => {
            acc.latitude += coord.lat;
            acc.longitude += coord.lng;
            return acc;
          }, { latitude: 0, longitude: 0 });

          averageLocation.latitude /= coordinates.length;
          averageLocation.longitude /= coordinates.length;
          getZoom(averageLocation);
        }
      } catch(error){
        console.log(error)
      }


    }

    

    async function fetchData() {
      try{
        const response = await api.get('location-region-list/', {
          headers: {
              "Accept-Language": activeLan,
          },
        })
        setData(response.data);
      } catch(error){
        console.log(error)
      }
    }
    
    fetchData();
    fetchLocationList();
    
  }, [activeLan, dtrId, regoinId]);


  let filteredData = locations.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(()=>{
    if(dtrId !== ''){
      setZoom(12)
    }
  },[dtrId])


  return (
    <>
     <section className="map fade-in-section opacity-0" id='shops'>
        <div className="information relative">
            <div onClick={()=>{setIfOpenCities(item => item = !ifOpenCities)}} className=" justify-between location-name min-h-[45px] flex gap-2.5 items-center cursor-pointer">
              <span className="span max-w-[330px]">
                {(currentAdress && currentAdress.address) ? currentAdress.address : (currentAdress && currentAdress.title) ? currentAdress.title  : 'Tashkent' }
              </span>

              <svg className={ifOpenCities ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M11.107 3.92119L10.6429 3.45713C10.5328 3.34697 10.3546 3.34697 10.2445 3.45713L5.99995 7.69229L1.75542 3.45713C1.64526 3.34697 1.46714 3.34697 1.35698 3.45713L0.89292 3.92119C0.782764 4.03135 0.782764 4.20947 0.89292 4.31963L5.80073 9.22744C5.91089 9.3376 6.08901 9.3376 6.19917 9.22744L11.107 4.31963C11.2171 4.20947 11.2171 4.03135 11.107 3.92119Z" fill="#003C96"/>
              </svg>
            </div>
            <p className='description mt-3'>{t('mainPage.map.description')}</p>
            <label htmlFor='search' className="search flex p-2.5 mt-6 gap-2.5">
                <img className='search-icon' src="/search icon.svg" alt="icon" />
                <input type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search} id='search' placeholder={t('mainPage.map.searchText')} />
            </label>



            {ifOpenCities ? (

             
            <div className={`cities mt-2 flex-col gap-2.5 absolute z-30 bg-white rounded-xl p-2.5 w-[358px]`}>
            {data.length > 0 && data.map((item, index) => (
              <div key={index} className="city">
                <div
                  className="title flex justify-between"
                >
                  <span 
                    onClick={()=>{
                      setIfOpenCities(false)
                      setDtrId('')
                      setRegoinId(item.id);
                      setCurrentAdress(item)
                    }}
                    className='text-[16px] cursor-pointer font-bold' 
                  >{item.title}</span>
                  <svg 
                    onClick={() => toggleDistricts(index)}
                    className={`cursor-pointer ${openCities[index] ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    >
                    <path d="M11.107 3.92119L10.6429 3.45713C10.5328 3.34697 10.3546 3.34697 10.2445 3.45713L5.99995 7.69229L1.75542 3.45713C1.64526 3.34697 1.46714 3.34697 1.35698 3.45713L0.89292 3.92119C0.782764 4.03135 0.782764 4.20947 0.89292 4.31963L5.80073 9.22744C5.91089 9.3376 6.08901 9.3376 6.19917 9.22744L11.107 4.31963C11.2171 4.20947 11.2171 4.03135 11.107 3.92119Z" fill="#003C96"/>
                  </svg>
                </div>
                <div className={`districts p-3 ${openCities[index] ? 'flex' : 'hidden'} flex-col gap-2.5`}>
                  {item.districts.length > 0 && item.districts.map((district, idx) => (
                    <div key={idx}  className='district-main'>
                    <div 
                      className="district cursor-pointer text-[16px] flex justify-between items-center"
                    >
                      <span onClick={()=>{
                        setRegoinId(item.id);
                        setDtrId(district.id)
                        setCurrentAdress(district)
                        setIfOpenCities(false)
                      }}>
                        {district.title}
                      </span>
                      <svg 
                        onClick={() => toggleBranches(index, district.id)} // Передача идентификатора района в функцию
                        className={`cursor-pointer ${openBranches[district.id] ? 'rotate-180' : ''}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 12 12" 
                        fill="none"
                        >
                        <path d="M11.107 3.92119L10.6429 3.45713C10.5328 3.34697 10.3546 3.34697 10.2445 3.45713L5.99995 7.69229L1.75542 3.45713C1.64526 3.34697 1.46714 3.34697 1.35698 3.45713L0.89292 3.92119C0.782764 4.03135 0.782764 4.20947 0.89292 4.31963L5.80073 9.22744C5.91089 9.3376 6.08901 9.3376 6.19917 9.22744L11.107 4.31963C11.2171 4.20947 11.2171 4.03135 11.107 3.92119Z" fill="#003C96"/>
                      </svg>
                    </div>
                      <div className={`branches p-3 ${openBranches[district.id] ? 'flex' : 'hidden'} flex-col gap-2.5`}>
                        {
                            <BranchComponent location={getZoom} item={item} district={district} close={setIfOpenCities} activeLan={activeLan} />
                        }
                      </div>
                    </div >  
                  ))}
                </div>
              </div>
            ))}
            </div>
            ) : <></>}


            <div className="cards mt-3 flex flex-col gap-2">
              {filteredData.length > 0 &&
                filteredData.map((item, index)=>{
                  return(
                    <div 
                      className="branch cursor-pointer flex flex-col gap-1"
                      key={index}
                      onClick={()=>{
                        getZoom(item)
                      }}
                    >
                      <BranchCard
                        key={index}
                        description={item.title}
                        addres={item.address}
                        time={getHourMinutes(item.open, item.close, i18n.language)}
                      />
                    </div>
                  )
                })
              }
                {/* Повторите BranchCard для других филиалов */}
            </div>
        </div>
        <div className="map">
          {locations.length > 0 &&
            <Map center={center} zoom={zoom} locations={markers} />
          }
        </div>
    </section>
    </>
  )
}
