import React, { useState, useEffect } from 'react';
import { ChevronUp, Shield, Eye, CreditCard, Truck, Lock, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach((section) => {
        const sectionTop = (section as any).offsetTop;
        const sectionHeight = (section as any).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = ((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  const tableOfContents = [
    { id: 'overview', title: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'information', title: 'Information We Collect', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'usage', title: 'How We Use Information', icon: <Shield className="w-4 h-4" /> },
    { id: 'sharing', title: 'Information Sharing', icon: <Lock className="w-4 h-4" /> },
    { id: 'security', title: 'Data Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'rights', title: 'Your Rights', icon: <Shield className="w-4 h-4" /> },
    { id: 'changes', title: 'Policy Changes', icon: <Clock className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last updated: 30th July 2025</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        {/* Table of Contents - Sticky Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-green-50 text-green-700 border-l-2 border-green-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">
              {/* Introduction */}
              <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Your Privacy Matters</h3>
                    <p className="text-gray-700 leading-relaxed">
                      At <strong>Mahaswetas Passion</strong>, we believe in keeping things simple and transparent. We only collect the minimum information necessary to process your orders and provide our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="mb-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Quick Summary</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span><strong>No user accounts</strong> - We don't store login credentials</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span><strong>No tracking</strong> - We don't track your browsing behavior</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span><strong>Payment IDs only</strong> - For transaction processing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span><strong>Shipping addresses</strong> - Only for order delivery</span>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section id="overview" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-green-600" />
                  1. Overview
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This Privacy Policy describes how [YOUR BUSINESS NAME] ("we," "our," or "us") collects, uses, and protects your information when you use our website [WEBSITE URL] and purchase our products.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to protecting your privacy and maintaining the security of any personal information you provide to us. We do not create user accounts or store unnecessary personal data.
                </p>
              </section>

              {/* Section 2 */}
              <section id="information" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  2. Information We Collect
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      Payment Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We collect payment transaction IDs from our payment processor to track successful payments and handle any payment-related issues. We do not store your credit card details - these are handled securely by our payment processor.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-600" />
                      Shipping Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We collect your name, shipping address, and contact information (email and phone number) solely for the purpose of delivering your orders and communicating about your purchase.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">What We Don't Collect</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>User account information or passwords</li>
                      <li>Browsing history or website analytics</li>
                      <li>Marketing preferences or personal profiles</li>
                      <li>Social media information</li>
                      <li>Location data beyond shipping address</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="usage" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-600" />
                  3. How We Use Your Information
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the limited information we collect for these specific purposes:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Order Processing</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Process and fulfill your orders</li>
                      <li>• Send order confirmations and updates</li>
                      <li>• Handle payment processing</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Customer Service</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Respond to your inquiries</li>
                      <li>• Resolve order issues</li>
                      <li>• Provide support when needed</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="sharing" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-green-600" />
                  4. Information Sharing
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following limited circumstances:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Payment Processors</h4>
                      <p className="text-gray-700 text-sm">Payment information is shared with our secure payment processor to complete transactions.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Shipping Partners</h4>
                      <p className="text-gray-700 text-sm">Shipping addresses are shared with delivery services to fulfill your orders.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Legal Requirements</h4>
                      <p className="text-gray-700 text-sm">When required by law, court order, or government request.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="security" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-green-600" />
                  5. Data Security
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Secure SSL encryption for all transactions</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Limited access to personal information</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Regular security updates and monitoring</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Secure payment processing partners</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>No storage of sensitive payment data</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Minimal data collection approach</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="rights" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-600" />
                  6. Your Rights
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Access</h4>
                      <p className="text-gray-700 text-sm">Request information about what data we have about you</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Correction</h4>
                      <p className="text-gray-700 text-sm">Request correction of inaccurate information</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Deletion</h4>
                      <p className="text-gray-700 text-sm">Request deletion of your personal information</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Portability</h4>
                      <p className="text-gray-700 text-sm">Request a copy of your data in a readable format</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Note:</strong> To exercise these rights, please contact us using the information provided in the Contact section below.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="changes" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-green-600" />
                  7. Changes to This Policy
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. When we do:
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>We will update the "Last updated" date at the top of this page</li>
                  <li>Significant changes will be prominently posted on our website</li>
                  <li>Your continued use of our services constitutes acceptance of the updated policy</li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </section>

              {/* Section 9 */}
              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-green-600" />
                  8. Contact Us
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                
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
                  
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Privacy Inquiries:</strong> We typically respond to privacy-related questions within 48 hours.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-gray-500 italic text-center">
                  This Privacy Policy is effective as of {new Date().toLocaleDateString()} and was last updated on 30th July 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}