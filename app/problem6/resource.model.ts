export interface IResource {
    id: number;
    name: string;
    description: string;
  }
  
  export let resources: IResource[] = [
    { id: 1, name: "Resource 1", description: "This is resource 1" },
    { id: 2, name: "Resource 2", description: "This is resource 2" },
    { id: 3, name: "Resource 3", description: "This is resource 3" },
  ];
  
  // Function to generate new ID
  export const getNextId = () => {
    return resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1;
  };
  