import { useEffect, useState } from "react";
import React from 'react';
import UserService from "@services/userService";
import { useTranslation } from "react-i18next";

const SubscriptionOverview = () => {
    
    const { t } = useTranslation();
    
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(""); 
    const [isCancelConfirmation, setIsCancelConfirmation] = useState(false); 
    const [duration, setDuration] = useState("1"); 

    const openPopup = (plan: string) => {
      if (plan === "premium") {
        setSelectedSubscription("Premium");
        setIsCancelConfirmation(false);
        setShowPopup(true); 
      } else if (plan === "basic") {
        setDuration("unlimited");
        setSelectedSubscription("Basic");
        setIsCancelConfirmation(true);
        setShowPopup(true);
      }
    };

    const handleSubscriptionChange = async (duration: string) => {
      try {
        console.log("Selected subscription:", selectedSubscription);
        console.log("Duration:", duration);
    
        if (duration === "unlimited") {
          console.log("Canceling subscription with Unlimited duration");
          await UserService.changeSubscription("basic", "unlimited");
        } else {
          console.log(`Changing to Premium plan for ${duration} months`);
          await UserService.changeSubscription("premium", duration);
          
        }
        setShowPopup(false);
      } catch (error) {
        console.error("Error changing subscription:", error);
      }
    };
    
  
    return (
      <>
        <main className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Subscriptions</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => openPopup("basic")}
              className="border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">Basic Plan</h2>
              <p className="text-lg font-medium text-gray-600 mb-4">Perfect for beginners.</p>
              <ul className="list-disc list-inside text-left text-gray-800 mb-6">
                <li>Access to 100 songs per month</li>
                <li>Create up to 3 private playlists</li>
                <li>Receive newsletters</li>
                <li>Basic analytics</li>
              </ul>
              <p className="text-xl font-bold text-gray-800">Free</p>
            </div>
            <div
              onClick={() => openPopup("premium")}
              className="border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">Premium Plan</h2>
              <p className="text-lg font-medium text-gray-600 mb-4">For music enthusiasts.</p>
              <ul className="list-disc list-inside text-left text-gray-800 mb-6">
                <li>Unlimited songs</li>
                <li>Unlimited private playlists</li>
                <li>Receive newsletters</li>
                <li>Advanced analytics</li>
              </ul>
              <p className="text-xl font-bold text-gray-800">9.99€ a month</p>
            </div>
          </div>
  
          {showPopup && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">
                  {isCancelConfirmation
                    ? "Are you sure you want to cancel your subscription?"
                    : "Set Duration"}
                </h2>
  
                <p className="text-gray-600 mb-4">
                  {isCancelConfirmation
                    ? "Your subscription will be canceled and set to Unlimited duration."
                    : `Please select the duration (in months) for the ${selectedSubscription} plan.`}
                </p>
  
                {!isCancelConfirmation ? (
                  <>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value) }
                      className="border border-gray-300 rounded-md p-2 w-full mb-4"
                    />
                  </>
                ) : (
                  <p className="text-lg text-gray-700 mb-4">
                    Your subscription will be canceled, and the duration will be set to "Unlimited".
                  </p>
                )}
  
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={ () => handleSubscriptionChange(duration === "unlimited" ? "unlimited" : duration)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </>
    );
  };
  
  export default SubscriptionOverview;