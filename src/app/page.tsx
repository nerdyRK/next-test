"use client";

import { useState } from "react";
import Image from "next/image";
import { getNewImage } from "./actions/getNewImage";


export default function Home() {
  const [breed, setBreed] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
console.log(67);

  // Handler to fetch a new image
  const handleNewImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const { randomBreed, imageUrl } = await getNewImage();
      setBreed(randomBreed);
      setImage(imageUrl);
    } catch (err: any) {
      console.error(err.message);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Header Section */}
      <header className="text-center p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Random Dog Breed Viewer
        </h1>
        {breed && (
          <p className="text-lg text-gray-700 mb-4">
            Here’s a random dog from the breed{" "}
            <span className="font-semibold">{breed}</span>!
          </p>
        )}
      </header>

      {/* Breed Image Section */}
      <section className="text-center mb-6">
        {loading ? (
          <p className="text-blue-500 text-lg">Loading...</p>
        ) : image ? (
          <Image
            width={640}
            height={640}
            className="w-64 h-64 object-cover rounded-lg shadow-md mb-4"
            src={image}
            alt={`A cute ${breed}`}
          />
        ) : (
          <p className="text-gray-500">Click the button to see a random dog!</p>
        )}
        <button
          onClick={handleNewImage}
          className="text-lg bg-blue-500 text-white p-4 rounded-lg"
        >
          {loading ? "Loading..." : "Click to discover a new breed!"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-500 py-6">
        <p className="text-sm">Built with ❤️ using Next.js and Dog API</p>
      </footer>
    </div>
  );
}
