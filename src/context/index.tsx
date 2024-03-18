import React from 'react';
import PropTypes from 'prop-types';
import TansatckContextProvider from './TanstackContext';
import CartContextProvider from './CartContext';

export default function ContextProvider({
  children,
}: {
  children: any;
}): React.ReactNode {
  return (
    <TansatckContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </TansatckContextProvider>
  );
}

ContextProvider.defaultProps = {
  children: null,
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
