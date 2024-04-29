import { FAQ } from "@/app/constants";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Info } from "lucide-react";

const AccessingData = () => {
  return (
    <div id="faq" className="container mx-auto lg:px-20 my-20">
      <h2 className="mb-20 text-center text-3xl tracking-tighter sm:text-4xl lg:text-4xl font-semibold">
        Accessing & Analyzing Data
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {FAQ.map((faq, index) => (
          <AccordionItem key={index} value={faq.value}>
            <AccordionTrigger className="font-bold hover:no-underline">
              <div className="flex gap-4 text-left ">
                <Info className="text-blue-700" /> {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400">
              {faq.answer} <br />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                optio nisi suscipit, sint, recusandae quam alias voluptatem rem
                ea doloremque atque ab aspernatur error sit at dolores ducimus
                sequi asperiores!
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AccessingData;
