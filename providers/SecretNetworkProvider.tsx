"use client";

import { SecretNetworkClient } from "secretjs";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface EngagementRecord {
  tweet_id: string;
  points: number;
  engagement_type: string;
  created_at: number;
}

interface SecretNetworkContextType {
  client: SecretNetworkClient | null;
  address: string | null;
  isConnected: boolean;
  viewingKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  createViewingKey: () => Promise<string | null>;
  storeEngagementPoints: (
    userId: string,
    tweetId: string,
    points: number,
    engagementType: string
  ) => Promise<string | null>;
  getEngagementPoints: (userId: string) => Promise<EngagementRecord[]>;
}

const SecretNetworkContext = createContext<SecretNetworkContextType>({
  client: null,
  address: null,
  isConnected: false,
  viewingKey: null,
  connect: async () => {},
  disconnect: () => {},
  createViewingKey: async () => null,
  storeEngagementPoints: async () => null,
  getEngagementPoints: async () => [],
});

export const useSecretNetwork = () => useContext(SecretNetworkContext);

interface SecretNetworkProviderProps {
  children: ReactNode;
}

// Contract address for our engagement points tracking
// Would be deployed as part of the project setup
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SECRET_CONTRACT_ADDRESS || "";
const SECRET_CHAIN_ID = process.env.NEXT_PUBLIC_SECRET_CHAIN_ID || "secret-4";
const SECRET_RPC_URL =
  process.env.NEXT_PUBLIC_SECRET_RPC_URL || "https://lcd.secret.express";

export const SecretNetworkProvider = ({
  children,
}: SecretNetworkProviderProps) => {
  const [client, setClient] = useState<SecretNetworkClient | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [viewingKey, setViewingKey] = useState<string | null>(null);

  // Connect to Secret Network
  const connect = async () => {
    try {
      // When using with Keplr wallet
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return;
      }

      // Request connection to Secret Network
      await window.keplr.enable(SECRET_CHAIN_ID);

      // Get the offlineSigner
      const offlineSigner = window.keplr.getOfflineSigner(SECRET_CHAIN_ID);

      // Get user address
      const accounts = await offlineSigner.getAccounts();
      const userAddress = accounts[0].address;

      // Create the Secret Network client
      const secretClient = new SecretNetworkClient({
        url: SECRET_RPC_URL,
        chainId: SECRET_CHAIN_ID,
        wallet: offlineSigner,
        walletAddress: userAddress,
      });

      setClient(secretClient);
      setAddress(userAddress);
      setIsConnected(true);

      console.log("Connected to Secret Network:", userAddress);
    } catch (error) {
      console.error("Failed to connect to Secret Network:", error);
    }
  };

  // Disconnect from Secret Network
  const disconnect = () => {
    setClient(null);
    setAddress(null);
    setIsConnected(false);
    setViewingKey(null);
  };

  // Create a viewing key for the user
  const createViewingKey = async (): Promise<string | null> => {
    if (!client || !CONTRACT_ADDRESS || !address) return null;

    try {
      // Generate random entropy for the viewing key
      const entropy = Math.random().toString(36).substring(2, 15);

      const result = await client.tx.compute.executeContract({
        sender: address,
        contract_address: CONTRACT_ADDRESS,
        code_hash: "", // Get code hash from contract deployment
        msg: {
          create_viewing_key: {
            entropy,
          },
        },
      });

      // Parse viewing key from transaction result
      const logs = JSON.parse(result.rawLog || "[]");
      const viewingKeyEvent = logs.find((log: any) =>
        log.events?.some((event: any) =>
          event.attributes?.some((attr: any) => attr.key === "viewing_key")
        )
      );

      if (viewingKeyEvent) {
        const viewingKeyAttr = viewingKeyEvent.events
          .find((event: any) =>
            event.attributes.some((attr: any) => attr.key === "viewing_key")
          )
          .attributes.find((attr: any) => attr.key === "viewing_key");

        const newViewingKey = viewingKeyAttr.value;
        setViewingKey(newViewingKey);
        return newViewingKey;
      }

      return null;
    } catch (error) {
      console.error("Error creating viewing key:", error);
      return null;
    }
  };

  // Store engagement points on Secret Network
  const storeEngagementPoints = async (
    userId: string,
    tweetId: string,
    points: number,
    engagementType: string
  ): Promise<string | null> => {
    if (!client || !CONTRACT_ADDRESS || !address) return null;

    try {
      const result = await client.tx.compute.executeContract({
        sender: address,
        contract_address: CONTRACT_ADDRESS,
        code_hash: "", // Get code hash from contract deployment
        msg: {
          store_engagement: {
            user_id: userId,
            tweet_id: tweetId,
            points,
            engagement_type: engagementType,
          },
        },
      });

      return result.transactionHash;
    } catch (error) {
      console.error("Error storing engagement points:", error);
      return null;
    }
  };

  // Get engagement points from Secret Network
  const getEngagementPoints = async (
    userId: string
  ): Promise<EngagementRecord[]> => {
    if (!client || !CONTRACT_ADDRESS || !viewingKey) {
      // If no viewing key, try to create one
      if (client && CONTRACT_ADDRESS && !viewingKey) {
        const newViewingKey = await createViewingKey();
        if (!newViewingKey) return [];
      } else {
        return [];
      }
    }

    try {
      const queryResult = await client.query.compute.queryContract({
        contract_address: CONTRACT_ADDRESS,
        code_hash: "", // Get code hash from contract deployment
        query: {
          get_user_engagement: {
            user_id: userId,
            viewing_key: viewingKey,
          },
        },
      });

      // Parse result
      return ((queryResult as any).data.engagements ||
        []) as EngagementRecord[];
    } catch (error) {
      console.error("Error getting engagement points:", error);
      return [];
    }
  };

  // Value object for the context
  const value = {
    client,
    address,
    isConnected,
    viewingKey,
    connect,
    disconnect,
    createViewingKey,
    storeEngagementPoints,
    getEngagementPoints,
  };

  return (
    <SecretNetworkContext.Provider value={value}>
      {children}
    </SecretNetworkContext.Provider>
  );
};

// Add Keplr wallet type definitions
declare global {
  interface Window {
    keplr: any;
  }
}
