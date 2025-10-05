import { useEffect, useState } from "react";
import EmblaCarousel from "./EmblaCarousel";
import ExoplanetScene from "./ExoplanetScene";

const readJsonFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        if (event.target && typeof event.target.result === 'string') {
          const parsed = JSON.parse(event.target.result);
          resolve(parsed);
        } else {
          reject(new Error('FileReader result is not a string or target is null.'));
        }
      } catch (error) {
        reject(new Error('Failed to parse JSON: ' + error.message));
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    fileReader.readAsText(file);
  });
};

function ExoplanetPage() {
  const OPTIONS = { dragFree: true, loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const IMAGES = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  ];

  // useEffect(() => {
  //   console.log(">>> IMAGES:", IMAGES);
  // }, []);

  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      try {
        const parsedData = await readJsonFile(file);
        setFileContent(parsedData);
        setFileName(file.name);

      } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        setFileContent(null); // Clear data on error
        setFileName('');
      }
    } else {
      alert('Please upload a valid JSON file.');
      setFileContent(null);
      setFileName('');
    }
  };

  useEffect(() => {
    console.log(">>> fileContent:", fileContent);
  }, [fileContent]);

  return (
    <div className="flex flex-col gap-10">
      <h1>What are exoplanets?</h1>
      <EmblaCarousel slides={IMAGES} options={OPTIONS} />
      <p>Exoplanets are planets that orbit stars outside our solar system. Planets are rocky icy or gaseous bodies that do not radiate light, and orbit a star.
        They also clear their orbital path, and need to have enough gravity to be in a spherical shape,
        from hydrostatic equilibrium. We often find exoplanets by the periodic dimming of stars.
        This works because when the planet passes in front of the star it blocks the light, so you are able to calculate orbital period from that aswell.
        Another way is radial velocity. We are checking to see if the star's movement seems to be affected by an exoplanet.
        It gives it red shift or blue shift depending on the direction of the star's movement relative to us, from the Doppler effect.
      </p>
      <div className="mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Upload Exoplanet Data</h2>
        <p className="text-gray-700">
          Upload a <span className="font-medium">.json</span> file to view exoplanets of your choice.
        </p>
        <p className="text-gray-600">
          Ensure it's a list of dictionaries in the following order and format:
        </p>
        <pre className="bg-gray-100 text-sm text-gray-800 p-3 rounded-md overflow-x-auto">
          {"{ planetName: 'Exoplanet A', distanceR: 5, theta: 0, phi: 90, color: 'red', planetRadiusSize: 0.5 }"}
        </pre>
        <label className="inline-block border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 w-fit">
          {fileName || "Choose File"}
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {fileName && (
          <p className="text-sm text-green-700">
            Selected File: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </div>
      <ExoplanetScene fileContent={fileContent} />
    </div>
  )
};

export default ExoplanetPage;