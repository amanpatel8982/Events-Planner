export const sample = (req, res,next)=>{
    console.log("I am Middleware named sample");
    console.log(req.url);
    console.log(req.method);
    next();
}


export const sample1 = (req, res,next)=>{
    console.log("I am Middleware named sample1");
    console.log(req.url);
    console.log(req.method);
    next();
}


export const sample2 = (req, res,next)=>{
    console.log("I am Middleware named sample2");
    console.log(req.url);
    console.log(req.method);
    next();
}