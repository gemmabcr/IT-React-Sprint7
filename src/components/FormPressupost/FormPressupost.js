import styled from "styled-components";

export const PressupostContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const BorderBox = styled.div `
  border: 1px solid dimgrey;
  padding: 0.5rem 1rem;
`;

export const ProductListStyle = styled.div `
  display: flex;
  justify-content: space-between;
  border: 1px solid dimgrey;
  padding: 0.5rem 1rem
`;

export const FlexBetween = styled.div `
  display: flex;
  justify-content: space-between;
`;
