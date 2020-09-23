import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { Form, Alert } from 'react-bootstrap';
import LocateMe from './LocateMe';
import { placeInitialization } from '../../../utils/axios/location';
import { setCookieLocationInfo } from '../../../utils/jscookies';
import { useHistory } from 'react-router-dom';

const SearchForm = () => {
  const [locationInfo, setlocationInfo] = useState();
  const [alert, setalert] = useState();
  let history = useHistory();
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
      history.push('/listing');
      setCookieLocationInfo(locationInfo);
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
      <Form className='form-noborder'>
        <div className='form-row'>
          <Form.Group className='col-lg-10 col-md-10 col-sm-12 p-0'>
            <Form.Control
              type='text'
              id='locationAddress'
              placeholder='Search...'
              size='lg'
              value={locationInfo? locationInfo.address : ""}
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

export default SearchForm;
