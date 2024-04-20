import * as dao from "./dao.js";
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const id = req.params._id;
    const user = req.body;

    const currentUser = req.session["currentUser"];
    console.log('Update user:', id, currentUser)
    if (currentUser) {
      req.session["currentUser"] = user;
    }
    console.log(user)
    const status = await dao.updateUser(id, user);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    console.log('New User:', currentUser)
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    console.log(user)
    if (user) {
      const currentUser = await dao.findUserByCredentials(username, password);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
      console.log('Current User:', currentUser)
    } else {
      res.sendStatus(401).json(
        { message: "Invalid Credentials" });;
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log('Requesting current user:', req.session["currentUser"])
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(401).send("Unauthorized");
    }
  };
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}