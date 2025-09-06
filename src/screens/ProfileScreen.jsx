import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import userIcon from "../images/user.svg";
import Nav from "../Nav";
import PlansScreen from "./PlansScreen";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1 className="profileScreen__edit__profile">Edit Profile</h1>
        <div className="profileScreen__info">
          <img src={userIcon} alt="" />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__payment-info">
              <h3>Test Payment Information</h3>
              <p>
                ⚠️ You will not be charged for any test payments Use this to
                  make test payments
              </p>
              <table className="profileScreen__payment-table">
                <thead>
                  <tr>
                    <th>Card Network</th>
                    <th>Card Number</th>
                    <th>CVV</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mastercard</td>
                    <td>5267 3181 8797 5449</td>
                    <td>Any 3 digits</td>
                    <td>Any future date</td>
                  </tr>
                  <tr>
                    <td>Visa</td>
                    <td>4386 2894 0766 0153</td>
                    <td>Any 3 digits</td>
                    <td>Any future date</td>
                  </tr>
                  <tr>
                    <td>Mastercard (EMI)</td>
                    <td>5241 8100 0000 0000</td>
                    <td>Any 3 digits</td>
                    <td>Any future date</td>
                  </tr>
                  <tr>
                    <td>Visa (Domestic)</td>
                    <td>4718 6091 0820 4366</td>
                    <td>Any 3 digits</td>
                    <td>Any future date</td>
                  </tr>
                  <tr>
                    <td>Visa (Test)</td>
                    <td>4111 1111 1111 1111</td>
                    <td>Any 3 digits</td>
                    <td>Any future date</td>
                  </tr>
                </tbody>
              </table>
              <div className="profileScreen__upi-info">
                <strong>UPI Payment:</strong> Use any random UPI ID (e.g.,
                test@upi)
              </div>
              <div className="profileScreen__payment-note">
                Note: These are test payment details. No actual charges will be
                made to any account.
              </div>
            </div>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
