"use server";

export async function getNewImage() {
  try {
    // Step 1: Fetch breed list
    const breedRes = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!breedRes.ok)
      throw new Error(`Failed to fetch breeds: ${breedRes.status}`);
    const breedData = await breedRes.json();

    // Step 2: Get all breeds (flatten main and sub-breeds)
    const breeds = Object.entries(breedData.message).flatMap(([main, subs]) =>
      subs.length ? subs.map((sub) => `${main}/${sub}`) : [main]
    );

    // Step 3: Select a random breed
    const randomBreed =
      breeds[Math.floor(Math.random() * breeds.length)];

    // Step 4: Fetch a random image for the selected breed
    const imageRes = await fetch(
      `https://dog.ceo/api/breed/${randomBreed}/images/random`,
      { cache: "no-store" }
    );
    if (!imageRes.ok)
      throw new Error(`Failed to fetch image: ${imageRes.status}`);
    const imageData = await imageRes.json();

    return { randomBreed, imageUrl: imageData.message };
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to fetch random breed and image");
  }
}
