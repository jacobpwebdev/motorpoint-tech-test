import "module-alias/register";

import { Vehicle, VehicleRepository } from "@/vehicles";
import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();
const port = 3000;

const sendVehicleList = (res: Response, vehicles: Vehicle[]) => {
  return res.status(200).send({ vehicles: vehicles });
};

const sendError = (res: Response, errorMessage?: string) => {
  return res
    .status(500)
    .send(errorMessage || "An error occurred when processing your request. Please try again.");
};

// Catch errors and send error message if fails
const handleRequest = (res: Response, callback: () => void) => {
  try {
    // to test error handling use this
    //throw new Error("An error occurred");
    return callback();
  } catch (e: unknown) {
    // Get error message if there is one
    if (e instanceof Error) {
      return sendError(res, e.message);
    }

    return sendError(res);
  }
};

// Landing
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Gets all cars
app.get("/cars", (req: Request, res: Response) =>
  handleRequest(res, () => {
    const model = new VehicleRepository();

    if (Object.keys(req.query).length === 0) {
      return sendVehicleList(res, model.getAll());
    }

    return sendVehicleList(res, model.getAllFiltered(req.query));
  })
);

// Gets all cars of a certain make
app.get("/make/:make", (req: Request, res: Response) =>
  handleRequest(res, () => {
    const model = new VehicleRepository();

    return sendVehicleList(res, model.getByMake(req.params.make, req.query));
  })
);

// Gets all cars of a certain model
app.get("/model/:model", (req: Request, res: Response) =>
  handleRequest(res, () => {
    const model = new VehicleRepository();

    return sendVehicleList(res, model.getByModel(req.params.model, req.query));
  })
);

// Gets all cars of a certain trim
app.get("/trim/:trim", (req: Request, res: Response) =>
  handleRequest(res, () => {
    const model = new VehicleRepository();

    return sendVehicleList(res, model.getByTrim(req.params.trim, req.query));
  })
);

// Gets a list of all models of a certain make
app.get("/models/:make", (req: Request, res: Response) =>
  handleRequest(res, () => {
    const model = new VehicleRepository();

    return res.status(200).send({ models: model.getListOfModelsFromMake(req.params.make) });
  })
);

// Gets a list of all trims of a certain model
app.get("/trims/:model", (req: Request, res: Response) =>
  handleRequest(res, () => {
    const model = new VehicleRepository();

    return res.status(200).send({ trims: model.getListOfTrimsFromModel(req.params.model) });
  })
);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

// 404
app.use((_req, res) => {
  return res.status(404).json({ message: "Route not found" });
});
