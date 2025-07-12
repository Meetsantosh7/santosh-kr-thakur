export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image?: string;
  links: ProjectLink[];
  createdAt?: any;
}

export interface ProjectLink {
  type: string;
  url: string;
  icon?: any; // Made optional
}

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  status: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}
