import React from 'react'
import AdminSideNav from './AdminSideNav'
import CommonSideNav from './CommonSideNav'


const UserNav = ({ user }) => {
    return (
        <>
            {user.role === "admin" ? <AdminSideNav /> : <CommonSideNav />}
        </>
    )
}

export default UserNav