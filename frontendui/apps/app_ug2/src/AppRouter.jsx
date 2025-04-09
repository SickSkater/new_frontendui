
import { ProgramPage, ProgramRouterSegment, UserRouterSegment} from "@blacki005/candidate_page";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
import { UserPage } from "../../../packages/@blacki005/candidate_page/src/User/Pages/UserPage";
import { PaymentInfoPage, PaymentInfoRouterSegment } from "../../../packages/@blacki005/candidate_page/src/PaymentInfo/";
import {AdmissionPage, AdmissionRouterSegment} from "../../../packages/@blacki005/candidate_page/src/Admission/";
import {EvaluationPage, EvaluationRouterSegment} from "../../../packages/@blacki005/candidate_page/src/Evaluation/";

// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

//co stranka, to jeden dictionary, tech stranek budeme mit vice:
export const Routes = [
    // UserRouterSegment
    {
        path: "/program/:id",
        element: <ProgramPage/>
    },
    {
        // http://localhost:5173/user/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/user/:id",
        element: <UserPage/>
    },
    {
        // http://localhost:5173/paymentinfo/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/paymentinfo/:id",
        element: <PaymentInfoPage/>
    },
    {
        // http://localhost:5173/admission/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/admission/:id",
        element: <AdmissionPage/>
    },
    {
        // http://localhost:5173/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/evaluation/:id",
        element: <EvaluationPage/>
    },
    ProgramRouterSegment,
    UserRouterSegment,
    PaymentInfoRouterSegment,
    AdmissionRouterSegment,
    EvaluationRouterSegment
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

