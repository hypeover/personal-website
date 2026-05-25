import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

const CvButton = () => {
  return (
    <a href="/Krystian_Rdzonkowski_Resume.pdf" target="_blank" className="mr-3">
      <Button
        size="lg"
        className="text-lg py-6 px-4 box-border cursor-pointer rounded-xl"
        data-icon="inline-start"
        
      >
        <FileSpreadsheet className="h-7 w-7" />
        Download CV
      </Button>
    </a>
  );
};

export default CvButton;
