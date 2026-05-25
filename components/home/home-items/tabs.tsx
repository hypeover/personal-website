import React from 'react'
import { MagneticTabs } from "@/components/ruixen/magnetic-tabs";

const Tabs = () => {
  return (
    <MagneticTabs className='mt-5'
      items={[
        {
          value: "projects",
          label: "Projects",
          content: "Overview content here.",
        },
        {
          value: "photos",
          label: "Photos",
          content: "Activity content here.",
        },
      ]}
      defaultValue="projects"
    />
  )
}

export default Tabs


