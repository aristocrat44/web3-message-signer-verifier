# Web3 Message Signer and Verifier

**FE Candidate Assignment**

> This is a full-stack Web3 project for signing and verifying messages using Ethereum wallets.

---

## Repository Structure

This monorepo contains two main folders:

- **frontend/** – Next.js frontend for message signing, wallet authentication, and user profile management.
- **backend/** – TypeScript Express backend for message verification and API endpoints.

> Please refer to each folder's `README.md` for detailed setup instructions and usage.

---

## Areas for Improvements

1. **Hooks Refactoring**

   - Standardize custom hooks (e.g., `useAuth`, `useForm`) for reusability and readability.

2. **Class Name Management**

   - Use a `cn` utility (or `clsx`) instead of concatenating class strings manually.

3. **Tailwind Configuration**

   - Introduce a centralized `tailwind.config.js` with `shadcn/ui` integration for consistent colors, spacing, and components.

4. **Layout & Typography**

   - Implement proper layout concepts with responsive containers.
   - Standardize fonts and text hierarchy for better UX.

5. **Testing Improvements**

   - Streamline test cases and create a global testing configuration to reduce boilerplate.
   - Ensure full coverage, especially for edge cases and error branches.

6. **Error Handling**

   - Implement a consistent toast/notification system for frontend errors.
   - Add proper backend error responses and logging.

7. **Cookie & Session Management**
   - Add additional cookie security settings in backend (e.g., `secure`, `sameSite`, and `httpOnly`) for production.

---
