import React from 'react'
import { Link } from 'react-router-dom';

const CommonSideNav = () => {


    const categories = [
        "Watches",
        "Speaker",
        "Camera",
        "Phones",
        "Headphones",
        "Speaker",
        "Laptop"
    ];

    return (
        <div className="mega-category-menu">
            <span className="cat-button"><i className="lni lni-menu"></i>All Categories</span>
            <ul className="sub-category">
                {categories.map((category, index) => (

                    < li key={index} >
                        <Link key={index} to="/products"
                        >
                            {category}
                            {/* <span>(20)</span> */}
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default CommonSideNav