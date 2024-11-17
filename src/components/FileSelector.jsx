import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
  } from "@chakra-ui/react";
  import { LANGUAGE_VERSIONS } from "../constants";
  import { getStorage, ref, listAll } from 'firebase/storage';
  import { useState, useEffect } from "react";

  const languages = Object.entries(LANGUAGE_VERSIONS);
  const ACTIVE_COLOR = "blue.400";
  
  const FileSelector = ({ file, uId, uMail, language, onFileSelect }) => {
    const [fileList, setFileList] = useState([]);
    
    useEffect(() => {    
      console.log(language);
      // Get a reference to the storage service
      const storage = getStorage();

      // Create a reference to the location you want to list
      const storageRef = ref(storage, `codes/${uMail}/${language}/`);

      let myfiles = [];

      // List all items (files and folders) at the specified location
      listAll(storageRef)
      .then((res) => {
        myfiles = res.items.map((itemRef) => {
          return itemRef.name;
          // console.log('File:', itemRef.name);
          // setFileList(...fileList, itemRef.name);
        });
        setFileList(myfiles);
        /*
        setFileList(res.items.map((itemRef) => {
          return itemRef.name;
          // console.log('File:', itemRef.name);
          // setFileList(...fileList, itemRef.name);
        }));
        */
      })
      .catch((error) => {
        console.error('Error listing files:', error);
      });
      // setFileList(myfiles);
    }, [uMail, language]);

    let changeFileName = (fname)=>{
      // let fname = itemRef.name;
      fname = fname.replace('txt', language=='javascript'?'js':language=='typescript'?'ts':language=='python'?'py':language=='java'?'java':language=='csharp'?'cs':language=='php'?'php':'')
      return fname;
    }
  
    return (
      <Box ml={2} mb={4}>
        <Text mb={2} fontSize="lg">
          File:
        </Text>
        <Menu isLazy>
          <MenuButton as={Button}>{file}</MenuButton>
          <MenuList bg="#110c1b">
            {fileList.map((fileName) => (
              <MenuItem
                key={fileName}
                color={fileName === file ? ACTIVE_COLOR : ""}
                bg={fileName === file ? "gray.900" : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: "gray.900",
                }}
                onClick={() => onFileSelect(fileName)}
              >
                {changeFileName(fileName)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    );
  };
  export default FileSelector;
  