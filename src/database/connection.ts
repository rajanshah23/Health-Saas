import { Sequelize } from "sequelize-typescript";
import envconfig from "../config/config";

const sequelize = new Sequelize({
  database: envconfig.dbname, //database  ko name
  username: envconfig.dbusername, // database ko username by default root
  password: envconfig.dbpassword, //database ko password by default empty hunxa
  host: envconfig.dbhost, //database ko location kaha xa vannne kuro ,localhost(mycomputer)
  dialect: "mysql", //kun database use garna aateyko
  port: Number(envconfig.dbport),
  models:[__dirname +'/models']
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((error) => {
    console.error("  error ");
  });

sequelize.sync({ alter:false})
.then(() => {
  console.log("✅ Migrated successfully with new changes");
});
export default sequelize;
