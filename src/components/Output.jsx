import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { getStorage, ref, uploadString } from 'firebase/storage';

const Output = ({ editorRef, language, uMail }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  function generateTxtFile() {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    const blob = new Blob([sourceCode], { type: 'text/plain' });

    let fileName = prompt("Enter file name: ");
    
    // Get a reference to the storage service
    const storage = getStorage();

    // Create a storage reference
    const storageRef = ref(storage, `codes/${uMail}/${language}/${fileName}.txt`);

    // Upload text file to Firebase Storage
    uploadString(storageRef, sourceCode)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
      })
      .catch((error) => {
        console.error('Error uploading file: ', error);
      });


    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'textfile.txt';
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
  }
  
  return (
    <Box w="50%">
      <div className="horizontal">
        <Text mb={2} fontSize="lg" style={{display: "inline"}}>
          Output
        </Text>
        <div className="curUser" style={{display: "inline", marginLeft: "450px"}}><span style={{fontWeight: "bold", fontSize: "17px"}}>User:</span> {uMail}</div>
      </div>
      <Button
        variant="outline"
        colorScheme="green"
        my={3}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Button
        variant="outline"
        colorScheme="green"
        my={3}
        mx={3}
        isLoading={isLoading}
        onClick={generateTxtFile}
      >
        Save
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
