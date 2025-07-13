import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserRouterSegment } from "@blacki005/applicant_page";
import {
    UserPage,
    PaymentInfoPage,
    PaymentInfoRouterSegment,
    AdmissionPage,
    AdmissionRouterSegment,
    EvaluationPage,
    EvaluationRouterSegment,
    DataGenerator
} from "@blacki005/applicant_page";


export const Routes = [
    {
        //editable:
        path: "/applicant/user/edit/:id",
        element: <UserPage editable={true} />
    },
    //misto children bezparam. komp. - useparams()
    //inject usera do children
    {
        path: "/applicant/user/view/:id",
        element: <UserPage editable={false}/>
    },
    {
        //data generator:
        path: "/applicant/user/generate",
        element: <DataGenerator />
    },
    //placeholders, ostatni nedodali uri segmenty
    {
        // http://localhost:5173/paymentinfo/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/paymentinfo/:id",
        element: <PaymentInfoPage />
    },
    {
        // http://localhost:5173/admission/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/admission/:id",
        element: <AdmissionPage />
    },
    {
        // http://localhost:5173/6a6ca6e9-2222-498f-b270-b7b07c2afa41
        path: "/evaluation/:id",
        element: <EvaluationPage />
    },
    UserRouterSegment,
    PaymentInfoRouterSegment,
    AdmissionRouterSegment,
    EvaluationRouterSegment
]

const router = createBrowserRouter(Routes);
export const AppRouter = () => <RouterProvider router={router} />

