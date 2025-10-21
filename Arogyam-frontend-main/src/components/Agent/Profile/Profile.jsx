import { useEffect, useRef, useState } from "react";
import { Camera, Edit } from "lucide-react";

export default function ProfilePage() {
  const defaultUser = {
    name: "Riya Gupta",
    email: "riya.kumari@example.com",
    phone: "9876543210",
    dob: "1990-05-12",
    gender: "Female",
    bloodGroup: "B+",
    allergies: "None",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXRsEwpFFX0OKKI2dQwdnS3hsLq_2Bogf2g&s",
  };

  const [user, setUser] = useState(defaultUser);
  const [savedUser, setSavedUser] = useState(defaultUser);
  const fileInputRef = useRef(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editSection, setEditSection] = useState(null); // 'personal' | 'contact' | null
  const [draft, setDraft] = useState(defaultUser);

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const raw = localStorage.getItem("arogyam_profile");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
        setSavedUser(parsed);
      }
    } catch (_) {
      // If parsing fails, continue with defaults
    }
  }, []);

  const handleInputChange = (field) => (e) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setDraft((prev) => ({ ...prev, phone: digitsOnly }));
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        // Update both draft and user preview so avatar changes immediately
        setDraft((prev) => ({ ...prev, profilePic: result }));
        setUser((prev) => ({ ...prev, profilePic: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const openEdit = (section) => {
    setDraft(user);
    setEditSection(section);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setEditSection(null);
  };

  const applyEdit = () => {
    if (editSection === "personal") {
      const { name, dob, gender, bloodGroup, allergies, profilePic } = draft;
      setUser((prev) => ({
        ...prev,
        name,
        dob,
        gender,
        bloodGroup,
        allergies,
        profilePic,
      }));
      // Dispatch event to update topbar immediately
      window.dispatchEvent(new CustomEvent('profileUpdated'));
    } else if (editSection === "contact") {
      const { phone, email } = draft;
      setUser((prev) => ({ ...prev, phone, email }));
    }
    setIsEditOpen(false);
    setEditSection(null);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("arogyam_profile", JSON.stringify(user));
      setSavedUser(user);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('profileUpdated'));
      alert("Profile saved successfully.");
    } catch (_) {
      alert("Failed to save profile. Please check storage settings.");
    }
  };

  const handleCancel = () => {
    setUser(savedUser);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-700 mb-10 text-center">
        My Profile
      </h1>

      <div className="max-w-4xl mx-auto bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Profile Photo */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-md object-cover"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full cursor-pointer"
              onClick={openFilePicker}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <h2 className="text-xl font-semibold text-purple-700">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center justify-between">
              Personal Information
              <Edit className="w-5 h-5 cursor-pointer hover:text-blue-500" onClick={() => openEdit("personal")} />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Date of Birth</p>
                <p className="font-medium">{user.dob}</p>
              </div>
              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium">{user.gender}</p>
              </div>
              <div>
                <p className="text-gray-500">Blood Group</p>
                <p className="font-medium">{user.bloodGroup}</p>
              </div>
              <div>
                <p className="text-gray-500">Allergies</p>
                <p className="font-medium">{user.allergies || "None"}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center justify-between">
              Contact Information
              <Edit className="w-5 h-5 cursor-pointer hover:text-blue-500" onClick={() => openEdit("contact")} />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-transform transform hover:scale-105 shadow-md"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-white border border-purple-700 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-transform transform hover:scale-105 shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />
          <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">
            <h4 className="text-xl font-semibold text-purple-700 mb-4">
              {editSection === "contact" ? "Edit Contact Information" : "Edit Personal Information"}
            </h4>
            {editSection === "contact" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-sm">Email</label>
                  <input type="email" value={draft.email} onChange={handleInputChange("email")} className="mt-1 w-full border rounded px-2 py-2" />
                </div>
                <div>
                  <label className="text-gray-500 text-sm">Phone</label>
                  <input type="tel" inputMode="numeric" pattern="[0-9]*" value={draft.phone} onChange={handlePhoneChange} className="mt-1 w-full border rounded px-2 py-2" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                  <img src={draft.profilePic} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                  <button onClick={openFilePicker} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-purple-700">Change Photo</button>
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-500 text-sm">Full Name</label>
                  <input type="text" value={draft.name} onChange={handleInputChange("name")} className="mt-1 w-full border rounded px-2 py-2" />
                </div>
                <div>
                  <label className="text-gray-500 text-sm">Date of Birth</label>
                  <input type="date" value={draft.dob} onChange={handleInputChange("dob")} className="mt-1 w-full border rounded px-2 py-2" />
                </div>
                <div>
                  <label className="text-gray-500 text-sm">Gender</label>
                  <select value={draft.gender} onChange={handleInputChange("gender")} className="mt-1 w-full border rounded px-2 py-2">
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-sm">Blood Group</label>
                  <select value={draft.bloodGroup} onChange={handleInputChange("bloodGroup")} className="mt-1 w-full border rounded px-2 py-2">
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-500 text-sm">Allergies</label>
                  <input type="text" value={draft.allergies} onChange={handleInputChange("allergies")} className="mt-1 w-full border rounded px-2 py-2" placeholder="None" />
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeEdit} className="bg-white border border-purple-700 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-700 hover:text-white">Cancel</button>
              <button onClick={applyEdit} className="bg-blue-500 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
