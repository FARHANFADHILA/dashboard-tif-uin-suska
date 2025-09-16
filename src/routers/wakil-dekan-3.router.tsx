import WakilDekan3SetoranHafalan from "@/pages/pimpinan/wakil-dekan-3/setoran-hafalan/page";
import ProtectedRoute from "./protected.router";
// import { Navigate } from "react-router-dom";

export const wakilDekanRouter = [
  {
    path: "/wakil-dekan-3/dashboard/setoran-hafalan",
    element: (
      <ProtectedRoute roles={["wakil-dekan-3"]}>
        <WakilDekan3SetoranHafalan />
      </ProtectedRoute>
    ),
  },
];
