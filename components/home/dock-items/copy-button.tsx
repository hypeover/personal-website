"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/copy";
import { CheckIcon, AtSign } from "lucide-react";

interface CopyButtonProps extends ComponentProps<"button"> {
  content: string;
  iconSize?: number;
}

const CopyButton = ({ content, iconSize = 20, className, ...props }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = async () => {
    await copyToClipboard(content);
    setIsCopied(true);
  };

  return (
    <button
      title="Copy to clipboard"
      className={cn(
        "cursor-pointer",
        "flex", "flex-row", "justify-center",
        "transition-colors duration-200 ease-in-out",
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? (
        <CheckIcon
          size={iconSize}
          className="animate-in zoom-in-50 text-green-900 duration-200 dark:text-green-400 h-6 w-6"
        />
      ) : (
        <AtSign
          size={iconSize}
          className="animate-in zoom-in-50 duration-200 h-6 w-6"
        />
      )}
    </button>
  );
};

export { CopyButton };