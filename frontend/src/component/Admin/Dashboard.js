import React, { useEffect } from "react";
// import Sidebar from "./Sidebar.js";
import "./dashboard.css";
// import { Typography } from "@material-ui/core";
// import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (

    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />

      <div className="container">

        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

        </div>

        <div className="row">

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Amount</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">₹{totalAmount.toFixed(2)}</div>
                  </div>
                  <div className="col-auto">
                    <i className="lni lni-html5 fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Total Products</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{products && products.length}</div>
                  </div>
                  <div className="col-auto">
                    <i className="lni lni-html5 fa-2x text-gray-300"></i>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Orders
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{orders && orders.length}</div>
                  </div>
                  <div className="col-auto">
                    <i className="lni lni-html5 fa-2x text-gray-300"></i>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Total Users</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{users && users.length}</div>
                  </div>
                  <div className="col-auto">
                    <i className="lni lni-html5 fa-2x text-gray-300"></i>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row">

          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>

              </div>
              <div className="card-body">
                <Line data={lineState} />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Product Stocks</h6>

              </div>
              <div className="card-body">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </div>



      </div>
      {/* <Sidebar /> */}

    </div>
  );
};

export default Dashboard;
