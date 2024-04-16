import model from "./model.js";

export const findAllUsers = () => model.find();
export const register = (user) => model.create(user);
export const login = (email) => model.findOne({ email });
export const createUser = (user) => model.create(user);
export const findUserByEmail = (email) =>
  model.findOne({ email });
export const findUserById = (id) => model.findById(id
);
