// Style file--
import "./shipping.scss";
import { Country, State } from "country-state-city";
// Hooks--
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI Icons--
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PublicIcon from "@mui/icons-material/Public";
// store data into the redux--
import { saveShippingInfo } from "../../reducers/cart/cartReducer";
// components--
import StepperComp from "./../stepperComp/StepperComp";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhonNo] = useState("");
  const [country, setCountry] = useState("");

  // save shipping data to the redux --
  const shippingHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/confirmOrder");
  };

  return (
    <>
      <div className="shipping-page">
        {/* banner div-- */}
        <div className="shipping-banner">
          <h2>Add Your Shipping Info</h2>
        </div>
        {/* container-- */}
        <div className="shipping-container">
          <StepperComp activeStepNo={0} />
          <form className="shipping-form">
            <div className="input-div">
              <label htmlFor="address"></label>
              <HomeWorkIcon className="icon" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label htmlFor="city"></label>
              <LocationCityIcon className="icon" />
              <input
                type="text"
                placeholder="City"
                id="pincode"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label htmlFor="pincode"></label>
              <FiberPinIcon className="icon" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                id="pincode"
              />
            </div>
            <div className="input-div">
              <label htmlFor="phoneNo"></label>
              <LocalPhoneIcon className="icon" />
              <input
                type="number"
                placeholder="Phone No"
                value={phoneNo}
                id="phoneNo"
                onChange={(e) => setPhonNo(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label htmlFor="country"></label>
              <PublicIcon className="icon" />
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Country</option>
                {Country?.getAllCountries().map((item) => {
                  return (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {country && (
              <div className="input-div">
                <label htmlFor="state"></label>
                <LocationCityIcon className="icon" />
                <select
                  required
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State.getStatesOfCountry(country).map((item) => {
                    return (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {state && (
              <button type="submit" onClick={shippingHandler}>
                Next
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
