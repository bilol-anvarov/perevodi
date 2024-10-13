import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerClustererF, MarkerF } from "@react-google-maps/api";
import "./map.css"

// const { VITE_MAP_KEY: mapKey } = import.meta.env;

const mapKey = 'AIzaSyBUfFuUkU84Tstu7TCdeifwBeFqL2AXhAQ'



console.log(mapKey);


export function truncateText(text, maxLength) {
    text = text.replace(/<\/?[^>]+(>|$)/g, "")
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength - 3) + '...';
    }
}



export function BranchCard({ description, time, addres }) {
    return (
        <>
            <div className="card-description">
                {description}
            </div>
            <div className="card-addres">
                {truncateText(addres, 45)}
            </div>
            <div className="card-time">
                {time}
            </div>
        </>
    );
}

export default function Map({locations, center, zoom }) {    
    
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: mapKey,
    });

    const mapContainerStyle = {
        width: '100%',
        height: '600px'
    };



    // Кастомные стили для кластеров
    const clusterStyles = [
        {
            url: '/Map Point supermarket.svg', 
            height: 40,
            width: 40,
            textColor: '#fff',
            textSize: 14
        },
        {
            url: '/Map Point supermarket.svg', 
            height: 50,
            width: 50,
            textColor: '#fff',
            textSize: 14
        },
        {
            url: '/Map Point supermarket.svg', 
            height: 60,
            width: 60,
            textColor: '#fff',
            textSize: 14
        },
        {
            url: '/Map Point supermarket.svg', 
            height: 60,
            width: 60,
            textColor: '#fff',
            textSize: 14
        }
    ];

    // Опции для кластеризации
    const clusterOptions = {
        styles: clusterStyles,
        maxZoom: 0,
    };




    return (
        isLoaded ? (
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
                <MarkerClustererF
                    options={clusterOptions}
                >
                    {(clusterer) =>
                        locations?.map((item, index) => (
                            <MarkerF key={index} position={item} icon={'/Map Point supermarket.svg'} />
                        ))
                    }
                </MarkerClustererF>
            </GoogleMap>
        ) : (
            <></>
        )
    );
}
