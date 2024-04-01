class Globals {
}

class DevelopmentGlobals extends Globals {

    public theHost = "localhost";
    public thePort = "8080";

    public urls = {


        addTask: "http://localhost:8080/task/addTask",
        updateTask: "http://localhost:8080/task/updateTask",
        deleteTask: "http://localhost:8080/task/deleteTask/",
        getUserTasks:"http://localhost:8080/task/usertasks",
        getAllTasks: "http://localhost:8080/task/tasks",
        
        getCustomerDetails: "http://localhost:8080/User/oneUser",
        updateUser: "http://localhost:8080/User/updateUser",
        register: "http://localhost:8080/User/register",
        login: "http://localhost:8080/User/login"

    };
}

class ProductionGlobals extends Globals {
    public urls = {

        addTask: "http://localhost:8080/task/addTask",
        updateTask: "http://localhost:8080/task//updateTask",
        deleteTask: "http://localhost:8080/task/deleteTask/",
        getUserTasks:"http://localhost:8080/task//usertasks",
        getCustomerDetails: "http://localhost:8080/User/oneUser",
        getAllTasks: "http://localhost:8080/task/tasks",
        updateUser: "http://localhost:8080/User/updateUser",
        register: "http://localhost:8080/User/register",
        login: "http://localhost:8080/User/login"


    };
}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;