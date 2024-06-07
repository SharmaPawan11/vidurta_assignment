import { useEffect, useContext } from 'react';
import { TreeStructure } from '../../interfaces/structure'
import { FaFileAlt, FaFolder, FaChevronRight, FaChevronDown } from "react-icons/fa";
import './FileTree.css'
import { Context } from "../../Context";

function FileTree({ node, path }: { node: TreeStructure, path: string }) {

  const { name, type, children } = node

  const [context, setContext] = useContext(Context);

  const toggleChildrenVisiblity = () => {
    setContext({
      ...context,
      [path]: !context[path]
    })
  };

  useEffect(() => {
    return () => {
      if (type === 'dir') {
        
      }
    }
  }, [])



  return ( 
    <>
      {node && <div className="info">
        {type === 'dir' && <span data-testid="dir-expand" onClick={toggleChildrenVisiblity}> { context[path] ? <FaChevronDown /> : <FaChevronRight />} </span>}
        {type === 'file' ? <FaFileAlt /> : <FaFolder />}
        <li data-testid="node">
          <p>{ name }</p>
        </li>
      </div>}
      <ul>
        {context[path] && children?.map(child => (
          <FileTree node={child} key={child.name} path={ path + '/' + child.name }></FileTree>
        ))}
      </ul>
    </>
  )
}

export default FileTree