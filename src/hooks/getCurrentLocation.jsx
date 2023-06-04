import { useEffect, useState } from "react";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const API_kEY = "";
function UseGetLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [Coordinates, setCoordinates] = useState({ lat: "", long: "" });

  useEffect(() => {
    getCurrentLocation();
  }, []);
  //success callback
  function success(pos) {
    var crd = pos.coords;
    //latitude
    const lat = crd.latitude;
    //longitude
    const long = crd.longitude;

    getAddress(lat, long);
    setCoordinates({ lat, long });
  }

  // error callback
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //get addres
  const getAddress = (lat, long) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_kEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "result");

        if (result?.results?.length > 0) {
          setLocation(result?.results[0].formatted_address);
        } else if (result?.error_message) {
          setError(result?.error_message);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  //get current locatoin
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state, "result");
          };
        })
        .catch((err) => {
          console.log(err, "Err");
        });
    } else {
      alert("Device not support geolocation");
    }
  }

  return { location, error, Coordinates };
}

export default UseGetLocation;
