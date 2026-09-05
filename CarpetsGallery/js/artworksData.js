// Carpets Gallery content, one block per language.
//
// Append an object to EVERY language's array, keeping the same order everywhere -
// cards are matched across languages by position:
//
//   {
//     image: "images/item1.jpg",
//     badge: "अभिग्रहण संख्या: XYZ-123",
//     title: "1. वस्तु का नाम",
//     desc: "पूरा विवरण. Do paragraph ke liye beech me \n\n lagayein.",
//     audioSrc: "audio/Hindi/item1.wav"      // "" if that language has no clip yet
//   }
window.galleryItems = {
  hindi: [],
  english: [],
  telugu: [],
  urdu: [],
  bengali: [],
  gujarati: [],
  kannada: [],
  odia: [],
  marathi: [],
  malayalam: []
};
