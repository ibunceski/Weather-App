import React, {useState, useEffect} from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEODB_API_OPTIONS, GEODB_API_URL } from '../../api.js';

const FavoritesSearch = (props) => {
    const [search, setSearch] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(props.favoritesNumber >= 3);
    }, [props.favoritesNumber])

    const loadOptions = (inputValue) => {
        if(inputValue.length < 1) return Promise.resolve({options: []});
        else{
        return fetch(
            `${GEODB_API_URL}?namePrefix=${inputValue}`, GEODB_API_OPTIONS
        )
        .then((res) => res.json())
        .then((data) =>{
            return {
                options : data.data.map((city) => ({
                    label: `${city.city}, ${city.country}`,
                    value: city.city,
                    country: city.country,
                    latitude: city.latitude,
                    longitude: city.longitude,
                })),
            }
        })
        .catch((err) => console.log(err));
        }
    }
  
    const handleOnChange = (searchData) => {
      setSearch(searchData);
      props.getData(searchData);
      setSearch("");
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            marginTop: '10px',
            marginLeft: '0.4rem',
            width: '95%',
            height: '2rem',
            backgroundColor: isDisabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
            border: 'none',
            borderRadius: '10px',
            textAlign: 'left',
            fontSize: '16px',
            color: 'white',
            cursor: 'pointer',
            
            '@media (max-width: 600px)': {
                width: "175px",
                fontSize: "12px",
                height: "3px",
              }
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            color: 'white',
            fontSize: '17px',
            '@media (max-width: 600px)': {
                fontSize: "12px",
            }
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
            color: 'black',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        noOptionsMessage: (provided, state) => ({
            ...provided,
            color: 'black',
        }),
    };

    return (
    <div>
      <AsyncPaginate
        styles={customStyles}
        className="search"
        placeholder= {isDisabled ? "You can add up to 3 cities" : "Add a new location"}
        debounceTimeout={1000}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isDisabled={isDisabled}
      />
    </div>
    );
  };
  
  export default FavoritesSearch;