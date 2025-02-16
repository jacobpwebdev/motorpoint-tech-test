export type Vehicle = {
  make: string;
  model: string;
  trim: string;
  colour: string;
  co2_level: number;
  transmission: "Manual" | "Automatic";
  fuel_type: "Diesel" | "Unleaded";
  engine_size: number;
  date_first_reg: string;
  mileage: number;
  price: number;
};

export enum Filters {
  PRICEGREATER = "priceGreater",
  PRICELOWER = "priceLower",
  FUEL = "fuel",
  TRANSMISSION = "transmission",
  MILEAGELOWER = "mileageLower",
  MILEAGEGREATER = "mileageGreater",
  ENGINESIZEGREATER = "engineSizeGreater",
  ENGINESIZELOWER = "engineSizeLower",
  YEARGREATER = "yearGreater",
  YEARLOWER = "yearLower",
  CO2LOWER = "co2Lower",
  CO2GREATER = "co2Greater",
}

export type FilterQuery = Partial<Record<Filters, string | number>>;
