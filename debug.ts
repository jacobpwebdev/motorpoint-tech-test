import fs from "fs";
import { Vehicle } from "./repositories/vehicle-respository/vehicle-repository.types";

const file = fs.readFileSync("./repositories/vehicles.json", "utf8");

const vehicles = JSON.parse(file) as Vehicle[];

const listOfTransmissions: string[] = [];
const listOfFuelType: string[] = [];

vehicles.forEach(({ transmission, fuel_type }) => {
  if (listOfTransmissions.indexOf(transmission) === -1) {
    listOfTransmissions.push(transmission);
  }

  if (listOfFuelType.indexOf(fuel_type) === -1) {
    listOfFuelType.push(fuel_type);
  }
});

console.log(listOfFuelType, listOfTransmissions);
