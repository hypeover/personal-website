"use client";
import React, { useState } from "react";
import { MailIcon } from "lucide-react";
import { LinkedInIcon } from "@/components/home/dock-items/icons/linkedin-icon";
import { GitHubIcon } from "@/components/home/dock-items/icons/github-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { EmailSender } from "./email-sender";
import { CopyButton } from "@/components/home/dock-items/copy-button";



const IconsDock = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle" className="mt-0  py-6">
          <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a target='_blank' href="https://github.com/hypeover" className="color-primary"><GitHubIcon className="h-6 w-6" /></a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a target='_blank' href="https://www.linkedin.com/in/krystian-r-256975204/" className="color-primary"><LinkedInIcon className="h-6 w-6" /></a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a className="color-primary" onClick={() => setIsOpen(true)}><MailIcon className="h-6.5 w-6.5" /></a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send Email</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a className="color-primary"><CopyButton content="krystian14113@gmail.com" /></a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy my Email</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
    <EmailSender isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default IconsDock;
