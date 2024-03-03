import StackNavigation from "./navigation/StackNavigation";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StackNavigation />
      </QueryClientProvider>
    </>
  );
}
