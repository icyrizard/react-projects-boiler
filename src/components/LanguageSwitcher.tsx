import React from "react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Flag from "react-world-flags";
import { Country } from "world-countries";

import Paragraph from "@/components/Typography/Paragraph.tsx";
import { supportedLanguages, supportedLocales } from "@/i18n.ts";
import Heading from "@/components/Typography/Heading.tsx";
import SubMenuItem from "@/components/navigation/SubMenuItem.tsx";
import { BiChevronDown } from "react-icons/bi";

const localeToCountryFlagMap: Record<
  keyof typeof supportedLanguages,
  Country["cca2"]
> = {
  "nl-NL": "NL",
  "en-GB": "GB",
};

const localeToLanguageCodeMap: Record<
  keyof typeof supportedLanguages,
  Country["cca2"]
> = {
  "nl-NL": "NL",
  "en-GB": "GB",
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const classes = twMerge(
    "group flex select-none items-center justify-between gap-2 py-2 font-medium",
    "hover:bg-gray-100 hover:text-gray-900 rounded-[2px] px-2 cursor-pointer py-4 w-full",
  );

  const changeLanguage = (lng: string) => {
    return i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language as keyof typeof supportedLanguages;
  const filteredSupportedLanguages = supportedLocales.filter(
    (locale: string) => locale !== currentLanguage,
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={classes}>
        <Flag
          code={localeToCountryFlagMap[currentLanguage] ?? 'GB'}
          height="20"
          width="20"
          className="rounded-full object-cover !h-[20px]"
        />
        <Heading size="small" className="uppercase">
          {localeToLanguageCodeMap[currentLanguage]}
        </Heading>
        <BiChevronDown className="relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-white shadow w-[5rem] py-2">
        {filteredSupportedLanguages.map((languageKey: string) => (
          <SubMenuItem
            key={languageKey}
            onClick={() => changeLanguage(languageKey)}
          >
            <Flag
              className="rounded-full object-cover !h-[20px]"
              code={
                localeToCountryFlagMap[
                  languageKey as keyof typeof supportedLanguages
                ]
              }
              height="20"
              width="20"
            />
            <Paragraph className="uppercase">
              {
                localeToLanguageCodeMap[
                  languageKey as keyof typeof supportedLanguages
                ]
              }
            </Paragraph>
          </SubMenuItem>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
