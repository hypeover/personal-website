"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SendButtonProps extends ComponentProps<"button"> {
  iconSize?: number;
}

const SendButton = ({ iconSize = 20, className, onClick, ...props }: SendButtonProps) => {
  const [isSent, setIsSent] = useState<boolean>(false);

  useEffect(() => {
    if (!isSent) return;

    const timeout = setTimeout(() => {
      setIsSent(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSent]);

  const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSent(true);
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      className={cn(
        "cursor-pointer",
        "flex", "flex-row", "justify-center",
        "transition-colors duration-200 ease-in-out",
        className,
      )}
      {...props}
      onClick={handleSend}
    >
      Send
      {isSent ? (
        <CheckIcon
          size={iconSize}
          className="animate-in zoom-in-50"
        />
      ) : (
        <Send
          size={iconSize}
          className="animate-in zoom-in-50 duration-200"
        />
      )}
    </Button>
  );
};

export { SendButton };