import { Shield } from 'lucide-react';
import React from 'react';

export default function Cancellation() {
    return (
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">
              {/* Introduction */}
              <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Cancellation and Refunds</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We understand that sometimes you may need to cancel your order. You can cancel your order within 24 hours of placing it for a full refund. After 24 hours, we will process a refund for you.
                    </p>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>
    )
}