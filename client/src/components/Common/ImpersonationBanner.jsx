import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stopImpersonating } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

const ImpersonationBanner = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user || !user.isImpersonating) {
        return null;
    }

    const handleStopImpersonating = async () => {
        try {
            await dispatch(stopImpersonating()).unwrap();
            toast.success("Returned to Admin 🛡️", {
                description: "You are now logged back into your admin account.",
            });
            navigate('/admin/users');
        } catch (error) {
            toast.error("Failed to return to admin ❌", {
                description: error?.message || "Something went wrong.",
            });
        }
    };

    return (
        <div className="bg-yellow-500 text-black py-2 px-4 flex justify-between items-center sticky top-0 z-[1000] shadow-md">
            <div className="flex items-center gap-2">
                <span className="font-bold">Impersonating:</span>
                <span className="bg-yellow-600 px-2 py-0.5 rounded text-sm font-medium">
                    {user.name} ({user.email})
                </span>
            </div>
            <button
                onClick={handleStopImpersonating}
                className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors text-sm font-bold cursor-pointer"
            >
                <LogOut className="w-4 h-4" />
                Return to Admin
            </button>
        </div>
    );
};

export default ImpersonationBanner;
