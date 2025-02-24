import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), // Default index route
    route("problem1", "problem1/index.tsx"),
    route("problem2", "problem2/index.tsx"),
    route("problem3", "problem3/index.tsx"),
    route("problem4", "problem4/index.tsx"),
    route("problem5", "problem5/index.tsx"),
    route("problem6", "problem6/index.tsx")
] satisfies RouteConfig;
