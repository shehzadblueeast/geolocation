import UseGetLocation from "./hooks/getCurrentLocation";

export default function GeoLocation() {
  //get location
  const { location, error } = UseGetLocation();

  const onShareLocation = () => {
    fetch(`http://localhost:3000/`, { method: "post", body: location })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "result");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <div>
      <h2>GeoLocation</h2>
      {error ? (
        error
      ) : (
        <>
          <p>Your Address: {location}</p>
          location && <button onClick={onShareLocation}>Share location</button>
        </>
      )}
    </div>
  );
}
