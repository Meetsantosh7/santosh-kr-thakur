import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy 
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "./firebase";
const db = getFirestore(app);
import { Project, ProjectFormData } from "@/types/project";
import { Github, ExternalLink } from "lucide-react";

export const addProject = async (projectData: ProjectFormData): Promise<void> => {
  try {
    const links = [];
    
    if (projectData.githubUrl) {
      links.push({
        type: "GitHub",
        url: projectData.githubUrl
      });
    }
    
    if (projectData.liveUrl) {
      links.push({
        type: "Live Demo",
        url: projectData.liveUrl
      });
    }

    const project = {
      title: projectData.title,
      description: projectData.description,
      technologies: projectData.technologies.split(',').map(tech => tech.trim()),
      status: projectData.status,
      image: projectData.image || '',
      links: links,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "projects"), project);
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
//dadad
export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const links = (data.links ?? []).map((link: any) => {
        let icon;
        if (link.type === "GitHub") {
          icon = Github;
        } else if (link.type === "Live Demo") {
          icon = ExternalLink;
        }
        return {
          ...link,
          icon
        };
      });
      
      projects.push({
        id: doc.id,
        ...data,
        links,
        createdAt: data.createdAt?.toDate().toISOString() // Convert Firestore timestamp to ISO string
      } as Project);
    });
    
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "projects", projectId));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};