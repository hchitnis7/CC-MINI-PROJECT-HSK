import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { auth, app } from "./firebase";

function App() {
  const uMail = auth.currentUser.email;
  let uId = auth.currentUser.uid;
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor uMail={uMail} uId={uId}/>
    </Box>
  );
}

export default App;
