"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logout } from '@/lib/auth';
import ProjectForm from '@/components/ProjectForm';
import ProjectList from '@/components/ProjectList';
import { useProjects } from '@/hooks/useProjects';
import { LogOut, Settings, Database } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { projects, loading, refetch } = useProjects();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Manage your portfolio projects</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-gray-300">
                <Database className="h-4 w-4" />
                <span className="text-sm">{projects.length} Projects</span>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 border border-gray-700/20 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-400">{projects.length}</div>
              <p className="text-gray-400 text-sm">Portfolio projects</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border border-gray-700/20 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Live Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {projects.filter(p => p.status === 'Live').length}
              </div>
              <p className="text-gray-400 text-sm">Currently live</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border border-gray-700/20 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">
                {projects.filter(p => p.status === 'Completed').length}
              </div>
              <p className="text-gray-400 text-sm">Finished projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProjectForm onProjectAdded={refetch} />
          </div>
          <div>
            <ProjectList 
              projects={projects} 
              loading={loading} 
              onProjectDeleted={refetch} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;