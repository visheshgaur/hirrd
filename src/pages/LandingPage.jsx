import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import { CarouselItem } from '@/components/ui/carousel'
import { CarouselContent } from '@/components/ui/carousel'
import companies from '../data/companies.json'
import  Autoplay  from 'embla-carousel-autoplay'
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card'
import faqs from '../data/faq.json'
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from '@/components/ui/accordion'
const LandingPage = () => {
  return (
    <>
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job <span className='flex items-center gap-2 sm:gap-6'> and get <img src='/logo.png' alt="hirrd logo image" className='h-14 sm:h-24 lg:h-32'></img></span></h1>
        <p className='text-gray-400 sm:mt-4 text-xs sm:text-xl' >Explore Thousands Of Job Listing or Found The Perfect Candidate</p>
      </section>
        <div className='flex justify-center gap-6'>
          <Link to="/jobs">
          <Button variant="blue" size="xl">Find Jobs</Button>
          </Link>
          <Link to="/post-job">
          <Button variant="destructive" size="xl">Post Jobs</Button>
          </Link>
        
        </div>
        <Carousel
        plugins={[Autoplay({ delay: 2000})]}
        className=" w-full py-10">
        <CarouselContent className=" flex gap-5 sm:gap-20 items-center">
    {companies.map(({name,id,path})=>{
      return (<CarouselItem key={id} className="basis 1/3 sm:basis-1/6">
        <img src={path} alt={name} className='h-9 sm:h-14 object-contain'></img>
      </CarouselItem>
      );
})}
      </CarouselContent>
      </Carousel>

      <img src="/banner (1).jpeg" className="w-full"></img>
        <section className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
        <Card>
  <CardHeader>
    <CardTitle className="font-bold">For Job Seekers</CardTitle>
 
  </CardHeader>
  <CardContent>
    Search and Apply for Jobs,track applications and more.
  </CardContent>
</Card>
<Card>
  <CardHeader>
    <CardTitle className="font-bold">For Employers</CardTitle>
 
  </CardHeader>
  <CardContent>
Post Jobs , manage applications and find the best candidates.
  </CardContent>
</Card>
        </section>
        <Accordion type="single" collapsible>
          {faqs.map((faq,index)=>{
            return (
            <AccordionItem key={index} value={`item-${index+1}`}>
    <AccordionTrigger>{faq.question}</AccordionTrigger>
    <AccordionContent>
      {faq.answer}
    </AccordionContent>
  </AccordionItem>
            )
          })}
  
</Accordion>

    </main>
    </>
  )
}

export default LandingPage
