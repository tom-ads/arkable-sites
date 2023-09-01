import { Page } from "@/components/page";
import { DashboardBackdrop } from "../_features/dashboard/components/backdrops/main";

export default function DashboardPage() {
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
