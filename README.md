# Project Timeline and Problem Resolution

This document outlines the timeline of commits, problems encountered, discoveries made, and solutions implemented during the development process.

---

## Timeline of Commits and Problem Resolution

### **1. Incorrect Entity Name Format**
- **Date**: **April 3, 2025**
- **Problem Definition**:
  We initially believed that we could freely choose the names of entities. This misunderstanding stemmed from insufficient knowledge of using the `create:component` script.
- **Resolution**:  
  The issue was resolved by creating a new entity with the correct naming conventions.


### **2. PaymentInfo Entity Naming Issue**
- **Date**: **April 6, 2025**
- **Problem Definition**:
  The `PaymentInfo` entity had inconsistent naming conventions due to improper camelCase usage. Specifically, the letter "I" in `Info` was sometimes uppercase and sometimes lowercase, causing issues during entity generation.
- **Resolution**:  
  We resolved this by finding and replacing all occurrences of `Paymentinfo` with `PaymentInfo` across all files and names using a Bash script.


### **3. Backend Bugs and Placeholder Data**
- **Date**: **April 8, 2025**
- **Problem Definition**:  
  A bug in the backend prevented `insert` mutations from working correctly. There also was an initial misunderstanding that we were supposed to display individual pages for all entities mentioned in our assignment.
- **Resolution**:  
  As a temporary workaround, we implemented placeholder data to simulate responses from the backend, allowing frontend development to proceed. This was fully resolved on **May 2, 2025**, when the backend error was fixed, and the project was transitioned to use real data.

### **4. Vector Attribute for Admissions**
- **Date**: **April 9, 2025**  
- **Achievement**:  
  We successfully implemented a vector attribute for users that displays links to all admissions they have applied for.

### **5. Shared Repository Setup**
- **Date**: **April 16, 2025**
- **Milestone**:
  Transitioned to a shared GitHub repository to facilitate collaboration.

### **6. Transition to Real Data**
- **Date**: **May 2, 2025**
- **Milestone**:
  With the backend bug fixed, the project began working with real data. A temporary `UserData` component was created to fetch data based on a specific pattern, which later served as a template for other components. User queries were updated accordingly.

### **7. Functional Mutations**
- **Date**: **May 5, 2025**
- **Achievement**:
  Mutations became functional. We created `NewAdmission` (later `NewApplicationButton`) and `DeleteAdmission` (later `DeleteApplicationButton`) components, allowing users to add and remove entities defining their relationship with admission (application). All placeholder data was subsequently removed.

### **8. UI Improvement: Data Tables**
- **Date**: **May 6, 2025**
- **Milestone**:
  Introduced tables for a clearer and more organized presentation of data.

### **9. Correcting Application Logic**
- **Date**: **May 9, 2025**
- **Problem Definition**:
  The `NewAdmission` component was incorrectly creating new admission processes instead of creating an application for an existing one. This was due to a misunderstanding of the entity relationships.
- **Resolution**:
  The component's functionality was corrected to only create `PaymentInfo` and `Student` entities, which correctly represent a user's application to an admission process. A `BreadCrumbNavigation` component was also added but later removed upon realizing that we only needed to provide links to entities, not display their full pages.

### **10. Data Generator Component**
- **Date**: **May 10, 2025**
- **Milestone**:
  A `DataGenerator` component was added to create test data for `Admission` and `PaymentInfo` entities.

### **11. Component Renaming and Documentation**
- **Date**: **May 11, 2025**
- **Milestone**:
  The components `NewAdmission` and `DeleteAdmission` were renamed to `NewApplication` and `DeleteApplication` for clarity. We began generating JSDoc documentation for components.

### **12. Application and Package Renaming**
- **Date**: **May 20, 2025**
- **Milestone**:
  The application was renamed to the globally unique name `@blacki005/app_applicant_page`, and the package was renamed to `@blacki005/applicant_page` (from `candidate_page`) to be more descriptive.

### **13. Infinite Scroll and Component Decomposition**
- **Date**: **May 21, 2025**
- **Achievement**:
  - The `AdmissionsList` component was created, using infinite scroll to display all available admissions.
  - The `InfiniteScroll` component was fixed with the assistance of JVFlasar and Gemini AI to correctly handle cases where no more data is available, preventing an infinite loop.
  - The `NewApplication` component was decomposed into `SearchAdmissions` and `NewApplicationButton` for better separation of concerns.
  - Preparations for `readonly` and `editable` modes began with the creation of `UserPageEditable` and new routes in `AppRouter`.

### **14. Readonly Mode and Advanced Filtering**
- **Date**: **May 22, 2025**
- **Achievement**:
  - `readonly` parameters were added to several components to control their behavior.
  - Functionality was added to display only those admission processes for which the user has not yet submitted an application.

### **15. Final UI and Functionality Enhancements**
- **Date**: **June 1, 2025**
- **Achievement**:
  - In `readonly` mode, action buttons are now displayed as simple links.
  - The search functionality was improved to show either results matching a search query or all admissions via infinite scroll.
  - New components were created to generate insert parameters for mutations within the data generator.

### **16. Unresponsive NewApplicationButton component**
- **Date**: **July 13, 2025**
- **Problem Definition**:
  The `NewApplicationButton` component was unresponsive when rendered inside the `AdmissionsList`, which uses an `InfiniteScroll` component. The button's `onClick` event handler was not firing, even though the same button component worked correctly in `SearchAdmission` component. Initial debugging ruled out CSS issues. The root cause was that the `ItemsVisualizer` component, responsible for rendering each list item, was defined inside the `AdmissionsList` component. This caused the inner component (`ItemsVisualizer`) to be treated as a new component on every re-render of its parent, leading to it being unmounted and remounted, which breaks its event handlers.
- **Resolution:**:
  The `ItemsVisualizer` component was moved outside of the `AdmissionsList` component, making it a stable, standalone component. This prevented the constant re-mounting issue. To provide the necessary user and editable data, these variables were passed as props to the `InfiniteScroll` component, which was already designed to forward extra props to its Visualiser.


---

## Unresolved Issues and Workarounds

- **Indirect Querying of Admissions**:  
  It is not possible to directly query the database for admissions associated with a specific user. The current workaround involves a multi-step query process: User -> Studies -> Payments -> PaymentInfo -> Admission. This is a structural issue with the database schema that would require a redesign to fully resolve.

- **Inability to Get ID of Inserted Entity**:  
  After inserting a new entity, it was not possible to retrieve its ID from the mutation response. We resolved this by generating the ID on the client side and storing it in a variable before performing the insertion.

---

## Lessons Learned
- **Naming Conventions**: Proper naming conventions and adherence to camelCase are critical when working with entity generation scripts.
- **Database Structure**: Understanding the structure of the database and the relationships between entities is essential for efficient querying and correct application logic.
- **Team Collaboration**: Establishing a functional system where team members can work independently without interfering with each other's progress is crucial. Using tools like shared repositories, clear documentation, and modular components ensures smooth collaboration and minimizes conflicts during development.
- **Setting Clear Goals**: Defining clear objectives at the start of each development phase ensures that the team remains focused and aligned. Breaking down larger tasks into smaller, actionable items helps track progress and identify potential blockers early.
- **Code Reviews**: Regular code reviews helped identify bugs, improve code quality, and ensure adherence to best practices. Peer feedback fostered a collaborative environment and enhanced the team's overall productivity.
- **Incremental Development**: Starting with placeholder data allowed for parallel frontend and backend development. Iteratively replacing mock data with real data and refining components proved to be an effective strategy.