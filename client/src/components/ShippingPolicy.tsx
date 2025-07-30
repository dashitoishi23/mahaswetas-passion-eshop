import { Shield } from 'lucide-react';
import React from 'react';

export default function ShippingPolicy() {
    return (
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">
              {/* Introduction */}
              <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Shipping Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                      All orders are processed within 1-3 business days.
                      If we are experiencing a high volume of orders, shipments may be delayed by a few days
                    </p>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>
    )
}