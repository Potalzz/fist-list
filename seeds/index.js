const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://127.0.0.1:27017/campground")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO ERROR!!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      // YOUR USER ID
      author: "65d348af35c3c76239972fba",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit doloremque tenetur tempora quia nostrum voluptates deserunt possimus omnis fuga est odio veniam earum, quibusdam aliquam, nisi molestiae distinctio. Et, porro!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dfcam7npj/image/upload/v1708499189/YelpCamp/ia56voflnbt3aipghltu.jpg",
          filename: "YelpCamp/ia56voflnbt3aipghltu",
        },
        {
          url: "https://res.cloudinary.com/dfcam7npj/image/upload/v1708499191/YelpCamp/v4bojbaml1ye5at9z96a.jpg",
          filename: "YelpCamp/v4bojbaml1ye5at9z96a",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
