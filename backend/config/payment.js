module.exports = {
  MERCHANT_ID: "your_merchant_id",
  USER_ID: "your_user_id",
  PIN: "your_pin",
  MODE: "test", // 'test' or 'production'
  getConvergeUrl: (mode) => {
    if (mode === "test") {
      return "https://api.demo.convergepay.com/VirtualMerchantDemo/processxml.do";
    } else if (mode === "production") {
      return "https://api.convergepay.com/VirtualMerchant/processxml.do";
    } else {
      throw new Error("Mode should be 'test' or 'production'");
    }
  },
};
