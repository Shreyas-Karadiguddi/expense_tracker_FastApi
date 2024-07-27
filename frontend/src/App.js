// import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { QueryClient,QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      {/* <SignUp/> */}
      <Login/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
