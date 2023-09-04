import { DashboardBackdrop } from "@/app/_features/dashboard/components/backdrops/main";
import { LISTING_QUERY } from "@/app/_features/listing/api/queries/listing";
import { getServerClient } from "@/app/_helpers/server";
import { Page } from "@/components/page";

export default async function DashboardPage() {
  const response = await getServerClient().query(LISTING_QUERY, {
    id: "9a0a3c23-f169-4f91-8cb2-9bdba82cc082",
  });

  return (
    <Page>
      <Page.Backdrop>
        <DashboardBackdrop />
      </Page.Backdrop>
      <Page.Content>
        <div></div>
      </Page.Content>
    </Page>
  );
}
