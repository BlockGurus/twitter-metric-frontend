"use client";

import { useState } from "react";
import { useSecretNetwork } from "@/providers/SecretNetworkProvider";
import { Button } from "@/components/ui/button";
import { LockKeyhole, Key } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function SecretNetworkConnect() {
  const {
    connect,
    disconnect,
    isConnected,
    address,
    viewingKey,
    createViewingKey,
    getEngagementPoints,
  } = useSecretNetwork();
  const [engagementData, setEngagementData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingKey, setIsCreatingKey] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      await connect();
    }
  };

  const handleCreateViewingKey = async () => {
    if (!isConnected || !address) return;

    setIsCreatingKey(true);
    try {
      await createViewingKey();
    } catch (error) {
      console.error("Error creating viewing key:", error);
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleViewPrivateData = async () => {
    if (!isConnected || !address || !viewingKey) return;

    setIsLoading(true);
    try {
      // In a real implementation, you would get the actual user ID
      const userId = address;
      const data = await getEngagementPoints(userId);
      setEngagementData(data);
    } catch (error) {
      console.error("Error fetching private engagement data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <Card className="glassmorphic p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <LockKeyhole className="h-6 w-6 text-white" />
            <h3 className="text-xl font-semibold text-white">
              Secret Network Integration
            </h3>
          </div>

          <p className="text-gray-300 text-center">
            Connect to Secret Network to securely store and access your private
            engagement data. Your metrics are encrypted and only accessible to
            you with a viewing key.
          </p>

          <Button
            onClick={handleConnect}
            className={`w-full ${
              isConnected
                ? "bg-red-500 hover:bg-red-600"
                : "bg-white/10 hover:bg-white/20"
            } text-white`}
          >
            {isConnected
              ? "Disconnect Secret Network"
              : "Connect to Secret Network"}
          </Button>

          {isConnected && !viewingKey && (
            <Button
              onClick={handleCreateViewingKey}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isCreatingKey}
            >
              <Key className="mr-2 h-4 w-4" />
              {isCreatingKey ? "Creating Viewing Key..." : "Create Viewing Key"}
            </Button>
          )}

          {isConnected && viewingKey && (
            <Button
              onClick={handleViewPrivateData}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "View Private Engagement Data"}
            </Button>
          )}

          {isConnected && (
            <div className="text-sm text-gray-300 text-center">
              <p>Connected Address:</p>
              <p className="font-mono truncate max-w-[300px]">{address}</p>

              {viewingKey && (
                <>
                  <p className="mt-2">Viewing Key:</p>
                  <p className="font-mono truncate max-w-[300px]">
                    {viewingKey.substring(0, 6)}...
                    {viewingKey.substring(viewingKey.length - 6)}
                  </p>
                </>
              )}
            </div>
          )}

          {engagementData.length > 0 && (
            <div className="w-full mt-4">
              <h4 className="text-white font-semibold mb-2">
                Your Private Engagement Data
              </h4>
              <div className="bg-black/30 p-4 rounded-md max-h-60 overflow-y-auto text-sm">
                {engagementData.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 p-2 border border-white/10 rounded"
                  >
                    <p>
                      <span className="text-gray-400">Tweet ID:</span>{" "}
                      {item.tweet_id}
                    </p>
                    <p>
                      <span className="text-gray-400">Points:</span>{" "}
                      {item.points}
                    </p>
                    <p>
                      <span className="text-gray-400">Type:</span>{" "}
                      {item.engagement_type}
                    </p>
                    <p>
                      <span className="text-gray-400">Date:</span>{" "}
                      {new Date(item.created_at * 1000).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isConnected &&
            viewingKey &&
            engagementData.length === 0 &&
            !isLoading && (
              <p className="text-gray-400 text-sm">
                No private engagement data available yet.
              </p>
            )}
        </div>
      </Card>
    </motion.div>
  );
}
