import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const protect = async ( req , res , next ) => {

    try{
        // middleware token uthayga
        const token = req.headers.authorization?.split(" ")[1]

        if ( !token ) {
            return res.status(401).json({
                message:"No token , access denied..."
            });
        }

        // verify krega
        const decoded = jwt.verify (
            token ,
            process.env.JWT_SECRET
        );

        // token valid hoga to isse user ka full data fetch hokr ayga 
        req.user = await User.findById(decoded.id).select("-password")

        next();
    }

    catch(error){
        res.status(401).json({
            message:"Invalid Token !"
        });
    }

}

export default protect