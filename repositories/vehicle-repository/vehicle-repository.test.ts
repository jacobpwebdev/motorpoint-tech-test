import fs from "fs";

import { VehicleRepository, Vehicle } from "@/vehicles";

const VehicleRepo = new VehicleRepository();

// If fetching data instead of local file, would need to mock the responses here instead of importing the file & mock it for the instance of VehicleRepository.

const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
const vehicles = JSON.parse(file) as Vehicle[];

console.log(vehicles.length);

test("Get all returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getAll();
  expect(Array.isArray(vehicleList));
  expect(vehicleList.length).toEqual(vehicles.length);
});

test("Get by make returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getByMake("BMW", {});
  expect(Array.isArray(vehicleList));
  expect(vehicleList.length).toEqual(
    vehicles.filter(({ make }) => make.toLowerCase() === "bmw").length
  );
});

test("Get by model returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getByModel("1 SERIES", {});
  expect(vehicleList.length).toEqual(
    vehicles.filter(({ model }) => model.toLowerCase() === "1 SERIES".toLowerCase()).length
  );
  expect(Array.isArray(vehicleList));
});

test("Get by trim returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getByTrim("M140i 5dr [Nav] Step Auto", {});
  expect(vehicleList.length).toEqual(
    vehicles.filter(({ trim }) => trim.toLowerCase() === "M140i 5dr [Nav] Step Auto".toLowerCase())
      .length
  );
  expect(Array.isArray(vehicleList));
});

test("Filter by co2 greater than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    co2Greater: 114,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ co2_level }) => co2_level > 114);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by co2 less than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    co2Lower: 114,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ co2_level }) => co2_level < 114);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by engine size greater than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    engineSizeGreater: 1995,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ engine_size }) => engine_size > 1995);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by engine size smaller than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    engineSizeLower: 1995,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ engine_size }) => engine_size < 1995);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by fuel type returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    fuel: "unleaded",
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(
    ({ fuel_type }) => fuel_type.toLowerCase() === "unleaded"
  );
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by mileage greater than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    mileageGreater: 20114,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ mileage }) => mileage > 20114);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by mileage lower than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    mileageLower: 20114,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ mileage }) => mileage < 20114);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by price greater than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    priceGreater: 15499,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ price }) => price > 15499);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by price lower than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    priceLower: 15499,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ price }) => price < 15499);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by transmission returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    transmission: "automatic",
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(
    ({ transmission }) => transmission.toLowerCase() === "automatic"
  );
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by year greater returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    yearGreater: 2018,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(
    ({ date_first_reg }) => new Date(date_first_reg).getFullYear() > 2018
  );
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by year lower returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    yearLower: 2018,
  });
  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(
    ({ date_first_reg }) => new Date(date_first_reg).getFullYear() < 2018
  );
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});
