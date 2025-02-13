import React, { useEffect, useState } from "react";
import "./index.css";
import bg from "./assets/30fps.mp4";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPhotos = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => {
        setPhotos(res.slice(0, 30));
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="relative h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full brightness-50 object-cover"
        autoPlay
        loop
        muted
      >
        <source src={bg} type="video/mp4" />
      </video>
      <div className="relative flex items-center justify-center h-full">
        <div className="container p-5 mx-auto h-full overflow-y-scroll no-scrollbar">
          <h1 className="text-4xl text-white text-center font-bold shadow-2xl pb-5">
            GET ZAPROS
          </h1>
          <table className="w-full border border-white rounded-2xl">
            <thead className="border border-white rounded-2xl">
              <tr className="text-white">
                <th className="w-10 border border-white">No</th>
                <th className="border border-white">Images</th>
                <th className="border border-white">Name</th>
                <th className="border border-white">Action</th>
              </tr>
            </thead>
            <tbody className="border rounded-2xl border-white text-white">
              {loading ? (
                <>looding...</>
              ) : (
                <>
                  {photos?.map((photo, index) => (
                    <tr>
                      <td className="border border-white text-center">
                        {index + 1}
                      </td>
                      <td className="border border-white px-2 flex justify-center">
                        <img
                          src="https://i.pinimg.com/736x/ec/b9/92/ecb992e935c324dfc4e9ca75497de8a9.jpg"
                          alt=""
                          className="w-80 h-40 object-cover"
                        />
                      </td>
                      <td className="border border-white px-2">
                        {photo?.title.toUpperCase()}
                      </td>
                      <td className="w-20 border text-center border-white px-2">
                        <button className="border  cursor-pointer bg-[#85000064] hover:bg-[#850000bc] rounded-sm border-[#85000064] px-3">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
