import fs from "fs";

import { VehicleRepository, Vehicle } from "@/vehicles";

const VehicleRepo = new VehicleRepository();

// If fetching data from API/DB instead of local file, would need to mock the responses here instead of fetching data & mock it for the instance of VehicleRepository using jest mock.

const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
const vehicles = JSON.parse(file) as Vehicle[];

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

  expect(Array.isArray(vehicleList));

  expect(vehicleList.length).toEqual(
    vehicles.filter(({ model }) => model.toLowerCase() === "1 SERIES".toLowerCase()).length
  );
});

test("Get by trim returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getByTrim("M140i 5dr [Nav] Step Auto", {});

  expect(Array.isArray(vehicleList));

  expect(vehicleList.length).toEqual(
    vehicles.filter(({ trim }) => trim.toLowerCase() === "M140i 5dr [Nav] Step Auto".toLowerCase())
      .length
  );
});

test("Get list of vehicle models from make returns correct list", () => {
  const vehicleList = VehicleRepo.getListOfModelsFromMake("BMW");
  expect(Array.isArray(vehicleList));

  const listOfModels = vehicles.filter(({ make }) => make.toLowerCase() === "BMW".toLowerCase());

  const removeVehicleIfFoundInFilteredList = listOfModels.filter(({ model }) => {
    if (vehicleList.indexOf(model) > -1) {
      return false;
    }

    return true;
  });

  expect(removeVehicleIfFoundInFilteredList.length).toBe(0);
});

test("Get list of vehicle trims from model returns correct list", () => {
  const vehicleList = VehicleRepo.getListOfTrimsFromModel("1 SERIES");
  expect(Array.isArray(vehicleList));

  const listOfTrims = vehicles.filter(
    ({ model }) => model.toLowerCase() === "1 SERIES".toLowerCase()
  );

  const removeVehicleIfFoundInFilteredList = listOfTrims.filter(({ trim }) => {
    if (vehicleList.indexOf(trim) > -1) {
      return false;
    }

    return true;
  });

  expect(removeVehicleIfFoundInFilteredList.length).toBe(0);
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

  const filteredDataSet = vehicles.filter(({ engine_size }) => engine_size >= 1995);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by engine size smaller than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    engineSizeLower: 1995,
  });

  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ engine_size }) => engine_size <= 1995);
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

  const filteredDataSet = vehicles.filter(({ price }) => price >= 15499);
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by price lower than returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    priceLower: 15499,
  });

  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ price }) => price <= 15499);
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

  const filteredDataSet = vehicles.filter(({ date_first_reg }) => {
    const year = date_first_reg.split("/")[2];
    return new Date(year).getFullYear() >= 2018;
  });
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by year lower returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    yearLower: 2018,
  });

  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(({ date_first_reg }) => {
    const year = date_first_reg.split("/")[2];
    return new Date(year).getFullYear() <= 2018;
  });
  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by colour returns valid vehicle list and filters correctly", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    colour: ["red", "black"],
  });

  expect(Array.isArray(vehicleList));

  const filteredDataSet = vehicles.filter(
    ({ colour }) => colour.toLowerCase().includes("red") || colour.toLowerCase().includes("black")
  );

  expect(vehicleList.length).toEqual(filteredDataSet.length);
});

test("Filter by colour throws if incorrect value passed", () => {
  expect(() =>
    VehicleRepo.getAllFiltered({
      colour: "red",
    })
  ).toThrow(TypeError);
});
