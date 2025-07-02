import * as Yup from "yup";

// Create validation schema using Yup
export const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const UpdateUserBalanceSchema = Yup.object({
  account: Yup.string()
    .oneOf(["Spot", "Future", "Funding"], "Invalid account type")
    .required("Account type is required"),
  isDebit: Yup.boolean().required("Direction is required"),
  currencyId: Yup.string().required("Currency is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .test(
      "is-decimal",
      "Amount should have at most 8 decimal places",
      (value) => {
        if (!value) return true;
        return /^\d+(\.\d{1,8})?$/.test(value.toString());
      }
    ),
  type: Yup.string().required("Type is required"),
  reason: Yup.string().required("Reason is required"),
});

export const addCurrencySchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(1, "Name must not be empty"),
  symbol: Yup.string()
    .required("Symbol is required")
    .min(1, "Symbol must not be empty"),
  supportsP2p: Yup.boolean(),
  coinMarketCapId: Yup.string()
    .required("Blockchain ID is required")
    .uuid("Must be a valid UUID"),
  network: Yup.string().required("Currency network is required"),
  websites: Yup.array().of(Yup.string().url("Must be a valid URL")),
  sourceCode: Yup.string().nullable().url("Must be a valid URL"),
  whitePaper: Yup.string().nullable().url("Must be a valid URL"),
  circulatingSupply: Yup.number().required("Circulating supply is required"),
  infoSource: Yup.string()
    .oneOf(["Internal", "CoinMarketCap"], "Invalid source")
    .required("Info source is required"),
  description: Yup.string().nullable(),
  totalSupply: Yup.number().required("Total supply is required"),
  disable: Yup.boolean(),
  disableDeposits: Yup.boolean(),
  disablePairs: Yup.boolean(),
  disableWithdrawal: Yup.boolean(),
  requiresMemo: Yup.boolean(),
  requiresTag: Yup.boolean(),
  minimumDepositConfirmation: Yup.number()
    .required("Minimum deposit confirmation is required")
    .min(1, "Must be at least 1")
    .max(50, "Must be at most 50"),
  minimumWithdrawal: Yup.number().required("Minimum withdrawal is required"),
  maximumWithdrawal: Yup.number().required("Maximum withdrawal is required"),
  withdrawalFee: Yup.number().required("Withdrawal fee is required"),
});

// Contract validation schema
const contractSchema = Yup.object({
  type: Yup.string()
    .oneOf(["ERC20", "TRC20", "BEP20", "SPL", "ARC20"], "Invalid contract type")
    .required("Contract type is required"),
  contractAddress: Yup.string()
    .required("Contract address is required")
    .min(1, "Contract address must not be empty"),
  status: Yup.string()
    .oneOf(["Active", "Suspended"], "Invalid status")
    .required("Status is required"),
});

// Token validation schema extending the currency schema
export const addTokenSchema = addCurrencySchema.shape({
  contracts: Yup.array()
    .of(contractSchema)
    .nullable()
    .test(
      "at-least-one-contract",
      "At least one contract must be provided",
      function (value) {
        // Only enforce this validation if the form has been submitted
        const isSubmitted = this.options.context?.isSubmitted;
        if (isSubmitted && (!value || value.length === 0)) {
          return false;
        }
        return true;
      }
    ),
});

export const addContractSchema = Yup.object({
  contractSize: Yup.number()
    .required("Contract size is required")
    .positive("Contract size must be positive")
    .typeError("Contract size must be a number"),

  fundingRateInterval: Yup.number()
    .required("Funding rate interval is required")
    .positive("Funding rate interval must be positive")
    .integer("Funding rate interval must be an integer")
    .typeError("Funding rate interval must be a number"),

  initialMarginRate: Yup.number()
    .required("Initial margin rate is required")
    .min(0, "Initial margin rate must be non-negative")
    .max(1, "Initial margin rate cannot exceed 1 (100%)")
    .typeError("Initial margin rate must be a number"),

  isActive: Yup.boolean(),

  maintenanceMarginRate: Yup.number()
    .required("Maintenance margin rate is required")
    .min(0, "Maintenance margin rate must be non-negative")
    .max(1, "Maintenance margin rate cannot exceed 1 (100%)")
    .lessThan(
      Yup.ref("initialMarginRate"),
      "Maintenance margin rate must be less than initial margin rate"
    )
    .typeError("Maintenance margin rate must be a number"),

  maximumPositionSize: Yup.number()
    .required("Maximum position size is required")
    .positive("Maximum position size must be positive")
    .typeError("Maximum position size must be a number"),

  maxLeverage: Yup.number()
    .required("Maximum leverage is required")
    .integer("Maximum leverage must be an integer")
    .min(1, "Maximum leverage must be at least 1")
    .max(125, "Maximum leverage cannot exceed 125")
    .typeError("Maximum leverage must be a number"),

  minQuantity: Yup.number()
    .required("Minimum quantity is required")
    .positive("Minimum quantity must be positive")
    .typeError("Minimum quantity must be a number"),

  pricePrecision: Yup.number()
    .required("Price precision is required")
    .integer("Price precision must be an integer")
    .min(0, "Price precision must be non-negative")
    .max(8, "Price precision cannot exceed 8")
    .typeError("Price precision must be a number"),

  quantityPrecision: Yup.number()
    .required("Quantity precision is required")
    .integer("Quantity precision must be an integer")
    .min(0, "Quantity precision must be non-negative")
    .max(8, "Quantity precision cannot exceed 8")
    .typeError("Quantity precision must be a number"),

  settlementType: Yup.string()
    .required("Settlement type is required")
    .oneOf(
      ["Coin_M", "USDT_M"],
      "Settlement type must be either Coin_M or USDT_M"
    ),

  tickSize: Yup.number()
    .required("Tick size is required")
    .positive("Tick size must be positive")
    .typeError("Tick size must be a number"),

  type: Yup.string()
    .required("Contract type is required")
    .oneOf(
      ["Delivery", "Perpetual"],
      "Contract type must be either Delivery or Perpetual"
    ),

  deliveryDate: Yup.string()
    .nullable()
    .when("type", {
      is: "Delivery",
      then: (schema) =>
        schema.required("Delivery date is required for delivery contracts"),
    }),
});

export const fiatValidationSchema = Yup.object({
  name: Yup.string()
    .max(30, "Name must be 30 characters or less")
    .required("Name is required"),
  symbol: Yup.string()
    .max(10, "Symbol must be 10 characters or less")
    .required("Symbol is required"),
  countryCode: Yup.string()
    .max(3, "Country code must be 3 characters or less")
    .required("Country code is required"),
});

// Validation schemas
export const blockchainValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be 50 characters or less"),
  active: Yup.boolean(),
});

export const multipleBlockchainsValidationSchema = Yup.object({
  blockchains: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required("Name is required")
          .max(50, "Name must be 50 characters or less"),
        active: Yup.boolean(),
      })
    )
    .min(1, "At least one blockchain is required"),
});

// Validation schema for trading fees
export const tradingFeeValidationSchema = Yup.object({
  level: Yup.string()
    .oneOf(["Regular", "Vip"])
    .required("User level is required"),
  spotTakerFee: Yup.number()
    .required("Spot taker fee is required")
    .min(0, "Fee cannot be negative"),
  spotMakerFee: Yup.number()
    .required("Spot maker fee is required")
    .min(0, "Fee cannot be negative"),
  futureTakerFee: Yup.number()
    .required("Future taker fee is required")
    .min(0, "Fee cannot be negative"),
  futureMakerFee: Yup.number()
    .required("Future maker fee is required")
    .min(0, "Fee cannot be negative"),
  optionsMakerFee: Yup.number()
    .required("Options maker fee is required")
    .min(0, "Fee cannot be negative"),
  optionsTakerFee: Yup.number()
    .required("Options taker fee is required")
    .min(0, "Fee cannot be negative"),
  withdrawalLimit: Yup.number()
    .required("Withdrawal limit is required")
    .min(0, "Limit cannot be negative"),
});

export const addTradingPairSchema = Yup.object().shape({
  base: Yup.string()
    .required("Base currency is required")
    .min(1, "Base currency must be at least 1 character")
    .max(10, "Base currency must be at most 10 characters"),

  quote: Yup.string()
    .required("Quote currency is required")
    .min(1, "Quote currency must be at least 1 character")
    .max(10, "Quote currency must be at most 10 characters"),

  baseCurrencyId: Yup.string()
    .required("Base currency ID is required")
    .uuid("Must be a valid UUID"),

  quoteCurrencyId: Yup.string()
    .required("Quote currency ID is required")
    .uuid("Must be a valid UUID"),

  decimals: Yup.array()
    .of(Yup.number().integer().min(0).max(8))
    .length(2, "Decimals must have exactly 2 elements")
    .required("Decimals are required"),

  enabled: Yup.boolean(),

  enableFutures: Yup.boolean(),

  enableSpot: Yup.boolean(),

  listingDate: Yup.date()
    .nullable()
    .when("listingStatus", {
      is: (status: string) => status !== "DeListed",
      then: () =>
        Yup.date().required(
          "Listing date is required for Upcoming or Listed status"
        ),
    }),

  listingPrice: Yup.number()
    .required("Listing price is required")
    .min(0, "Listing price must be greater than or equal to 0"),

  listingStatus: Yup.string()
    .required("Listing status is required")
    .oneOf(["Upcoming", "Listed", "DeListed"], "Invalid listing status"),

  maximumOrder: Yup.number()
    .required("Maximum order size is required")
    .min(0, "Maximum order size must be greater than 0")
    .test(
      "is-greater-than-min",
      "Maximum order must be greater than minimum order",
      function (value) {
        const { minimumOrder } = this.parent;
        return value > minimumOrder;
      }
    ),

  maximumPriceDeviation: Yup.number()
    .required("Maximum price deviation is required")
    .min(0, "Maximum price deviation must be greater than or equal to 0")
    .max(50, "Maximum price deviation cannot exceed 50%"),

  minimumOrder: Yup.number()
    .required("Minimum order size is required")
    .min(0, "Minimum order size must be greater than or equal to 0"),

  pricePrecision: Yup.number()
    .required("Price precision is required")
    .integer("Price precision must be an integer")
    .min(0, "Price precision must be at least 0")
    .max(8, "Price precision cannot exceed 8"),

  amountPrecision: Yup.number()
    .required("Amount precision is required")
    .integer("Amount precision must be an integer")
    .min(0, "Amount precision must be at least 0")
    .max(8, "Amount precision cannot exceed 8"),

  priceSource: Yup.string()
    .required("Price source is required")
    .oneOf(["Binance", "CoinMarketCap"], "Invalid price source"),

  tickSize: Yup.number()
    .required("Tick size is required")
    .positive("Tick size must be greater than 0")
    .test(
      "decimal-precision",
      "Tick size must have precision less than or equal to price precision",
      function (value) {
        if (!value) return true;
        const { pricePrecision } = this.parent;

        // Calculate decimal places in the tick size
        const tickSizeStr = value.toString();
        const decimalIndex = tickSizeStr.indexOf(".");
        const decimalPlaces =
          decimalIndex === -1 ? 0 : tickSizeStr.length - decimalIndex - 1;

        return decimalPlaces <= pricePrecision;
      }
    ),
});

export const addRolesSchema = Yup.object({
  roleName: Yup.string()
    .required("Role name is required")
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Role name can only contain letters and spaces"),
});

export const countryValidationSchema = Yup.object({
  name: Yup.string()
    .required("Country name is required")
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country name must be less than 100 characters"),

  symbol: Yup.string()
    .required("Country code is required")
    .min(2, "Country code must be at least 2 characters")
    .max(3, "Country code must be less than 4 characters")
    .matches(/^[A-Z]+$/, "Country code must be uppercase letters only"),

  phoneCode: Yup.string()
    .required("Phone code is required")
    .matches(
      /^\+\d{1,4}$/,
      "Phone code must start with + followed by 1-4 digits"
    ),

  logo: Yup.mixed()
    .required("Logo is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      return (value as File).type.startsWith("image/");
    }),
});

// Create edit validation schema with optional logo
export const editValidationSchema = Yup.object({
  name: Yup.string()
    .required("Country name is required")
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country name must be less than 100 characters"),

  symbol: Yup.string()
    .required("Country code is required")
    .min(2, "Country code must be at least 2 characters")
    .max(3, "Country code must be less than 4 characters")
    .matches(/^[A-Z]+$/, "Country code must be uppercase letters only"),

  phoneCode: Yup.string()
    .required("Phone code is required")
    .matches(
      /^\+\d{1,4}$/,
      "Phone code must start with + followed by 1-4 digits"
    ),

  logo: Yup.mixed()
    .nullable()
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return true; // Optional in edit mode
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; // Optional in edit mode
      return (value as File).type.startsWith("image/");
    }),
});
