import React, {Component} from 'react';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "pk_test_fa8cde05629cb0c2cb5e2e1daddd6d01a8b2bdf3", //PAYSTACK PUBLIC KEY
      email: "francis.udejiofficial@gmail.com", // customer email
      amount: 100000 //equals NGN100,
    };
  }


  callback = response => {
    console.log(response); // card charged successfully, get reference here
  };

  close = () => {
    console.log("Payment closed");
  };

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 1000
      }}>

      </div>
    );
  }

}

export default Payment;