"use client";

import { useId, useState } from "react";
import Link from "next/link";

const reservationFormUrl =
  "https://secure.rightsignature.com/signers/6e354775-4a76-45a6-b67e-4cecb6a833b8/sign?access_token=Ca1cTtXYmLAWxviQF7kk";

export default function EitcParticipateTabs() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    { id: "reserve", label: "Reserve Your Credits" },
    { id: "contribute", label: "Contribute Your Taxes" },
    { id: "credit", label: "Receive a 90% Tax Credit" },
  ] as const;

  return (
    <div className="overflow-hidden rounded-xl border border-teal/15 bg-white shadow-sm">
      <div className="border-b border-teal/10 bg-teal/5 px-5 py-4">
        <p className="font-heading font-semibold tracking-wide text-teal">
          HOW CAN I PARTICIPATE?
        </p>
      </div>

      <div
        role="tablist"
        aria-label="How to participate"
        className="flex divide-x divide-teal/15 border-b border-teal/15 bg-teal/10"
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const number = String(index + 1);
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              aria-label={`Step ${number}: ${tab.label}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`flex min-w-0 flex-1 items-center justify-center px-1 py-3.5 font-heading text-xs font-semibold uppercase tracking-wide transition sm:py-4 sm:text-sm ${
                isActive
                  ? "bg-white text-teal shadow-[inset_0_-2px_0_0_#408482]"
                  : "text-teal/55 hover:bg-teal/5 hover:text-teal"
              }`}
            >
              Step {number}
            </button>
          );
        })}
      </div>

      <div className="grid">
        <div
          role="tabpanel"
          id={`${baseId}-panel-reserve`}
          aria-labelledby={`${baseId}-tab-reserve`}
          aria-hidden={activeIndex !== 0}
          className={`col-start-1 row-start-1 space-y-3 px-5 py-5 sm:px-6 sm:py-6 ${
            activeIndex === 0 ? "visible" : "invisible"
          }`}
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-teal sm:text-base">
            Reserve Your Credits
          </p>
          <p className="type-body-sm">
            Complete a{" "}
            <Link
              href={reservationFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal underline hover:text-teal-dark"
            >
              Children&apos;s Tuition Fund Reservation Form
            </Link>
            .
          </p>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-contribute`}
          aria-labelledby={`${baseId}-tab-contribute`}
          aria-hidden={activeIndex !== 1}
          className={`col-start-1 row-start-1 space-y-3 px-5 py-5 sm:px-6 sm:py-6 ${
            activeIndex === 1 ? "visible" : "invisible"
          }`}
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-teal sm:text-base">
            Contribute Your Taxes
          </p>
          <p className="type-body-sm">
            Scan and email reservation form to Catherine Long{" "}
            <em>(Manager, ACSI Children&apos;s Tuition Fund).</em>
          </p>
          <p className="type-caption border-l-2 border-teal/30 pl-3 italic">
            Please copy{" "}
            <a href="mailto:eitc@sequoiachristian.com" className="text-teal underline not-italic">
              eitc@sequoiachristian.com
            </a>{" "}
            for purpose of record keeping and helping to ensure you receive your credits.
          </p>
          <a
            href="mailto:catherine_long@acsi.org,eitc@sequoiachristian.com?subject=EITC%20Reservation%20Form%3A%20Sequoia%20Christian%20School"
            className="inline-flex items-center gap-2 rounded border-2 border-teal bg-white px-5 py-2.5 text-sm font-semibold tracking-wide text-teal transition hover:bg-teal/5"
          >
            SEND RESERVATION FORM
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </a>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-credit`}
          aria-labelledby={`${baseId}-tab-credit`}
          aria-hidden={activeIndex !== 2}
          className={`col-start-1 row-start-1 space-y-3 px-5 py-5 sm:px-6 sm:py-6 ${
            activeIndex === 2 ? "visible" : "invisible"
          }`}
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-teal sm:text-base">
            Receive a 90% Tax Credit
          </p>
          <p className="type-body-sm">
            After CTF receives your reservation form and the credits from the state of Pennsylvania,
            you will receive an email asking you to complete a similar form{" "}
            <em>(called a &ldquo;joinder&rdquo;)</em> online. This can be several days to several months after
            you complete your reservation form. Once you complete the online joinder, you will have
            15 to 20 days to make your contribution either by secure ACH or check.
          </p>
        </div>
      </div>
    </div>
  );
}
