"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Eraser } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendButton } from "./send-button";
import { useState } from "react";
import { sendEmail } from "@/lib/send";

interface EmailSenderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EmailSender({ isOpen, setIsOpen }: EmailSenderProps) {
  const [email, setEmail] = useState({ author: "", subject: "", content: "" });

  const container: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm dark:bg-zinc-950/40"
            />

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-full max-w-[480px] overflow-hidden rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 ring-1 ring-zinc-950/5"
            >
              <div className="absolute right-6 top-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 dark:hover:bg-zinc-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <motion.div variants={item} className="mb-3 text-left">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Send email to me...
                </h2>
              </motion.div>

              <motion.div variants={item} className="mb-3">
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="font-semibold">
                      From:
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    value={email.author || ""}
                    onChange={(e) =>
                      setEmail((prev) => ({ ...prev, author: e.target.value }))
                    }
                  />
                </InputGroup>
              </motion.div>

              <motion.div variants={item} className="relative mb-3">
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="font-semibold">
                      To:
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="input-demo-disabled"
                    type="email"
                    placeholder="krystian14113@gmail.com"
                    disabled
                    className="font-semibold"
                  />
                </InputGroup>
              </motion.div>

              <motion.div variants={item} className="mb-3">
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="font-semibold">
                      Subject:
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    value={email.subject || ""}
                    onChange={(e) =>
                      setEmail((prev) => ({ ...prev, subject: e.target.value }))
                    }
                  />
                </InputGroup>
              </motion.div>

              <motion.div variants={item} className="mb-3">
                <Textarea
                  value={email.content || ""}
                  onChange={(e) =>
                    setEmail((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Type your message here."
                />
              </motion.div>

              <motion.div
                variants={item}
                className="mb-3 flex flex-row justify-between w-full"
              >
                <Button
                  onClick={() =>
                    setEmail({ author: "", content: "", subject: "" })
                  }
                  type="button"
                >
                  <Eraser />
                </Button>
                <SendButton
                  onClick={() => {
                    sendEmail(email);
                    setEmail({ author: "", content: "", subject: "" });
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export { EmailSender, type EmailSenderProps };

//https://www.prompt-kit.com/docs/prompt-input?utm_source=shoogle.dev&utm_medium=referral&utm_campaign=search

//https://dribbble.com/shots/17197476-Crew-work-Email-composer
//https://dribbble.com/shots/23241439-Email-Composer-AI-Style-kit
//https://dribbble.com/shots/26083118-Create-email-inbox-composition
