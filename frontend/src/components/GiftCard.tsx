import React from 'react';

interface GiftCardProps {
  title: string;
  description?: string;
  image_url?: string;
  product_link?: string;
}

const GiftCard: React.FC<GiftCardProps> = ({ title, description, image_url, product_link }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {image_url && <img src={image_url} alt={title} style={{ width: '150px' }} />}
      {product_link && <p><a href={product_link} target="_blank" rel="noreferrer">Comprar</a></p>}
    </div>
  );
};

export default GiftCard;