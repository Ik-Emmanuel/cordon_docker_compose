"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Building, Calendar, Clock, Copy, File, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  OCEANOGRAPHIC_DATASETS,
  OCEANOGRAPHIC_VARIABLES,
} from "@/app/constants";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

import "highlight.js/styles/atom-one-dark.css";

import Highlight from "react-highlight";

interface DataSetProp {
  id: number;
  title: string;
  last_updated: string;
  organization: string;
  desc: string;
  resource_count: number;
  file_types: string[];
  date_created: string;
}

interface IParams {
  datasetid?: string;
}
const DataSetView = ({ params }: { params: IParams }) => {
  const router = useRouter();

  const handlebackClick = () => {
    // Go back one step in the browser history
    router.back();
  };

  const [datasetItem, setDatasetItem] = useState<DataSetProp | undefined>(
    undefined
  );
  // console.log(params.datasetid); = [ '8', 'Coastal%20Erosion%20Rates%20-%202023%20Update' ]

  function findDatasetById(id: string) {
    // Convert id to number (if needed)
    const objectid = parseInt(id);

    // Use Array.find() to find the object with matching id
    const foundDataset = OCEANOGRAPHIC_DATASETS.find(
      (dataset) => dataset.id === objectid
    );
    setDatasetItem(foundDataset);
  }

  const CodeSnippet = () => {
    return (
      // @ts-ignore
      <Highlight language="python" className="python">
        {`
  import urllib2
  from StringIO import StringIO
  import gzip

  request= urllib2.Request('http://www.goolge.com')
  request.add_header('Accept-encoding', 'gzip,deflate')
  response= opener.open(request)

  if response.info().get('Content-Encoding') == 'gzip':
      buffer = StringIO( response.read())
      deflatedContent = gzip.GzipFile(fileobj=buffer)
      return deflatedContent.read()
  else:
      return response.read()
        
        `}
      </Highlight>
    );
  };

  const CodeSnippet2 = () => {
    const codeRef2 = useRef(null);
    return (
      // @ts-ignore
      <Highlight language="python" className="python">
        {`
  import datacube
  import pandas as pd

  # Set some configurations for displaying tables nicely
  pd.set_option("display.max_colwidth", 200)
  pd.set_option("display.max_rows", None)

  # Instantiate datacube
  dc = datacube.Datacube(app="02_Products_and_measurements")

  # Get sentinel-2 datacube product
  products = dc.list_products()
  product = "sen2_l2a_gcp"

  # list measurements
  measurements = dc.list_measurements()
  measurements.loc[product]
        
        `}
      </Highlight>
    );
  };

  useEffect(() => {
    if (params.datasetid) {
      findDatasetById(params.datasetid[0]);
    }
  }, [params.datasetid]);

  return (
    <>
      <div className="datasetviewer pt-6 px-2 lg:px-16 mx-auto">
        <section className="pt-8 px-10 mt-16">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* <BreadcrumbLink href="/search">Search Datasets</BreadcrumbLink> */}
                <p className="cursor-pointer" onClick={handlebackClick}>
                  Search Datasets
                </p>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage> {params.datasetid?.[0]}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
        <section className="py-4 px-10 mt-4">
          <h1 className="text-4xl font-semibold">{datasetItem?.title}</h1>

          <div className="flex flex-col lg:flex-row gap-4 mt-8 tracking-tighter">
            <span className="flex gap-2">
              <Building size={20} />

              <span className="text-blue-600">{datasetItem?.organization}</span>
            </span>

            <span className="flex gap-2">
              <Calendar size={20} />

              <span className="text-neutral-400">
                Created:
                <span className="text-neutral-600">
                  {datasetItem?.date_created}
                </span>
              </span>
            </span>

            <span className="flex gap-2">
              <Clock size={20} />

              <span className="text-neutral-400">
                Updated:
                <span className="text-neutral-600">
                  {datasetItem?.last_updated}
                </span>
              </span>
            </span>

            <span className="flex gap-2">
              <File size={20} />

              <span className="text-neutral-400">
                Files:
                <span className="text-neutral-600">
                  {datasetItem?.resource_count}
                </span>
              </span>
            </span>
          </div>
        </section>
        <section className="flex flex-col lg:flex-row my-10 py-2 px-10  gap-8 justify-between">
          <div className="w-full lg:w-1/3 flex flex-col pr-6 ">
            {/* Full width on small screens, 1/3 on lg screens */}
            <div>
              <h2 className="font-semibold text-xl mb-4">Description</h2>
              <p className="text-neutral-500">
                {datasetItem && datasetItem?.desc}
              </p>
              <h2 className="font-semibold text-xl mt-6">Content type</h2>
              <div className="flex mt-4 gap-2">
                <Paperclip size={20} className="text-neutral-300" />

                {datasetItem &&
                  datasetItem.file_types &&
                  datasetItem.file_types.map(
                    (filetype: string, index: number) => (
                      <Badge
                        // className="bg-gradient-to-r from-white via-blue-400 to-blue-800"
                        key={index}
                      >
                        {filetype}
                      </Badge>
                    )
                  )}
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <h2 className="font-semibold text-xl mb-4">Dataset Variables</h2>
              <ScrollArea className="h-72 w-full rounded-md border">
                <div className="p-4">
                  {OCEANOGRAPHIC_VARIABLES.map((tag, index) => (
                    <div key={index}>
                      <div className="text-sm">▸ {tag}</div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="max-sm:hidden vertical-line border-r-4 border-r-neutral-200 h-[100px]"></div>

          <div className="w-full lg:w-2/3 flex flex-col flex-1">
            <h2 className="font-semibold text-xl mb-4">Dataset Access</h2>
            {/* Full width on small screens, 2/3 on lg screens */}
            <Tabs defaultValue="access" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="access">External access</TabsTrigger>
                <TabsTrigger value="download">Resource Download</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="download">
                <Card>
                  <CardHeader>
                    {/* <CardTitle>Resource</CardTitle> */}
                    <CardDescription>Resource download</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Download</Label>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non, eveniet illum accusantium nostrum ipsum quisquam
                        maxime iste porro consequatur nesciunt quia doloribus
                        iure officia dicta rerum sapiente magnam obcaecati
                        accusamus?
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Action</Label>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Suscipit quaerat eos rem molestias nobis magni
                        blanditiis distinctio. Deserunt quisquam atque deleniti
                        earum ducimus quidem odio consectetur, natus velit
                        numquam assumenda.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="access">
                <Card>
                  <CardHeader>
                    {/* <CardTitle>Data Access for Analysis</CardTitle> */}
                    <CardDescription>
                      Accessing datasets for analysis externally
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi qui repudiandae perspiciatis, ipsa est
                        exercitationem vero quo, excepturi doloremque cumque a
                        esse rem quidem sint. Neque repudiandae debitis
                        architecto iusto.
                      </p>
                    </div>

                    <div className="space-y-8 mt-6 py-6">
                      {/* <Label htmlFor="new" className="font-semibold">
                        Data Access Options
                      </Label> */}

                      <Tabs defaultValue="Python" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="Python">Python</TabsTrigger>
                          <TabsTrigger value="Jupyter">Jupyter</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Python">
                          <Card>
                            <CardHeader>
                              <CardTitle>Python</CardTitle>
                              <CardDescription>
                                Accessing the datasets through APIs
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="space-y-1   py-4">
                                <div className="max-w-full overflow-x-auto">
                                  <CodeSnippet />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter></CardFooter>
                          </Card>
                        </TabsContent>
                        <TabsContent value="Jupyter">
                          <Card>
                            <CardHeader>
                              <CardTitle>Jupyter</CardTitle>
                              <CardDescription>
                                Accessing dataset through CORDON Jupyter Hub
                                <span className="text-blue-600 ml-2">
                                  [https://hub.cordon.space]
                                </span>
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="space-y-1 py-4">
                                <div className="max-w-full overflow-x-auto">
                                  <CodeSnippet2 />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter></CardFooter>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    {/* <CardTitle>Activity</CardTitle> */}
                    <CardDescription>Dataset Activity </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current state</Label>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi qui repudiandae perspiciatis, ipsa est
                        exercitationem vero quo, excepturi doloremque cumque a
                        esse rem quidem sint. Neque repudiandae debitis
                        architecto iusto.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new">New activity</Label>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, dolorem corrupti atque nihil dolorum voluptates
                        impedit provident reprehenderit, sed quas blanditiis
                        assumenda at aliquam, porro suscipit dignissimos
                        doloribus nisi tempora.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
};

export default DataSetView;
