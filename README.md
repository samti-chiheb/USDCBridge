# USDC Bridge

# USDC Bridge is a web application that allows users to bridge USDC tokens from the Noble blockchain to the Ethereum blockchain. This application facilitates the burning of USDC tokens on Noble and the minting of USDC tokens on Ethereum, ensuring a seamless transition between the two blockchains.

## Table of Contents

- [Project Structure](#project-structure)

- [Features](#features)

- [Installation](#installation)

- [Usage](#usage)

- [Thinking Process](#thinking-process)

- [Approach](#approach)

- [Difficulties](#difficulties)

- [Future Improvements](#future-improvements)

## Project Structure

```

.

├── App.tsx

├── components

│   ├── BridgeUSDC.tsx

│   ├── Toast.tsx

│   ├── WalletInterface.tsx

│   └── index.ts

├── contexts

│   └── WalletContext.tsx

├── hooks

│   ├── index.ts

│   ├── useBurnUSDC.tsx

│   └── useMintUSDC.tsx

├── index.css

├── main.tsx

├── services

│   ├── AttestationService.ts

│   ├── depositForBurn.ts

│   ├── mintUSDC.ts

│   └── wallets

│       ├── keplr.ts

│       ├── metamask.ts

│       └── walletConfig.ts

├── types

│   ├── toastTypes.ts

│   └── tx.ts

└── vite-env.d.ts

```

## Features

- **Wallet Connection**: Connect to multiple wallets (MetaMask, Keplr) and manage wallet connections throughout the app.

- **USDC Burn and Mint**: Burn USDC tokens on Noble and mint them on Ethereum.

- **Form Autofill**: Automatically fill form inputs when a wallet is connected.

- **Toast Notifications**: Display success and error messages to the user.

- **Balance Display**: Show the user's USDC balance on both Noble and Ethereum blockchains.

## Installation

1. Clone the repository:

   ```sh

   git clone https://github.com/samti-chiheb/USDCBridge.git

   ```

2. Navigate to the project directory:

   ```sh

   cd USDCBridge

   ```

3. Install dependencies:

   ```sh

   npm install

   ```

4. Start the development server:

   ```sh

   npm run dev

   ```

## Usage

1. Open the application in your web browser.

2. Connect your wallet (MetaMask or Keplr).

3. Enter the amount of USDC you want to bridge and the recipient Ethereum address.

4. Click "Burn" to burn USDC on Noble.

5. Wait for the attestation to complete.

6. Click "Mint" to mint USDC on Ethereum.

## Thinking Process

1. **Understanding the Requirements**:

   - The project requires bridging USDC from Noble to Ethereum. This involves two main steps: burning USDC on Noble and minting USDC on Ethereum.

   - Users need to connect their wallets (Keplr for Noble and MetaMask for Ethereum) and see their USDC balances on both blockchains.

2. **Designing the Architecture**:

   - Decided to use React for the front end with Vite for fast development.

   - Chose Tailwind CSS for styling to keep the design simple and responsive.

   - Designed the wallet connection system to be scalable, allowing for easy addition of new wallets in the future.

3. **Implementing Core Features**:

   - Implemented wallet connection functionality first to ensure that users can interact with the application.

   - Developed the core functionalities for burning and minting USDC using hooks (`useBurnUSDC` and `useMintUSDC`).

   - Created a context to manage wallet states and make them accessible throughout the application.

4. **Ensuring User Feedback**:

   - Added a Toast component to provide users with real-time feedback on their actions (e.g., success and error messages).

5. **Handling CORS Issues**:

   - Generated a local SSL certificate to avoid being blocked by CORS during development.

## Approach

1. **Wallet Connection**:

   - Started by implementing wallet connections, focusing on scalability by creating a wallet configuration file (`walletConfig.ts`) to easily add new wallets in the future.

   - Utilized context to manage wallet state and make wallet data accessible throughout the application.

2. **Form Autofill**:

   - Ensured that when a user connects their wallet, the form inputs are automatically populated with the wallet address.

3. **Burn and Mint USDC**:

   - Developed two main hooks, `useBurnUSDC` and `useMintUSDC`, to handle the core functionalities of burning and minting USDC.

4. **Toast Notifications**:

   - Created a Toast component to display success and error messages to users, improving user experience and feedback.

## Difficulties

- **Web3 and Blockchain Integration**:

  - Being new to web3 and blockchain technologies posed initial challenges. Multiple methods were tested before settling on the burnUSDC and mintUSDC scripts.

  - Ensured robust wallet connection handling and integration with the application's state.

- **State Management**:

  - Managing state across the application was challenging. Implementing a state management library in the future is planned to address this issue.

- **Project Cleanliness**:

  - The project currently contains some unnecessary libraries. A cleanup is planned to remove these libraries and optimize the project structure.

- **TypeScript Typing**:

  - TypeScript typing is not fully optimized and needs improvement to ensure better type safety and developer experience.

## Future Improvements

1. **Form Validation**:

   - Optimize form validation using `zod` and regular expressions to ensure proper input formats and enhance validation robustness.

2. **Error Management**:

   - Improve error handling mechanisms to provide more detailed and user-friendly error messages.

3. **State Management**:

   - Implement a state management library to better manage the application's state.

4. **Project Cleanup**:

   - Remove unnecessary libraries and clean up the project to improve performance and maintainability.