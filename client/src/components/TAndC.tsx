import React, { useState, useEffect } from 'react';
import { ChevronUp, FileText, Clock, Shield, CreditCard, AlertCircle, Scale, Mail, Phone, MapPin } from 'lucide-react';

export default function TermsAndConditions() {
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
    { id: 'acceptance', title: 'Acceptance of Terms', icon: <FileText className="w-4 h-4" /> },
    { id: 'products', title: 'Products and Services', icon: <Shield className="w-4 h-4" /> },
    { id: 'ordering', title: 'Ordering and Payment', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'privacy', title: 'Privacy and Data Protection', icon: <Shield className="w-4 h-4" /> },
    { id: 'intellectual', title: 'Intellectual Property', icon: <Scale className="w-4 h-4" /> },
    { id: 'prohibited', title: 'Prohibited Uses', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'disclaimers', title: 'Disclaimers', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'liability', title: 'Limitation of Liability', icon: <Scale className="w-4 h-4" /> },
    { id: 'indemnification', title: 'Indemnification', icon: <Scale className="w-4 h-4" /> },
    { id: 'governing', title: 'Governing Law', icon: <Scale className="w-4 h-4" /> },
    { id: 'changes', title: 'Changes to Terms', icon: <Clock className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact Information', icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
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
                        ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
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
              <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed">
                  Welcome to <strong>Mahaswetas Passion</strong> ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website https://mahaswetaspassion.com (the "Service") operated by Mahaswetas Passion.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                </p>
              </div>

              {/* Section 1 */}
              <section id="acceptance" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By using our website and services, you confirm that you are at least 18 years old or have the consent of a parent or guardian, and you have the legal capacity to enter into these Terms.
                </p>
              </section>

              {/* Section 2 */}
              <section id="products" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  2. Products and Services
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to display our products as accurately as possible. However, we cannot guarantee that your computer monitor's display of colors or product details will be completely accurate. All products are subject to availability.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All prices are listed in INR (Indian Rupee) and are subject to change without notice. We reserve the right to modify or discontinue products at any time. Prices include applicable taxes unless otherwise stated.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Availability</h3>
                <p className="text-gray-700 leading-relaxed">
                  We make every effort to ensure product availability, but we cannot guarantee that all products will be in stock. If a product becomes unavailable after your order, we will notify you and provide a full refund.
                </p>
              </section>

              {/* Section 3 */}
              <section id="ordering" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                  3. Ordering and Payment
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Process</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you place an order, you are making an offer to purchase products subject to these Terms. We reserve the right to accept or decline any order at our discretion.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We accept UPI, Cards and Netbanking. Payment must be received before order processing. All transactions are processed securely through Razorpay.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Confirmation</h3>
                <p className="text-gray-700 leading-relaxed">
                  You will receive an email confirmation once your order is placed. This confirmation does not guarantee product availability or acceptance of your order.
                </p>
              </section>

              {/* Section 4 */}
              <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  4. Privacy and Data Protection
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
              </section>

              {/* Section 5 */}
              <section id="intellectual" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-blue-600" />
                  5. Intellectual Property
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Content</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content on our website, including text, graphics, logos, images, and software, is owned by Mahaswetas Passion and protected by intellectual property laws.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">User Content</h3>
                <p className="text-gray-700 leading-relaxed">
                  By submitting reviews, comments, or other content, you grant us a non-exclusive license to use, modify, and display such content for business purposes.
                </p>
              </section>

              {/* Section 6 */}
              <section id="prohibited" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
                  6. Prohibited Uses
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">You may not use our Service to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Transmit harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our website</li>
                  <li>Use our Service for any fraudulent or unlawful purpose</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="disclaimers" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3 text-yellow-600" />
                  7. Disclaimers
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Availability</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not guarantee that our Service will be available at all times. We may experience hardware, software, or other problems that could lead to interruptions or delays.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Warranties</h3>
                <p className="text-gray-700 leading-relaxed">
                  Products are provided "as is" without warranties beyond those provided by manufacturers. We disclaim all warranties to the extent permitted by law.
                </p>
              </section>

              {/* Section 8 */}
              <section id="liability" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-blue-600" />
                  8. Limitation of Liability
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Mahaswetas Passion shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Service or products.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our total liability for any claim related to our Service or products shall not exceed the amount you paid for the specific product or service giving rise to the claim.
                </p>
              </section>

              {/* Section 9 */}
              <section id="indemnification" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-blue-600" />
                  9. Indemnification
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify and hold Mahaswetas Passion harmless from any claims, damages, or expenses arising from your use of our Service or violation of these Terms.
                </p>
              </section>

              {/* Section 10 */}
              <section id="governing" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-blue-600" />
                  10. Governing Law
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by the laws of Maharashtra, India, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Mumbai High Court.
                </p>
              </section>

              {/* Section 11 */}
              <section id="changes" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  11. Changes to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our Service after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Section 12 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </section>

              {/* Section 13 */}
              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  13. Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mahaswetas Passion</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Email: hitoishi.das@gmail.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Phone: +91-9223222939</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-gray-500 italic text-center">
                  These Terms and Conditions are effective as of {new Date().toLocaleDateString()} and were last updated on 30th July 2025.
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
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}