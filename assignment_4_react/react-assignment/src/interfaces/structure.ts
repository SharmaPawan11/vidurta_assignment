export interface TreeStructure {
    name: string;
    type: nodeType;
    children?: Array<TreeStructure>;
}

type nodeType = 'dir' | 'file'