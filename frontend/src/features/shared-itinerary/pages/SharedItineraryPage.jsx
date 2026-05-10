import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sharedTripApi } from "../api/sharedTripApi";
import { PublicTripHeader } from "../components/PublicTripHeader";
import { ShareActions } from "../components/ShareActions";
import { SharedTimeline } from "../components/SharedTimeline";
import { transformTrip } from "@/features/trips/utils/tripTransformers";

export default function SharedItineraryPage() {
  const { shareId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (!shareId) return;
    sharedTripApi
      .getPublicTrip(shareId)
      .then((response) => setTrip(transformTrip(response.data?.data)))
      .catch(() => setTrip(null));
  }, [shareId]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <PublicTripHeader trip={trip} />
      <ShareActions />
      <SharedTimeline stops={trip?.stops} />
    </div>
  );
}
