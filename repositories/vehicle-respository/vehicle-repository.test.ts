import VehicleRepository from "./vehicle-repository";

const VehicleRepo = new VehicleRepository();

test("Get all returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getAll();
  expect(Array.isArray(vehicleList));
});

test("Get by make returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getByMake("BMW", {});
  expect(Array.isArray(vehicleList));
});

test("Get by make returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getByModel("118i", {});
  expect(Array.isArray(vehicleList));
});

test("Filter by co2 greater than returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    co2Greater: 114,
  });
  expect(Array.isArray(vehicleList));
});

test("Filter by co2 less than returns valid vehicle list", () => {
  const vehicleList = VehicleRepo.getAllFiltered({
    co2Lower: 114,
  });
  expect(Array.isArray(vehicleList));
});
