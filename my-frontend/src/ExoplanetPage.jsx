import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Make sure this is imported
import EmblaCarousel from "./EmblaCarousel";
import ExoplanetScene from "./ExoplanetScene";

const readJsonFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        if (event.target && typeof event.target.result === "string") {
          const parsed = JSON.parse(event.target.result);
          resolve(parsed);
        } else {
          reject(new Error("FileReader result is not a string or target is null."));
        }
      } catch (error) {
        reject(new Error("Failed to parse JSON: " + error.message));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};

function ExoplanetPage() {
  useEffect(() => {
    document.body.classList.add("member-blue");
    return () => document.body.classList.remove("member-blue");
  }, []);
  const OPTIONS = { dragFree: true, loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const IMAGES = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  ];

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      try {
        const parsedData = await readJsonFile(file);
        setFileContent(parsedData);
        setFileName(file.name);
      } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        setFileContent(null);
        setFileName("");
      }
    } else {
      alert("Please upload a valid JSON file.");
      setFileContent(null);
      setFileName("");
    }
  };

  useEffect(() => {
    console.log(">>> fileContent:", fileContent);
  }, [fileContent]);

  return (
    <div className="flex flex-col gap-10">
      <h1>What are exoplanets?</h1>
      <EmblaCarousel slides={IMAGES} options={OPTIONS} />

      <p>
        Exoplanets are planets that orbit stars outside our solar system. Planets are
        rocky, icy, or gaseous bodies that do not radiate light and orbit a star. They
        also clear their orbital path and have enough gravity to stay spherical from
        hydrostatic equilibrium. We often find exoplanets by observing periodic dimming
        of stars — when a planet passes in front of its star, it blocks light. Another
        detection method is radial velocity: observing how a star's motion shifts red or
        blue due to the Doppler effect caused by an orbiting planet.
      </p>

      {/* Upload Box */}
      <div className="mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Upload Exoplanet Data</h2>
        <p className="text-gray-700">
          Upload a <span className="font-medium">.json</span> file to view exoplanets of
          your choice.
        </p>
        <p className="text-gray-600">
          Ensure it's a list of dictionaries in the following order and format:
        </p>
        <pre className="bg-gray-100 text-sm text-gray-800 p-3 rounded-md overflow-x-auto">
          {"{ planetName: 'Exoplanet A', distanceR: 5, theta: 0, phi: 90, color: 'red', planetRadiusSize: 0.5 }"}
        </pre>
        <label className="inline-block border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 w-fit">
          {fileName || "Choose File"}
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        {fileName && (
          <p className="text-sm text-green-700">
            Selected File: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </div>

      {/* Exoplanet Simulation */}
      <ExoplanetScene fileContent={fileContent} />

      {/* ✅ Go Back button at the bottom */}
      <div className="flex justify-center mt-8 mb-4">
        <Link
          to="/"
          className="member-page"
          style={{ textDecoration: "none", padding: "10px 20px" }}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default ExoplanetPage;
