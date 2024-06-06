import React from "react";
import * as WebBrowser from "expo-web-browser";

// clerk OAuth sign-in, see docs: https://clerk.com/docs/quickstarts/expo#o-auth-sign-in
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};