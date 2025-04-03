// src/services/dummyAPI.js

export const getProfiles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Elon Musk",
          image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
          description: "Elon Musk is a business magnate and investor. He is the founder, CEO, and chief engineer of SpaceX, CEO and product architect of Tesla, Inc., and owner of X (formerly Twitter).",
          location: { lat: 37.7749, lng: -122.4194 },
        },
        {
          id: 2,
          name: "Mark Zuckerberg",
          image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTnXOOZx8tElZ8KHzzfc6QiGOLbtpAhzndCRjT2g6ddLkoMaj2oF1CUofULkbBeWF3vRd_zNns0yX9H3PUMtwHbSQ",
          description: "Mark Zuckerberg is an American businessman who co-founded Facebook and its parent company Meta Platforms. He is the chairman, CEO, and controlling shareholder of Meta.",
          location: { lat: 40.95, lng: 73.82 },
        },
        {
          id: 3,
          name: "Jeff Bezos",
          image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwywjgWbknIneKcdTmTOGmGBhBRaUIm7dFkbki5okGO74TZ9N_lxcIyyxH3Uh2paohkktVLwt_Vckkcdd4hu_GeQ",
          description: "Jeff Bezos is an American entrepreneur, media proprietor, and investor. He is the founder and former CEO of Amazon, one of the world's largest companies.",
          location: { lat: 47.6062, lng: -122.3321 },
        },
        {
          id: 4,
          name: "Bernard Arnault",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bernard_Arnault_%283%29_-_2017_%28cropped%29.jpg/640px-Bernard_Arnault_%283%29_-_2017_%28cropped%29.jpg",
          description: "Bernard Arnault is a French business magnate, investor, and art collector. He is the chairman and CEO of LVMH, the world's largest luxury-goods company.",
          location: { lat: 48.8566, lng: 2.3522 },
        }
      ]);
    }, 1000);
  });
};
