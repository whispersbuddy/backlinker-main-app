"use client";

import Script from "next/script";

export default function Analytics({
  GA_TRACKING_ID,
}: {
  GA_TRACKING_ID: string;
}) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      <Script id="firstpromoter-init" strategy="afterInteractive">
        {`
          (function(w) {
            w.fpr = w.fpr || function() {
              w.fpr.q = w.fpr.q || [];
              w.fpr.q[arguments[0] == 'set' ? 'unshift' : 'push'](arguments);
            };
          })(window);
          fpr("init", {cid: "hpyuej1k"}); 
          fpr("click");
        `}
      </Script>
      <Script
        src="https://cdn.firstpromoter.com/fpr.js"
        strategy="afterInteractive"
      />
    </>
  );
}
