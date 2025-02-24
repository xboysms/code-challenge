import { Request, Response } from "express";
import { getNextId, IResource, resources } from "./resource.model";

// Create Resource
export const createResource = (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  const newResource: IResource = { id: getNextId(), name, description };
  resources.push(newResource);
  res.status(201).json(newResource);
};

// Get All Resources
export const getResources = (req: Request, res: Response) => {
  res.status(200).json(resources);
};

// Get Resource by ID
export const getResourceById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
const resource: IResource | undefined = resources.find((r: IResource) => r.id === id);
  if (!resource) return res.status(404).json({ error: "Resource not found" });
  res.status(200).json(resource);
};

// Update Resource
export const updateResource = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const resourceIndex = resources.findIndex((r) => r.id === id);

  if (resourceIndex === -1) return res.status(404).json({ error: "Resource not found" });

  resources[resourceIndex] = { id, name, description };
  res.status(200).json(resources[resourceIndex]);
};

// Delete Resource
export const deleteResource = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const resourceIndex = resources.findIndex((r) => r.id === id);

  if (resourceIndex === -1) return res.status(404).json({ error: "Resource not found" });

  resources.splice(resourceIndex, 1);
  res.status(200).json({ message: "Resource deleted" });
};
