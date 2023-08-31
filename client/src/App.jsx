import { useState } from 'react';
import axios from 'axios';

import Snackbar from './components/Snackbar';

import { useSnackbar } from './hooks/useSnackbar';
import { buildAutocompleteUrl } from './utils/helpers';

import './App.css';

function App() {
  const [autocompleteData, setAutocompleteData] = useState({});
  const [inputValues, setInputValues] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const snackbar = useSnackbar();

  const getAutocompleteData = async (inputValues) => {
    const url = buildAutocompleteUrl(inputValues);

    try {
      const { data } = await axios.get(url);

      const initialData = {
        street: [],
        city: [],
        state: [],
        postalCode: [],
        country: [],
      };

      const organizedData = data.addresses.reduce((acc, address) => {
        acc.street.push(address.street);
        if (!acc.city.includes(address.city)) acc.city.push(address.city);
        if (!acc.state.includes(address.state)) acc.state.push(address.state);
        if (!acc.postalCode.includes(address.postalCode))
          acc.postalCode.push(address.postalCode);
        if (!acc.country.includes(address.country))
          acc.country.push(address.country);
        return acc;
      }, initialData);

      if (data.addresses?.length) {
        setAutocompleteData(organizedData);
      }
    } catch (err) {
      snackbar.open(err.message, false)
      console.error(err.message);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setInputValues((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8080/api/address', {
        address: inputValues
      });

      if (data.ok) {
        snackbar.open('Data sent successfully!', true);
      }
    } catch (err) {
      snackbar.open(err.response.data.message, false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <button type="submit">Continue</button>
      </form>
      {snackbar.isOpen && (
        <Snackbar
          message={snackbar.message}
          handleClose={snackbar.close}
          success={snackbar.isSuccess}
        />
      )}
    </div>
  );
}

export default App;
