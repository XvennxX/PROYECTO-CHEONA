import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-neutral-500">{testimonial.date}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < testimonial.rating ? 'fill-accent text-accent' : 'text-neutral-300'} 
          />
        ))}
      </div>
      
      <p className="text-neutral-700 flex-grow">{testimonial.comment}</p>
    </div>
  );
};

export default TestimonialCard;