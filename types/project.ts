export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  status: string
  image?: string
  links: ProjectLink[]
  createdAt: string
}

export interface ProjectLink {
  type: string
  url: string
  icon?: any
}

export interface ProjectFormData {
  title: string
  description: string
  technologies: string
  status: string
  image: string
  githubUrl: string
  liveUrl: string
}
