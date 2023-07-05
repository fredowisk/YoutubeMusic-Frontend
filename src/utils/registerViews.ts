import "server-only";

import { query as q } from "faunadb";

import { fauna } from "@/services/fauna";

interface ViewCollection {
  ref: {
    id: string;
  };
  data: {
    count: number;
  };
}

const getTotalViews = async (): Promise<ViewCollection> => {
  return fauna.query<ViewCollection>(
    q.Get(q.Match(q.Index("visualization_by_id"), "2"))
  );
};

export const registerViews = async (): Promise<void> => {
  const totalViews = await getTotalViews();
  await fauna.query(
    q.Update(q.Ref(q.Collection("visualizations"), totalViews.ref.id), {
      data: {
        count: totalViews.data.count + 1,
      },
    })
  );
};
