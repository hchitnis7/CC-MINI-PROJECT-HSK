import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import FileSelector from "./FileSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { isCompositeComponent } from "react-dom/test-utils";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const CodeEditor = (props) => {

  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [file, setFile] = useState('Select a file');

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
    console.log('CodeEditor: '+language)
  };
  const onFileSelect = (file) => {
    setFile(file);
    const storage = getStorage();
    const fileRef = ref(storage, `codes/${props.uMail}/${language}/${file}`);
    getDownloadURL(fileRef)
      .then((url)=>{
        return fetch(url);
      })
      .then((response)=>{
        if(!response.ok){
          throw new Error('Failed to fetch file');
        }
        return response.text();
      })
      .then((fileContent)=>{
        setValue(fileContent);
      })
      .catch((error)=>{
        console.error('Error accessing file: ', error);
      })
    // setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      {/* <div>{props.user}</div> */}
      <HStack spacing={4}>
        <Box w="50%">
          <HStack>
            <LanguageSelector language={language} onSelect={onSelect} />
            <FileSelector file={file} uId={props.uId} uMail={props.uMail} language={language} onFileSelect={onFileSelect} />
          </HStack>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} uMail={props.uMail} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;
