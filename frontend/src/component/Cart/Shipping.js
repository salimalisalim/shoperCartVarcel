import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Link } from "react-router-dom";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Products Checkout</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li><Link to="/"><i className="lni lni-home"></i> Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li>checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="checkout-wrapper section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <CheckoutSteps activeStep={0} />
              <h2 className="shippingHeading">Shipping Details</h2>
              <div className="shippingContainer">
                <div className="shippingBox">


                  <form
                    className="shippingForm"
                    encType="multipart/form-data"
                    onSubmit={shippingSubmit}
                  >
                    <div>
                      <HomeIcon />
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div>
                      <LocationCityIcon />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div>
                      <PinDropIcon />
                      <input
                        type="number"
                        placeholder="Pin Code"
                        required
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>

                    <div>
                      <PhoneIcon />
                      <input
                        type="number"
                        placeholder="Phone Number"
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        size="10"
                      />
                    </div>

                    <div>
                      <PublicIcon />

                      <select
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Country</option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {country && (
                      <div>
                        <TransferWithinAStationIcon />

                        <select
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option value="">State</option>
                          {State &&
                            State.getStatesOfCountry(country).map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    <input
                      type="submit"
                      value="Continue"
                      className="shippingBtn btn"
                      disabled={state ? false : true}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </Fragment>
  );
};

export default Shipping;
