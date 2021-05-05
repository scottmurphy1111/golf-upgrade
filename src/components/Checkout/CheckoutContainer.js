import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import useIsMountedRef from '../../utils/useIsMountedRef';

import CheckoutForm from './CheckoutForm';
import CheckoutItems from './CheckoutItems';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react';

const CheckoutContainer = (props) => {
  console.log('testtt');
  const [liveObject, setLiveObject] = useState({});
  const [tokenId, setTokenId] = useState(null);
  const [shippingOptions, setShippingOptions] = useState(null);
  const [shipOption, setShipOption] = useState(null);
  const [discountCode, setDiscountCode] = useState(null);
  const [noDiscountCode, setNoDiscountCode] = useState(null);
  const [invalidDiscountCode, setInvalidDiscountCode] = useState(null);

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    console.log('gen token kicked off');

    console.log('props', props);
    let cartId = props.match.params.id;

    commerce.checkout
      .generateToken(cartId, {
        type: 'cart',
      })
      .then((res) => {
        console.log('res', res);
        if (isMountedRef.current) {
          setLiveObject(res.live);
          setTokenId(res.id);
        }
      })
      .catch((error) => {
        console.error('There was an error in generating a token', error);
      });

    props.setCheckout(true);
  }, [props, isMountedRef]);

  const getShippingOptions = async (countrySymbol, region = null) => {
    console.log('get shipping options fired', countrySymbol, region);
    if (countrySymbol) {
      try {
        if (countrySymbol === 'US') {
          region = 'AL';
        } else {
          region = 'AB';
        }
        const res = await commerce.checkout.getShippingOptions(tokenId, {
          country: countrySymbol,
          region: region,
        });

        let shippingOptionsArray = await res.map((option, i) => {
          let shipInfo = {};

          console.log('option', option);

          shipInfo.key = option.id;
          shipInfo.text = `${option.description}(${option.price.formatted_with_code})`;
          shipInfo.value = option.id;

          console.log('shipInfo', shipInfo);
          return shipInfo;
        });
        console.log('ship array', shippingOptionsArray);
        setShippingOptions(shippingOptionsArray);
      } catch (error) {
        console.log('There was an error fetching the shipping methods', error);
      }
    }
  };

  // const handleReturnCart = (e) => {
  //   props.setModalOpen(true);
  // };

  const handleDropDownShipping = async (e, { value, options }) => {
    console.log('dd shipping e value options', e, value, options);
    try {
      const res = await commerce.checkout.checkShippingOption(tokenId, {
        id: value,
        country: options[0].key,
      });
      setShipOption(value);
      setLiveObject(res.live);
    } catch (error) {
      console.log('There was an issue with dropdownshipping method', error);
    }
  };

  const handleDiscountCode = (e, { value }) => {
    setDiscountCode(value);
  };

  const handleDiscountClick = async (e) => {
    e.preventDefault();

    try {
      if (!discountCode) {
        setNoDiscountCode(true);
        setInvalidDiscountCode(false);
      } else {
        const res = await commerce.checkout.checkDiscountCode(tokenId, {
          code: discountCode,
        });

        if (!res.valid) {
          setInvalidDiscountCode(true);
        } else {
          setInvalidDiscountCode(false);
          setLiveObject(res.live);
          //todo check this response
          setDiscountCode(null);
        }

        setNoDiscountCode(false);
      }
    } catch (error) {
      console.log('There was an error checking the discount code', error);
    }
  };

  return (
    <Grid columns={2} centered padded>
      <Grid.Row className="checkout-row">
        <Grid.Column width={8}>
          {liveObject && tokenId && (
            <CheckoutForm
              liveObject={liveObject}
              tokenId={tokenId}
              shipOption={shipOption}
              getShippingOptions={getShippingOptions}
              setShipOption={setShipOption}
              setReceipt={props.setReceipt}
            />
          )}
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment padded>
            <Header textAlign="center" size="huge">
              Current Cart
            </Header>
            <Header textAlign="center">
              <Link to="/">Return to Cart</Link>
            </Header>
            {console.log('live object', liveObject)}
            {liveObject.line_items &&
              liveObject.line_items.map((item) => (
                <Container className="item-data-container" key={item.id}>
                  <CheckoutItems item={item} />
                </Container>
              ))}
            <Divider horizontal>Shipping Options</Divider>

            {shippingOptions && (
              <Dropdown
                placeholder="Select Shipping Method"
                fluid
                selection
                onChange={handleDropDownShipping}
                options={shippingOptions}
              />
            )}

            {!shipOption && <p>Select Country for Shipping Options</p>}
            <Divider horizontal>Discount Code</Divider>

            <form className="discount-code" onSubmit={handleDiscountClick}>
              <Input onChange={handleDiscountCode} />
              <Button color="black">Apply</Button>
            </form>
            {noDiscountCode && <p>No Discount Code Entered</p>}
            {invalidDiscountCode && <p>Invalid Code!</p>}
            <Divider horizontal>Cart Totals</Divider>

            {liveObject && (
              <>
                {shipOption && (
                  <Header color="olive" textAlign="center">
                    (Shipping) + {liveObject.shipping.price.formatted}
                  </Header>
                )}

                {typeof liveObject.discount != 'undefined' &&
                  liveObject.discount != null &&
                  liveObject.discount.length > 0 && (
                    <Header color="olive" textAlign="center">
                      (LUCKY) - {liveObject.discount.amount_saved.formatted}
                    </Header>
                  )}
                {liveObject.total && (
                  <Header textAlign="center" size="large">
                    {liveObject.total.formatted_with_symbol}
                  </Header>
                )}
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CheckoutContainer;
