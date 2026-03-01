import React, { useEffect, useState } from "react";
import goodIcon from '/images/Home/good-icon.png';
import crossIcon from '/images/Home/cross-icon.png';

import { useSelector, useDispatch } from "react-redux";
import { fetchPlans } from "../../features/admin/plans/planSlice";


const PriceCard = ({ billingCycle }) => {
    const dispatch = useDispatch();
    const { items: plans, loading } = useSelector((state) => state.adminPlan);
    const { user } = useSelector((state) => state.auth);
    const baseUrl = import.meta.env.VITE_SERVER_API_URL;
    const [processingPlanId, setProcessingPlanId] = useState(null);

    useEffect(() => {
        dispatch(fetchPlans());
    }, [dispatch]);

    if (loading) return <p className="text-center">Loading...</p>;

    // filter plans based on billing cycle
    const priceCard = plans.filter((plan) => plan.active);

    const handleCheckout = async (planId, planName, price) => {
        if (processingPlanId) return;

        try {
            if (!user) {
                alert("Please login to purchase a plan");
                return;
            }

            setProcessingPlanId(planId);
            console.log(price, 'price');
            console.log(JSON.stringify({ planId, billingCycle, amount: price, userId: user._id }), 'body');


            const res = await fetch(`${baseUrl}/api/admin/orders/create-checkout-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ✅ send cookies
                body: JSON.stringify({ planId, planName, billingCycle, amount: price, userId: user._id }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Stripe error:", data);
                alert("Checkout failed: " + (data.error || "Unknown error"));
                setProcessingPlanId(null);
            }
        } catch (err) {
            console.error("Checkout Error:", err);
            alert("Checkout error: " + err.message);
            setProcessingPlanId(null);
        }
    };



    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 md:gap-10 bg-white p-4 md:p-15 mt-10 rounded-lg">
            {priceCard.map((plan) => (
                <div key={plan._id} className={`relative rounded-lg p-4 md:p-10 border ${plan.popular
                    ? "border-orange-400 bg-orange-50 shadow-xl scale-105 overflow-hidden"
                    : "border-[#F1F1F3] bg-[rgb(252,252,253)]"
                    }`}>
                    {/* Popular badge */}
                    {plan.popular && (
                        <div className="absolute top-4 right-[-30px] rotate-45 bg-orange-500 text-white px-7 py-1 shadow-lg font-semibold text-xs uppercase tracking-wider">
                            Popular
                        </div>
                    )}
                    <h2
                        className={`text-md mb-15 text-center rounded-lg py-2 border ${plan.popular ? "bg-orange-100 border-orange-300" : "bg-[#FFF9F0] border-[#FFEACC]"
                            }`}
                    >
                        {plan.name}
                    </h2>
                    <p className="text-6xl font-bold mt-2 text-center">
                        ${billingCycle === "monthly" ? plan.monthly : plan.yearly}
                        <span className="text-sm font-normal px-1">/ {billingCycle}</span>
                    </p>
                    <div className="bg-white mt-10 border border-[#F1F1F3] rounded-lg">
                        <h2 className="text-center text-lg my-6">Available Features</h2>
                        <ul className="mx-10 my-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center my-4 px-3 py-3 border border-[#F1F1F3] rounded-lg">
                                    <img
                                        src={feature.includes("✗") ? crossIcon : goodIcon}
                                        className="h-8 w-8 p-[6px] rounded bg-[#FFF9F0] mr-3"
                                        alt=""
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleCheckout(plan._id, plan.name, billingCycle === "monthly" ? plan.monthly : plan.yearly)}
                            disabled={processingPlanId !== null}
                            className={`w-full py-3 rounded-b-lg cursor-pointer transition-colors ${processingPlanId === plan._id
                                ? "bg-orange-300 cursor-not-allowed"
                                : processingPlanId !== null
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-orange-400 hover:bg-orange-500 text-white"
                                }`}
                        >
                            {processingPlanId === plan._id ? "Processing..." : (plan.popular ? "Get Started Now" : "Get Started")}
                        </button>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default PriceCard
