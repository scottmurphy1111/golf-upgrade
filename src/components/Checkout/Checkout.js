import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
// import { countries } from '../../lib/Countries';

const Checkout = ({ cart, setCheckout }) => {
  const [checkoutToken, setCheckoutToken] = useState({});
  const [formState, setFormState] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@email.com',

    shippingName: 'Jane Doe',
    shippingStreet: '123 Fake St',
    shippingCity: 'San Francisco',
    shippingStateProvince: 'CA',
    shippingPostalZipCode: '94107',
    shippingCountry: 'US',

    cardNum: '4242 4242 4242 4242',
    expMonth: '11',
    expYear: '2023',
    ccv: '123',
    billingPostalZipcode: '94107',

    shippingCountries: {},
    shippingSubdivisions: {},
    shippingOptions: [],
    shippingOption: '',
  });

  const [cartId, setCartId] = useState('');
  const [liveObject, setLiveObject] = useState();

  const params = useParams();

  const fetchShippingCountries = async (checkoutTokenId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken.id
      );
      console.log('countries promises', countries);
      setFormState({
        ...formState,
        shippingCountries: countries,
      });
    } catch (error) {
      console.log(
        'There was an error fetching a list of shipping countries',
        error
      );
    }
  };

  const fetchSubDivisions = async (countryCode) => {
    console.log('cc', countryCode);
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );
      setFormState({
        ...formState,
        shippingSubdivisions: subdivisions,
      });
    } catch (error) {
      console.log('There was an error fetching the subdivisions', error);
    }
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    console.log('ctid', checkoutTokenId);
    try {
      const options = await commerce.checkout.getShippingOptions(
        checkoutTokenId,
        {
          country,
          region: stateProvince,
        }
      );
      const shippingOption = (await options[0]) || null;
      setFormState({
        ...formState,
        shippingOptions: options,
        shippingOption: shippingOption,
      });
    } catch (error) {
      console.log('There was an error fetching the shipping methods', error);
    }
  };

  const handleSetCheckoutToken = (token) => {
    setCheckoutToken(token);
  };

  const handleShipping = () => {};

  useEffect(() => {
    commerce.checkout
      .generateToken(params.id, {
        type: 'cart',
      })
      .then((res) => {
        console.log('res', res);
        handleSetCheckoutToken(res);
      })

      .catch((error) => {
        console.log('There was an error in generating a token', error);
      });
  }, [params]);

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);

    fetchSubDivisions(formState.shippingCountry);

    fetchShippingOptions(
      checkoutToken.id,
      formState.shippingCountry,
      formState.shippingStateProvince
    );
  }, [checkoutToken]);

  console.log('cotoken', checkoutToken);
  console.log('cotoken', checkoutToken);

  const handleFormChanges = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const renderCheckoutForm = () => {
    return (
      <div className="checkout-form-wrapper">
        <form className="checkout__form" onChange={(e) => handleFormChanges(e)}>
          <h4 className="checkout__subheading">Customer information</h4>

          <label className="checkout__label" htmlFor="firstName">
            First name
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.firstName}
            name="firstName"
            placeholder="Enter your first name"
            required
          />

          <label className="checkout__label" htmlFor="lastName">
            Last name
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.lastName}
            name="lastName"
            placeholder="Enter your last name"
            required
          />

          <label className="checkout__label" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.email}
            name="email"
            placeholder="Enter your email"
            required
          />

          <h4 className="checkout__subheading">Shipping details</h4>

          <label className="checkout__label" htmlFor="shippingName">
            Full name
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.shippingName}
            name="shippingName"
            placeholder="Enter your shipping full name"
            required
          />

          <label className="checkout__label" htmlFor="shippingStreet">
            Street address
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.shippingStreet}
            name="shippingStreet"
            placeholder="Enter your street address"
            required
          />

          <label className="checkout__label" htmlFor="shippingCity">
            City
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.shippingCity}
            name="shippingCity"
            placeholder="Enter your city"
            required
          />

          <label className="checkout__label" htmlFor="shippingPostalZipCode">
            Postal/Zip code
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            value={formState.shippingPostalZipCode}
            name="shippingPostalZipCode"
            placeholder="Enter your postal/zip code"
            required
          />

          {/* start here*/}
          <label className="checkout__label" htmlFor="shippingCountry">
            Country
          </label>
          <select
            onChange={(e) => handleFormChanges(e)}
            value={formState.shippingCountry}
            name="shippingCountry"
            className="checkout__select"
          >
            <option disabled>Country</option>
            {/* {console.log(JSON.stringify(formState, null, 2))} */}
            {Object.keys(formState.shippingCountries).map((index) => {
              return (
                <option value={index} key={index}>
                  {formState.shippingCountries[index]}
                </option>
              );
            })}
            ;
          </select>

          <label className="checkout__label" htmlFor="shippingStateProvince">
            State/province
          </label>

          <select
            onChange={(e) => handleFormChanges(e)}
            value={formState.shippingStateProvince}
            name="shippingStateProvince"
            className="checkout__select"
          >
            <option className="checkout__option" disabled>
              State/province
            </option>
            {Object.keys(formState.shippingSubdivisions).map((index) => {
              return (
                <option value={index} key={index}>
                  {formState.shippingSubdivisions[index]}
                </option>
              );
            })}
            ;
          </select>

          <label className="checkout__label" htmlFor="shippingOption">
            Shipping method
          </label>
          <select
            onChange={(e) => handleFormChanges(e)}
            value={formState.shippingOption.id}
            name="shippingOption"
            className="checkout__select"
          >
            <option className="checkout__select-option" disabled>
              Select a shipping method
            </option>
            {formState.shippingOptions.map((method, index) => {
              return (
                <option
                  className="checkout__select-option"
                  value={method.id}
                  key={index}
                >{`${method.description} - $${method.price.formatted_with_code}`}</option>
              );
            })}
            ;
          </select>

          <h4 className="checkout__subheading">Payment information</h4>

          <label className="checkout__label" htmlFor="cardNum">
            Credit card number
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            name="cardNum"
            value={formState.cardNum}
            placeholder="Enter your card number"
          />

          <label className="checkout__label" htmlFor="expMonth">
            Expiry month
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            name="expMonth"
            value={formState.expMonth}
            placeholder="Card expiry month"
          />

          <label className="checkout__label" htmlFor="expYear">
            Expiry year
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            name="expYear"
            value={formState.expYear}
            placeholder="Card expiry year"
          />

          <label className="checkout__label" htmlFor="ccv">
            CCV
          </label>
          <input
            onChange={(e) => handleFormChanges(e)}
            className="checkout__input"
            type="text"
            name="ccv"
            value={formState.ccv}
            placeholder="CCV (3 digits)"
          />

          <button className="checkout__btn-confirm">Confirm order</button>
        </form>
      </div>
    );
  };

  return renderCheckoutForm();
};

export default Checkout;
