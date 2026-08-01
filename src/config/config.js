

if (!process.env.MONGO_URL) {
     throw new Error("MONGODB CONNECTION URL NOT FOUND");
}
if (!process.env.PORT) {
     throw new Error("PORT NUMBER IN NOT FOUND");
}
if (!process.env.JWT_SECRET) {
     throw new Error("JWT SECRET NOT FOUND");
}


const config = {
     MONGO_URL:process.env.MONGO_URL,
     PORT:process.env.PORT,
     JWT_SECRET:process.env.JWT_SECRET
}


export default config;