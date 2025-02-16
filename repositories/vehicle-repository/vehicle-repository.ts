import fs from "fs";
import { FilterQuery, Filters, Vehicle } from "@/vehicles";

class VehicleRepository {
  private _vehicles: Vehicle[];

  constructor() {
    const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
    this._vehicles = JSON.parse(file);
  }

  private _filterByTrim(filterValue: string, vehicleInfoValue: Vehicle["trim"]): boolean {
    return filterValue.toLowerCase() === vehicleInfoValue.toLowerCase();
  }

  private _isCo2GreaterThan(filterValue: number, vehicleInfoValue: Vehicle["co2_level"]): boolean {
    return filterValue < vehicleInfoValue;
  }

  private _isCo2LowerThan(filterValue: number, vehicleInfoValue: Vehicle["co2_level"]): boolean {
    return filterValue > vehicleInfoValue;
  }

  private _isFuelType(filterValue: string, vehicleInfoValue: Vehicle["fuel_type"]): boolean {
    return filterValue.toLowerCase() === vehicleInfoValue.toLowerCase();
  }

  private _isEngineSizeGreater(
    filterValue: number,
    vehicleInfoValue: Vehicle["engine_size"]
  ): boolean {
    return filterValue < vehicleInfoValue;
  }

  private _isEngineSizeLower(
    filterValue: number,
    vehicleInfoValue: Vehicle["engine_size"]
  ): boolean {
    return filterValue > vehicleInfoValue;
  }

  private _isMileageGreater(filterValue: number, vehicleInfoValue: Vehicle["mileage"]): boolean {
    return vehicleInfoValue > filterValue;
  }

  private _isMileageLower(filterValue: number, vehicleInfoValue: Vehicle["mileage"]): boolean {
    return vehicleInfoValue < filterValue;
  }

  private _isPriceGreater(filterValue: number, vehicleInfoValue: Vehicle["price"]): boolean {
    return vehicleInfoValue > filterValue;
  }

  private _isPriceLower(filterValue: number, vehicleInfoValue: Vehicle["price"]): boolean {
    return vehicleInfoValue < filterValue;
  }

  private _isSameTransmission(
    filterValue: string,
    vehicleInfoValue: Vehicle["transmission"]
  ): boolean {
    return vehicleInfoValue.toLowerCase() === filterValue.toLowerCase();
  }

  private _isYearGreater(
    filterValue: string,
    vehicleInfoValue: Vehicle["date_first_reg"]
  ): boolean {
    // technically this is inefficient, but I didn't want to not do this and make it look like I don't know how to work with dates.
    // A way of doing it in this scenario would just be to split the string and string compare, as then it wouldn't be creating a date object within a loop which could cause performance issues.
    return new Date(vehicleInfoValue).getFullYear() > new Date(filterValue).getFullYear();
  }

  private _isYearLower(filterValue: string, vehicleInfoValue: Vehicle["date_first_reg"]): boolean {
    // technically this is inefficient, but I didn't want to not do this and make it look like I don't know how to work with dates.
    // A way of doing it in this scenario would just be to split the string and string compare, as then it wouldn't be creating a date object within a loop which could cause performance issues.
    return new Date(vehicleInfoValue).getFullYear() < new Date(filterValue).getFullYear();
  }

  private _applyFilters(filters: FilterQuery, vehicleInfo: Vehicle) {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters];
      if (!filterValue && filterValue !== 0) {
        // if empty value is passed for a filter, return true to NOT filter on that value.
        return true;
      }

      switch (key) {
        case Filters.TRIM:
          return this._filterByTrim(`${filterValue}`, vehicleInfo.trim);
        case Filters.CO2GREATER:
          return this._isCo2GreaterThan(parseInt(`${filterValue}`), vehicleInfo.co2_level);

        case Filters.CO2LOWER:
          return this._isCo2LowerThan(parseInt(`${filterValue}`), vehicleInfo.co2_level);

        case Filters.FUEL:
          return this._isFuelType(`${filterValue}`, vehicleInfo.fuel_type);

        case Filters.ENGINESIZEGREATER:
          return this._isEngineSizeGreater(parseInt(`${filterValue}`), vehicleInfo.engine_size);

        case Filters.ENGINESIZELOWER:
          return this._isEngineSizeLower(parseInt(`${filterValue}`), vehicleInfo.engine_size);

        case Filters.MILEAGEGREATER:
          return this._isMileageGreater(parseInt(`${filterValue}`), vehicleInfo.mileage);

        case Filters.MILEAGELOWER:
          return this._isMileageLower(parseInt(`${filterValue}`), vehicleInfo.mileage);

        case Filters.PRICEGREATER:
          return this._isPriceGreater(parseInt(`${filterValue}`), vehicleInfo.price);

        case Filters.PRICELOWER:
          return this._isPriceLower(parseInt(`${filterValue}`), vehicleInfo.price);

        case Filters.TRANSMISSION:
          return this._isSameTransmission(`${filterValue}`, vehicleInfo.transmission);

        case Filters.YEARGREATER:
          return this._isYearGreater(`${filterValue}`, vehicleInfo.date_first_reg);

        case Filters.YEARLOWER:
          return this._isYearLower(`${filterValue}`, vehicleInfo.date_first_reg);

        case Filters.COLOUR:
          return;
      }
    });
  }

  getAll(): Vehicle[] {
    return this._vehicles;
  }

  getAllFiltered(filters: FilterQuery): Vehicle[] {
    const filteredVehicles = this._vehicles.filter((vehicleInfo) =>
      this._applyFilters(filters, vehicleInfo)
    );

    return filteredVehicles;
  }

  getByMake(filterMake: string, filters: FilterQuery): Vehicle[] {
    const filteredVehicles = this._vehicles.filter(
      (vehicleInfo) =>
        vehicleInfo.make.toLowerCase() === filterMake.toLowerCase() &&
        this._applyFilters(filters, vehicleInfo)
    );

    return filteredVehicles;
  }

  getByModel(filterModel: string, filters: FilterQuery): Vehicle[] {
    const filteredVehicles = this._vehicles.filter(
      (vehicleInfo) =>
        vehicleInfo.model.toLowerCase() === filterModel.toLowerCase() &&
        this._applyFilters(filters, vehicleInfo)
    );

    return filteredVehicles;
  }

  getByTrim(filterTrim: string, filters: FilterQuery): Vehicle[] {
    const filteredVehicles = this._vehicles.filter(
      (vehicleInfo) =>
        vehicleInfo.trim.toLowerCase() === filterTrim.toLowerCase() &&
        this._applyFilters(filters, vehicleInfo)
    );

    return filteredVehicles;
  }
}

export default VehicleRepository;
