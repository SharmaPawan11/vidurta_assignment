import './App.css'
import FileTree from './components/FileTree/FileTree'
import { TreeStructure } from './interfaces/structure'
import { useState } from 'react'
import { Context } from "./Context.js";


const structure: TreeStructure = {
  name: "My workspace",
  type: "dir",
  children: [
    {
      name: "Design projects",
      type: "dir",
      children: [
        {
          name: "App Redesign",
          type: "file"
        }
      ]
    },
    {
      name: "Development",
      type: "dir",
      children: [
        {
          name: "Frontend Tasks",
          type: "file"
        }
      ]
    },
    {
      name: "Marketing",
      type: "file"
    },
    {
      name: "Sales pitch",
      type: "file"
    },
  ]
}

function getFlattenedStructure(structure: TreeStructure): { [k: string]: boolean } {
  const flatten = (array: Array<any>, currentPath: string) => array.flatMap((node: TreeStructure): Array<any> => {
    const { name, type, children } = node
    const newPath = `${currentPath}/${name}`
    return [
      { type, name, path: newPath },
      ...flatten(children || [], newPath)
    ]
  });

  let flattenedStructure: any = {}

  flatten([structure], '').forEach((item) => {
    flattenedStructure[item.path] = false
  })

  return flattenedStructure
}


function App() {
  const [context, setContext] = useState(getFlattenedStructure(structure));


  return (
    <>
      <Context.Provider value={[context, setContext]}>
        <ul className="root">
          <FileTree node={structure} path={'/' + structure.name}></FileTree>
        </ul>
      </Context.Provider>
    </>
  )
}

export default App
