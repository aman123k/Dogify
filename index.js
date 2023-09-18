// select all the tegs
const DogList = document.getElementById("DogList");
const Cross = document.getElementById("cross");
const HeroContainer = document.querySelector(".hero_container");
const DogDetails = document.querySelector(".dog_details");
let DogListname;

const DogImage = document.getElementById("DogImage");
const DogName = document.getElementById("DogName");
const DogLife = document.getElementById("DogLife");
const DogHeight = document.getElementById("DogHeight");
const DogWeight = document.getElementById("DogWeight");
const DogOrigin = document.getElementById("DogOrigin");
const DogBredFor = document.getElementById("DogBredFor");
const DogBreedGroup = document.getElementById("DogBreedGroup");
const DogTemperament = document.getElementById("DogTemperament");

// function for getting information from data baise
async function getDetails() {
  try {
    const api = (await fetch("https://api.TheDogAPI.com/v1/breeds")).json();
    // const id = await api.json();
    DogListname = await api;
    DogListname.forEach((e) => {
      const newElement = document.createElement("option");
      newElement.value = e.name;
      newElement.textContent = e.name;
      DogList.append(newElement);
    });
  } catch {
    console.log("can't fetch data");
    alert("can't fetch data");
  }
}
getDetails();
// for data rendering
function setdetails(
  image,
  name,
  life,
  height,
  weight,
  origin,
  bredfor,
  breedgroup,
  temperament
) {
  DogImage.style.backgroundImage = `url("${image}")`;
  DogName.innerHTML = `<span>${name}</span>`;
  DogLife.innerHTML = `<span> Life Span </span> : ${life}`;
  DogHeight.innerHTML = `<span> Height </span> : ${height} cm`;
  DogWeight.innerHTML = `<span> Weight </span> : ${weight} kg`;
  DogOrigin.innerHTML = `<span> Origin </span> : ${origin} `;
  DogBredFor.innerHTML = `<span> Bred For </span> : ${bredfor} `;
  DogBreedGroup.innerHTML = `<span> Breed Group </span> : ${breedgroup}`;
  DogTemperament.innerHTML = `<span> Temperament </span> : ${temperament}`;
}

// addEventListener
DogList.addEventListener("change", async () => {
  const dogName = DogList.value;
  const dog = DogListname.find((e) => e.name === dogName);
  setdetails(
    `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
    dog.name,
    dog.life_span,
    dog.height.metric,
    dog.weight.metric,
    dog.origin,
    dog.bred_for,
    dog.breed_group,
    dog.temperament
  );
  HeroContainer.style.display = "flex";
  setTimeout(() => (DogDetails.style.transform = "translateY(0%)"), 400);
});
Cross.addEventListener("click", () => {
  DogDetails.style.transform = "translateY(100%)";
  setTimeout(() => (HeroContainer.style.display = "none"), 700);
});
