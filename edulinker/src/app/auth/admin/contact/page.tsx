'use client';

import AdminLayout from '@/components/Layouts/AdminLayout';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Save, Edit2, FacebookIcon, Instagram, Youtube } from 'lucide-react';
import Facebook from 'next-auth/providers/facebook';

export default function AdminContactPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@lucasburro.com',
    phone: '+55 (11) 98765-4321',
    address: '123 Business Ave, São Paulo, Brazil',
    socialMedia: {
      twitter: '@lucasburro',
      instagram: '@lucasburro.official',
      linkedin: 'youtube.com/in/lucasburro'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setContactInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof contactInfo],
          [child]: value
        }
      }));
    } else {
      setContactInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the data to your backend
    console.log('Contact info updated:', contactInfo);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Informações de Contato</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg 2 bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer"
              >
                <Edit2 className="w-5 h-5" />
                Editar
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-white rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-8 space-y-6">
                {/* Email Section */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={contactInfo.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-800">{contactInfo.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone Section */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-lg text-green-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={contactInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-800">{contactInfo.phone}</p>
                    )}
                  </div>
                </div>

                {/* Address Section */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={contactInfo.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-800">{contactInfo.address}</p>
                    )}
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Media</h2>
                  
                  <div className="space-y-6">
                    {/* Facebool */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-500">
                        <FacebookIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Facebook</h3>
                        {isEditing ? (
                          <input
                            type="text"
                            name="socialMedia.facebook"
                            value={contactInfo.socialMedia.twitter}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-800">{contactInfo.socialMedia.twitter}</p>
                        )}
                      </div>
                    </div>

                    {/* Instagram */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-pink-100 rounded-lg text-pink-500">
                        <Instagram className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Instagram</h3>
                        {isEditing ? (
                          <input
                            type="text"
                            name="socialMedia.instagram"
                            value={contactInfo.socialMedia.instagram}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-800">{contactInfo.socialMedia.instagram}</p>
                        )}
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                        <Youtube className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">YouTube</h3>
                        {isEditing ? (
                          <input
                            type="text"
                            name="socialMedia.youtube"
                            value={contactInfo.socialMedia.linkedin}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-800">{contactInfo.socialMedia.linkedin}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="bg-gray-50 px-8 py-4 flex justify-end border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    <Save className="w-5 h-5" />
                    Salvar Mudanças
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}