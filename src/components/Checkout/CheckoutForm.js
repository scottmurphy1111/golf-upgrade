import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { useHistory } from 'react-router-dom';
import { Form, Label } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import qs from 'qs';
import useIsMountedRef from '../../utils/useIsMountedRef';

//Import Selections
import { countries } from '../../utils/Countries';
import { monthOptions, yearOptions } from '../../utils/cardOptions';
import { canada } from '../../utils/canada';
import { stateOptions } from '../../utils/stateOptions';

const CheckoutForm = ({
  tokenId,
  getShippingOptions,
  shipOption,
  setReceipt,
}) => {
  const { register, handleSubmit, errors, control, reset } = useForm();

  // console.log('errors  ', errors);
  let history = useHistory();

  const [sameBilling, setSameBilling] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [lineItems, setLineItems] = useState(null);
  const [shipCountry, setShipCountry] = useState(null);
  const [billingShipCountry, setBillingShipCountry] = useState(null);

  const isMountedRef = useIsMountedRef();

  // const [checkoutToken, setCheckoutToken] = useState({});
  // const [order, setOrder] = useState({});
  // const [formState, setFormState] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',

  //   shippingName: '',
  //   shippingStreet: '',
  //   shippingCity: '',
  //   shippingStateProvince: '',
  //   shippingPostalZipCode: '',
  //   shippingCountry: '',

  //   cardNum: '',
  //   expMonth: '',
  //   expYear: '',
  //   ccv: '',
  //   billingPostalZipcode: '',

  //   shippingCountries: {},
  //   shippingSubdivisions: {},
  //   shippingOptions: [],
  //   shippingOption: '',
  // });

  // const [cartId, setCartId] = useState('');
  // const [liveObject, setLiveObject] = useState({});

  // const params = useParams();

  // useEffect(() => {
  //   let lineItems = {};

  //   props.liveObject.line_items.forEach((item) => {
  //     console.log('item', item);
  //     lineItems = {
  //       [item.id]: {
  //         quantity: item.quantity,
  //         variants: {
  //           [item.variants[0].variant_id]: item.variants[0].option_id,
  //         },
  //       },
  //     };
  //   });

  //   setLineItems(lineItems);
  // }, []);
  useEffect(() => {
    // const handleGetShippingOptions = (country) => {
    getShippingOptions(shipCountry);
    // };
  }, [shipCountry]);

  const getCountryInfoShipping = () => {
    if (shipCountry === 'CA') return canada;
    return stateOptions;
  };

  const getCountryInfoBilling = () => {
    if (shipCountry === 'CA') return canada;
    return stateOptions;
  };

  const handleCheckBox = () => {
    setSameBilling(!sameBilling);
  };

  const onSubmit = async (data) => {
    setProcessing(true);

    let final = {};

    final.line_items = lineItems;

    final.fulfillment = {
      shipping_method: shipOption,
    };

    final.customer = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    };

    final.shipping = {
      name: `${data.firstname} ${data.lastname}`,
      street: data.street,
      town_city: data.town_city,
      county_state: data.county_state,
      postal_zip_code: data.postal_zip_code,
      country: data.country,
    };

    if (!sameBilling) {
      final.billing = {
        name: data.billing_name,
        street: data.billing_street,
        town_city: data.billing_town_city,
        county_state: data.billing_county_state,
        postal_zip_code: data.billing_postal_zip_code,
        country: data.billing_country,
      };
    }

    if (data.gateway === 'stripe') {
      let stripInfo = {
        name: `${data.firstname} ${data.lastname}`,
        number: data.number,
        exp_month: data.expiry_month,
        exp_year: data.expiry_year,
        cvc: data.cvc,
        address_zip: data.postal_billing_zip_code,
      };

      try {
        const res = await axiosWithAuth().post(
          '/tokens',
          qs.stringify({ card: stripInfo })
        );

        final.payment = {
          gateway: data.gateway,
          card: {
            token: res.data.id,
          },
        };

        if (shipOption) {
          try {
            const res = await commerce.checkout.capture(tokenId, final);

            console.log('res from capturing checkout stripe', res);
            setReceipt(res);
            localStorage.removeItem('cart-id');
            history.push(`/order-complete/${tokenId}/${res.id}`);
            setProcessing(false);
          } catch (error) {
            window.alert(error.data.error.message);
            setProcessing(false);
          }
        }
      } catch (error) {
        console.log(error.data, 'error message');
      }
    } else {
      final.payment = {
        gateway: data.gateway,
        card: {
          number: data.number,
          expiry_month: data.expiry_month,
          expiry_year: data.expiry_year,
          cvc: data.cvc,
          postal_zip_code: data.postal_billing_zip_code,
        },
      };

      if (shipOption) {
        try {
          const res = await commerce.checkout.capture(tokenId, final);
          console.log(res, 'res from CAPTURING CHECKOUT!!! (TEST-GATEWAY)');
          setReceipt(res);
          localStorage.removeItem('cart-id');
          localStorage.setItem('receipt', JSON.stringify(res));
          history.push(`/order-complete/${tokenId}/${res.id}`);
          setProcessing(false);
        } catch (error) {
          window.alert(error.data.error.message);
          setProcessing(false);
        }
      } else {
        window.alert('Please select a shipping method!');
        setProcessing(false);
      }
    }
  };

  const renderCheckoutForm = () => {
    return (
      <div className="checkout-form-wrapper">
        <Form
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          loading={processing}
        >
          <h1>Customer Info</h1>
          <Form.Group widths="equal">
            <Controller
              id="customer"
              as={Form.Input}
              name="firstname"
              control={control}
              fluid
              label="First Name"
              placeholder="John"
              rules={{ required: 'Please enter Firstname' }}
              error={errors.firstname && errors.firstname.message}
            />
            <Controller
              fluid
              as={Form.Input}
              control={control}
              name="lastname"
              label="Last name"
              placeholder="Smith"
              rules={{ required: 'Please enter Lastname' }}
              error={errors.lastname && errors.lastname.message}
            />
            <Controller
              fluid
              name="email"
              type="email"
              label="Email"
              placeholder="xyz@example.com"
              as={Form.Input}
              control={control}
              rules={{ required: 'Please enter email' }}
              error={errors.email && errors.email.message}
            />
          </Form.Group>
          <Form.Group>
            <Controller
              width={10}
              name="street"
              label="Address"
              placeholder="122 Example St"
              as={Form.Input}
              control={control}
              rules={{ required: 'Please enter address' }}
              error={errors.street && errors.street.message}
            />
            <Controller
              // defaultValue={'US'}
              width={6}
              name="country"
              label="Select Country"
              placeholder="Pick Country..."
              options={countries}
              as={Form.Select}
              control={control}
              rules={{ required: 'Please select country' }}
              error={errors.country && errors.country.message}
              onChange={(e) => {
                console.log('e', e);
                setShipCountry(e[1].value);
                console.log('shipe country  ', shipCountry);
                reset({
                  county_state: '',
                });
                // if (shipCountry === 'CA') {
                //   reset({
                //     county_state: 'AB',
                //   });
                // } else {
                //   reset({
                //     county_state: 'AL',
                //   });
                // }
                return e[1].value || 'US';
              }}
            />
          </Form.Group>
          <Form.Group>
            <Controller
              width={6}
              name="town_city"
              label="Town/City"
              placeholder="Las Vegas"
              as={Form.Input}
              control={control}
              rules={{ required: 'Please enter Town/City' }}
              error={errors.town_city && errors.town_city.message}
            />
            <Controller
              width={6}
              label="County/State/Province/Territory"
              placeholder="Search ..."
              name="county_state"
              search
              fluid
              options={getCountryInfoShipping()}
              as={Form.Select}
              control={control}
              rules={{ required: 'Must Select Country First' }}
              error={errors.county_state && errors.county_state.message}
              onChange={(e) => e[1].value || 'AL'}
            />
            <Controller
              width={4}
              name="postal_zip_code"
              label="Zip/Postal"
              placeholder="00000"
              as={Form.Input}
              control={control}
              max="99999"
              rules={{
                required: 'Please enter zip',
                // max: 99999
              }}
              error={errors.postal_zip_code && errors.postal_zip_code.message}
            />
          </Form.Group>
          <h1>Payment Info</h1>
          <Form.Group className="payment-radio">
            <input
              name="gateway"
              type="radio"
              value="test_gateway"
              ref={register({ required: 'Please select Payment Type' })}
              onChange={(e) => {
                reset({
                  number: 4242424242424242,
                  cvc: 123,
                  postal_billing_zip_code: 90210,
                });
              }}
            />
            <label htmlFor="test_gateway">Test Gateway</label>
            <input
              name="gateway"
              type="radio"
              value="stripe"
              ref={register({ required: 'Please select Payment Type' })}
              onChange={(e) => {
                reset({
                  number: '',
                  cvc: '',
                  postal_billing_zip_code: '',
                });
              }}
            />
            <label htmlFor="stripe">Credit Card</label>
          </Form.Group>
          {errors.gateway && (
            <Label className="payment-type-error" basic pointing>
              {errors.gateway.message}
            </Label>
          )}
          <Form.Group>
            <Controller
              name="number"
              type="number"
              label="Credit Card Number"
              placeholder="0000111100001111"
              as={Form.Input}
              control={control}
              rules={{ required: 'Please enter Card Number' }}
              error={errors.number && errors.number.message}
            />
            <Controller
              name="postal_billing_zip_code"
              max="99999"
              label="Billing Zip"
              placeholder="Enter Billing Zip Code"
              as={Form.Input}
              control={control}
              rules={{ required: 'Please enter Billing zip' }}
              error={
                errors.postal_billing_zip_code &&
                errors.postal_billing_zip_code.message
              }
            />
          </Form.Group>
          <Form.Group>
            <Controller
              width={3}
              name="expiry_month"
              fluid
              options={monthOptions}
              label="Month"
              as={Form.Select}
              control={control}
              rules={{ required: 'Must Select Expiration Month' }}
              error={errors.expiry_month && errors.expiry_month.message}
              onChange={(e) => e[1].value}
            />
            <Controller
              width={3}
              name="expiry_year"
              fluid
              options={yearOptions}
              label="Year"
              as={Form.Select}
              control={control}
              rules={{ required: 'Must Select Expiration Year' }}
              error={errors.expiry_year && errors.expiry_year.message}
              onChange={(e) => e[1].value}
            />
            <Controller
              width={3}
              name="cvc"
              label="CVC"
              placeholder="123"
              as={Form.Input}
              control={control}
              rules={{ required: 'Please enter CVC' }}
              error={errors.cvc && errors.cvc.message}
            />
          </Form.Group>
          <h1>Billing Address</h1>
          <Form.Checkbox
            label="Billing Address Same as Shipping ..."
            onChange={handleCheckBox}
          />
          {!sameBilling && (
            <>
              <Form.Group widths="equal">
                <Controller
                  width={10}
                  name="billing_name"
                  label="Billing Name"
                  placeholder="John Smith"
                  as={Form.Input}
                  control={control}
                  rules={{ required: 'Please enter Billing Name' }}
                  error={errors.billing_name && errors.billing_name.message}
                />
                <Controller
                  width={6}
                  name="billing_country"
                  label="Select Country"
                  options={countries}
                  as={Form.Select}
                  control={control}
                  rules={{ required: 'Please select country' }}
                  error={
                    errors.billing_country && errors.billing_country.message
                  }
                  onChange={(e) => {
                    setBillingShipCountry(e[1].value);
                    reset({
                      billing_county_state: '',
                    });
                    return e[1].value;
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Controller
                  width={4}
                  name="billing_street"
                  label="Address"
                  placeholder="122 Example St"
                  as={Form.Input}
                  control={control}
                  rules={{ required: 'Please enter Street Address' }}
                  error={errors.billing_street && errors.billing_street.message}
                />
                <Controller
                  width={3}
                  name="billing_town_city"
                  label="City"
                  placeholder="Las Vegas"
                  as={Form.Input}
                  control={control}
                  rules={{ required: 'Please enter City/Town' }}
                  error={
                    errors.billing_town_city && errors.billing_town_city.message
                  }
                />
                <Controller
                  width={6}
                  label="County/State/Province/Territory"
                  placeholder="Search State"
                  name="billing_county_state"
                  search
                  selection
                  fluid
                  options={getCountryInfoBilling()}
                  as={Form.Select}
                  control={control}
                  rules={{ required: 'Must Select Country First' }}
                  error={
                    errors.billing_county_state &&
                    errors.billing_county_state.message
                  }
                  onChange={(e) => e[1].value}
                />
                <Controller
                  width={3}
                  name="billing_postal_zip_code"
                  label="Zip"
                  placeholder="00000"
                  as={Form.Input}
                  control={control}
                  rules={{ required: 'Please enter Billing Zipcode' }}
                  error={
                    errors.billing_postal_zip_code &&
                    errors.billing_postal_zip_code.message
                  }
                />
              </Form.Group>
            </>
          )}
          <Form.Button color="green" size="huge">
            Complete Checkout and Pay
          </Form.Button>
        </Form>
      </div>
    );
  };

  return renderCheckoutForm();
};

export default CheckoutForm;
