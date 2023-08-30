import Pane from "@/components/Pane.tsx";
import Heading from "@/components/Typography/Heading.tsx";
import { useTranslation } from "react-i18next";
import Page from "@/components/Page.tsx";
import Content from "@/components/Content.tsx";

export default function RecipeListPage() {
  const { t } = useTranslation();

  return (
    <Page>
      <Heading className="py-2">{t("recipes_page.title")}</Heading>
      <Content>
      </Content>
    </Page>
  );
}
