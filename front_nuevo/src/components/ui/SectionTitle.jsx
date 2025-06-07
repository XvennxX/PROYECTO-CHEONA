import React from 'react';

const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  light = false,
  className = '',
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-neutral-800'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg ${light ? 'text-neutral-200' : 'text-neutral-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-accent mt-4 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;