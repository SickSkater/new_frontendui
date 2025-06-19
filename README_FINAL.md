# Project Timeline and Problem Resolution

This document outlines the timeline of commits, problems encountered, discoveries made, and solutions implemented during the development process.

---

## Timeline of Commits and Problem Resolution

### **1. Backend Bugs and Placeholder Data**
- **Date**: **April 8, 2025**
- **Problem Definition**:  
  A bug in the backend prevented `insert` mutations from working correctly. This led to an initial misunderstanding that we were supposed to display individual pages for all entities.
- **Resolution**:  
  As a temporary workaround, we implemented placeholder data to simulate responses from the backend, allowing frontend development to proceed. This was fully resolved on **May 2, 2025**, when the backend error was fixed, and the project was transitioned to use real data.

### **2. Vector Attribute for Admissions**
- **Date**: **April 9, 2025**  
- **Achievement**:  
  We successfully implemented a vector attribute for users that displays links to all admissions they have applied for. We also learned how to pass an entity and use the `me` query to retrieve the current user's data.

### **3. Shared Repository Setup**
- **Date**: **April 16, 2025**
- **Milestone**:
  Transitioned to a shared GitHub repository to facilitate collaboration.

### **4. Transition to Real Data**
- **Date**: **May 2, 2025**
- **Milestone**:
  With the backend bug fixed, the project began working with real data. A temporary `UserData` component was created to fetch data based on a specific pattern, which later served as a template for other components. User queries were updated accordingly.

### **5. Functional Mutations**
- **Date**: **May 5, 2025**
- **Achievement**:
  Mutations became functional. We created `NewAdmission` (later `NewApplicationButton`) and `DeleteAdmission` (later `DeleteApplicationButton`) components, allowing users to add and remove their applications. All placeholder data was subsequently removed.

### **6. UI Improvement: Data Tables**
- **Date**: **May 6, 2025**
- **Milestone**:
  Introduced tables for a clearer and more organized presentation of data.

### **7. Correcting Application Logic**
- **Date**: **May 9, 2025**
- **Problem Definition**:
  The `NewAdmission` component was incorrectly creating new admission processes instead of creating an application for an existing one. This was due to a misunderstanding of the entity relationships.
- **Resolution**:
  The component's functionality was corrected to only create `PaymentInfo` and `Student` entities, which correctly represent a user's application to an admission process. A `BreadCrumbNavigation` component was also added but later removed upon realizing that we only needed to provide links to entities, not display their full pages.

### **8. Data Generator Component**
- **Date**: **May 10, 2025**
- **Milestone**:
  A `DataGenerator` component was added to create test data for `Admission` and `PaymentInfo` entities.

### **9. Component Renaming and Documentation**
- **Date**: **May 11, 2025**
- **Milestone**:
  The components `NewAdmission` and `DeleteAdmission` were renamed to `NewApplication` and `DeleteApplication` for clarity. We began generating JSDoc documentation for components.

### **10. Application and Package Renaming**
- **Date**: **May 20, 2025**
- **Milestone**:
  The application was renamed to the globally unique name `@blacki005/app_applicant_page`, and the package was renamed to `@blacki005/applicant_page` (from `candidate_page`) to be more descriptive.

### **11. Infinite Scroll and Component Decomposition**
- **Date**: **May 21, 2025**
- **Achievement**:
  - The `AdmissionsList` component was created, using infinite scroll to display all available admissions.
  - The `InfiniteScroll` component was fixed with the assistance of JVFlasar and Gemini AI to correctly handle cases where no more data is available, preventing an infinite loop.
  - The `NewApplication` component was decomposed into `SearchAdmissions` and `NewApplicationButton` for better separation of concerns.
  - Preparations for `readonly` and `editable` modes began with the creation of `UserPageEditable` and new routes in `AppRouter`.

### **12. Readonly Mode and Advanced Filtering**
- **Date**: **May 22, 2025**
- **Achievement**:
  - `readonly` parameters were added to several components to control their behavior.
  - Functionality was added to display only those admission processes for which the user has not yet submitted an application.

### **13. Final UI and Functionality Enhancements**
- **Date**: **June 1, 2025**
- **Achievement**:
  - In `readonly` mode, action buttons are now displayed as simple links.
  - The search functionality was improved to show either results matching a search query or all admissions via infinite scroll.
  - New components were created to generate insert parameters for mutations within the data generator.

---

## Unresolved Issues and Workarounds

- **Indirect Querying of Admissions**:  
  It is not possible to directly query the database for admissions associated with a specific user. The current workaround involves a multi-step query process: User -> Studies -> Payments -> PaymentInfo -> Admission. This is a structural issue with the database schema that would require a redesign to fully resolve.

- **Inability to Get ID of Inserted Entity**:  
  After inserting a new entity, it was not possible to retrieve its ID from the mutation response. We resolved this by generating the ID on the client side and storing it in a variable before performing the insertion.

- **Incorrect Entity Naming**:
  Initial problems arose from incorrect entity naming (`Paymentinfo` vs. `PaymentInfo`) and a lack of understanding of the `create:component` script. These were resolved through find-and-replace scripts and by adhering to correct naming conventions in subsequent work.

---

## Lessons Learned
- **Naming Conventions**: Proper naming conventions and adherence to camelCase are critical when working with entity generation scripts.
- **Database Structure**: Understanding the structure of the database and the relationships between entities is essential for efficient querying and correct application logic.
- **Incremental Development**: Starting with placeholder data allowed for parallel frontend and backend development. Iteratively replacing mock data with real data and refining components proved to be an effective strategy.