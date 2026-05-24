import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

const CvButton = () => {
  return (
    <a href="/Krystian_Rdzonkowski_Resume.pdf" target="_blank" className="mr-3">
      <Button
        size="lg"
        className="text-lg py-5 px-4 box-border cursor-pointer text-md rounded-xl"
        data-icon="inline-start"
        
      >
        <FileSpreadsheet size={36} />
        Download CV
      </Button>
    </a>
  );
};

export default CvButton;
