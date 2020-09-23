import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { Form, Alert } from 'react-bootstrap';
import LocateMe from './LocateMe';
import { setCookieLocationInfo, getCookieLocationInfo } from '../../utils/jscookies';
import { placeInitialization } from '../../utils/axios/location';
import { instance } from '../../utils/axios/instance';

const FabSearch = ({setRes, id}) => {
  const [locationInfo, setlocationInfo] = useState();
  const [alert, setalert] = useState();
  let autoComplete = useRef();

  const handleSearchKeyPress = (e) => {
    setalert(null);
    setlocationInfo({
      ...locationInfo,
      address: e.target.value
    });
  };

  const handleSearch = () => {
    if (locationInfo) {
      setCookieLocationInfo(locationInfo);
      let location = getCookieLocationInfo();
      if (location) {
        instance.post('get-filtered-restaurants', {
          category_ids: [id],
          latitude: location.latitude,
          longitude: location.longitude
        }).then(data => {
          setRes(data.data);
        }).then(err => {
          console.log(err);
        });
      }
    } else {
      setalert({
        text:
          'Select an address or locate your address to find restaurant near by.',
        variant: 'warning',
      });
    }
  };

  const getPlacesList = useCallback(() => {
    let options = {
      componentRestrictions: { country: 'NP' },
    };
    let input = document.getElementById('locationAddress');
    autoComplete.current = new window.google.maps.places.Autocomplete(
      input,
      options,
    );
    autoComplete.current.addListener('place_changed', () => setLocation());
  }, [autoComplete]);

  const setLocation = () => {
    let place = autoComplete.current.getPlace();
    if (place) {
			setlocationInfo({
				latitude: place.geometry.location.lat(),
				longitude: place.geometry.location.lng(),
				address: `${place.name}, ${place.formatted_address}`,
			});
		}
  };

  useEffect(() => {
    placeInitialization.then(() => {
      getPlacesList();
    });
  }, [getPlacesList]);

  return (
    <div className='homepage-search-form'>
      <div className="text-center">
        <h1>Set your location</h1>
        <h3>You need to set your location first.</h3>
        <p>Location must be set first to get restaurants list and to order. You can locate your location automatically or search by typing.</p>
      </div>
      <Form className='form-noborder'>
        <div className='form-row'>
          <Form.Group className='col-lg-10 col-md-10 col-sm-12 p-0'>
            <Form.Control
              type='text'
              id='locationAddress'
              placeholder='Search...'
              size='lg'
              value={locationInfo ? locationInfo.address : ""}
              onChange={(e) => handleSearchKeyPress(e)}
            />
            <LocateMe setLocationInfo={setlocationInfo} address={locationInfo} setalert={setalert} />
            {alert && <Alert variant={alert.variant}>{alert.text}</Alert>}
          </Form.Group>
          <Form.Group className='col-lg-2 col-md-2 col-sm-12'>
            <button
              type='button'
              className='btn btn-primary btn-block btn-lg btn-gradient'
              onClick={handleSearch}
            >
              Search
            </button>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};

export default FabSearch;
