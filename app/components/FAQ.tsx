"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How are engagement points calculated?",
    answer:
      "Engagement points are calculated based on various metrics including likes, retweets, replies, and quote tweets. Each interaction type has a different point value, and the total is weighted based on your follower count and overall reach.",
  },
  {
    question: "What wallet types are supported?",
    answer:
      "We currently support MetaMask, WalletConnect, Coinbase Wallet, and Keplr for Secret Network integration. More wallet integrations are being added regularly to ensure broad compatibility with the Web3 ecosystem.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your data is encrypted and stored securely using Secret Network's privacy-preserving blockchain technology. We implement industry-standard security practices and regular audits to ensure the safety of your information while maintaining your privacy.",
  },
  {
    question: "Can I export my engagement data?",
    answer:
      "Yes, you can export your engagement data in various formats including CSV and JSON. This feature helps you analyze your performance using external tools or integrate with other platforms.",
  },
  {
    question: "What is Secret Network and why is it used?",
    answer:
      "Secret Network is a privacy-first blockchain that enables encrypted data even in a decentralized environment. We use Secret Network to store your engagement metrics in a way that only you can access, ensuring your social media analytics remain private while still benefiting from blockchain security.",
  },
  {
    question: "Do I need to use Secret Network to use this platform?",
    answer:
      "No, Secret Network integration is optional but recommended for users who want enhanced privacy. You can still use the platform with other supported wallets, but Secret Network provides the highest level of data privacy.",
  },
];

export function FAQ() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="glassmorphic p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white hover:text-white/80">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
