export const NAV_LINKS = [
  { title: "About", url: "#about" },
  { title: "Datasets", url: "#discover" },
  { title: "Data Analysis", url: "#faq" },
  { title: "APIs", url: "#faq" },
  { title: "News", url: "/" },

];


export const SEARCH_NAV_LINKS = [
  { title: "Home", url: "/" },
  { title: "Search Datasets", url: "/search" },

];

export const HERO = {
  title: "CORDON Data Portal",
  description:
    "Central Oceanographic Repository of Data from Observing Networks Open Data Portal.  Access to a range of digital tools for exploring oceanographic data from various sources. "
};

// export const SIDE_FILTERS = [
//   {
//     title: "Source",
//     items: ["PML", "Atlas", "CMS", "C3S", "NOAA"]
//   },

//   {
//     title: "Theme",
//     items: ["Satellite (Sentinel-2)", "Satellite (Sentinel-3)", "Insitu Data", "Analysis Ready Data",]
//   },
//   {
//     title: "File Formats",
//     items: ["CSV", "XLS", "PDF", "NetCDF", "JSON"]
//   }
// ]

export const SIDE_FILTERS = [

  {
    title: "File Formats",
    items: ["CSV", "XLS", "PDF", "NetCDF"]
  }
]



export const DISCOVER = [
  {
    name: "Sentinel-2",
    imgurl: "/sentinel2.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, fugiat omnis adipisci consequuntur a vitae. Facere ",
    path: "/search?category=Satellite (Sentinel-2)"

  },
  {
    name: "Sentinel-3",
    imgurl: "/sentinel3.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, fugiat omnis adipisci consequuntur a vitae. Facere ",
    path: "/search?category=Satellite (Sentinel-3)"

  },
  {
    name: "Insitu Data",
    imgurl: "/insitu.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, fugiat omnis adipisci consequuntur a vitae. Facere ",
    path: "/search?category=Insitu Data"

  },
  {
    name: "Analysis Ready Data",
    imgurl: "/ard.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, fugiat omnis adipisci consequuntur a vitae. Facere ",
    path: "/search?category=Analysis Ready Data"
  },

];


export const FOOTER = {
  description: `Your Real Estate Company is dedicated to helping you find the perfect home. Whether you're looking to buy, sell, or rent, our team of experienced professionals is here to guide you every step of the way.`,
  copyright: `Copyright © PML Applications.`,

};


export const FAQ = [
  {
    question: "How can I access/download data for external use (APIs)?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quae maiores maxime facilis vero nostrum, fuga saepe natus quaerat quo neque laudantium iusto, deserunt, molestiae minus error et obcaecati. Quia?",
    value: "faq-1",
  },
  {
    question: "Accessing the Jupyter Hub",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quae maiores maxime facilis vero nostrum, fuga saepe natus quaerat quo neque laudantium iusto, deserunt, molestiae minus error et obcaecati. Quia?",
    value: "faq-2",
  },

  {
    question: "What types of datasets are available?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quae maiores maxime facilis vero nostrum, fuga saepe natus quaerat quo neque laudantium iusto, deserunt, molestiae minus error et obcaecati. Quia?",
    value: "faq-4",
  },
  {
    question: "Can data be obtained in multiple formats?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quae maiores maxime facilis vero nostrum, fuga saepe natus quaerat quo neque laudantium iusto, deserunt, molestiae minus error et obcaecati. Quia?",
    value: "faq-5",
  },
  {
    question: "Authentication process for accessing private datasets?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quae maiores maxime facilis vero nostrum, fuga saepe natus quaerat quo neque laudantium iusto, deserunt, molestiae minus error et obcaecati. Quia?",
    value: "faq-6",
  },

];




export const OCEANOGRAPHIC_DATASETS = [
  {
    id: 1,
    title: "Arctic Sea Ice Extent - 2023",
    last_updated: "6 months ago",
    organization: "National Oceanic and Atmospheric Administration (NOAA)",
    desc: "This dataset, provided by the National Oceanic and Atmospheric Administration (NOAA), offers a comprehensive analysis of Arctic sea ice extent for the year 2023. It includes monthly averages, minimum and maximum extents, and comparative insights with previous years. The data, primarily in netCDF and PDF formats, serves as a vital resource for understanding the dynamics of Arctic ice cover and its implications on climate change and ecosystems.",
    resource_count: 8,
    file_types: ["netcdf", "pdf"],
    date_created: "2023-01-15"
  },
  {
    id: 2,
    title: "Global Ocean Salinity Measurements",
    last_updated: "1 year ago",
    organization: "World Ocean Observatory (WOO)",
    desc: "Curated by the World Ocean Observatory (WOO), this dataset presents a meticulous compilation of global ocean salinity measurements sourced from diverse platforms including shipboard expeditions and satellite observations. Spanning various file types such as netCDF, CSV, and XLS, this resource provides researchers with valuable insights into the spatial and temporal distribution of salinity, aiding studies on ocean circulation, climate patterns, and marine life habitats.",
    resource_count: 15,
    file_types: ["netcdf", "csv", "xls"],
    date_created: "2022-04-30"
  },
  {
    id: 3,
    title: "Coral Reef Health Assessment - Pacific Islands",
    last_updated: "3 months ago",
    organization: "Pacific Marine Environmental Laboratory (PMEL)",
    desc: "Conducted by the Pacific Marine Environmental Laboratory (PMEL), this dataset offers an in-depth assessment of coral reef health across the Pacific Islands region. It encompasses critical factors such as bleaching events, biodiversity indices, and ecological threats, providing valuable insights for conservation efforts and ecosystem management. Available in netCDF, PDF, and CSV formats, this resource serves as a cornerstone for understanding and safeguarding these vital marine ecosystems.",
    resource_count: 12,
    file_types: ["netcdf", "pdf", "csv"],
    date_created: "2023-02-10"
  },
  {
    id: 4,
    title: "Deep Sea Vent Ecosystems - Exploration Report",
    last_updated: "2 years ago",
    organization: "National Deep Submergence Facility (NDSF)",
    desc: "Presented by the National Deep Submergence Facility (NDSF), this comprehensive report delves into the exploration of deep-sea vent ecosystems. It provides detailed insights into aspects such as species diversity, geological features, and hydrothermal vent dynamics. With 20 resources available primarily in PDF format, this report serves as a valuable reference for researchers, educators, and policymakers interested in understanding the unique ecosystems thriving in the depths of our oceans.",
    resource_count: 20,
    file_types: ["pdf"],
    date_created: "2021-09-22"
  },
  {
    id: 5,
    title: "Marine Microplastics Distribution - 2024",
    last_updated: "1 month ago",
    organization: "Marine Conservation Society (MCS)",
    desc: "Compiled by the Marine Conservation Society (MCS), this dataset provides insights into the distribution of microplastics in marine environments for the year 2024. It highlights hotspots and potential impacts on marine life, serving as a crucial resource for policymakers, researchers, and environmentalists striving to address the pervasive issue of marine pollution. Available in CSV and PDF formats, this dataset aids in understanding and mitigating the adverse effects of microplastics on marine ecosystems.",
    resource_count: 10,
    file_types: ["csv", "pdf"],
    date_created: "2024-03-10"
  },
  {
    id: 6,
    title: "Wave Energy Potential - Global Analysis",
    last_updated: "1 year ago",
    organization: "International Renewable Energy Agency (IRENA)",
    desc: "Conducted by the International Renewable Energy Agency (IRENA), this global analysis provides insights into the wave energy potential across different regions. It includes data on wave heights, energy flux, and regions suitable for wave energy conversion, offering valuable information for policymakers and renewable energy stakeholders. With 18 resources available in netCDF and XLS formats, this dataset facilitates the exploration and utilization of wave energy as a sustainable alternative to traditional fossil fuels.",
    resource_count: 18,
    file_types: ["netcdf", "xls"],
    date_created: "2022-07-20"
  },
  {
    id: 7,
    title: "Antarctic Krill Population Dynamics",
    last_updated: "4 months ago",
    organization: "British Antarctic Survey (BAS)",
    desc: "This study, conducted by the British Antarctic Survey (BAS), focuses on the population dynamics of Antarctic krill. It provides insights into abundance trends, distribution maps, and ecological implications, offering valuable information for researchers and policymakers concerned with Southern Ocean ecosystems. With 14 resources available in netCDF, PDF, and CSV formats, this dataset contributes to our understanding of the ecological roles and conservation of Antarctic krill.",
    resource_count: 14,
    file_types: ["netcdf", "pdf", "csv"],
    date_created: "2023-01-05"
  },
  {
    id: 8,
    title: "Coastal Erosion Rates - 2023 Update",
    last_updated: "9 months ago",
    organization: "Coastal Research Institute (CRI)",
    desc: "Provided by the Coastal Research Institute (CRI), this dataset offers an update on coastal erosion rates for the year 2023. It includes data on beach profiles, sediment loss, and vulnerability assessments, aiding coastal management and adaptation strategies. With 11 resources available in CSV and XLS formats, this dataset serves as a valuable tool for coastal planners, engineers, and policymakers grappling with the challenges posed by sea-level rise and coastal erosion.",
    resource_count: 11,
    file_types: ["csv", "xls"],
    date_created: "2023-04-28"
  },
  {
    id: 9,
    title: "Ocean Acidification Monitoring Program",
    last_updated: "2 years ago",
    organization: "Ocean Conservancy",
    desc: "Implemented by the Ocean Conservancy, this program monitors ocean acidification trends worldwide. It includes data on pH levels, carbonate chemistry, and impacts on marine ecosystems, providing valuable insights for scientists, policymakers, and conservationists. With 16 resources available primarily in PDF format, this dataset contributes to our understanding of the ongoing changes in ocean chemistry and their implications for marine life and global carbon cycles.",
    resource_count: 16,
    file_types: ["pdf"],
    date_created: "2022-02-15"
  },
  {
    id: 10,
    title: "Marine Mammal Migration Patterns - 2024",
    last_updated: "2 weeks ago",
    organization: "Marine Mammal Center (MMC)",
    desc: "This dataset, compiled by the Marine Mammal Center (MMC), provides insights into marine mammal migration patterns for the year 2024. It includes data on whale, dolphin, and seal migration routes and timing, offering valuable information for researchers and conservationists. With 9 resources available in netCDF and CSV formats, this dataset aids in understanding the movements and behaviors of marine mammals and supports conservation efforts to protect their habitats.",
    resource_count: 9,
    file_types: ["netcdf", "csv"],
    date_created: "2024-04-10"
  },
  {
    id: 11,
    title: "Tidal Energy Potential - Coastal Regions",
    last_updated: "1 year ago",
    organization: "National Renewable Energy Laboratory (NREL)",
    desc: "This assessment, conducted by the National Renewable Energy Laboratory (NREL), focuses on the tidal energy potential in coastal regions. It includes data on tidal current speeds, power density, and feasibility for energy generation, offering valuable insights for renewable energy stakeholders and policymakers. With 13 resources available in netCDF and PDF formats, this dataset facilitates the exploration and development of tidal energy as a clean and renewable resource.",
    resource_count: 13,
    file_types: ["netcdf", "pdf"],
    date_created: "2023-03-15"
  },
  {
    id: 12,
    title: "Marine Heatwaves - Historical Analysis",
    last_updated: "6 months ago",
    organization: "Scripps Institution of Oceanography",
    desc: "Conducted by the Scripps Institution of Oceanography, this analysis focuses on historical marine heatwaves. It includes data on frequency, duration, and spatial extent, with implications for marine ecosystems and climate patterns. With 22 resources available in CSV and PDF formats, this dataset contributes to our understanding of the impacts of extreme ocean temperatures on marine biodiversity, fisheries, and coastal communities.",
    resource_count: 22,
    file_types: ["csv", "pdf"],
    date_created: "2023-10-02"
  },
  {
    id: 13,
    title: "Seafloor Bathymetry Maps - Atlantic Ocean",
    last_updated: "8 months ago",
    organization: "International Hydrographic Organization (IHO)",
    desc: "Provided by the International Hydrographic Organization (IHO), these bathymetric maps detail the seafloor topography of the Atlantic Ocean. They provide valuable information on underwater features such as ridges and trenches, supporting navigation, marine research, and resource exploration. With 10 resources available in netCDF and PDF formats, these maps aid in understanding the geological characteristics and oceanic processes of the Atlantic seabed.",
    resource_count: 10,
    file_types: ["netcdf", "pdf"],
    date_created: "2023-06-18"
  },
  {
    id: 14,
    title: "Marine Biodiversity Hotspots - 2023",
    last_updated: "11 months ago",
    organization: "Global Ocean Observatory (GOO)",
    desc: "Identified by the Global Ocean Observatory (GOO), these marine biodiversity hotspots highlight regions of exceptional species richness and endemism in 2023. They serve as focal points for conservation efforts and scientific research, providing insights into marine ecosystems' health and resilience. With 17 resources available in CSV and XLS formats, this dataset supports initiatives to protect and sustainably manage marine biodiversity hotspots worldwide.",
    resource_count: 17,
    file_types: ["csv", "xls"],
    date_created: "2022-05-12"
  },
  {
    id: 15,
    title: "Ocean Currents Simulation - 2024",
    last_updated: "3 days ago",
    organization: "Oceanographic Institute (OI)",
    desc: "Developed by the Oceanographic Institute (OI), this simulation dataset offers insights into ocean currents in 2024. It includes data on surface currents, eddies, and seasonal variations, aiding studies on climate dynamics, marine transportation, and ecosystem connectivity. With 7 resources available in netCDF and PDF formats, this dataset facilitates the understanding of oceanographic processes and their implications for marine environments and human activities.",
    resource_count: 7,
    file_types: ["netcdf", "pdf"],
    date_created: "2024-04-21"
  }
];


export const OCEANOGRAPHIC_VARIABLES = [
  "longitude (degrees)",
  "latitude (degrees)",
  "time (ISO 8601)",
  "depth (meters)",
  "pressure (decibars)",
  "temperature (°C)",
  "salinity (PSU)",
  "oxygen concentration (mg/L)",
  "chlorophyll concentration (µg/L)",
  "wave height (meters)"
];