import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Sparkles, Download, Copy, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const baseUrl = import.meta.env.VITE_SERVER_API_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${baseUrl}/api/admin/orders/success?session_id=${sessionId}`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch order");
        }

        setOrder(data);
        // Refresh user data to update plan
        dispatch(checkAuth());
        // Trigger confetti animation
        setTimeout(() => setShowConfetti(true), 500);
      } catch (err) {
        console.error("Error fetching order:", err);
        setOrder({ error: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId, baseUrl, dispatch]);

  const copyOrderId = async () => {
    await navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <p className="text-slate-600 text-lg font-medium animate-pulse">
            Processing your payment...
          </p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order || order.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-red-100 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
          <h2 className="text-red-600 text-2xl font-bold mb-2">Order problematic</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {order?.error || "We couldn't find your order information. If you've just completed a payment, it may take a few moments to sync."}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg hover:shadow-red-200"
            >
              Try Refreshing
            </button>
            <button
              onClick={() => window.location.href = '/home'}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

        {/* Floating icons */}
        {showConfetti && (
          <div className="absolute inset-0">
            <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute top-1/3 right-1/4 w-4 h-4 text-pink-400 animate-bounce" style={{ animationDelay: '1s' }} />
            <Sparkles className="absolute top-1/2 left-1/6 w-5 h-5 text-blue-400 animate-bounce" style={{ animationDelay: '1.5s' }} />
            <Sparkles className="absolute top-2/3 right-1/3 w-6 h-6 text-purple-400 animate-bounce" style={{ animationDelay: '2s' }} />
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Success Icon with Animation */}
        <div className="relative mb-8 mt-10">
          <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20"></div>
          <div className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-800" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
            Payment Successful! 🎉
          </h1>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
            Woohoo! Your subscription is now active and ready to use. Welcome to the family!
          </p>
        </div>

        {/* Order Card */}
        <div className="w-full max-w-lg mb-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Order Details</h2>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Completed
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl border border-violet-100">
                <span className="font-medium text-slate-700">Order ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-slate-800">{order.orderId}</span>
                  <button
                    onClick={copyOrderId}
                    className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500 hover:text-slate-700" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                  <div className="text-sm text-slate-600 mb-1">Plan</div>
                  <div className="font-semibold text-slate-800">{order.plan?.name}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="text-sm text-slate-600 mb-1">Amount</div>
                  <div className="font-bold text-lg text-slate-800">${order.amount}</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="text-sm text-slate-600 mb-1">Billing Cycle</div>
                <div className="font-semibold text-slate-800 capitalize">{order.billingCycle}</div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <div className="text-sm text-slate-600 mb-1">Email</div>
                <div className="font-medium text-slate-800 text-sm">{order.customer_email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="group flex-1 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group flex-1 bg-white/70 hover:bg-white/90 backdrop-blur-lg border border-white/50 text-slate-700 font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Get Receipt
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm max-w-md">
            📧 A confirmation email has been sent to your inbox. Questions? We're here to help 24/7!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
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

export default Success;
