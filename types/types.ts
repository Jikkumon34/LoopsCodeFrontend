export interface Course {
    id: string;
    title: string;
    slug: string;
    description?: string;
    topics?: Topic[];
  }
  
   export interface TopicHeadersType {
    id: string;
    title: string;
    topics: Topic[];
  
  }
  export interface Topic {
    id: string;
    title: string;
    slug: string;
    children:Topic[];
  }