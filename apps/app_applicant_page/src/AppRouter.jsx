
import { UserRouterSegment} from "@blacki005/applicant_page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserPage, UserPageEditable } from "@blacki005/applicant_page";
import { PaymentInfoPage, PaymentInfoRouterSegment } from "@blacki005/applicant_page";
import {AdmissionPage, AdmissionRouterSegment} from "@blacki005/applicant_page";
import {EvaluationPage, EvaluationRouterSegment} from "@blacki005/applicant_page";
import { DataGenerator } from "@blacki005/applicant_page";

export const Routes = [
    {
        //editable:
        path: "/applicant/user/edit/:id",
        element: <UserPageEditable/>
    },
    {
        //readonly:
        path: "/applicant/user/view/:id",
        element: <UserPage/>
    },
    {
        //data generator:
        path: "/applicant/user/generate",
        element: <DataGenerator/>
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
    UserRouterSegment,
    PaymentInfoRouterSegment,
    AdmissionRouterSegment,
    EvaluationRouterSegment
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

