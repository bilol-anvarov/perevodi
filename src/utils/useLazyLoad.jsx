import { useState, useEffect, useRef } from 'react';

const useLazyLoad = (initialCount = 10, increment = 5) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const loaderRef = useRef(null);

    useEffect(() => {
        const handleObserver = (entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                setVisibleCount((prevCount) => prevCount + increment);
            }
        };

        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0.25,
        };

        const observer = new IntersectionObserver(handleObserver, option);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    return [visibleCount, loaderRef];
};

export default useLazyLoad