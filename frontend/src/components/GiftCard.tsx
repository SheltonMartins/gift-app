import React from 'react';
import { Card, Title, Description, Image, ProductLink } from '../styles/GiftCard.Styles';

interface GiftCardProps {
  title: string;
  description?: string;
  image_url?: string;
  product_link?: string;
}

const GiftCard: React.FC<GiftCardProps> = ({ title, description, image_url, product_link }) => {
  return (
    <Card>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {image_url && <Image src={image_url} alt={title} />}
      {product_link && (
        <p>
          <ProductLink href={product_link} target="_blank" rel="noreferrer">
            Comprar
          </ProductLink>
        </p>
      )}
    </Card>
  );
};

export default GiftCard;
