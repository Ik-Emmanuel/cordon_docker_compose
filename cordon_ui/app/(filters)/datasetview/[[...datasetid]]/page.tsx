"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
  Building,
  Calendar,
  Clock,
  Copy,
  Download,
  File,
  Link as LinkIcon,
  Paperclip,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  OCEANOGRAPHIC_DATASETS,
  OCEANOGRAPHIC_VARIABLES,
} from "@/app/constants";
import { useState, useEffect, useRef, useTransition } from "react";
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
import { ResultDataset } from "@/types/types";
import { get_dataset_detail } from "@/actions/search-datasets";
import "highlight.js/styles/atom-one-dark.css";

import Highlight from "react-highlight";
import Link from "next/link";

interface IParams {
  datasetid?: string;
}
const DataSetView = ({ params }: { params: IParams }) => {
  const router = useRouter();

  const handlebackClick = () => {
    // Go back one step in the browser history
    router.back();
  };

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [gridOrTable, setGridOrTable] = useState<string | undefined>("");

  const [datasetItem, setDatasetItem] = useState<ResultDataset | undefined>(
    undefined
  );
  // console.log(params.datasetid); = [ '8', 'Coastal%20Erosion%20Rates%20-%202023%20Update' ]

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
        
        `}
      </Highlight>
    );
  };

  // useEffect(() => {
  //   if (params.datasetid) {
  //     findDatasetById(params.datasetid[0]);
  //   }
  // }, [params.datasetid]);

  useEffect(() => {
    // fetch and use the params
    if (params.datasetid) {
      const datasetId = params.datasetid[0];
      startTransition(() => {
        //@ts-ignore
        get_dataset_detail(datasetId).then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            console.log("details data");
            console.log(data);
            // @ts-ignore

            setDatasetItem(data.searchResults?.data);
          }
        });
      });
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

              <span className="text-blue-600">{datasetItem?.institution}</span>
            </span>

            <span className="flex gap-2">
              <Calendar size={20} />

              <span className="text-neutral-400">
                Created:
                <span className="text-neutral-600">{datasetItem?.minTime}</span>
              </span>
            </span>

            <span className="flex gap-2">
              <Clock size={20} />

              <span className="text-neutral-400">
                Updated:
                <span className="text-neutral-600">{datasetItem?.maxTime}</span>
              </span>
            </span>

            <span className="flex gap-2">
              <File size={20} />

              <span className="text-neutral-400">
                Files:
                <span className="text-neutral-600">
                  {/* {datasetItem?.resource_count} */}
                </span>
              </span>
            </span>
          </div>
        </section>
        <section className="flex flex-col lg:flex-row my-10 py-2 px-10  gap-8 justify-between">
          <div className="w-full lg:w-1/3 flex flex-col pr-6 ">
            {/* Full width on small screens, 1/3 on lg screens */}
            <div>
              <div className="hide-scroll-bar max-h-[20vh] overflow-y-auto">
                <h2 className="font-semibold text-xl mb-4">Description</h2>
                <p className="text-neutral-500">
                  {datasetItem && datasetItem?.summary}
                </p>
              </div>
              <h2 className="font-semibold text-xl mt-6">Content type</h2>
              <div className="flex mt-4 gap-2">
                <Paperclip size={20} className="text-neutral-300" />

                {/* {datasetItem &&
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
                  )} */}
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="access">External access</TabsTrigger>
                <TabsTrigger value="download">Resource Download</TabsTrigger>
                {/* <TabsTrigger value="activity">Activity</TabsTrigger> */}
              </TabsList>

              <TabsContent value="access">
                <Card>
                  <CardHeader>
                    {/* <CardTitle>Data Access for Analysis</CardTitle> */}
                    <CardDescription>
                      Accessing datasets for analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <p>
                        Below are a list of methods provided to gain access to
                        the dataset externally. If available, a link for
                        visualization through a WMS, programmatic access using
                        python scripts, and a jupyter notebook code snippets for
                        loading in the dataset on jupyter hub for detailed
                        analysis.
                      </p>
                    </div>

                    <div className="space-y-1 py-4">
                      {datasetItem &&
                        ((datasetItem.MakeAGraph &&
                          datasetItem.MakeAGraph?.length > 0) ||
                          (datasetItem.wms && datasetItem.wms?.length > 0)) && (
                          <p className="font-bold">Data Visualization</p>
                        )}

                      {datasetItem &&
                        datasetItem.wms &&
                        datasetItem.wms?.length > 0 && (
                          <div>
                            <Link
                              href={`https://catalogue.cordon.uk/erddap/wms/${datasetItem?.datasetID}/index.html`}
                              // href={datasetItem?.wms}

                              target="__blank"
                              className="flex gap-2"
                            >
                              <LinkIcon
                                size={18}
                                className="text-neutral-400"
                              />{" "}
                              <span className="text-blue-600 ">
                                {" "}
                                ERDDAP WMS Visualization{" "}
                              </span>
                            </Link>
                          </div>
                        )}

                      {datasetItem &&
                        datasetItem.wcs &&
                        datasetItem.wcs?.length > 0 && (
                          <div>
                            <Link
                              // href={datasetItem?.wcs}
                              href={`https://catalogue.cordon.uk/erddap/wcs/${datasetItem?.datasetID}/index.html`}
                              target="__blank"
                              className="flex gap-2"
                            >
                              <LinkIcon
                                size={18}
                                className="text-neutral-400"
                              />{" "}
                              <span className="text-blue-600 ">
                                {" "}
                                ERDDAP WCS Visualization{" "}
                              </span>
                            </Link>
                          </div>
                        )}

                      {datasetItem &&
                        datasetItem.MakeAGraph &&
                        datasetItem.MakeAGraph?.length > 0 && (
                          <div>
                            <Link
                              href={datasetItem?.MakeAGraph}
                              target="__blank"
                              className="flex gap-2"
                            >
                              <LinkIcon
                                size={18}
                                className="text-neutral-400"
                              />{" "}
                              <span className="text-blue-600 ">
                                ERDDAP Graph Visualization
                              </span>
                            </Link>
                          </div>
                        )}
                    </div>

                    <div className="space-y-8 mt-6 py-4">
                      <p className="font-bold">Programmatic Access</p>

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

              <TabsContent value="download">
                <Card>
                  <CardHeader>
                    {/* <CardTitle>Resource</CardTitle> */}
                    <CardDescription>Resource download</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      {/* <Label htmlFor="name">Download</Label> */}
                      <p>
                        Access the datasets files using the links below, if
                        available. ERDDAP files can the filtered to obtain
                        specific data variables if needed. Externally hosted
                        dataset will be redirected to source, for file download
                      </p>
                    </div>

                    {datasetItem && datasetItem.dataStructure && (
                      <div className="space-y-1 py-4">
                        {/* <Label htmlFor="username" cla>Action</Label> */}

                        <div>
                          <p className="font-bold">Dataset Variable Filter</p>
                          <Link
                            href={`https://catalogue.cordon.uk/erddap/${
                              datasetItem.dataStructure === "grid"
                                ? "griddap"
                                : "tabledap"
                            }/${datasetItem.datasetID}.html`}
                            target="__blank"
                            className="flex gap-2"
                          >
                            <span className="text-blue-600 ">
                              {" "}
                              ERDDAP Dataset Variable Filter{" "}
                            </span>
                          </Link>
                        </div>
                      </div>
                    )}

                    {datasetItem &&
                      datasetItem.files &&
                      datasetItem.files?.length > 0 && (
                        <div className="space-y-8  py-2">
                          <div>
                            <p className="font-bold mb-2">File Download</p>
                            <Link href={datasetItem?.files} target="__blank">
                              <Button className="bg-blue-500 hover:bg-blue-800">
                                {" "}
                                <Download className="mr-2" size={15} /> Download
                                Files
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
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
