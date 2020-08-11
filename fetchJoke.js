const axios = require('axios');

let result;
const fetchJoke = async (Category) => {
  try {
    return await axios.get(`https://sv443.net/jokeapi/v2/joke/${Category}`)
  }
  catch (err) {
    console.log(err)
  }
};
  
exports.storeJoke = async (Category) => {
  const myData = await fetchJoke(Category);
  const { joke,setup,id,category,error } = myData.data;
  if (!error) {
    const Joke = joke != null ? joke:setup;
    result = {"category" : category , "joke" : Joke , "id" : id};
    return result;
  }
};