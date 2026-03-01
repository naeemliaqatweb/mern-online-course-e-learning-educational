import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, MessageCircle, Shield, CreditCard, AlertCircle } from "lucide-react";

const Cancel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

  const commonReasons = [
    "Changed your mind about the plan?",
    "Want to compare with other options?",
    "Need to check your budget?",
    "Technical issues during checkout?"
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    // Rotate through common reasons
    const interval = setInterval(() => {
      setCurrentReasonIndex((prev) => (prev + 1) % commonReasons.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-slate-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Main Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/25">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-yellow-800 text-sm">⚠️</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8 space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Payment Cancelled
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            No worries! Your payment was cancelled and you haven't been charged anything.
          </p>
          
          {/* Rotating reasons */}
          <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <p className="text-slate-500 text-sm mb-2">We understand...</p>
            <p className="text-slate-700 font-medium transition-all duration-500 min-h-[24px]">
              {commonReasons[currentReasonIndex]}
            </p>
          </div>
        </div>

        {/* Options Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
          
          {/* Try Again Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3">Try Again</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Ready to continue? We've saved your plan selection and you can complete your purchase in just one click.
            </p>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <CreditCard className="w-5 h-5" />
              Complete Payment
            </button>
          </div>

          {/* Browse Plans Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3">Browse Plans</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Want to explore other options? Check out our different plans and find the perfect fit for your needs.
            </p>
            
            <button 
              onClick={() => window.location.href = '/pricing'}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Shield className="w-5 h-5" />
              View All Plans
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <button
            onClick={() => window.location.href = '/home'}
            className="group flex-1 bg-white/70 hover:bg-white/90 backdrop-blur-lg border border-white/50 text-slate-700 font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <button 
            onClick={() => window.location.href = '/contact'}
            className="group flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Need Help?
          </button>
        </div>

        {/* Reassurance Section */}
        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            100% Secure & No Hidden Fees
          </div>
          
          <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
            Your privacy and security are our top priorities. We use industry-standard encryption and never store your payment information.
          </p>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 max-w-2xl">
          <h4 className="font-semibold text-slate-700 mb-4 text-center">Quick Questions?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="text-left p-3 hover:bg-white/50 rounded-xl transition-colors text-sm text-slate-600 hover:text-slate-800">
              • Can I cancel anytime?
            </button>
            <button className="text-left p-3 hover:bg-white/50 rounded-xl transition-colors text-sm text-slate-600 hover:text-slate-800">
              • What payment methods do you accept?
            </button>
            <button className="text-left p-3 hover:bg-white/50 rounded-xl transition-colors text-sm text-slate-600 hover:text-slate-800">
              • Is there a free trial?
            </button>
            <button className="text-left p-3 hover:bg-white/50 rounded-xl transition-colors text-sm text-slate-600 hover:text-slate-800">
              • How do refunds work?
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Cancel;