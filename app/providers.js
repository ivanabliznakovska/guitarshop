"use client";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo-client";
import { I18nProvider } from "./i18n";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <I18nProvider>{children}</I18nProvider>
    </ApolloProvider>
  );
}
