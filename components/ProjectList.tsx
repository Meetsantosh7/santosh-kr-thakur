"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import { deleteProject } from '@/lib/projectService';
import { toast } from 'sonner';
import { Github, ExternalLink, Trash2, Loader2, FolderOpen } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onProjectDeleted: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, loading, onProjectDeleted }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!confirm(`🗑️ Are you sure you want to delete "${projectTitle}"?\n\nThis action cannot be undone.`)) {
      return;
    }

    setDeletingId(projectId);
    try {
      await deleteProject(projectId);
      toast.success('✅ Project deleted successfully!');
      onProjectDeleted();
    } catch (error) {
      toast.error('❌ Failed to delete project. Please try again.');
      console.error('Error deleting project:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Live':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Award Winner':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'Completed': return '✅';
      case 'Live': return '🌐';
      case 'In Progress': return '🚧';
      case 'Award Winner': return '🏆';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/10 border border-gray-700/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
            <span className="ml-3 text-gray-300">Loading projects...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 border border-gray-700/20 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Projects ({projects.length})</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-300">
          Manage your portfolio projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-gray-400 text-lg">No projects found</p>
            <p className="text-gray-500 text-sm mt-2">Add your first project using the form on the left!</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-600/30 rounded-lg p-4 bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-white">{project.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(project.status)} text-xs`}>
                      {getStatusEmoji(project.status)} {project.status}
                    </Badge>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={deletingId === project.id}
                      className="h-8 w-8 p-0"
                    >
                      {deletingId === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {(project.technologies || []).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-500/50 text-gray-400">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {project.links && project.links.length > 0 && (
                  <div className="flex gap-3">
                    {project.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm transition-colors"
                      >
                        {link.type === 'GitHub' ? (
                          <Github className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-32 w-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectList;
