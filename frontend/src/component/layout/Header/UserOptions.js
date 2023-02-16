import { Link } from "@material-ui/core";
import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <div>
        <div className="navbar-user">
          <div className="user-items">
            <div className="user">
              {user.name}
              <Link to="/" className="main-btn ms-2">

                <img className="rounded-circle" alt="" src={user.avatar.url ? user.avatar.url : "/Profile.png"} />
              </Link>



            </div>

            <div className="shopping-item">

              <ul className="shopping-list">
                {
                  user.role === "admin" && (
                    < li >
                      <NavLink to="/admin/dashboard"><i className="lni lni-dashboard"></i> Dashboard</NavLink>
                    </li>

                  )}
                <li>
                  <NavLink to="/orders"><i className="lni lni-clipboard"></i> Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/account"><i className="lni lni-user"></i> Account</NavLink>
                </li>
                <li>
                  <NavLink to="/cart"><i className="lni lni-cart"></i> Cart</NavLink>
                </li>
                <li>
                  <button className="logout-btn" onClick={() => {
                    logoutUser()
                  }}><i className="lni lni-exit"></i>Logout</button>
                </li>
              </ul>

            </div>

          </div>

        </div>


      </div>


    </Fragment >
  );
};

export default UserOptions;
