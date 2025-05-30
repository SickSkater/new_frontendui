# Project Timeline and Problem Resolution

This document outlines the timeline of commits, problems encountered, discoveries made, and solutions implemented during the development process.

---

## Timeline of Commits and Problem Resolution

### **1. Incorrect Entity Name Format**
- **Problem Definition**:  
  We initially believed that we could freely choose the names of entities. This misunderstanding stemmed from insufficient knowledge of using the `create:component` script.
- **Resolution**:  
  The issue was resolved by creating a new entity with the correct naming conventions in the commit on **Apr. 3, 2025**.

### **2. PaymentInfo Entity Naming Issue**
- **Problem Definition**:  
  The `PaymentInfo` entity had inconsistent naming conventions due to improper camelCase usage. Specifically, the letter "I" in `Info` was sometimes uppercase and sometimes lowercase, causing issues during entity generation.
- **Resolution**:  
  We resolved this by finding and replacing all occurrences of `Paymentinfo` with `PaymentInfo` across all files and names using a Bash script. This was completed on **Apr. 6, 2025**.

---

### **3. Incomplete Database**
- **Problem Definition**:  
  The database was incomplete, and certain data that would normally be provided by `UserReadSyncAction` was missing.
- **Resolution**:  
  We introduced a new variable in `UserPage` called `temp_data` to hold the missing data, simulating what would typically be provided by the database.

---

### **4. Indirect Querying of Admissions**
- **Problem Definition**:  
  It was not possible to directly query the database for admissions associated with a specific user. Instead, we had to:
  1. Query the user for their `studies`.
  2. From `studies`, query the `payments` for each study.
  3. From each `Payment`, query the `PaymentInfo`.
  4. Finally, from `PaymentInfo`, retrieve the `admission`.
  
  This issue stems from the structure of the database itself.
- **Resolution**:  
  Although this approach is far from ideal, we proceeded with this multi-step querying process to retrieve the required data.

---

### **5. Vector Attribute for Admissions**
- **Date**: **Apr. 9, 2025**  
- **Achievement**:  
  We successfully implemented a vector attribute for users that displays their admissions. Additionally, we learned how to pass an entity and use the `me` query to retrieve the user again.

---

### **6. Incomplete `studentInsert` Mutation**
- **Problem Definition**:  
  The `studentInsert` mutation was incomplete, which resulted in the inability to add new users to the database.
- **Resolution**:  
  The issue was resolved by updating the Docker containers to ensure all necessary components were properly configured.

---

### **7. Inability to Get ID of Inserted Entity**
- **Problem Definition**:  
  After inserting a new entity, it was not possible to retrieve its ID, which caused issues in subsequent operations.
- **Resolution**:  
  We resolved this by generating the ID on the client side and storing it in a variable before performing the insertion.

---

### **8. Infinite Scroll Issue**
- **Date**: **May 20, 2025**  
- **Problem Definition**:  
  The `InfiniteScroll` component encountered two issues:
  1. An infinite loop occurred because the `hasMore` variable was not correctly set to `false` when the fetch operation returned an array of size 0.
  2. A missing condition in the `useEffect` function caused unintended behavior during component updates.
- **Resolution**:  
  The issue was resolved on **May 21, 2025** with the assistance of JVFlasar and Gemini AI. The `hasMore` variable was properly updated, and the missing condition was added to the `useEffect` dependency array.
  
---

## Problems That Could Not Be Resolved
- The indirect querying of admissions remains a structural issue with the database. While we implemented a workaround, the underlying problem persists and would require a redesign of the database schema to resolve fully.

---

## Lessons Learned
- Proper naming conventions and adherence to camelCase are critical when working with entity generation scripts.
- Understanding the structure of the database and the relationships between entities is essential for efficient querying.

---


