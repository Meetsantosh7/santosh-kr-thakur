"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProjectFormData } from "@/types/project"
import { addProject } from "@/lib/projectService"
import { toast } from "sonner"
import { Plus, Loader2, Upload, X, ImageIcon } from "lucide-react"

interface ProjectFormProps {
  onProjectAdded: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    technologies: "",
    status: "Completed",
    image: "",
    githubUrl: "",
    liveUrl: "",
  })

  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file")
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setImagePreview(null)
    setFormData({ ...formData, image: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formDataUpload = new FormData()
    formDataUpload.append("image", file)

    const response = await fetch("/api/upload-project-image", {
      method: "POST",
      body: formDataUpload,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload image")
    }

    const result = await response.json()
    return result.imagePath
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.title.trim() || !formData.description.trim() || !formData.technologies.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      let imagePath = formData.image

      // Upload image if selected
      if (selectedFile) {
        setUploading(true)
        try {
          imagePath = await uploadImage(selectedFile)
          toast.success("✅ Image uploaded successfully!")
        } catch (error) {
          toast.error("❌ Failed to upload image")
          console.error("Image upload error:", error)
          setLoading(false)
          setUploading(false)
          return
        }
        setUploading(false)
      }

      // Save project data
      const projectData = { ...formData, image: imagePath }
      await addProject(projectData)
      toast.success("🎉 Project added successfully!")

      // Reset form
      setFormData({
        title: "",
        description: "",
        technologies: "",
        status: "Completed",
        image: "",
        githubUrl: "",
        liveUrl: "",
      })

      setSelectedFile(null)
      setImagePreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      onProjectAdded()
    } catch (error) {
      toast.error("❌ Failed to add project. Please try again.")
      console.error("Error adding project:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 border border-gray-700/20 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Plus className="h-5 w-5" />
          <span>Add New Project</span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          Fill in the details to add a new project to your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Project Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., E-Commerce Platform"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-teal-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project features and functionality..."
              rows={4}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-teal-500 resize-none"
              required
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Technologies *</label>
            <Input
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB, TypeScript (comma separated)"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-teal-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:border-teal-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="Completed">✅ Completed</SelectItem>
                <SelectItem value="In Progress">🚧 In Progress</SelectItem>
                <SelectItem value="Live">🌐 Live</SelectItem>
                <SelectItem value="Award Winner">🏆 Award Winner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Image */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Project Image (Optional)</label>

            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500/50 transition-all duration-200 bg-gray-800/30 hover:bg-gray-800/50"
              >
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm font-medium mb-1">Click to upload project image</p>
                <p className="text-gray-500 text-xs">PNG, JPG, GIF up to 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <div className="border border-gray-600/50 rounded-lg p-4 bg-gray-800/30">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-lg border border-gray-600/50"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{selectedFile?.name}</p>
                      <p className="text-gray-400 text-xs">
                        {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <div className="flex items-center mt-1">
                        <ImageIcon className="h-3 w-3 text-teal-400 mr-1" />
                        <span className="text-teal-400 text-xs">Ready to upload</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">GitHub URL (Optional)</label>
              <Input
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Live Demo URL (Optional)</label>
              <Input
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://your-project.com"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-200 disabled:opacity-50"
          >
            {loading || uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {uploading ? "Uploading Image..." : "Adding Project..."}
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProjectForm
