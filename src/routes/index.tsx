import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Categories, Featured, Values } from "@/components/site/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عصائر الأمير | Alamir Juices — عصائر طبيعية 100%" },
      { name: "description", content: "عصائر طبيعية فاخرة تُعصر لحظة طلبك وتُوصَّل مبرّدة إلى بابك. اطلب الآن من عصائر الأمير." },
      { property: "og:title", content: "عصائر الأمير | Alamir Juices" },
      { property: "og:description", content: "Luxury natural juices, pressed the moment you order and delivered cold to your door." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Categories />
      <Featured />
      <Values />
    </SiteLayout>
  );
}
