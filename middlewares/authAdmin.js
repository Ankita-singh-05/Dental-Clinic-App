module.exports = async (req, res, next) => {
    try {
      const token = req.headers['authorization'].split(" ")[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
  
      // Check if the decoded object contains the "id" property
      if (!decoded.id) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      }
  
      const users = await userModels.findById(decoded.id);
  
      if (!users) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      }
  
      // User is an admin, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log(error); // Add this line to log the error object
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
  