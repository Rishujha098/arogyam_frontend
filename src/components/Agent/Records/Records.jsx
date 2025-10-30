import { useState, useRef } from "react";
import { Search, Upload, FileText, Pill, Activity, Stethoscope, Download, Eye, Calendar, CheckCircle, Clock, X, Image, FileType, Trash2, Filter } from "lucide-react";

const initialRecordsData = [
  { 
    id: 1, 
    type: "Lab Report", 
    date: "2025-09-21", 
    status: "Completed",
    doctor: "Dr. Sarah Johnson",
    category: "Laboratory",
    fileSize: "2.4 MB",
    description: "Complete Blood Count (CBC) Test Results",
    fileUrl: "#",
    fileName: "lab_report_cbc_sept2025.pdf"
  },
  { 
    id: 2, 
    type: "Prescription", 
    date: "2025-09-18", 
    status: "Pending",
    doctor: "Dr. Michael Chen",
    category: "Pharmacy",
    fileSize: "1.2 MB",
    description: "Medication for Hypertension Management",
    fileUrl: "#",
    fileName: "prescription_sept2025.pdf"
  },
  { 
    id: 3, 
    type: "X-Ray Scan", 
    date: "2025-09-12", 
    status: "Completed",
    doctor: "Dr. Emily Rodriguez",
    category: "Radiology",
    fileSize: "5.8 MB",
    description: "Chest X-Ray - Routine Checkup",
    fileUrl: "#",
    fileName: "xray_chest_sept2025.jpg"
  },
  { 
    id: 4, 
    type: "Consultation Note", 
    date: "2025-09-10", 
    status: "Completed",
    doctor: "Dr. David Kumar",
    category: "General",
    fileSize: "890 KB",
    description: "Annual Physical Examination Summary",
    fileUrl: "#",
    fileName: "consultation_annual_2025.pdf"
  },
  { 
    id: 5, 
    type: "Lab Report", 
    date: "2025-08-15", 
    status: "Completed",
    doctor: "Dr. Sarah Johnson",
    category: "Laboratory",
    fileSize: "1.8 MB",
    description: "Lipid Profile and Cholesterol Test",
    fileUrl: "#",
    fileName: "lab_lipid_profile_aug2025.pdf"
  },
  { 
    id: 6, 
    type: "MRI Scan", 
    date: "2025-07-28", 
    status: "Completed",
    doctor: "Dr. karan ",
    category: "Radiology",
    fileSize: "12.5 MB",
    description: "Brain MRI - Neurological Assessment",
    fileUrl: "#",
    fileName: "mri_brain_july2025.dcm"
  },
  { 
    id: 7, 
    type: "Prescription", 
    date: "2025-07-20", 
    status: "Completed",
    doctor: "Dr. Michael Chen",
    category: "Pharmacy",
    fileSize: "980 KB",
    description: "Antibiotic Course for Infection",
    fileUrl: "#",
    fileName: "prescription_antibiotics_july2025.pdf"
  },
  { 
    id: 8, 
    type: "ECG Report", 
    date: "2025-06-30", 
    status: "Completed",
    doctor: "Dr. Amanda Foster",
    category: "Cardiology",
    fileSize: "750 KB",
    description: "Electrocardiogram - Cardiac Function Test",
    fileUrl: "#",
    fileName: "ecg_report_june2025.pdf"
  },
];

const getRecordIcon = (type) => {
  switch (type) {
    case "Lab Report":
      return <Activity className="w-8 h-8" />;
    case "Prescription":
      return <Pill className="w-8 h-8" />;
    case "X-Ray Scan":
    case "MRI Scan":
      return <Image className="w-8 h-8" />;
    case "Consultation Note":
      return <Stethoscope className="w-8 h-8" />;
    case "ECG Report":
      return <Activity className="w-8 h-8" />;
    default:
      return <FileText className="w-8 h-8" />;
  }
};

const getRecordColor = (type) => {
  switch (type) {
    case "Lab Report":
      return "from-blue-50 to-blue-100 border-blue-200";
    case "Prescription":
      return "from-purple-50 to-purple-100 border-purple-200";
    case "X-Ray Scan":
      return "from-teal-50 to-teal-100 border-teal-200";
    case "MRI Scan":
      return "from-cyan-50 to-cyan-100 border-cyan-200";
    case "Consultation Note":
      return "from-indigo-50 to-indigo-100 border-indigo-200";
    case "ECG Report":
      return "from-rose-50 to-rose-100 border-rose-200";
    default:
      return "from-gray-50 to-gray-100 border-gray-200";
  }
};

const getIconColor = (type) => {
  switch (type) {
    case "Lab Report":
      return "text-blue-600 bg-blue-100";
    case "Prescription":
      return "text-purple-600 bg-purple-100";
    case "X-Ray Scan":
      return "text-teal-600 bg-teal-100";
    case "MRI Scan":
      return "text-cyan-600 bg-cyan-100";
    case "Consultation Note":
      return "text-indigo-600 bg-indigo-100";
    case "ECG Report":
      return "text-rose-600 bg-rose-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function HealthRecordsPage() {
  const [records, setRecords] = useState(initialRecordsData);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    type: "Lab Report",
    doctor: "",
    category: "Laboratory",
    description: "",
    status: "Completed",
    file: null
  });

  const categories = ["All", "Laboratory", "Pharmacy", "Radiology", "Cardiology", "General"];

  const filteredRecords = records.filter((record) => {
    const matchesSearch = 
      record.type.toLowerCase().includes(search.toLowerCase()) ||
      record.doctor.toLowerCase().includes(search.toLowerCase()) ||
      record.description.toLowerCase().includes(search.toLowerCase()) ||
      record.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = filterCategory === "All" || record.category === filterCategory;
    const matchesStatus = filterStatus === "All" || record.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm({ ...uploadForm, file });
    }
  };

  const simulateUploadProgress = () => {
    return new Promise((resolve) => {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            resolve();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
  };

  const handleUploadSubmit = async () => {
    if (!uploadForm.file || !uploadForm.doctor || !uploadForm.description) {
      alert("Please fill all required fields and select a file");
      return;
    }

    // Simulate upload progress
    await simulateUploadProgress();

    const newRecord = {
      id: records.length + 1,
      type: uploadForm.type,
      date: new Date().toISOString().split('T')[0],
      status: uploadForm.status,
      doctor: uploadForm.doctor,
      category: uploadForm.category,
      fileSize: `${(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB`,
      description: uploadForm.description,
      fileUrl: URL.createObjectURL(uploadForm.file),
      fileName: uploadForm.file.name
    };

    setRecords([newRecord, ...records]);
    
    // Reset and close
    setTimeout(() => {
      setShowUploadModal(false);
      setUploadProgress(0);
      setUploadForm({
        type: "Lab Report",
        doctor: "",
        category: "Laboratory",
        description: "",
        status: "Completed",
        file: null
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 500);
  };

  const handleDownload = (record) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = record.fileUrl;
    link.download = record.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (record) => {
    setViewRecord(record);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleStatCardClick = (status) => {
    setFilterStatus(status);
    setFilterCategory("All");
  };

  const completedCount = records.filter(r => r.status === "Completed").length;
  const pendingCount = records.filter(r => r.status === "Pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-6 py-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Your Health Records
            </h1>
            <p className="text-gray-600 text-lg">Manage and access your medical documents securely</p>
          </div>

          {/* Upload Button */}
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Upload className="w-5 h-5" />
            <span>Upload New</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div 
            onClick={() => handleStatCardClick("All")}
            className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all cursor-pointer ${
              filterStatus === "All" 
                ? "border-blue-500 shadow-lg scale-105" 
                : "border-gray-200 hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Records</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{records.length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => handleStatCardClick("Completed")}
            className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all cursor-pointer ${
              filterStatus === "Completed" 
                ? "border-green-500 shadow-lg scale-105" 
                : "border-gray-200 hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{completedCount}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => handleStatCardClick("Pending")}
            className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all cursor-pointer ${
              filterStatus === "Pending" 
                ? "border-amber-500 shadow-lg scale-105" 
                : "border-gray-200 hover:shadow-lg hover:scale-105"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{pendingCount}</p>
              </div>
              <div className="bg-amber-100 p-4 rounded-full">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by record type, doctor, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-gray-700 shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-12 pr-8 py-4 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-gray-700 shadow-sm cursor-pointer min-w-[200px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Records Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className={`group relative bg-gradient-to-br ${getRecordColor(record.type)} rounded-2xl shadow-md hover:shadow-xl border-2 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`${getIconColor(record.type)} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    {getRecordIcon(record.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        record.status === "Completed" 
                          ? "bg-green-500 text-white" 
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {record.status === "Completed" ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {record.status}
                    </span>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Record Details */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {record.type}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{record.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-sm font-medium">{record.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{record.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{record.category} • {record.fileSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileType className="w-4 h-4" />
                    <span className="text-xs truncate">{record.fileName}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-300">
                  <button 
                    onClick={() => handleView(record)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-purple-600 hover:text-white text-purple-600 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button 
                    onClick={() => handleDownload(record)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg border-2 border-dashed border-gray-300">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Records Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-end z-50 p-4 pr-8 animate-fadeIn"
          onClick={() => !isUploading && setShowUploadModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold ">Upload New Record</h2>
                <button
                  onClick={() => !isUploading && setShowUploadModal(false)}
                  disabled={isUploading}
                  className={`p-2 rounded-lg transition-colors ${
                    isUploading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-purple-300/30 hover:ring-2 hover:ring-white/40"
                  }`}
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="px-6 pt-4">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Uploading...</span>
                  <span className="text-sm font-bold text-purple-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%] animate-shimmer transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Record Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Record Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                >
                  <option value="Lab Report">Lab Report</option>
                  <option value="Prescription">Prescription</option>
                  <option value="X-Ray Scan">X-Ray Scan</option>
                  <option value="MRI Scan">MRI Scan</option>
                  <option value="ECG Report">ECG Report</option>
                  <option value="Consultation Note">Consultation Note</option>
                </select>
              </div>

              {/* Doctor Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploadForm.doctor}
                  onChange={(e) => setUploadForm({ ...uploadForm, doctor: e.target.value })}
                  placeholder="e.g., Dr. John Smith"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                >
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="General">General</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Brief description of the record..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={uploadForm.status}
                  onChange={(e) => setUploadForm({ ...uploadForm, status: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.dcm"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-1">
                      {uploadForm.file ? uploadForm.file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-gray-400 text-sm">PDF, JPG, PNG or DICOM files (Max 50MB)</p>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => !isUploading && setShowUploadModal(false)}
                  disabled={isUploading}
                  className={`flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors ${
                    isUploading 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={isUploading}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all ${
                    isUploading 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:shadow-lg cursor-pointer"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Record"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewRecord && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-end z-50 p-4 pr-8 animate-fadeIn"
          onClick={() => setViewRecord(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Enhanced Design */}
            <div className="relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${getRecordColor(viewRecord.type).replace('border-', '')}`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
              <div className="relative p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className={`${getIconColor(viewRecord.type)} p-4 rounded-xl shadow-lg`}>
                      {getRecordIcon(viewRecord.type)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{viewRecord.type}</h2>
                      <p className="text-gray-600 text-sm">{viewRecord.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewRecord(null)}
                    className="p-2 rounded-lg transition-colors bg-white/10 hover:bg-white/20 hover:ring-2 hover:ring-white/40"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="w-4 h-4 text-purple-600" />
                    <p className="text-xs text-gray-500 font-medium">Doctor</p>
                  </div>
                  <p className="font-semibold text-gray-800">{viewRecord.doctor}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-gray-500 font-medium">Date</p>
                  </div>
                  <p className="font-semibold text-gray-800">{viewRecord.date}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <p className="text-xs text-gray-500 font-medium">Category</p>
                  </div>
                  <p className="font-semibold text-gray-800">{viewRecord.category}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FileType className="w-4 h-4 text-indigo-600" />
                    <p className="text-xs text-gray-500 font-medium">File Size</p>
                  </div>
                  <p className="font-semibold text-gray-800">{viewRecord.fileSize}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <FileType className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-500 font-medium">File Name</p>
                </div>
                <p className="font-semibold text-gray-800 break-all text-sm">{viewRecord.fileName}</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 font-medium mb-3">Status</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                    viewRecord.status === "Completed" 
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                      : "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                  }`}
                >
                  {viewRecord.status === "Completed" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {viewRecord.status}
                </span>
              </div>

              {/* Preview Area with Enhanced Design */}
              <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl p-8 text-center border-2 border-dashed border-purple-300 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-20 -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FileText className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Document Preview</h3>
                  <p className="text-gray-600 mb-6 text-sm">File preview is not available for this format</p>
                  <button
                    onClick={() => handleDownload(viewRecord)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    Download File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
