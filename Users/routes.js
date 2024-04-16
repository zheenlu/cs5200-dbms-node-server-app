import * as dao from './dao.js';

let currentUser = null; // current logged in user

function userRoutes(app) {
    const login = async (req, res) => {
        const { email, password } = req.body;
        const user = await dao.login(email, password);
        console.log("User found:", user);
        if (user) {
            currentUser = user;
            res.json(user);
        } else {
            res.sendStatus(403);
        }

    };

    const account = async (req, res) => {
        if (!currentUser) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        res.json(currentUser);
    };

    const signout = async (req, res) => {
        currentUser = null;
        res.json({ message: "Signout successful" });
    }

    const createUser = async (req, res) => {
        if (currentUser) {
          const user = await dao.createUser(req.body);
          res.json(user);
          return;
        }
        res.status(401).json({ message: "Unauthorized" });
    };

    // const register = async (req, res) => {
    //     const user = await dao.findUserByEmail(req.body.email);
    //     if (user) {
    //         return res.status(400).json({ message: "Email already taken" });
    //     }

    //     currentUser = await dao.createUser(req.body);
    //     res.json(currentUser);

    // };
    const register = async (req, res) => {
        try {
            const userExists = await dao.findUserByEmail(req.body.email);
            if (userExists) {
                res.status(400).json({ message: "Email already taken" });
                return;
            }
            const newUser = {
                ...req.body,
                registrationDate: new Date() 
            };
            const createdUser = await dao.createUser(newUser); 
            currentUser = createdUser;
            res.json(createdUser);
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
 
    const findAllUsers = async (req, res) => {
        try {
            const users = await dao.findAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    const findUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const user = await dao.findUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    app.get('/api/users', findAllUsers);
    app.get('/api/users/:id', findUserById)
    app.post('/api/users/account', account);
    app.post('/api/users/signout', signout);
    app.post("/api/users", createUser);
    app.post('/api/users/login', login);
    app.post('/api/users/register', register);
}

export default userRoutes;