import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideNav = () => {
    return (
        <div className="mega-category-menu">
            <span className="cat-button"><i className="lni lni-menu"></i>Admin Management</span>
            <ul className="sub-category">
                <li><Link to="/admin/dashboard">Dashboard </Link>

                </li>
                <li><Link to="/admin/products">Products <i className="lni lni-chevron-right"></i></Link>
                    <ul className="inner-sub-category">
                        <li><Link to="/admin/products">All Products</Link></li>
                        <li><Link to="/admin/product">Create Product</Link></li>


                    </ul>
                </li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="/admin/users">Users </Link></li>
                <li><Link to="/admin/reviews">Reviews</Link></li>
                <li><Link to="/admin/coupons">Coupons <i className="lni lni-chevron-right"></i></Link>
                    <ul className="inner-sub-category">
                        <li><Link to="/admin/coupons">All Coupons</Link></li>
                        <li><Link to="/admin/coupon">Create Coupon</Link></li>


                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default AdminSideNav