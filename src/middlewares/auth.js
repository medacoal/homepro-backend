export const authCheck = (req, res, next) => {
  //return res.json({message: "User authentication middleware running"})
  let isAuth = true;
  if (isAuth) {
    console.log("user is authenticated");
  } else {
    console.log("user is not authenticated");
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  next();
};

export const globalMiddleware = (req, res, next) => {
  // return res.json({message: "General middleware activated"})
  console.log("Global middleware activated");
  next();
};
