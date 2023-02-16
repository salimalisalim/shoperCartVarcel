import React, { useState } from 'react'
import "./ScrollButton.css"
export const ScrollButton = () => {

    const [visible, setVisible] = useState('hidden')

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible('visible')
        }
        else if (scrolled <= 300) {
            setVisible('hidden')
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <>
            <button style={{ visibility: visible }} onClick={scrollToTop} className="scroll-top">
                <i className="lni lni-chevron-up"></i>
            </button>
        </>
    )
}
