import { Routes, Route } from "react-router-dom";

import PublicUserLayout from "../layouts/public-user-layout";
import EmployerLayout from "../layouts/employer-layout";
import CandidateLayout from "../layouts/candidate-layout";
import { base } from "../globals/route-names";
import GoogleSuccess from "../app/pannels/public-user/components/pages/GoogleSuccess";

function AppRoutes() {
    return (
        <Routes>
            <Route path={base.PUBLIC_PRE + "/*"} element={<PublicUserLayout />} />
            <Route path={base.EMPLOYER_PRE + "/*"} element={<EmployerLayout />} />
            <Route path={base.CANDIDATE_PRE + "/*"} element={<CandidateLayout />} />
            {/* <Route path="/google-success" element={<GoogleSuccess />} /> */}

        </Routes>
    )
}

export default AppRoutes;