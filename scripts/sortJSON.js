const fs = require("fs");

const sourceFilePath = "../public/data.json";
const destinationFilePath = "../public/data.json";

const sortObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj)
      .sort()
      .reduce((sortedObj, key) => {
        sortedObj[key] = sortObject(obj[key]);
        return sortedObj;
      }, {});
  }

  return obj;
};

fs.readFile(sourceFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  const jsonData = JSON.parse(data);

  const sortedJsonData = sortObject(jsonData);

  // Write the sorted JSON data to a new file
  fs.writeFile(
    destinationFilePath,
    JSON.stringify(sortedJsonData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing sorted JSON file:", err);
      } else {
        console.log("Sorted data has been saved to new file");
      }
    }
  );
});
