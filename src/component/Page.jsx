import React, { useEffect, useState } from "react";
import "./page.scss";

const Page = () => {
  const [countries, setCountries] = useState([]); //this state for country names.
  const [stateName, setStateName] = useState([]); // State to store the user-provided country name
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://www.universal-tutorial.com/api/countries/`,

          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmYXRlbWVmYXJhanphZGUwMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiUEJIUTZGRU9QMEJtU1dYTFlneEpLSE8tMVRvYkVoV2dHVl9GLXZOMmZ0azFDLURiNDMwMVpYWW5WcUJJRWxVZHpvayJ9LCJleHAiOjE3MDUxNjYyOTV9.gZ2enAlcB4yQedCt5i681QwkO5c-qkV62SgLzFp-T34", // Replace YOUR_API_KEY with your actual API key
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      console.log(countries);
    };

    fetchCountries();
  }, [countries]);

  // useEffect(() => {
  const fetchState = async () => {
    try {
      const response = await fetch(
        `https://www.universal-tutorial.com/api/states/${selectedCountry}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmYXRlbWVmYXJhanphZGUwMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiUEJIUTZGRU9QMEJtU1dYTFlneEpLSE8tMVRvYkVoV2dHVl9GLXZOMmZ0azFDLURiNDMwMVpYWW5WcUJJRWxVZHpvayJ9LCJleHAiOjE3MDUxNjYyOTV9.gZ2enAlcB4yQedCt5i681QwkO5c-qkV62SgLzFp-T34", // Replace YOUR_API_KEY with your actual API key
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setStateName(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // }, [selectedCountry]);

  const setStateHandler = (e) => {
    setSelectedCountry(e.target.value);
    console.log(e.target.value);
    fetchState();
  };

  return (
    <div className="container">
      <div className="content">
        <form>
          <div className="row">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <div className="row">
            <input type="tel" placeholder="Phone number" />
            <input type="email" placeholder="Email address" />
          </div>
          <div className="row">
            <select
              id="country"
              name="country"
              onChange={setStateHandler}
            >
              <option disabled selected hidden>
                Please select a country...
              </option>
              {countries.map((country, index) => (
                <option
                  key={index}
                  value={country.country_name}
                  onClick={(e) => setStateHandler(e)}
                >
                  {country.country_name}
                </option>
              ))}
            </select>

            <select id="state" name="state">
              <option disabled selected hidden>
                Please select a state...
              </option>
              {stateName.map((state, index) => (
                <option
                  key={index}
                  value={state.state_name}
                >
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>
          <button>Sell Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
