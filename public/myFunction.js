// Replace module.exports with a Function name for testing the function
module.exports = (inputList) => {
  const myList = [];

  for(let i=0;i<inputList.length;i++) {
    const data = inputList[i].split(" ");
    const f_name = data[0], l_name = data[1], m_marks = parseFloat(data[2]), e_marks = parseFloat(data[3]);

    myList.push({
      "Name":`${f_name} ${l_name}`,
      "Score":{
        "Maths": m_marks,
        "English": e_marks
      }
    });
  };
  
  myList.sort((a,b) => (a.Score.Maths + a.Score.English) < (b.Score.Maths + b.Score.English) ? 1 : -1);
  // console.log(myList);
  return myList
};

// const a = ["Rashmil Panchani 99 97", "Parag Vaid 95 93", "Siddharth Sanghavi 98 100"]; 
// myFunction(a);