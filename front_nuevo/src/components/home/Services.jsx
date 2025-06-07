import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../ui/ServiceCard';
import { services } from '../../mocks/data';

const Services = () => {
  return (
    <section className="section bg-neutral-50">
      <div className="container-custom">
        <SectionTitle 
          title="Nuestros Servicios" 
          subtitle="Experiencias diseñadas para hacer tu estancia inolvidable"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;