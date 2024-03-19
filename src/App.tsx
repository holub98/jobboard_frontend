import { routes } from "./Router";
import { useRoutes } from "react-router-dom";
import { AuthToken } from "./utils/auth";

function App() {
  AuthToken();
  const content = useRoutes(routes);
  return content;
}

export default App;
