import app from "./index"
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
	console.log("subiu na porta " + process.env.PORT);
});