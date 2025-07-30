import { Mail, Phone } from 'lucide-react';
import React from 'react';

export default function ContactUs() {
    return (
        <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mahaswetas Passion</h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Mail className="w-5 h-5 mr-3 text-green-600" />
            <span>Email: hitoishi.das@gmail.com</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Phone className="w-5 h-5 mr-3 text-green-600" />
            <span>Phone: +91-9223222939</span>
          </div>
        </div>
      </div>
    )
}